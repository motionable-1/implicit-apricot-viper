import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Img, spring } from "remotion";
import { WaveText } from "../../library/components/text/TextAnimation";
import { COLORS } from "./Background";

const ROCKET_ICON = "https://api.iconify.design/ph/rocket-launch-fill.svg?color=%23F56B3D&width=48";

export const SceneHeadline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Accent line animation
  const lineWidth = interpolate(frame, [5, 30], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtitle stagger
  const subtitleOpacity = interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [40, 60], [25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Rocket float
  const rocketY = Math.sin(frame / fps * 1.5) * 6;
  const rocketScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 10, stiffness: 100 }, durationInFrames: 35 });

  // Feature pills
  const pillData = [
    "AI-Powered Content",
    "Landing Pages",
    "Email Campaigns",
    "Payment Integration",
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, maxWidth: 1100 }}>
        {/* Accent line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
            boxShadow: `0 0 20px ${COLORS.primary}50`,
          }}
        />

        {/* Main headline */}
        <WaveText
          stagger={0.03}
          duration={0.6}
          startFrom={8}
          style={{
            fontSize: 62,
            fontWeight: 800,
            color: COLORS.text,
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            textWrap: "balance",
          }}
        >
          <span>Create, Launch &amp; Sell</span>
          <br />
          <span style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Digital Products
          </span>
        </WaveText>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            fontSize: 22,
            color: COLORS.textMuted,
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
            textWrap: "balance",
          }}
        >
          AI superpowers meets zero tech stress.
          <br />
          No coding required. Start free today.
        </div>

        {/* Feature pills row */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
          {pillData.map((pill, i) => {
            const pillDelay = 45 + i * 6;
            const pillScale = spring({ frame: Math.max(0, frame - pillDelay), fps, config: { damping: 14, stiffness: 120 }, durationInFrames: 30 });
            const pillOpacity = interpolate(frame, [pillDelay, pillDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={i}
                style={{
                  padding: "10px 20px",
                  borderRadius: 999,
                  backgroundColor: `${COLORS.primary}15`,
                  border: `1px solid ${COLORS.primary}30`,
                  color: COLORS.primaryLight,
                  fontSize: 15,
                  fontWeight: 500,
                  transform: `scale(${pillScale})`,
                  opacity: pillOpacity,
                }}
              >
                {pill}
              </div>
            );
          })}
        </div>

        {/* Rocket icon */}
        <div
          style={{
            transform: `translateY(${rocketY}px) scale(${rocketScale}) rotate(-15deg)`,
            position: "absolute",
            right: 140,
            top: 200,
            filter: `drop-shadow(0 0 20px ${COLORS.primary}60)`,
          }}
        >
          <Img src={ROCKET_ICON} style={{ width: 56, height: 56 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
