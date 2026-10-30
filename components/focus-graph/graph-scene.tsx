"use client"

import { useEffect, useMemo, useRef, type RefObject } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const CLUSTERS = 5
const NODES_PER_CLUSTER = 34
const DUST = 48
const PULSES = 36

// Unit directions for each community; index matches the focus area list
const CENTERS = [
  [0.1, 0.9, 0.42],
  [0.95, 0.12, 0.28],
  [0.38, -0.86, 0.34],
  [-0.92, -0.22, 0.32],
  [-0.3, 0.32, -0.9],
].map(([x, y, z]) => new THREE.Vector3(x, y, z).normalize().multiplyScalar(1.55))

// Threads between areas, e.g. distillation links graph learning and LLMs
const BRIDGES: [number, number][] = [
  [0, 1],
  [0, 3],
  [2, 3],
  [4, 0],
  [4, 1],
  [4, 2],
]

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildGraph() {
  const rand = mulberry32(7)
  const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand())

  const positions: THREE.Vector3[] = []
  const cluster: number[] = []
  const sizes: number[] = []

  for (let c = 0; c < CLUSTERS; c++) {
    for (let i = 0; i < NODES_PER_CLUSTER; i++) {
      positions.push(
        CENTERS[c].clone().add(new THREE.Vector3(gauss(), gauss(), gauss()).multiplyScalar(i === 0 ? 0 : 0.36)),
      )
      cluster.push(c)
      sizes.push(i === 0 ? 7 : 2.4 + rand() * 2.6)
    }
  }
  // Ambient nodes on an outer shell for depth; they carry no edges
  for (let i = 0; i < DUST; i++) {
    const v = new THREE.Vector3(gauss(), gauss(), gauss()).normalize().multiplyScalar(2.2 + rand() * 0.5)
    positions.push(v)
    cluster.push(-1)
    sizes.push(1.4 + rand() * 1.4)
  }

  const edgeSet = new Set<string>()
  const edges: [number, number][] = []
  const addEdge = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`
    if (a === b || edgeSet.has(key)) return
    edgeSet.add(key)
    edges.push([a, b])
  }

  for (let c = 0; c < CLUSTERS; c++) {
    const start = c * NODES_PER_CLUSTER
    for (let i = start; i < start + NODES_PER_CLUSTER; i++) {
      const nearest = []
      for (let j = start; j < start + NODES_PER_CLUSTER; j++) {
        if (i !== j) nearest.push({ j, d: positions[i].distanceToSquared(positions[j]) })
      }
      nearest.sort((a, b) => a.d - b.d)
      nearest.slice(0, 3).forEach(({ j }) => addEdge(i, j))
    }
  }

  for (const [a, b] of BRIDGES) {
    const pairs = []
    for (let i = a * NODES_PER_CLUSTER; i < (a + 1) * NODES_PER_CLUSTER; i++) {
      for (let j = b * NODES_PER_CLUSTER; j < (b + 1) * NODES_PER_CLUSTER; j++) {
        pairs.push({ i, j, d: positions[i].distanceToSquared(positions[j]) })
      }
    }
    pairs.sort((p, q) => p.d - q.d)
    pairs.slice(0, 2).forEach(({ i, j }) => addEdge(i, j))
  }

  const neighbors: number[][] = positions.map(() => [])
  edges.forEach(([a, b]) => {
    neighbors[a].push(b)
    neighbors[b].push(a)
  })

  return { positions, cluster, sizes, edges, neighbors, rand }
}

const highlightChunk = /* glsl */ `
  attribute float aCluster;
  uniform float uHL[${CLUSTERS}];
  float clusterHighlight() {
    float hl = 0.0;
    for (int i = 0; i < ${CLUSTERS}; i++) {
      if (abs(aCluster - float(i)) < 0.5) hl = uHL[i];
    }
    return hl;
  }
`

const nodeVertex = /* glsl */ `
  ${highlightChunk}
  attribute float aSize;
  uniform float uPR;
  varying float vHL;
  varying float vDepth;
  void main() {
    vHL = clusterHighlight();
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (1.0 + vHL * 0.5) * uPR * (7.0 / -mv.z);
    vDepth = smoothstep(9.8, 5.0, -mv.z);
  }
`

const nodeFragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  uniform float uAny;
  varying float vHL;
  varying float vDepth;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.18, d);
    vec3 col = mix(uBase, uAccent, vHL);
    float alpha = a * mix(0.18, 0.95, vDepth) * mix(1.0, 0.35, uAny * (1.0 - vHL));
    gl_FragColor = vec4(col, alpha);
  }
`

const edgeVertex = /* glsl */ `
  ${highlightChunk}
  varying float vHL;
  varying float vDepth;
  void main() {
    vHL = clusterHighlight();
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vDepth = smoothstep(9.8, 5.0, -mv.z);
  }
`

const edgeFragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  uniform float uAny;
  varying float vHL;
  varying float vDepth;
  void main() {
    vec3 col = mix(uBase, uAccent, vHL);
    float alpha = mix(0.07, 0.32, vHL) * mix(0.35, 1.0, vDepth) * mix(1.0, 0.5, uAny * (1.0 - vHL));
    gl_FragColor = vec4(col, alpha);
  }
`

const pulseVertex = /* glsl */ `
  ${highlightChunk}
  uniform float uPR;
  varying float vHL;
  varying float vDepth;
  void main() {
    vHL = clusterHighlight();
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 14.0 * uPR * (7.0 / -mv.z);
    vDepth = smoothstep(9.8, 5.0, -mv.z);
  }
`

const pulseFragment = /* glsl */ `
  uniform vec3 uAccent;
  uniform float uAny;
  varying float vHL;
  varying float vDepth;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = exp(-d * d * 38.0);
    float alpha = glow * mix(0.25, 0.9, vDepth) * mix(1.0, 0.2, uAny * (1.0 - vHL));
    gl_FragColor = vec4(uAccent, alpha);
  }
`

type SceneProps = {
  active: number
  reduce: boolean
  labelRefs: RefObject<(HTMLDivElement | null)[]>
}

function Graph({ active, reduce, labelRefs }: SceneProps) {
  const { gl, camera, size, invalidate } = useThree()
  const spin = useRef<THREE.Group>(null)
  const tilt = useRef<THREE.Group>(null)
  const activeRef = useRef(active)
  activeRef.current = active

  const graph = useMemo(buildGraph, [])

  const { nodes, lines, pulses, uniforms, walkers, pulsePositions, pulseClusters } = useMemo(() => {
    const { positions, cluster, sizes, edges } = graph
    const uniforms = {
      uHL: { value: new Array(CLUSTERS).fill(0) },
      uAny: { value: 0 },
      uPR: { value: Math.min(gl.getPixelRatio(), 2) },
      // Shader output is written as-is to the sRGB canvas, so keep these unconverted
      uBase: { value: new THREE.Color().setStyle("#a1a1aa", THREE.LinearSRGBColorSpace) },
      uAccent: { value: new THREE.Color().setStyle("#36d399", THREE.LinearSRGBColorSpace) },
    }

    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions.flatMap((p) => p.toArray()), 3))
    nodeGeo.setAttribute("aCluster", new THREE.Float32BufferAttribute(cluster, 1))
    nodeGeo.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1))
    const nodes = new THREE.Points(
      nodeGeo,
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: nodeVertex,
        fragmentShader: nodeFragment,
        transparent: true,
        depthWrite: false,
      }),
    )

    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        edges.flatMap(([a, b]) => [...positions[a].toArray(), ...positions[b].toArray()]),
        3,
      ),
    )
    edgeGeo.setAttribute("aCluster", new THREE.Float32BufferAttribute(edges.flatMap(([a, b]) => [cluster[a], cluster[b]]), 1))
    const lines = new THREE.LineSegments(
      edgeGeo,
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: edgeVertex,
        fragmentShader: edgeFragment,
        transparent: true,
        depthWrite: false,
      }),
    )

    // Pulses random-walk the graph like messages being passed between nodes
    const walkers = Array.from({ length: PULSES }, () => {
      const from = Math.floor(graph.rand() * CLUSTERS * NODES_PER_CLUSTER)
      const to = graph.neighbors[from][Math.floor(graph.rand() * graph.neighbors[from].length)]
      return { from, to, t: graph.rand(), speed: 0.35 + graph.rand() * 0.45 }
    })
    const pulsePositions = new Float32Array(PULSES * 3)
    const pulseClusters = new Float32Array(PULSES)
    const pulseGeo = new THREE.BufferGeometry()
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3))
    pulseGeo.setAttribute("aCluster", new THREE.BufferAttribute(pulseClusters, 1))
    const pulses = new THREE.Points(
      pulseGeo,
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: pulseVertex,
        fragmentShader: pulseFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    pulses.frustumCulled = false

    return { nodes, lines, pulses, uniforms, walkers, pulsePositions, pulseClusters }
  }, [graph, gl])

  useEffect(
    () => () => {
      for (const obj of [nodes, lines, pulses]) {
        obj.geometry.dispose()
        ;(obj.material as THREE.Material).dispose()
      }
    },
    [nodes, lines, pulses],
  )

  // In reduced-motion mode the canvas renders on demand; redraw when the selection changes
  useEffect(() => {
    if (reduce) invalidate()
  }, [active, reduce, invalidate])

  const tmp = useMemo(() => ({ v: new THREE.Vector3(), q: new THREE.Quaternion(), y: new THREE.Vector3(0, 1, 0) }), [])
  const facing = useMemo(() => new THREE.Vector3(0, 0, 1), [])

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05)
    const current = activeRef.current
    const ease = (rate: number) => (reduce ? 1 : 1 - Math.exp(-dt * rate))

    const hl = uniforms.uHL.value as number[]
    for (let i = 0; i < CLUSTERS; i++) hl[i] += ((i === current ? 1 : 0) - hl[i]) * ease(6)
    uniforms.uAny.value += ((current >= 0 ? 1 : 0) - uniforms.uAny.value) * ease(6)

    const g = spin.current
    if (g) {
      if (current >= 0) {
        tmp.q.setFromUnitVectors(tmp.v.copy(CENTERS[current]).normalize(), facing)
        g.quaternion.slerp(tmp.q, ease(2.4))
      } else if (!reduce) {
        g.quaternion.premultiply(tmp.q.setFromAxisAngle(tmp.y, dt * 0.08))
      }
    }

    if (tilt.current && !reduce) {
      tilt.current.rotation.x += (-state.pointer.y * 0.18 - tilt.current.rotation.x) * ease(3)
      tilt.current.rotation.y += (state.pointer.x * 0.25 - tilt.current.rotation.y) * ease(3)
    }

    if (!reduce) {
      for (let k = 0; k < walkers.length; k++) {
        const w = walkers[k]
        w.t += dt * w.speed
        if (w.t >= 1) {
          const options = graph.neighbors[w.to].filter((n) => n !== w.from)
          const next = options.length ? options : graph.neighbors[w.to]
          w.from = w.to
          w.to = next[Math.floor(graph.rand() * next.length)]
          w.t = 0
        }
        const a = graph.positions[w.from]
        const b = graph.positions[w.to]
        pulsePositions[k * 3] = a.x + (b.x - a.x) * w.t
        pulsePositions[k * 3 + 1] = a.y + (b.y - a.y) * w.t
        pulsePositions[k * 3 + 2] = a.z + (b.z - a.z) * w.t
        pulseClusters[k] = graph.cluster[w.from]
      }
      pulses.geometry.attributes.position.needsUpdate = true
      pulses.geometry.attributes.aCluster.needsUpdate = true
    }

    // Pin the HTML labels to their community centres
    const labels = labelRefs.current
    if (g && labels) {
      g.updateWorldMatrix(true, false)
      for (let i = 0; i < CLUSTERS; i++) {
        const el = labels[i]
        if (!el) continue
        tmp.v.copy(CENTERS[i]).applyMatrix4(g.matrixWorld)
        const front = THREE.MathUtils.clamp((tmp.v.z + 1.6) / 3.2, 0, 1)
        tmp.v.project(camera)
        const x = (tmp.v.x * 0.5 + 0.5) * size.width
        const y = (-tmp.v.y * 0.5 + 0.5) * size.height
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -180%)`
        const target = i === current ? 1 : current >= 0 ? 0.18 : 0.2 + front * 0.55
        const prev = Number(el.dataset.o ?? target)
        const next = prev + (target - prev) * ease(6)
        el.dataset.o = String(next)
        el.style.opacity = next.toFixed(3)
      }
    }
  })

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <primitive object={lines} />
        <primitive object={nodes} />
        <primitive object={pulses} />
      </group>
    </group>
  )
}

export default function GraphScene({ active, reduce, labelRefs, running }: SceneProps & { running: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduce ? "demand" : running ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
    >
      <Graph active={active} reduce={reduce} labelRefs={labelRefs} />
    </Canvas>
  )
}
