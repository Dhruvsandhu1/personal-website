"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// A toy loss surface: a broad bowl with a global minimum, a local minimum and a few ridges.
// The GLSL and JS versions must stay identical — the GPU draws the surface, the CPU runs the optimisers on it.
const lossGLSL = /* glsl */ `
  float loss(vec2 p, float t) {
    float x = p.x;
    float z = p.y;
    float h = 0.008 * x * x + 0.01 * (z + 6.0) * (z + 6.0);
    h -= 2.3 * exp(-((x - 3.0) * (x - 3.0) + (z + 6.5) * (z + 6.5)) / 6.0);
    h -= 1.3 * exp(-((x + 5.0) * (x + 5.0) + (z + 3.5) * (z + 3.5)) / 3.5);
    h += 1.7 * exp(-((x + 0.5) * (x + 0.5) + (z + 10.0) * (z + 10.0)) / 7.0);
    h += 1.3 * exp(-((x - 8.0) * (x - 8.0) + (z + 2.0) * (z + 2.0)) / 5.0);
    h += 1.0 * exp(-((x + 9.0) * (x + 9.0) + (z + 11.0) * (z + 11.0)) / 8.0);
    h += 0.22 * sin(0.7 * x + 0.35 * z + t * 0.25) * cos(0.45 * z - 0.4 * x - t * 0.18);
    return h;
  }
`

function loss(x: number, z: number, t: number) {
  let h = 0.008 * x * x + 0.01 * (z + 6) * (z + 6)
  h -= 2.3 * Math.exp(-((x - 3) ** 2 + (z + 6.5) ** 2) / 6)
  h -= 1.3 * Math.exp(-((x + 5) ** 2 + (z + 3.5) ** 2) / 3.5)
  h += 1.7 * Math.exp(-((x + 0.5) ** 2 + (z + 10) ** 2) / 7)
  h += 1.3 * Math.exp(-((x - 8) ** 2 + (z + 2) ** 2) / 5)
  h += 1.0 * Math.exp(-((x + 9) ** 2 + (z + 11) ** 2) / 8)
  h += 0.22 * Math.sin(0.7 * x + 0.35 * z + t * 0.25) * Math.cos(0.45 * z - 0.4 * x - t * 0.18)
  return h
}

// Starting points that were checked offline to descend into one of the minima
const SPAWNS: [number, number][] = [
  [-9, -10.5], [-9, -7.5], [-9, -4.5], [-9, -1.5], [-7.5, -9], [-7.5, 0], [-6, -9], [-6, 0],
  [-3, -9], [-1.5, -9], [0, -10.5], [0, -9], [1.5, -12], [1.5, 0], [3, -12], [3, 0],
  [4.5, -12], [6, -12], [6, -3], [6, 0], [7.5, -9], [7.5, -6], [7.5, -3], [9, -9], [9, -6], [9, -3],
]

const GRID = { x0: -16, x1: 16, z0: -20, z1: 6 }
const WALKERS = 4
const TRAIL = 150
const LIFE = 9

const surfaceVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPR;
  uniform float uSize;
  varying float vLow;
  varying float vFog;
  ${lossGLSL}
  void main() {
    vec3 pos = position;
    pos.y = loss(pos.xz, uTime);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float depth = -mv.z;
    vLow = smoothstep(0.4, -1.3, pos.y);
    vFog = smoothstep(30.0, 9.0, depth) * smoothstep(16.0, 11.0, abs(pos.x)) * smoothstep(1.0, 3.0, depth);
    gl_PointSize = uSize * (1.0 + vLow * 0.6) * uPR * (7.0 / depth);
  }
`

const surfaceFragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  varying float vLow;
  varying float vFog;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.1, d);
    gl_FragColor = vec4(mix(uBase, uAccent, vLow), a * (0.3 + 0.55 * vLow) * vFog);
  }
`

const trailVertex = /* glsl */ `
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const trailFragment = /* glsl */ `
  uniform vec3 uAccent;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(uAccent, vAlpha);
  }
`

const headVertex = /* glsl */ `
  attribute float aAlpha;
  uniform float uPR;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 26.0 * uPR * (7.0 / -mv.z);
  }
`

const headFragment = /* glsl */ `
  uniform vec3 uAccent;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.12, 0.04, d);
    float glow = exp(-d * d * 30.0) * 0.55;
    vec3 col = mix(uAccent, vec3(0.92, 1.0, 0.96), core);
    gl_FragColor = vec4(col, (core + glow) * vAlpha);
  }
`

type Walker = { x: number; z: number; vx: number; vz: number; age: number; trail: Float32Array }

function spawn(w: Walker, t: number) {
  const [sx, sz] = SPAWNS[Math.floor(Math.random() * SPAWNS.length)]
  w.x = sx + (Math.random() - 0.5) * 0.6
  w.z = sz + (Math.random() - 0.5) * 0.6
  w.vx = 0
  w.vz = 0
  w.age = 0
  const y = loss(w.x, w.z, t) + 0.05
  for (let k = 0; k < TRAIL; k++) {
    w.trail[k * 3] = w.x
    w.trail[k * 3 + 1] = y
    w.trail[k * 3 + 2] = w.z
  }
}

function Landscape({ reduce, dense }: { reduce: boolean; dense: boolean }) {
  const { gl, camera, size } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const clock = useRef(0)

  const { surface, trails, heads, uniforms, walkers, headPositions, headAlpha } = useMemo(() => {
    const pr = Math.min(gl.getPixelRatio(), 2)
    const uniforms = {
      uTime: { value: 0 },
      uPR: { value: pr },
      uSize: { value: 3.2 },
      // Shader output is written as-is to the sRGB canvas, so keep these unconverted
      uBase: { value: new THREE.Color().setStyle("#a1a1aa", THREE.LinearSRGBColorSpace) },
      uAccent: { value: new THREE.Color().setStyle("#36d399", THREE.LinearSRGBColorSpace) },
    }

    const nx = dense ? 150 : 110
    const nz = dense ? 100 : 72
    const grid = new Float32Array(nx * nz * 3)
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < nz; j++) {
        const k = (i * nz + j) * 3
        grid[k] = GRID.x0 + ((GRID.x1 - GRID.x0) * i) / (nx - 1)
        grid[k + 2] = GRID.z0 + ((GRID.z1 - GRID.z0) * j) / (nz - 1)
      }
    }
    const surfaceGeo = new THREE.BufferGeometry()
    surfaceGeo.setAttribute("position", new THREE.BufferAttribute(grid, 3))
    const surface = new THREE.Points(
      surfaceGeo,
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: surfaceVertex,
        fragmentShader: surfaceFragment,
        transparent: true,
        depthWrite: false,
      }),
    )
    // Heights are computed on the GPU, so the CPU-side bounds are flat
    surface.frustumCulled = false

    const trailMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: trailVertex,
      fragmentShader: trailFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const walkers: Walker[] = []
    const trails: THREE.Line[] = []
    for (let w = 0; w < WALKERS; w++) {
      const trail = new Float32Array(TRAIL * 3)
      const alpha = new Float32Array(TRAIL)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.BufferAttribute(trail, 3))
      geo.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1))
      const line = new THREE.Line(geo, trailMaterial)
      line.frustumCulled = false
      trails.push(line)
      const walker: Walker = { x: 0, z: 0, vx: 0, vz: 0, age: 0, trail }
      spawn(walker, 0)
      // Stagger start times so optimisers don't all restart together
      walker.age = (-w * LIFE) / WALKERS
      walkers.push(walker)
    }

    const headPositions = new Float32Array(WALKERS * 3)
    const headAlpha = new Float32Array(WALKERS)
    const headGeo = new THREE.BufferGeometry()
    headGeo.setAttribute("position", new THREE.BufferAttribute(headPositions, 3))
    headGeo.setAttribute("aAlpha", new THREE.BufferAttribute(headAlpha, 1))
    const heads = new THREE.Points(
      headGeo,
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: headVertex,
        fragmentShader: headFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    heads.frustumCulled = false

    return { surface, trails, heads, uniforms, walkers, headPositions, headAlpha }
  }, [gl, dense])

  useEffect(
    () => () => {
      surface.geometry.dispose()
      ;(surface.material as THREE.Material).dispose()
      heads.geometry.dispose()
      ;(heads.material as THREE.Material).dispose()
      trails.forEach((t) => t.geometry.dispose())
      ;(trails[0]?.material as THREE.Material | undefined)?.dispose()
    },
    [surface, heads, trails],
  )

  // Frame the scene for the canvas shape: wide on desktop, closer and taller on phones
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    cam.fov = size.width / size.height < 1 ? 50 : 34
    cam.updateProjectionMatrix()
  }, [camera, size])

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5
      pointer.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduce])

  const target = useMemo(() => new THREE.Vector3(0, -0.2, -6), [])

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30)
    if (!reduce) clock.current += dt
    const t = clock.current
    uniforms.uTime.value = t

    // Gentle camera drift and pointer parallax
    const ease = reduce ? 1 : 1 - Math.exp(-dt * 2)
    const cx = pointer.current.x * 1.2 + Math.sin(t * 0.06) * 0.6
    const cy = 2.4 - pointer.current.y * 0.4
    camera.position.x += (cx - camera.position.x) * ease
    camera.position.y += (cy - camera.position.y) * ease
    camera.position.z = 7.5
    camera.lookAt(target)

    if (reduce) return

    // Momentum gradient descent on the current surface
    const e = 0.01
    walkers.forEach((w, i) => {
      w.age += dt
      if (w.age < 0) return
      if (w.age > LIFE) spawn(w, t)
      const gx = (loss(w.x + e, w.z, t) - loss(w.x - e, w.z, t)) / (2 * e)
      const gz = (loss(w.x, w.z + e, t) - loss(w.x, w.z - e, t)) / (2 * e)
      w.vx += (-gx * 7 - w.vx * 1.6) * dt
      w.vz += (-gz * 7 - w.vz * 1.6) * dt
      w.x += w.vx * dt
      w.z += w.vz * dt
      const y = loss(w.x, w.z, t) + 0.05

      w.trail.copyWithin(0, 3)
      w.trail[(TRAIL - 1) * 3] = w.x
      w.trail[(TRAIL - 1) * 3 + 1] = y
      w.trail[(TRAIL - 1) * 3 + 2] = w.z

      const life = THREE.MathUtils.smoothstep(w.age, 0, 0.8) * (1 - THREE.MathUtils.smoothstep(w.age, LIFE - 1.4, LIFE))
      const alpha = trails[i].geometry.attributes.aAlpha.array as Float32Array
      for (let k = 0; k < TRAIL; k++) alpha[k] = (k / TRAIL) ** 1.6 * 0.85 * life
      trails[i].geometry.attributes.position.needsUpdate = true
      trails[i].geometry.attributes.aAlpha.needsUpdate = true

      headPositions[i * 3] = w.x
      headPositions[i * 3 + 1] = y
      headPositions[i * 3 + 2] = w.z
      headAlpha[i] = life
    })
    heads.geometry.attributes.position.needsUpdate = true
    heads.geometry.attributes.aAlpha.needsUpdate = true
  })

  return (
    <>
      <primitive object={surface} />
      {trails.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
      <primitive object={heads} />
    </>
  )
}

export default function LandscapeScene({
  reduce,
  running,
  dense,
}: {
  reduce: boolean
  running: boolean
  dense: boolean
}) {
  return (
    <Canvas
      dpr={dense ? [1, 2] : [1, 1.5]}
      camera={{ position: [0, 2.4, 7.5], fov: 34, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduce ? "demand" : running ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
    >
      <Landscape reduce={reduce} dense={dense} />
    </Canvas>
  )
}
