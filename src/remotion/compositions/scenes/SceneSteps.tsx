import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Img, spring } from "remotion";
import { FadeInChars, FadeInWords } from "../../library/components/text/TextAnimation";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";
import { COLORS } from "./Background";

const ICONS = {
  signup: "https://api.iconify.design/ph/user-circle-plus-fill.svg?color=%23F56B3D&width=44",
  content: "https://api.iconify.design/ph/pencil-simple-line-fill.svg?color=%23F56B3D&width=44",
  share: "https://api.iconify.design/ph/share-network-fill.svg?color=%23F56B3D&width=44",
};

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: string;
  delay: number;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, description, icon, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const cardScale = spring({ frame: Math.max(0, frame - delayFrames), fps, config: { damping: 13, stiffness: 100 }, durationInFrames: 35 });
  const cardOpacity = interpolate(frame, [delayFrames, delayFrames + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const iconFloat = Math.sin((frame - delayFrames) / fps * 1.5 + step) * 3;

  // Number counter entrance
  const numScale = spring({ frame: Math.max(0, frame - delayFrames - 5), fps, config: { damping: 10, stiffness: 180 }, durationInFrames: 25 });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        width: 280,
        transform: `scale(${cardScale})`,
        opacity: cardOpacity,
      }}
    >
      {/* Step number */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 800,
          color: COLORS.text,
          transform: `scale(${numScale})`,
          boxShadow: `0 4px 20px ${COLORS.primary}50`,
        }}
      >
        {step}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          backgroundColor: `${COLORS.primary}10`,
          border: `1px solid ${COLORS.primary}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${iconFloat}px)`,
        }}
      >
        <Img src={icon} style={{ width: 44, height: 44 }} />
      </div>

      {/* Title */}
      <FadeInWords
        stagger={0.06}
        duration={0.4}
        startFrom={delayFrames + 10}
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
        }}
      >
        {title}
      </FadeInWords>

      {/* Description */}
      <div
        style={{
          fontSize: 15,
          color: COLORS.textMuted,
          textAlign: "center",
          lineHeight: 1.5,
          opacity: interpolate(frame, [delayFrames + 15, delayFrames + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [delayFrames + 15, delayFrames + 30], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
        }}
      >
        {description}
      </div>
    </div>
  );
};

export const SceneSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Connector lines between steps
  const line1Width = interpolate(frame, [30, 55], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const line2Width = interpolate(frame, [50, 75], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Title */}
      <div style={{ position: "absolute", top: 70, left: 0, right: 0, textAlign: "center" }}>
        <FadeInWords
          stagger={0.08}
          duration={0.5}
          startFrom={0}
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: COLORS.text,
            letterSpacing: "-0.02em",
          }}
        >
          <span>3 Steps to </span>
          <span style={{ color: COLORS.primary }}>Launch</span>
        </FadeInWords>
      </div>

      {/* Steps row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 60, marginTop: 40, position: "relative" }}>
        {/* Connector lines */}
        <div style={{ position: "absolute", top: 22, left: 140, width: `${line1Width}%`, maxWidth: 180, height: 2, background: `linear-gradient(90deg, ${COLORS.primary}60, ${COLORS.primary}20)`, borderRadius: 1 }} />
        <div style={{ position: "absolute", top: 22, right: 140, width: `${line2Width}%`, maxWidth: 180, height: 2, background: `linear-gradient(90deg, ${COLORS.primary}20, ${COLORS.primary}60)`, borderRadius: 1 }} />

        <StepCard step={1} title="Sign Up Free" description="No credit card needed. Get started in 30 seconds." icon={ICONS.signup} delay={0.3} />
        <StepCard step={2} title="Add Content" description="AI creates your products, pages & email flows." icon={ICONS.content} delay={0.8} />
        <StepCard step={3} title="Share & Earn" description="Share your link. Start generating income instantly." icon={ICONS.share} delay={1.3} />
      </div>

      {/* Floating decorative shape */}
      <div style={{ position: "absolute", bottom: 80, left: 120 }}>
        <ShapeAnimation shape="ring" animation="rotate" size={50} color={`${COLORS.primary}20`} strokeColor={`${COLORS.primary}30`} strokeWidth={2} speed={0.2} />
      </div>
      <div style={{ position: "absolute", top: 130, right: 100 }}>
        <ShapeAnimation shape="diamond" animation="breathe" size={30} color={`${COLORS.primary}15`} speed={0.4} />
      </div>
    </AbsoluteFill>
  );
};
