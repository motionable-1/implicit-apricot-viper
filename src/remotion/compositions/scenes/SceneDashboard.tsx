import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Img, spring } from "remotion";
import { FadeInWords } from "../../library/components/text/TextAnimation";
import { BrowserMockup } from "../../library/components/mockups/BrowserMockup";
import { Counter } from "../../library/components/text/Counter";
import { COLORS } from "./Background";

const SCREENSHOT_URL = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superlinks/1772127112690_nskvdj5zfxj_superlinks_screenshot.png";
const SPARKLE_ICON = "https://api.iconify.design/mdi/sparkles.svg?color=%23FAFAFA&width=16";

// Dashboard card content
const DashboardContent: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: COLORS.bg, padding: 24, position: "relative" }}>
      {/* Screenshot as the background dashboard */}
      <Img
        src={SCREENSHOT_URL}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 8,
          opacity: 0.95,
        }}
      />
    </div>
  );
};

export const SceneDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Browser mockup entrance
  const mockupScale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 14, stiffness: 80, mass: 1 }, durationInFrames: 45 });
  const mockupOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const mockupRotX = interpolate(frame, [5, 50], [8, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Floating notification card
  const notifDelay = 40;
  const notifScale = spring({ frame: Math.max(0, frame - notifDelay), fps, config: { damping: 10, stiffness: 150 }, durationInFrames: 30 });
  const notifOpacity = interpolate(frame, [notifDelay, notifDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const notifFloat = Math.sin((frame - notifDelay) / fps * 1.5) * 4;

  // Revenue card
  const revDelay = 55;
  const revScale = spring({ frame: Math.max(0, frame - revDelay), fps, config: { damping: 12, stiffness: 130 }, durationInFrames: 30 });
  const revOpacity = interpolate(frame, [revDelay, revDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const revFloat = Math.sin((frame - revDelay) / fps * 1.2 + 1) * 5;

  // AI Assistant card
  const aiDelay = 65;
  const aiScale = spring({ frame: Math.max(0, frame - aiDelay), fps, config: { damping: 11, stiffness: 120 }, durationInFrames: 30 });
  const aiOpacity = interpolate(frame, [aiDelay, aiDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const aiFloat = Math.sin((frame - aiDelay) / fps * 1.8 + 2) * 3;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Title */}
      <div style={{ position: "absolute", top: 50, left: 0, right: 0, textAlign: "center" }}>
        <FadeInWords
          stagger={0.08}
          duration={0.5}
          startFrom={0}
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: "-0.02em",
          }}
        >
          <span>Your All-in-One </span>
          <span style={{ color: COLORS.primary }}>Dashboard</span>
        </FadeInWords>
      </div>

      {/* Browser mockup with perspective tilt */}
      <div
        style={{
          transform: `perspective(1200px) rotateX(${mockupRotX}deg) scale(${mockupScale})`,
          opacity: mockupOpacity,
          marginTop: 40,
        }}
      >
        <BrowserMockup
          browser="chrome"
          theme="dark"
          url="superlinks.ai/dashboard"
          tabTitle="Superlinks - Dashboard"
          width={900}
          height={500}
          shadow
          borderRadius={12}
        >
          <DashboardContent />
        </BrowserMockup>
      </div>

      {/* Floating "New Sale!" notification */}
      <div
        style={{
          position: "absolute",
          top: 200,
          right: 110,
          transform: `scale(${notifScale}) translateY(${notifFloat}px)`,
          opacity: notifOpacity,
          backgroundColor: COLORS.cardBg,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${COLORS.border}`,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: `${COLORS.green}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: COLORS.green,
          }}
        >
          $
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>New Sale!</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted }}>$49.00 — Product Launch</div>
        </div>
      </div>

      {/* Revenue floating card */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 80,
          transform: `scale(${revScale}) translateY(${revFloat}px)`,
          opacity: revOpacity,
          backgroundColor: COLORS.cardBg,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: "16px 22px",
          boxShadow: `0 12px 40px rgba(0,0,0,0.4)`,
        }}
      >
        <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>Total Revenue</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <Counter
            from={0}
            to={12450}
            duration={1.5}
            delay={revDelay / fps}
            prefix="$"
            separator=","
            style={{ fontSize: 28, fontWeight: 800, color: COLORS.primary }}
          />
          <span style={{ fontSize: 13, color: COLORS.green, fontWeight: 600 }}>+15.3%</span>
        </div>
      </div>

      {/* AI Assistant floating card */}
      <div
        style={{
          position: "absolute",
          bottom: 185,
          right: 80,
          transform: `scale(${aiScale}) translateY(${aiFloat}px)`,
          opacity: aiOpacity,
          backgroundColor: COLORS.cardBg,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 20px ${COLORS.primary}15`,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img src={SPARKLE_ICON} style={{ width: 18, height: 18 }} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>AI Assistant</div>
          <div style={{ fontSize: 11, color: COLORS.textMuted }}>Creating your landing page...</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
