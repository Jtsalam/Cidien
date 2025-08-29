import { PrismaClient } from './lib/generated/prisma'

const prisma = new PrismaClient()

async function checkTranscriptions() {
  try {
    console.log('=== Current Transcriptions in Database ===')
    
    const transcriptions = await prisma.patient_uploads.findMany({
      include: {
        patient_info: {
          include: {
            medicalcenter_info: true
          }
        }
      },
      orderBy: {
        patient_id: 'asc'
      }
    })

    console.log(`Total transcriptions: ${transcriptions.length}`)
    console.log('')

    transcriptions.forEach(t => {
      console.log(`ID: ${t.patient_id}_${t.session_id}`)
      console.log(`  - Patient: ${t.patient_info.patient_name}`)
      console.log(`  - Center: ${t.patient_info.medicalcenter_info.center_name}`)
      console.log(`  - Notes: ${t.patient_notes.substring(0, 50)}...`)
      console.log(`  - Approved: ${t.is_approved}`)
      console.log(`  - Upload Path: ${t.upload_path}`)
      console.log('---')
    })

    const approvedCount = transcriptions.filter(t => t.is_approved).length
    const unapprovedCount = transcriptions.filter(t => !t.is_approved).length

    console.log(`\nSummary:`)
    console.log(`  - Approved (should be in Archived Notes): ${approvedCount}`)
    console.log(`  - Unapproved (should be in Live Notes): ${unapprovedCount}`)

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkTranscriptions()