const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("../lib/generated/prisma");

loadEnvFile(path.join(__dirname, "..", ".env"));

const prisma = new PrismaClient();

const DEFAULT_MEDICAL_CENTERS = [
  "Northcrest Medical Center",
  "Starlane General Hospital",
  "Evergreen Health Institute",
  "NovaCare Institute",
  "Havenridge General Hospital",
];

const STAFF_PER_CENTER = 5;

const ROOM_SEEDS_PER_CENTER = [
  { offset: 11, beds: 2 },
  { offset: 12, beds: 3 },
  { offset: 13, beds: 4 },
  { offset: 14, beds: 2 },
];

const BED_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const STAFF_NAMES_BY_CENTER = {
  1: ["Tom Murphy", "Nora Patel", "Amina Okafor", "Marcus Reed"],
  2: ["Mary Andrews", "Priya Nair", "Chinedu Okeke", "Rachel Adams"],
  3: ["Layla Tomkins", "Arjun Mehta", "Funke Adeyemi", "Sarah Collins"],
  4: ["Ifejesu Salam", "Meera Iyer", "Tunde Adebayo", "Elena Brooks"],
  5: ["Adrea James", "Kiran Shah", "Ngozi Eze", "Thomas Bennett"],
};

const FALLBACK_STAFF_NAMES = [
  "Grace Wilson",
  "Ravi Menon",
  "Ifeoma Nwosu",
  "Daniel Parker",
  "Ananya Rao",
  "Seyi Balogun",
];

const PATIENT_NAMES = [
  "Ava Thompson",
  "Aarav Sharma",
  "Olivia Bennett",
  "Chiamaka Okafor",
  "Noah Mitchell",
  "James Foster",
  "Aisha Bello",
  "Benjamin Hayes",
  "Mia Coleman",
  "Vikram Patel",
  "Amelia Brooks",
  "Henry Richardson",
  "Nkechi Eze",
  "Daniel Morris",
  "Harper Collins",
  "Ethan Phillips",
  "Evelyn Turner",
  "Mason Cooper",
  "Abigail Stewart",
  "Aditya Rao",
  "Emily Peterson",
  "Jacob Simmons",
  "Temitope Adeyemi",
  "Michael Ross",
  "Scarlett Bryant",
  "Ishita Nair",
  "Grace Russell",
  "William Griffin",
  "Chloe Jenkins",
  "Samuel Price",
  "Obinna Nwosu",
  "David Coleman",
  "Zoey Henderson",
  "Joseph Ramirez",
  "Nora Bell",
  "Matthew Barnes",
  "Hazel Watson",
  "Owen Wood",
  "Kemi Balogun",
  "Nathan Gray",
  "Stella Ward",
  "Rohan Gupta",
  "Lucy Bennett",
  "Isaac Rivera",
  "Audrey James",
  "Julian Cox",
  "Saanvi Kapoor",
  "Ryan Bailey",
  "Hannah Flores",
  "Chinonso Obi",
  "Aria Long",
  "Gabriel Patterson",
  "Claire Hughes",
  "Anthony Butler",
  "Priya Menon",
  "Christopher Hayes",
  "Madison Nelson",
  "Andrew Foster",
  "Nnamdi Okoro",
  "Joshua Rivera",
  "Victoria Brooks",
  "Thomas Perry",
  "Riley Cooper",
  "Anika Singh",
  "Natalie Ross",
  "Christian Turner",
  "Maya Griffin",
  "Aaron Mitchell",
  "Yetunde Afolayan",
  "Adrian Peterson",
  "Paisley Morgan",
  "Charles Watson",
  "Elena Parker",
  "Eli Collins",
  "Deepak Iyer",
  "Connor Bennett",
  "Sarah Richardson",
  "Dominic Stewart",
  "Amara Eze",
  "Jeremiah Foster",
  "Aubrey Hayes",
  "Adam Price",
  "Ivy Russell",
  "Elias Sanders",
  "Fatima Abdullahi",
  "Jordan Bryant",
  "Samantha Bell",
  "Neha Desai",
  "Piper Ward",
  "Nicholas Wood",
  "Quinn Barnes",
  "Austin Jenkins",
  "Isabelle Fisher",
  "Babatunde Lawal",
  "Ruby Powell",
  "Jason Henderson",
  "Aditi Verma",
];

function loadEnvFile(envPath) {
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    const rawValue = trimmed.slice(equalsIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function nurseStaffId(index) {
  return `Nurse${String(index).padStart(3, "0")}`;
}

function roomNumberFor(centerId, offset) {
  return centerId * 1000 + offset;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function patientNameFor(centerId, index) {
  const nameIndex = ((centerId - 1) * 19 + index) % PATIENT_NAMES.length;
  return PATIENT_NAMES[nameIndex];
}

function staffNameFor(centerId, index) {
  const centerNames = STAFF_NAMES_BY_CENTER[centerId];
  if (centerNames && centerNames[index]) return centerNames[index];

  const nameIndex = ((centerId - 1) * 3 + index) % FALLBACK_STAFF_NAMES.length;
  return FALLBACK_STAFF_NAMES[nameIndex];
}

function registrationDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function registrationTime() {
  const date = new Date();
  date.setFullYear(1970, 0, 1);
  return date;
}

async function ensureDefaultCenters() {
  const centerCount = await prisma.medicalcenter_info.count();
  if (centerCount > 0) return;

  await prisma.medicalcenter_info.createMany({
    data: DEFAULT_MEDICAL_CENTERS.map((center_name) => ({
      center_name,
      address: null,
      email: null,
    })),
  });
}

async function ensureStaffForCenter(center) {
  const staffCount = await prisma.user_info.count({
    where: {
      center_id: center.center_id,
      user_role: "Staff",
    },
  });

  for (let index = staffCount; index < STAFF_PER_CENTER; index += 1) {
    await prisma.user_info.create({
      data: {
        user_name: staffNameFor(center.center_id, index),
        staff_id: "Pending",
        user_role: "Staff",
        center_id: center.center_id,
      },
    });
  }
}

async function renumberStaffForCenter(centerId) {
  const staff = await prisma.user_info.findMany({
    where: {
      center_id: centerId,
      user_role: "Staff",
    },
    orderBy: { user_id: "asc" },
    select: {
      user_id: true,
      staff_id: true,
    },
  });

  for (let index = 0; index < staff.length; index += 1) {
    const nextStaffId = nurseStaffId(index + 1);
    if (staff[index].staff_id === nextStaffId) continue;

    await prisma.user_info.update({
      where: { user_id: staff[index].user_id },
      data: { staff_id: nextStaffId },
    });
  }

  return staff.length;
}

async function renameStaffForCenter(centerId) {
  const staff = await prisma.user_info.findMany({
    where: {
      center_id: centerId,
      user_role: "Staff",
    },
    orderBy: { user_id: "asc" },
    select: {
      user_id: true,
      user_name: true,
    },
  });

  for (let index = 0; index < staff.length; index += 1) {
    const nextName = staffNameFor(centerId, index);
    if (staff[index].user_name === nextName) continue;

    await prisma.user_info.update({
      where: { user_id: staff[index].user_id },
      data: { user_name: nextName },
    });
  }

  return staff.length;
}

async function ensureRoomsAndBedsForCenter(center) {
  const rooms = [];

  for (const seed of ROOM_SEEDS_PER_CENTER) {
    const room_number = roomNumberFor(center.center_id, seed.offset);

    let room = await prisma.room_info.findFirst({
      where: {
        center_id: center.center_id,
        room_number,
      },
    });

    if (!room) {
      room = await prisma.room_info.create({
        data: {
          room_number,
          center_id: center.center_id,
          number_of_beds: seed.beds,
          is_full: false,
        },
      });
    }

    rooms.push(room);

    for (let index = 0; index < seed.beds; index += 1) {
      const bed_letter = BED_LETTERS[index];
      const existingBed = await prisma.bed_info.findFirst({
        where: {
          room_id: room.room_id,
          bed_letter,
        },
        select: { bed_id: true },
      });

      if (existingBed) continue;

      await prisma.bed_info.create({
        data: {
          room_id: room.room_id,
          bed_letter,
          is_available: true,
          is_assigned: false,
          assigned_patient_id: null,
          assigned_nurse_id: null,
        },
      });
    }
  }

  return rooms.length;
}

async function randomlyAssignNursesForCenter(centerId) {
  const nurses = await prisma.user_info.findMany({
    where: {
      center_id: centerId,
      user_role: "Staff",
    },
    orderBy: { user_id: "asc" },
    select: { user_id: true },
  });

  if (nurses.length === 0) return 0;

  const beds = await prisma.bed_info.findMany({
    where: {
      room_info: {
        center_id: centerId,
      },
    },
    select: {
      bed_id: true,
      assigned_patient_id: true,
    },
  });

  for (const bed of beds) {
    const assignedNurse = randomItem(nurses);

    await prisma.bed_info.update({
      where: { bed_id: bed.bed_id },
      data: {
        assigned_nurse_id: assignedNurse.user_id,
        is_assigned: bed.assigned_patient_id !== null,
      },
    });
  }

  return beds.length;
}

async function renamePatientsForCenter(centerId) {
  const patients = await prisma.patient_info.findMany({
    where: { center_id: centerId },
    orderBy: { patient_id: "asc" },
    select: { patient_id: true, patient_name: true },
  });

  for (let index = 0; index < patients.length; index += 1) {
    const nextName = patientNameFor(centerId, index);
    if (patients[index].patient_name === nextName) continue;

    await prisma.patient_info.update({
      where: { patient_id: patients[index].patient_id },
      data: { patient_name: nextName },
    });
  }

  return patients.length;
}

async function ensureRoomRegister(room, patientId) {
  const existingRegister = await prisma.room_register.findUnique({
    where: {
      room_id_patient_id_session_id: {
        room_id: room.room_id,
        patient_id: patientId,
        session_id: 1,
      },
    },
    select: { room_id: true },
  });

  if (existingRegister) return;

  await prisma.room_register.create({
    data: {
      room_id: room.room_id,
      patient_id: patientId,
      session_id: 1,
      center_id: room.center_id,
      reg_date: registrationDate(),
      reg_time: registrationTime(),
    },
  });
}

async function ensurePatientsForNurseAssignedBeds(centerId) {
  const beds = await prisma.bed_info.findMany({
    where: {
      assigned_nurse_id: { not: null },
      room_info: {
        center_id: centerId,
      },
    },
    include: {
      room_info: true,
      patient_info: true,
    },
    orderBy: [
      { room_info: { room_number: "asc" } },
      { bed_letter: "asc" },
    ],
  });

  let createdPatients = 0;

  for (let index = 0; index < beds.length; index += 1) {
    const bed = beds[index];
    const patientName = patientNameFor(centerId, index);
    let patient = bed.patient_info;

    if (patient) {
      patient = await prisma.patient_info.update({
        where: { patient_id: patient.patient_id },
        data: {
          patient_name: patientName,
          center_id: centerId,
          is_discharged: false,
          dicharged_date: null,
        },
      });
    } else {
      patient = await prisma.patient_info.create({
        data: {
          patient_name: patientName,
          registered_date: registrationDate(),
          center_id: centerId,
          is_discharged: false,
          dicharged_date: null,
        },
      });
      createdPatients += 1;
    }

    await prisma.bed_info.update({
      where: { bed_id: bed.bed_id },
      data: {
        assigned_patient_id: patient.patient_id,
        is_assigned: true,
        is_available: false,
      },
    });

    await ensureRoomRegister(bed.room_info, patient.patient_id);
  }

  const rooms = await prisma.room_info.findMany({
    where: { center_id: centerId },
    include: {
      bed_info: {
        select: { is_assigned: true },
      },
    },
  });

  for (const room of rooms) {
    await prisma.room_info.update({
      where: { room_id: room.room_id },
      data: {
        is_full:
          room.bed_info.length > 0 &&
          room.bed_info.every((bed) => bed.is_assigned),
      },
    });
  }

  return {
    assignedPatients: beds.length,
    createdPatients,
  };
}

async function main() {
  await ensureDefaultCenters();

  const centers = await prisma.medicalcenter_info.findMany({
    orderBy: { center_id: "asc" },
  });

  const summary = [];

  for (const center of centers) {
    await ensureStaffForCenter(center);
    const renamedStaff = await renameStaffForCenter(center.center_id);
    const staffCount = await renumberStaffForCenter(center.center_id);
    const roomCount = await ensureRoomsAndBedsForCenter(center);
    const assignedBedCount = await randomlyAssignNursesForCenter(center.center_id);
    const renamedPatients = await renamePatientsForCenter(center.center_id);
    const patientAssignment = await ensurePatientsForNurseAssignedBeds(center.center_id);

    summary.push({
      center: center.center_name,
      staffCount,
      renamedStaff,
      seedRoomsEnsured: roomCount,
      bedsAssignedToNurses: assignedBedCount,
      renamedPatients,
      patientsAssignedToBeds: patientAssignment.assignedPatients,
      patientsCreated: patientAssignment.createdPatients,
    });
  }

  console.table(summary);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
