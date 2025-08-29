import { PrismaClient } from './lib/generated/prisma'

const prisma = new PrismaClient()

async function checkAssignments() {
  try {
    console.log("=== Current Bed Assignments ===")
    
    const beds = await prisma.bed_info.findMany({
      include: {
        user_info: true,
        patient_info: true,
        room_info: {
          include: {
            medicalcenter_info: true
          }
        }
      }
    })

    console.log(`Total beds: ${beds.length}`)
    console.log(`Assigned beds: ${beds.filter(b => b.assigned_nurse_id).length}`)
    console.log(`Available beds: ${beds.filter(b => b.is_available).length}`)
    
    console.log("\n=== Bed Details ===")
    beds.forEach(bed => {
      console.log(`Bed ${bed.bed_id}: Room ${bed.room_info.room_number}${bed.bed_letter} at ${bed.room_info.medicalcenter_info.center_name}`)
      console.log(`  - Assigned Nurse: ${bed.user_info?.user_name || 'None'}`)
      console.log(`  - Assigned Patient: ${bed.patient_info?.patient_name || 'None'}`)
      console.log(`  - Available: ${bed.is_available}`)
      console.log('---')
    })

    console.log("\n=== Staff Members ===")
    const staff = await prisma.user_info.findMany({
      include: {
        medicalcenter_info: true
      }
    })

    staff.forEach(s => {
      console.log(`${s.user_name} (${s.staff_id}) - ${s.user_role} at ${s.medicalcenter_info.center_name}`)
    })

  } catch (error) {
    console.error("Error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAssignments()