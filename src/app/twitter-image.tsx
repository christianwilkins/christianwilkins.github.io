import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Christian Wilkins software consultant and engineer";

const brand = {
  background: "rgb(249, 246, 240)",
  foreground: "rgb(23, 23, 23)",
  muted: "rgb(102, 102, 102)",
  border: "rgb(214, 208, 200)",
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: brand.background,
          color: brand.foreground,
          padding: "80px",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "48px",
            borderRadius: "28px",
            border: `1px solid ${brand.border}`,
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "900px",
          }}
        >
          <div style={{ fontSize: 60, fontWeight: 600 }}>
            Christian Wilkins
          </div>
          <div style={{ fontSize: 30, color: brand.muted }}>
            Software consultant and engineer
          </div>
          <div style={{ fontSize: 22 }}>
            Startups | Freelance | Consultancy | Design | Hiring
          </div>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
