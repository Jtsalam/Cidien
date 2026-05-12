"use client";

import { useEffect, useState } from "react";
import { Menu, Trash2 } from "lucide-react";
import styles from "./mobile.module.css";

export type MobileTutorialProps = {
  open: boolean;
  onFinish: () => void;
};

const STEP_COUNT = 6;

export default function MobileTutorial({ open, onFinish }: MobileTutorialProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  if (!open) return null;

  const goNext = () => {
    if (step < STEP_COUNT - 1) setStep((s) => s + 1);
    else onFinish();
  };

  const goPrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const skip = () => onFinish();

  return (
    <div
      className={styles.tutorialBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-tutorial-title"
    >
      <div className={styles.tutorialCard}>
        <button
          type="button"
          className={styles.tutorialSkipLink}
          onClick={skip}
        >
          Skip tutorial
        </button>

        {step === 0 ? (
          <>
            <h2
              id="mobile-tutorial-title"
              className={styles.tutorialHeading}
            >
              Welcome to Cidien Mobile
            </h2>
            <p className={styles.tutorialBody}>
              This short tour explains how to capture room access and charting
              notes with the three main controls. On mobile web,{" "}
              <strong>tap to start and tap again to stop</strong>.You can skip anytime using the link above.
            </p>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <h2
              id="mobile-tutorial-title"
              className={styles.tutorialHeading}
            >
              Green button - room information
            </h2>
            <div className={styles.tutorialDemoCol}>
              <div className={styles.tutorialWaveformDemoGreen}>
                <span className={styles.waveform} aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={styles.waveformBar}
                      style={{ animationDelay: `${i * 0.08}s` }}
                    />
                  ))}
                </span>
              </div>
              <p className={styles.tutorialListeningDemoGreen}>Listening…</p>
            </div>
            <p className={styles.tutorialBody}>
              <strong>Tap</strong> the green button once, say the room and bed (for example{" "}
              <q className={styles.tutorialQuote}>Room 311 Bed B</q> or{" "}
              <q className={styles.tutorialQuote}>311 B</q>), then <strong>tap green again</strong>{" "}
              to stop.
            </p>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <h2
              id="mobile-tutorial-title"
              className={styles.tutorialHeading}
            >
              Red button - medical / charting notes
            </h2>
            <div className={styles.tutorialDemoCol}>
              <div className={styles.tutorialWaveformDemoRed}>
                <span className={styles.waveform} aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={styles.waveformBar}
                      style={{ animationDelay: `${i * 0.08}s` }}
                    />
                  ))}
                </span>
              </div>
              <p className={styles.tutorialListeningDemoRed}>Listening…</p>
            </div>
            <p className={styles.tutorialBody}>
              After the room is confirmed, <strong>tap red</strong> once to start your note, speak,
              then <strong>tap red again</strong> to stop. Notes show up on the dashboard in real time.
            </p>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <h2
              id="mobile-tutorial-title"
              className={styles.tutorialHeading}
            >
              Grey button — clear status
            </h2>
            <div className={styles.tutorialDemoRow}>
              <div
                className={`${styles.tutorialPulseWrap} ${styles.tutorialPulseGray}`}
              >
                <Trash2 size={26} aria-hidden />
              </div>
            </div>
            <p className={styles.tutorialBody}>
              Tap the grey button when you want to clear the status message at
              the bottom of the screen. It does not delete data on the server;
              it only resets the on-screen status text.
            </p>
          </>
        ) : null}

       {step === 4 ? (
  <>
    <p className={styles.tutorialCalloutKicker}>Good to know</p>
    <h2
      id="mobile-tutorial-title"
      className={styles.tutorialHeadingAlert}
    >
      Your rooms are in the menu
    </h2>
    <div className={styles.tutorialDemoRow}>
      <div className={`${styles.tutorialMenuDemo} ${styles.tutorialMenuDemoPulse}`}>
        <div className="icon-menu">
          <Menu size={26} strokeWidth={2.25} aria-hidden />
        </div>
      </div>
    </div>
    <div className={styles.tutorialCallout} role="note">
      <p className={styles.tutorialCalloutLead}>
        <strong>Tap ≡</strong> to see your assigned rooms, beds, and patients.
      </p>
      <p className={styles.tutorialCalloutEmphasis}>
        Glance there first - it tells you exactly what to say when you tap the green button.
      </p>
    </div>
  </>
) : null}

        {step === 5 ? (
          <>
            <h2
              id="mobile-tutorial-title"
              className={styles.tutorialHeading}
            >
              You are ready
            </h2>
            <p className={styles.tutorialBody}>
              Remember: <strong>green first</strong> (room and bed, tap to start / tap to stop), then{" "}
              <strong>red</strong> for notes the same way. If something fails, read the status line for the
              next step. Open the menu anytime to review your assignments or run this tutorial again.
            </p>
            <p className={styles.tutorialBodyMuted}>
              Prefer to learn by doing? Use <strong>Skip tutorial</strong> above, or tap below to enter
              the app.
            </p>
          </>
        ) : null}

        <div className={styles.tutorialFooter}>
          <span className={styles.tutorialStepHint}>
            Step {step + 1} of {STEP_COUNT}
          </span>

          {step > 0 && (
            <button
              type="button"
              className={styles.tutorialPrimary}
              onClick={goPrev}
            >
              Prev
            </button>
          )}

          <button
            type="button"
            className={styles.tutorialPrimary}
            onClick={goNext}
          >
            {step === STEP_COUNT - 1 ? "Get started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}