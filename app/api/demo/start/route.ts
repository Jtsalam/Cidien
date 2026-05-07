import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RawClient = Pick<typeof prisma, "$executeRawUnsafe" | "$queryRawUnsafe">;
type DbRow = Record<string, unknown>;

const DEMO_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;

function quoteIdentifier(identifier: string) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(identifier)) {
    throw new Error(`Unsafe SQL identifier: ${identifier}`);
  }

  return `"${identifier}"`;
}

function without(row: DbRow, omittedColumns: string[]) {
  const omitted = new Set(omittedColumns);
  return Object.fromEntries(
    Object.entries(row).filter(([key]) => !omitted.has(key)),
  );
}

async function insertRow(
  tx: RawClient,
  tableName: string,
  row: DbRow,
  returningColumn: string,
) {
  const entries = Object.entries(row);
  const columns = entries.map(([key]) => quoteIdentifier(key)).join(", ");
  const placeholders = entries.map((_, index) => `$${index + 1}`).join(", ");
  const values = entries.map(([, value]) => value);
  const [created] = await tx.$queryRawUnsafe<DbRow[]>(
    `INSERT INTO ${quoteIdentifier(tableName)} (${columns})
     VALUES (${placeholders})
     RETURNING ${quoteIdentifier(returningColumn)}`,
    ...values,
  );

  return Number(created[returningColumn]);
}

async function insertRowWithoutReturn(
  tx: RawClient,
  tableName: string,
  row: DbRow,
) {
  const entries = Object.entries(row);
  const columns = entries.map(([key]) => quoteIdentifier(key)).join(", ");
  const placeholders = entries.map((_, index) => `$${index + 1}`).join(", ");
  const values = entries.map(([, value]) => value);

  await tx.$executeRawUnsafe(
    `INSERT INTO ${quoteIdentifier(tableName)} (${columns})
     VALUES (${placeholders})`,
    ...values,
  );
}

function mappedId(map: Map<number, number>, value: unknown) {
  if (value === null || value === undefined) return null;
  return map.get(Number(value)) ?? null;
}

async function ensureDemoSchema(tx: RawClient) {
  await tx.$executeRawUnsafe(
    `ALTER TABLE "medicalcenter_info"
     ADD COLUMN IF NOT EXISTS "is_demo" BOOLEAN NOT NULL DEFAULT FALSE`,
  );

  await tx.$executeRawUnsafe(
    `CREATE TABLE IF NOT EXISTS "demo_session" (
       "session_id" TEXT PRIMARY KEY,
       "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
       "expires_at" TIMESTAMP(3) NOT NULL,
       "center_id" INTEGER NOT NULL UNIQUE
         REFERENCES "medicalcenter_info"("center_id") ON DELETE CASCADE
     )`,
  );
}

async function cloneRowsWithId(
  tx: RawClient,
  tableName: string,
  idColumn: string,
  rows: DbRow[],
  buildRow: (row: DbRow) => DbRow,
) {
  const idMap = new Map<number, number>();

  for (const row of rows) {
    const createdId = await insertRow(
      tx,
      tableName,
      buildRow(row),
      idColumn,
    );
    idMap.set(Number(row[idColumn]), createdId);
  }

  return idMap;
}

async function createDemoSession() {
  return prisma.$transaction(
    async (tx) => {
      await ensureDemoSchema(tx);

      const [templateCenter] = await tx.$queryRawUnsafe<DbRow[]>(
        `SELECT c.*
         FROM "medicalcenter_info" c
         WHERE COALESCE(c."is_demo", FALSE) = FALSE
           AND EXISTS (
             SELECT 1 FROM "room_info" r WHERE r."center_id" = c."center_id"
           )
           AND EXISTS (
             SELECT 1 FROM "user_info" u WHERE u."center_id" = c."center_id"
           )
         ORDER BY RANDOM()
         LIMIT 1`,
      );

      if (!templateCenter) {
        throw new Error("No seeded hospital with rooms and staff was found.");
      }

      const templateCenterId = Number(templateCenter.center_id);
      const newCenterId = await insertRow(
        tx,
        "medicalcenter_info",
        {
          ...without(templateCenter, ["center_id"]),
          is_demo: true,
        },
        "center_id",
      );

      const users = await tx.$queryRawUnsafe<DbRow[]>(
        `SELECT * FROM "user_info"
         WHERE "center_id" = $1
         ORDER BY "user_id" ASC`,
        templateCenterId,
      );
      const userIdMap = await cloneRowsWithId(
        tx,
        "user_info",
        "user_id",
        users,
        (user) => ({
          ...without(user, ["user_id", "center_id"]),
          center_id: newCenterId,
        }),
      );

      const patients = await tx.$queryRawUnsafe<DbRow[]>(
        `SELECT * FROM "patient_info"
         WHERE "center_id" = $1
         ORDER BY "patient_id" ASC`,
        templateCenterId,
      );
      const patientIdMap = await cloneRowsWithId(
        tx,
        "patient_info",
        "patient_id",
        patients,
        (patient) => ({
          ...without(patient, ["patient_id", "center_id"]),
          center_id: newCenterId,
        }),
      );

      const rooms = await tx.$queryRawUnsafe<DbRow[]>(
        `SELECT * FROM "room_info"
         WHERE "center_id" = $1
         ORDER BY "room_id" ASC`,
        templateCenterId,
      );
      const roomIdMap = await cloneRowsWithId(
        tx,
        "room_info",
        "room_id",
        rooms,
        (room) => ({
          ...without(room, ["room_id", "center_id"]),
          center_id: newCenterId,
        }),
      );

      const beds = await tx.$queryRawUnsafe<DbRow[]>(
        `SELECT b.*
         FROM "bed_info" b
         INNER JOIN "room_info" r ON r."room_id" = b."room_id"
         WHERE r."center_id" = $1
         ORDER BY b."bed_id" ASC`,
        templateCenterId,
      );
      const bedIdMap = await cloneRowsWithId(
        tx,
        "bed_info",
        "bed_id",
        beds,
        (bed) => ({
          ...without(bed, [
            "bed_id",
            "room_id",
            "assigned_patient_id",
            "assigned_nurse_id",
          ]),
          room_id: mappedId(roomIdMap, bed.room_id),
          assigned_patient_id: mappedId(patientIdMap, bed.assigned_patient_id),
          assigned_nurse_id: mappedId(userIdMap, bed.assigned_nurse_id),
        }),
      );

      const roomData = await tx.$queryRawUnsafe<DbRow[]>(
        `SELECT rd.*
         FROM "room_data" rd
         INNER JOIN "bed_info" b ON b."bed_id" = rd."bed_id"
         INNER JOIN "room_info" r ON r."room_id" = b."room_id"
         WHERE r."center_id" = $1
         ORDER BY rd."id" ASC`,
        templateCenterId,
      );
      await cloneRowsWithId(tx, "room_data", "id", roomData, (data) => ({
        ...without(data, ["id", "bed_id"]),
        bed_id: mappedId(bedIdMap, data.bed_id),
      }));

      const roomRegisters = await tx.$queryRawUnsafe<DbRow[]>(
        `SELECT rr.*
         FROM "room_register" rr
         WHERE rr."center_id" = $1
         ORDER BY rr."room_id", rr."patient_id", rr."session_id"`,
        templateCenterId,
      );
      for (const register of roomRegisters) {
        const roomId = mappedId(roomIdMap, register.room_id);
        const patientId = mappedId(patientIdMap, register.patient_id);
        if (!roomId || !patientId) continue;

        await insertRowWithoutReturn(tx, "room_register", {
          ...without(register, ["room_id", "patient_id", "center_id"]),
          room_id: roomId,
          patient_id: patientId,
          center_id: newCenterId,
        });
      }

      const patientUploads = await tx.$queryRawUnsafe<DbRow[]>(
        `SELECT pu.*
         FROM "patient_uploads" pu
         INNER JOIN "patient_info" p ON p."patient_id" = pu."patient_id"
         WHERE p."center_id" = $1
         ORDER BY pu."patient_id", pu."session_id"`,
        templateCenterId,
      );
      for (const upload of patientUploads) {
        const patientId = mappedId(patientIdMap, upload.patient_id);
        if (!patientId) continue;

        await insertRowWithoutReturn(tx, "patient_uploads", {
          ...without(upload, ["patient_id"]),
          patient_id: patientId,
        });
      }

      const userUploads = await tx.$queryRawUnsafe<DbRow[]>(
        `SELECT * FROM "user_uploads"
         WHERE "center_id" = $1
         ORDER BY "user_id"`,
        templateCenterId,
      );
      for (const upload of userUploads) {
        const userId = mappedId(userIdMap, upload.user_id);
        if (!userId) continue;

        await insertRowWithoutReturn(tx, "user_uploads", {
          ...without(upload, ["user_id", "center_id"]),
          user_id: userId,
          center_id: newCenterId,
        });
      }

      const sessionId = randomUUID();
      const expiresAt = new Date(
        Date.now() + DEMO_SESSION_MAX_AGE_SECONDS * 1000,
      );

      await tx.$executeRawUnsafe(
        `INSERT INTO "demo_session" ("session_id", "expires_at", "center_id")
         VALUES ($1, $2, $3)`,
        sessionId,
        expiresAt,
        newCenterId,
      );

      const [demoUser] = await tx.$queryRawUnsafe<
        Array<{ staff_id: string; user_role: string }>
      >(
        `SELECT "staff_id", "user_role"
         FROM "user_info"
         WHERE "center_id" = $1
         ORDER BY CASE WHEN "user_role" = 'Admin' THEN 0 ELSE 1 END, "user_id" ASC
         LIMIT 1`,
        newCenterId,
      );

      if (!demoUser) {
        throw new Error("The selected hospital did not have a demo user.");
      }

      return {
        centerId: newCenterId,
        centerName: String(templateCenter.center_name),
        sessionId,
        staffId: demoUser.staff_id,
        userRole: demoUser.user_role,
      };
    },
    { timeout: 60_000 },
  );
}

export async function POST() {
  try {
    const demo = await createDemoSession();
    const response = NextResponse.json({
      success: true,
      redirectUrl: "/dashboard",
      centerName: demo.centerName,
      sessionId: demo.sessionId,
    });

    const cookieOptions = {
      path: "/",
      maxAge: DEMO_SESSION_MAX_AGE_SECONDS,
      sameSite: "lax" as const,
    };

    response.cookies.set("organization", "DEMO", cookieOptions);
    response.cookies.set("demo_org_name", demo.centerName, cookieOptions);
    response.cookies.set("demo_session_id", demo.sessionId, cookieOptions);
    response.cookies.set("demo_center_id", String(demo.centerId), cookieOptions);
    response.cookies.set("staffSubmitted", "true", cookieOptions);
    response.cookies.set("user_role", demo.userRole, cookieOptions);
    response.cookies.set("staff_Id", demo.staffId, cookieOptions);

    return response;
  } catch (error) {
    console.error("Error starting demo session:", error);
    return NextResponse.json(
      { error: "Unable to start demo session." },
      { status: 500 },
    );
  }
}
