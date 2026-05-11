import { prisma } from "@/lib/prisma";

export const DEMO_TRANSCRIPTION_LIMIT = 10;
export const DEMO_TRANSCRIPTION_WINDOW_MS = 24 * 60 * 60 * 1000;
export const REPO_URL = "https://github.com/Jtsalam/Cidien";

export type TranscriptionUsageRow = { total: number; first_used: Date };

export type DemoLimitDecision =
  | {
      limited: false;
      ip: string | null;
      now: Date;
      /** Row within the current 24h window, or null if new / expired window */
      usageInWindow: TranscriptionUsageRow | null;
    }
  | {
      limited: true;
      ip: string;
      now: Date;
      usageInWindow: TranscriptionUsageRow;
      retryAt: Date;
      retryAfterSec: number;
    };

export function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip")?.trim();
  return real || null;
}

/**
 * Demo transcription cap per IP per rolling 24h window (see DEMO_TRANSCRIPTION_LIMIT).
 * Call from upload / transcribe / confirm-room-access before touching storage or OpenAI.
 */
export async function evaluateTranscriptionDemoLimit(req: Request): Promise<DemoLimitDecision> {
  const ip = getClientIp(req);
  const now = new Date();

  if (!ip) {
    console.warn("[demo-limit] could not determine client IP; bypassing rate limit");
    return { limited: false, ip: null, now, usageInWindow: null };
  }

  let row = await prisma.transcription_usage.findUnique({
    where: { ip },
    select: { total: true, first_used: true },
  });

  const windowExpired =
    !!row && now.getTime() - row.first_used.getTime() >= DEMO_TRANSCRIPTION_WINDOW_MS;
  if (windowExpired) row = null;

  if (row && row.total >= DEMO_TRANSCRIPTION_LIMIT) {
    const retryAt = new Date(row.first_used.getTime() + DEMO_TRANSCRIPTION_WINDOW_MS);
    const retryAfterSec = Math.max(1, Math.ceil((retryAt.getTime() - now.getTime()) / 1000));
    console.warn(
      `[demo-limit] limit reached for ip=${ip} (total=${row.total}, retryAfterSec=${retryAfterSec})`,
    );
    return {
      limited: true,
      ip,
      now,
      usageInWindow: row,
      retryAt,
      retryAfterSec,
    };
  }

  return { limited: false, ip, now, usageInWindow: row };
}

export function demoLimitJsonBody(decision: Extract<DemoLimitDecision, { limited: true }>) {
  return {
    error: `Demo limit of ${DEMO_TRANSCRIPTION_LIMIT} transcriptions per 24h reached. Clone the repo to self-host with no limits: ${REPO_URL}`,
    limitReached: true,
    repoUrl: REPO_URL,
    limit: DEMO_TRANSCRIPTION_LIMIT,
    retryAfterSec: decision.retryAfterSec,
    retryAt: decision.retryAt.toISOString(),
  };
}

/**
 * Charge one transcription against the rolling window. No-op (and untracked) when
 * the client IP couldn't be determined — see evaluateTranscriptionDemoLimit.
 *
 * Caller is responsible for deciding *whether* this counts (e.g. ROOM only on
 * confirmed access, NOTE on every successful transcript).
 */
export async function incrementTranscriptionUsage(
  decision: Extract<DemoLimitDecision, { limited: false }>,
): Promise<{ total: number; windowStart: Date }> {
  const { ip, now, usageInWindow } = decision;
  if (!ip) {
    return {
      total: usageInWindow?.total ?? 0,
      windowStart: usageInWindow?.first_used ?? now,
    };
  }
  if (usageInWindow) {
    const inc = await prisma.transcription_usage.update({
      where: { ip },
      data: { total: { increment: 1 } },
      select: { total: true, first_used: true },
    });
    return { total: inc.total, windowStart: inc.first_used };
  }
  const created = await prisma.transcription_usage.upsert({
    where: { ip },
    update: { total: 1, first_used: now },
    create: { ip, total: 1, first_used: now },
    select: { total: true, first_used: true },
  });
  return { total: created.total, windowStart: created.first_used };
}

export function transcriptionUsageJson(total: number, windowStart: Date) {
  return {
    total,
    limit: DEMO_TRANSCRIPTION_LIMIT,
    remaining: Math.max(0, DEMO_TRANSCRIPTION_LIMIT - total),
    windowStart: windowStart.toISOString(),
    windowResetAt: new Date(windowStart.getTime() + DEMO_TRANSCRIPTION_WINDOW_MS).toISOString(),
  };
}
