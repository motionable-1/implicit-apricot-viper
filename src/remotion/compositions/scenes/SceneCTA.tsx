import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Img, spring } from "remotion";
import { FadeInWords, WaveText } from "../../library/components/text/TextAnimation";
import { Glow } from "../../library/components/effects/Glow";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";
import { COLORS } from "./Background";

const LOGO_URL = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superlinks/1772127084351_fud4osptgkk_superlinks_logo.png";
const ARROW_ICON = "https://api.iconify.design/ph/arrow-right-bold.svg?color=%23FAFAFA&width=24";

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Button pulse
  const buttonScale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 10, stiffness: 120 }, durationInFrames: 35 });
  const buttonGlow = 15 + Math.sin(frame / fps * 2.5) * 8;

  // Logo entrance
  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, durationInFrames: 30 });

  // URL text
  const urlOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urlY = interpolate(frame, [50, 65], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Floating shapes
  const float1 = Math.sin(frame / fps * 1.2) * 8;
  const float2 = Math.sin(frame / fps * 0.9 + 2) * 6;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Decorative shapes */}
      <div style={{ position: "absolute", top: 140, left: 180 }}>
        <ShapeAnimation shape="circle" animation="pulse" size={16} color={COLORS.primary} speed={0.5} opacity={0.3} />
      </div>
      <div style={{ position: "absolute", bottom: 180, right: 200 }}>
        <ShapeAnimation shape="ring" animation="rotate" size={60} color={`${COLORS.primary}25`} strokeColor={`${COLORS.primary}35`} strokeWidth={2} speed={0.15} />
      </div>
      <div style={{ position: "absolute", top: 250, right: 280, transform: `translateY(${float1}px)` }}>
        <ShapeAnimation shape="diamond" animation="breathe" size={24} color={`${COLORS.primary}20`} speed={0.3} />
      </div>
      <div style={{ position: "absolute", bottom: 240, left: 300, transform: `translateY(${float2}px)` }}>
        <ShapeAnimation shape="hexagon" animation="rotate" size={30} color={`${COLORS.primary}15`} strokeColor={`${COLORS.primary}25`} strokeWidth={1.5} speed={0.2} />
      </div>

      {/* Main CTA content */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        {/* Logo */}
        <Glow color={COLORS.primary} intensity={25} pulsate pulseDuration={2.5} pulseMin={0.5} layers={2}>
          <div style={{ transform: `scale(${logoScale})` }}>
            <Img src={LOGO_URL} style={{ width: 80, height: 80, objectFit: "contain" }} />
          </div>
        </Glow>

        {/* Headline */}
        <WaveText
          stagger={0.025}
          duration={0.6}
          startFrom={10}
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: COLORS.text,
            textAlign: "center",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            textWrap: "balance",
          }}
        >
          <span>Ready to </span>
          <span style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Supercharge
          </span>
          <br />
          <span>Your Income?</span>
        </WaveText>

        {/* Subtitle */}
        <FadeInWords
          stagger={0.06}
          duration={0.4}
          startFrom={25}
          style={{
            fontSize: 20,
            color: COLORS.textMuted,
            textAlign: "center",
            maxWidth: 550,
            lineHeight: 1.5,
          }}
        >
          Join thousands of creators already earning with Superlinks
        </FadeInWords>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${buttonScale})`,
            opacity: interpolate(frame, [30, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 40px",
              borderRadius: 999,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
              boxShadow: `0 4px ${buttonGlow}px ${COLORS.primary}60, 0 12px 40px ${COLORS.primary}30`,
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.text,
              letterSpacing: "0.01em",
            }}
          >
            Start Free Today
            <Img src={ARROW_ICON} style={{ width: 22, height: 22 }} />
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
            fontSize: 16,
            color: COLORS.textMuted,
            letterSpacing: "0.05em",
          }}
        >
          superlinks.ai
        </div>
      </div>
    </AbsoluteFill>
  );
};
