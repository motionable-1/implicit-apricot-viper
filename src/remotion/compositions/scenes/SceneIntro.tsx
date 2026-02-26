import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, interpolate, Easing, spring } from "remotion";
import { FadeInWords, BlurReveal } from "../../library/components/text/TextAnimation";
import { LogoReveal } from "../../library/components/effects/LogoReveal";
import { Badge } from "../../library/components/effects/Badge";
import { Glow } from "../../library/components/effects/Glow";
import { COLORS } from "./Background";

const LOGO_URL = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superlinks/1772127084351_fud4osptgkk_superlinks_logo.png";
const SPARKLE_ICON = "https://api.iconify.design/mdi/sparkles.svg?color=%23F56B3D&width=24";

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating shapes
  const float1Y = Math.sin(frame / fps * 1.2) * 8;
  const float2Y = Math.sin(frame / fps * 0.9 + 1) * 6;
  const float3Rot = frame / fps * 15;

  // Logo scale spring
  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80, mass: 0.8 }, durationInFrames: 40 });

  // Tagline fade
  const taglineOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [35, 55], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Floating decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 200,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: `1px solid ${COLORS.primary}25`,
          transform: `translateY(${float1Y}px) rotate(${float3Rot}deg)`,
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 220,
          right: 250,
          width: 40,
          height: 40,
          borderRadius: 8,
          border: `1px solid ${COLORS.primary}30`,
          transform: `translateY(${float2Y}px) rotate(${-float3Rot * 0.7}deg)`,
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 280,
          right: 350,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: COLORS.primary,
          transform: `translateY(${float1Y * 1.5}px)`,
          opacity: 0.4,
          boxShadow: `0 0 20px ${COLORS.primary}`,
        }}
      />

      {/* Main content container */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        {/* AI Badge */}
        <Badge
          badgeStyle="glass"
          color={COLORS.primary}
          textColor={COLORS.text}
          animation="scaleIn"
          delay={0.1}
          fontSize={14}
          fontWeight={600}
          paddingX={18}
          paddingY={8}
          borderRadius={999}
          icon={<Img src={SPARKLE_ICON} style={{ width: 18, height: 18 }} />}
        >
          AI Auto-Launch V2.0
        </Badge>

        {/* Logo */}
        <Glow color={COLORS.primary} intensity={30} pulsate pulseDuration={3} pulseMin={0.4} layers={2}>
          <div style={{ transform: `scale(${logoScale})` }}>
            <Img
              src={LOGO_URL}
              style={{
                width: 140,
                height: 140,
                objectFit: "contain",
              }}
            />
          </div>
        </Glow>

        {/* Brand name */}
        <BlurReveal
          stagger={0.04}
          duration={0.6}
          startFrom={12}
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.text,
            letterSpacing: "-0.03em",
          }}
        >
          <span>super</span>
          <span style={{ color: COLORS.primary }}>links</span>
          <span style={{ color: COLORS.primary, fontSize: 48, verticalAlign: "super", marginLeft: 2 }}>.ai</span>
        </BlurReveal>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            fontSize: 24,
            color: COLORS.textMuted,
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          Turn Your Knowledge Into Income
        </div>
      </div>
    </AbsoluteFill>
  );
};
