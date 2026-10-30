import { ImageResponse } from "next/og"

export const alt = "Dhruv Sandhu — Machine Learning Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const AVATAR = "https://res.cloudinary.com/di1pcuklp/image/upload/v1756662024/dhruv_snap-removebg_dfmwzv.png"

async function loadGoogleFont(family: string, text: string) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
  ).text()
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
  if (!url) throw new Error(`No font file for ${family}`)
  return (await fetch(url)).arrayBuffer()
}

async function tryLoad<T>(load: () => Promise<T>) {
  try {
    return await load()
  } catch {
    return null
  }
}

export default async function OpengraphImage() {
  const sans = "Dhruv SandhuBuilding GenAI systems from to Machine Learning Engineer · IIT Bhubaneswar NLP Graph Learning Model Compression MLOps dhruvsandhu"
  const [inter, interMedium, serif, avatar] = await Promise.all([
    tryLoad(() => loadGoogleFont("Inter:wght@600", sans)),
    tryLoad(() => loadGoogleFont("Inter:wght@400", sans)),
    tryLoad(() => loadGoogleFont("Instrument+Serif:ital@1", "researchproduction.")),
    tryLoad(async () => {
      const res = await fetch(AVATAR)
      if (!res.ok) throw new Error("avatar")
      return `data:image/png;base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`
    }),
  ])

  const fonts = [
    inter && { name: "Inter", data: inter, weight: 600 as const, style: "normal" as const },
    interMedium && { name: "Inter", data: interMedium, weight: 400 as const, style: "normal" as const },
    serif && { name: "Instrument Serif", data: serif, weight: 400 as const, style: "italic" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" | "italic" }[]

  const accent = "#36d399"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(54,211,153,0.16), transparent 45%), radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 28px 28px",
          fontFamily: "Inter",
          color: "#f4f4f5",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              color: "#a1a1aa",
              fontWeight: 400,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: accent }} />
            Machine Learning Engineer · IIT Bhubaneswar
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 92, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1 }}>Dhruv Sandhu</div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: 28,
                fontSize: 42,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "#d4d4d8",
                maxWidth: 640,
              }}
            >
              <span>Building GenAI systems from&nbsp;</span>
              <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, color: accent }}>
                research
              </span>
              <span>&nbsp;to&nbsp;</span>
              <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400 }}>production.</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 28, fontSize: 20, color: "#71717a", fontWeight: 400 }}>
            <span>NLP</span>
            <span>Graph Learning</span>
            <span>Model Compression</span>
            <span>MLOps</span>
          </div>
        </div>

        {avatar && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              width: 360,
              height: 502,
              borderRadius: 36,
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(54,211,153,0.28), transparent 65%), linear-gradient(to bottom, #27272a, #09090b)",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} width={262} height={465} alt="" />
          </div>
        )}
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  )
}
