import { AbsoluteFill, Artifact, useCurrentFrame, Sequence } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Audio } from "@remotion/media";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { Noise } from "../library/components/effects/Noise";

import { Background } from "./scenes/Background";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneHeadline } from "./scenes/SceneHeadline";
import { SceneDashboard } from "./scenes/SceneDashboard";
import { SceneSteps } from "./scenes/SceneSteps";
import { SceneCTA } from "./scenes/SceneCTA";

const { fontFamily } = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const WHOOSH_SFX = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1772127283758_hj6ad3fa3ii_sfx_soft_digital_whoosh_transition.mp3";
const CHIME_SFX = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1772127286170_6sawkpgrxbe_sfx_gentle_magical_sparkle_chime__.mp3";

/*
  Timeline (30fps):
  Scene 1 - Intro:      0-90    (3s)
  Transition:           -20
  Scene 2 - Headline:   90-210  (4s = 120fr)
  Transition:           -20
  Scene 3 - Dashboard:  210-360 (5s = 150fr)
  Transition:           -20
  Scene 4 - Steps:      360-510 (5s = 150fr)
  Transition:           -20
  Scene 5 - CTA:        510-630 (4s = 120fr)

  Total = 90 + 120 + 150 + 150 + 120 - 20*4 = 550 frames
*/

const TRANSITION_DURATION = 20;

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <AbsoluteFill style={{ fontFamily, fontWeight: 500 }}>
        {/* Persistent animated background */}
        <Background />

        {/* Scene transitions */}
        <TransitionSeries>
          {/* Scene 1: Logo Intro */}
          <TransitionSeries.Sequence durationInFrames={90}>
            <SceneIntro />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 2: Headline & Value Prop */}
          <TransitionSeries.Sequence durationInFrames={120}>
            <SceneHeadline />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 3: Dashboard Showcase */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <SceneDashboard />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 4: 3 Steps */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <SceneSteps />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 5: CTA */}
          <TransitionSeries.Sequence durationInFrames={120}>
            <SceneCTA />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* Film grain overlay */}
        <Noise type="subtle" intensity={0.25} speed={0.8} opacity={0.35} blend="overlay" />

        {/* Sound effects synced to transitions */}
        {/* Intro chime */}
        <Sequence from={5} layout="none">
          <Audio src={CHIME_SFX} volume={0.3} />
        </Sequence>

        {/* Transition whooshes */}
        <Sequence from={80} layout="none">
          <Audio src={WHOOSH_SFX} volume={0.2} />
        </Sequence>
        <Sequence from={190} layout="none">
          <Audio src={WHOOSH_SFX} volume={0.2} />
        </Sequence>
        <Sequence from={330} layout="none">
          <Audio src={WHOOSH_SFX} volume={0.2} />
        </Sequence>
        <Sequence from={430} layout="none">
          <Audio src={WHOOSH_SFX} volume={0.15} />
        </Sequence>

        {/* CTA chime */}
        <Sequence from={460} layout="none">
          <Audio src={CHIME_SFX} volume={0.25} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
