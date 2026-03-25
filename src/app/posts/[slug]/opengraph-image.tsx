import { ImageResponse } from "next/og";
import { getPost } from "../../../../lib/hashnode";

export const runtime = "edge";
export const alt = "Blog post preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  const title = post?.title ?? "pyndu logs()";
  const description = post?.description ?? "building in public so future me can laugh at this code";
  const date = post?.date ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f0f11",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Dotted grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(167,139,250,0.12) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Purple ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,180,244,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Gradient border top line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #A69EFF, #C084FC, #E8B4F4)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "60px 72px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Top: Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(167, 139, 250, 0.15)",
                border: "1px solid rgba(167, 139, 250, 0.3)",
              }}
            >
              <div style={{ fontSize: "18px" }}>{">"}</div>
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              pyndulogs
              <span style={{ color: "#9ca3af" }}>()</span>
            </span>
          </div>

          {/* Middle: Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px" }}>
            <div
              style={{
                fontSize: "58px",
                fontWeight: "800",
                lineHeight: "1.1",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #D8D7FE 0%, #ffffff 60%)",
                backgroundClip: "text",
                color: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title.length > 55 ? title.slice(0, 55) + "…" : title}
            </div>
            <div
              style={{
                fontSize: "22px",
                color: "#9ca3af",
                lineHeight: "1.5",
                fontWeight: "400",
                maxWidth: "800px",
              }}
            >
              {description.length > 100 ? description.slice(0, 100) + "…" : description}
            </div>
          </div>

          {/* Bottom: Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {date && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "15px",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                {date}
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(167,139,250,0.1)",
                border: "1px solid rgba(167,139,250,0.2)",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "15px",
                color: "#a78bfa",
                fontWeight: "600",
                letterSpacing: "0.04em",
              }}
            >
              my-blog-tan-tau.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
