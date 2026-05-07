import { cookies } from "next/headers";
import { orgMap } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

type CurrentDemoContext = {
  centerId?: number;
  sessionId?: string;
};

export async function getCurrentDemoContext(
  cookieStore?: CookieStore,
): Promise<CurrentDemoContext> {
  const store = cookieStore ?? (await cookies());
  const sessionId = store.get("demo_session_id")?.value;
  const centerIdValue = store.get("demo_center_id")?.value;
  const centerId = centerIdValue ? Number.parseInt(centerIdValue, 10) : Number.NaN;

  if (!sessionId || Number.isNaN(centerId)) return {};

  const sessions = await prisma.$queryRawUnsafe<Array<{ center_id: number }>>(
    `SELECT center_id
     FROM demo_session
     WHERE session_id = $1
       AND center_id = $2
       AND expires_at > NOW()
     LIMIT 1`,
    sessionId,
    centerId,
  );

  if (sessions.length === 0) return {};

  return {
    centerId: sessions[0].center_id,
    sessionId,
  };
}

export async function getCurrentCenterId(cookieStore?: CookieStore) {
  const store = cookieStore ?? (await cookies());
  const demoContext = await getCurrentDemoContext(store);

  if (demoContext.centerId) return demoContext.centerId;

  const org = store.get("organization")?.value;
  const centerName = org ? orgMap[org] : undefined;

  if (!centerName) return undefined;

  const organization = await prisma.medicalcenter_info.findFirst({
    where: { center_name: centerName },
    select: { center_id: true },
  });

  return organization?.center_id;
}
