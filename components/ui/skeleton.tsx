import { cn } from "@/lib/utils"

/**
 * A loading placeholder in the shape of the content it stands in for.
 * The shimmer runs left to right; reduced-motion users get a still bar (globals.css).
 */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn(
        "rounded-md bg-[linear-gradient(90deg,rgb(15_23_42/0.06)_0%,rgb(15_23_42/0.11)_50%,rgb(15_23_42/0.06)_100%)] bg-[length:200%_100%] animate-shimmer",
        className
      )}
      {...props}
    />
  )
}
