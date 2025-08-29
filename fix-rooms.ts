import { PrismaClient } from './lib/generated/prisma'

const prisma = new PrismaClient()

async function fixRoomsAndAssignments() {
  try {
    console.log("=== Clearing existing room and bed data ===")
    await prisma.bed_info.deleteMany({})
    await prisma.room_info.deleteMany({})
    
    console.log("=== Creating rooms from backup data ===")
    
    // Get center IDs
    const centers = await prisma.medicalcenter_info.findMany()
    const pvm = centers.find(c => c.center_name === "Parkville Manor")
    const ehc = centers.find(c => c.center_name === "Erindale Health Center") 
    const kmc = centers.find(c => c.center_name === "Kenderdine Medical Clinic")
    const jpch = centers.find(c => c.center_name === "Jim Pattison Children's Hospital")
    const emc = centers.find(c => c.center_name === "Evergreen Medical Clinic")

    // Room data from backup file
    const roomsData = [
      { room_number: 3438, center_id: pvm.center_id, number_of_beds: 3 },
      { room_number: 3439, center_id: pvm.center_id, number_of_beds: 3 },
      { room_number: 3461, center_id: ehc.center_id, number_of_beds: 1 },
      { room_number: 2438, center_id: ehc.center_id, number_of_beds: 3 },
      { room_number: 3345, center_id: kmc.center_id, number_of_beds: 4 },
      { room_number: 1098, center_id: kmc.center_id, number_of_beds: 2 },
      { room_number: 2137, center_id: kmc.center_id, number_of_beds: 3 },
      { room_number: 1760, center_id: pvm.center_id, number_of_beds: 3 },
      { room_number: 3531, center_id: kmc.center_id, number_of_beds: 2 },
      { room_number: 2437, center_id: pvm.center_id, number_of_beds: 4 },
      { room_number: 3375, center_id: ehc.center_id, number_of_beds: 3 },
      { room_number: 2175, center_id: ehc.center_id, number_of_beds: 1 },
      { room_number: 3452, center_id: jpch.center_id, number_of_beds: 2 },
      { room_number: 2178, center_id: jpch.center_id, number_of_beds: 3 }, // This is your room!
      { room_number: 3247, center_id: jpch.center_id, number_of_beds: 3 },
      { room_number: 789, center_id: jpch.center_id, number_of_beds: 1 },
    ]

    // Create rooms and beds
    for (const roomData of roomsData) {
      const room = await prisma.room_info.create({
        data: {
          room_number: roomData.room_number,
          center_id: roomData.center_id,
          number_of_beds: roomData.number_of_beds,
          is_full: false
        }
      })

      console.log(`Created room ${room.room_number}`)

      // Create beds for this room
      const bedLetters = ['A', 'B', 'C', 'D'].slice(0, roomData.number_of_beds)
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
    }

    console.log("\n=== Assigning Ifejesu Salam to rooms 2178B and 3438C ===")
    
    // Find Ifejesu Salam
    const ifejesu = await prisma.user_info.findFirst({
      where: { staff_id: "2001745" }
    })

    if (!ifejesu) {
      console.error("Ifejesu Salam not found!")
      return
    }

    // Find room 2178 bed B
    const room2178 = await prisma.room_info.findFirst({
      where: { room_number: 2178 }
    })

    const bed2178B = await prisma.bed_info.findFirst({
      where: { 
        room_id: room2178.room_id,
        bed_letter: 'B'
      }
    })

    // Find room 3438 bed C  
    const room3438 = await prisma.room_info.findFirst({
      where: { room_number: 3438 }
    })

    const bed3438C = await prisma.bed_info.findFirst({
      where: {
        room_id: room3438.room_id,
        bed_letter: 'C'
      }
    })

    // Assign beds to Ifejesu
    await prisma.bed_info.update({
      where: { bed_id: bed2178B.bed_id },
      data: {
        assigned_nurse_id: ifejesu.user_id,
        is_assigned: true
      }
    })

    await prisma.bed_info.update({
      where: { bed_id: bed3438C.bed_id },
      data: {
        assigned_nurse_id: ifejesu.user_id,
        is_assigned: true
      }
    })

    console.log(`✅ Assigned Ifejesu Salam to:`)
    console.log(`   - Room 2178B (bed_id: ${bed2178B.bed_id})`)
    console.log(`   - Room 3438C (bed_id: ${bed3438C.bed_id})`)

    console.log("\n🎉 Room structure and assignments fixed!")
    
  } catch (error) {
    console.error("Error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

fixRoomsAndAssignments()