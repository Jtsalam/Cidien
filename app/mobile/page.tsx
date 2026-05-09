import { Suspense } from "react";
import MobileRecorder from "./MobileRecorder";

// Role: Wrap in Suspense so useSearchParams() inside MobileRecorder
// receives the real URL params after hydration instead of null.
export default function MobilePage() {
  return (
    <Suspense fallback={null}>
      <MobileRecorder />
    </Suspense>
  );
}
