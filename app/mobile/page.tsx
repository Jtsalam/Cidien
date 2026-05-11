import { Suspense } from "react";
import MobileRecorder from "./MobileRecorder";

// Role: Wrap in Suspense so useSearchParams() inside MobileRecorder
// receives the real URL params after hydration instead of null.
// Mobile walkthrough: first-run tutorial UI lives in ./MobileTutorial.tsx and is opened from
// MobileRecorder after the recording screen is shown; use the header menu to restart it.
export default function MobilePage() {
  return (
    <Suspense fallback={null}>
      <MobileRecorder />
    </Suspense>
  );
}
