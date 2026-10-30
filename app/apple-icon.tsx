import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          color: "#fafafa",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          position: "relative",
        }}
      >
        DS
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 30,
            width: 18,
            height: 18,
            borderRadius: 999,
            backgroundColor: "#36d399",
          }}
        />
      </div>
    ),
    size,
  )
}
