import { ImageResponse } from "next/og";

export const alt = "Garanemsa Café & Resto — Sousse, Tunisie";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px",
          background:
            "radial-gradient(120% 100% at 82% 0%, #1B5A4C 0%, #0C2B26 52%, #07211D 100%)",
          color: "#FAF5E9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "28px",
            right: "28px",
            bottom: "28px",
            left: "28px",
            border: "1px solid rgba(216,178,92,0.42)",
            borderRadius: "28px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-130px",
            right: "-90px",
            width: "430px",
            height: "430px",
            border: "1px solid rgba(216,178,92,0.18)",
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "0px",
            width: "260px",
            height: "260px",
            border: "1px solid rgba(216,178,92,0.12)",
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#D8B25C",
            fontSize: "18px",
            letterSpacing: "5px",
          }}
        >
          SCANIHA · PROFIL NUMÉRIQUE
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "112px",
              fontWeight: 600,
              letterSpacing: "-4px",
              lineHeight: 1,
            }}
          >
            Garanemsa
          </div>
          <div
            style={{
              marginTop: "14px",
              color: "#D8B25C",
              fontSize: "34px",
              letterSpacing: "1px",
            }}
          >
            Café &amp; Resto
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(250,245,233,0.7)",
            fontSize: "20px",
          }}
        >
          <span>Sousse, Tunisie</span>
          <span>Carte &amp; photos à venir</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
