import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Siham Akhyame — Cybersecurity and DevSecOps Portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const portraitData = await readFile(
    join(
      process.cwd(),
      "public",
      "images",
      "siham-portfolio-portrait-final.png",
    ),
    "base64",
  );

  const portraitSource = `data:image/png;base64,${portraitData}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background:
            "linear-gradient(120deg, #06111f 0%, #071525 55%, #111833 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-100px",
            bottom: "-180px",
            display: "flex",
            width: "500px",
            height: "500px",
            borderRadius: "999px",
            background: "rgba(34, 211, 238, 0.10)",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "-140px",
            display: "flex",
            width: "480px",
            height: "480px",
            borderRadius: "999px",
            background: "rgba(139, 92, 246, 0.12)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "67%",
            padding: "72px",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginBottom: "30px",
              padding: "9px 18px",
              border: "1px solid rgba(34, 211, 238, 0.65)",
              borderRadius: "999px",
              color: "#8be9f7",
              fontSize: "19px",
              fontWeight: 700,
              letterSpacing: "2px",
            }}
          >
            CYBERSECURITY PORTFOLIO
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-3px",
            }}
          >
            Siham Akhyame
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "28px",
              color: "#a8bdd5",
              fontSize: "31px",
              lineHeight: 1.35,
            }}
          >
            Cybersecurity &amp; DevSecOps Engineering Student
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "22px",
              color: "#7dddeb",
              fontSize: "22px",
              letterSpacing: "1px",
            }}
          >
            PROJECTS · LABS · CLOUD SECURITY · DEVSECOPS
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "48px",
              color: "#cbd5e1",
              fontSize: "21px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "11px",
                height: "11px",
                marginRight: "13px",
                borderRadius: "999px",
                background: "#22d3ee",
              }}
            />
            Practical security engineering documented with evidence
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            width: "38%",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <img
            src={portraitSource}
            alt=""
            width="470"
            height="630"
            style={{
              width: "470px",
              height: "630px",
              objectFit: "contain",
              objectPosition: "center bottom",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              background:
                "linear-gradient(90deg, #071525 0%, transparent 32%, transparent 100%)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}