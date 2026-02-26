import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// Superlinks brand colors
export const COLORS = {
  bg: "#09090B",
  primary: "#F56B3D",
  primaryLight: "#FF8E5E",
  accent: "#F56B3D",
  green: "#10B981",
  text: "#FAFAFA",
  textMuted: "#9CA3AF",
  cardBg: "#151619",
  border: "#27272A",
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Slow breathing glow positions
  const glowX1 = 25 + Math.sin(time * 0.3) * 8;
  const glowY1 = 35 + Math.cos(time * 0.25) * 6;
  const glowX2 = 72 + Math.sin(time * 0.2 + 1) * 10;
  const glowY2 = 60 + Math.cos(time * 0.35 + 2) * 8;
  const glowOpacity1 = 0.18 + Math.sin(time * 0.4) * 0.06;
  const glowOpacity2 = 0.12 + Math.sin(time * 0.3 + 1) * 0.04;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Warm orange glow - bottom left */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${glowX1}% ${glowY1}%, rgba(245,107,61,${glowOpacity1}), transparent 50%)`,
        }}
      />
      {/* Cool blue/purple glow - top right */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${glowX2}% ${glowY2}%, rgba(99,102,241,${glowOpacity2}), transparent 45%)`,
        }}
      />
      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: 0.5,
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
