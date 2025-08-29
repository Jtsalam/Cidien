import { PrismaClient } from '../lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create medical centers
  const centers = [
    { name: "Erindale Health Center", code: "EHC" },
    { name: "Parkville Manor", code: "PVM" },
    { name: "Kenderdine Medical Clinic", code: "KMC" },
    { name: "Jim Pattison Children's Hospital", code: "JPCH" },
    { name: "Evergreen Medical Clinic", code: "EMC" }
  ]

  const createdCenters = []
  
  for (const center of centers) {
    const medicalCenter = await prisma.medicalcenter_info.create({
      data: {
        center_name: center.name,
        address: `123 ${center.name} Street`,
        email: `info@${center.code.toLowerCase()}.com`
      }
    })
    createdCenters.push({ ...medicalCenter, code: center.code })
    console.log(`Created medical center: ${center.name}`)
  }

  // Create sample rooms for each center
  for (const center of createdCenters) {
    for (let roomNum = 101; roomNum <= 105; roomNum++) {
      const room = await prisma.room_info.create({
        data: {
          room_number: roomNum,
          center_id: center.center_id,
          number_of_beds: 4,
          is_full: false
        }
      })

      // Create beds for each room (A, B, C, D)
      const bedLetters = ['A', 'B', 'C', 'D']
      for (const bedLetter of bedLetters) {
        await prisma.bed_info.create({
          data: {
            room_id: room.room_id,
            bed_letter: bedLetter,
            is_available: true,
            is_assigned: false
          }
        })
      }
      console.log(`Created room ${roomNum} with beds for ${center.center_name}`)
    }
  }

  // Create sample users for each center
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  for (const center of createdCenters) {
    // Create an admin user
    await prisma.user_info.create({
      data: {
        user_name: `Admin ${center.code}`,
        staff_id: `${center.code}001`,
        password: hashedPassword,
        user_role: 'Admin',
        center_id: center.center_id,
        charter_id: `ADMIN_${center.code}_001`
      }
    })

    // Create staff users
    for (let i = 2; i <= 5; i++) {
      await prisma.user_info.create({
        data: {
          user_name: `Staff ${center.code} ${i}`,
          staff_id: `${center.code}00${i}`,
          password: hashedPassword,
          user_role: 'Staff',
          center_id: center.center_id,
          charter_id: `STAFF_${center.code}_00${i}`
        }
      })
    }
    console.log(`Created users for ${center.center_name}`)
  }

  // Create sample patients
  for (const center of createdCenters.slice(0, 2)) { // Only for first 2 centers to avoid too much data
    for (let i = 1; i <= 3; i++) {
      const patient = await prisma.patient_info.create({
        data: {
          patient_name: `Patient ${center.code} ${i}`,
          registered_date: new Date(),
          center_id: center.center_id,
          is_discharged: false
        }
      })
      console.log(`Created patient: ${patient.patient_name}`)
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })