import { PrismaClient } from './lib/generated/prisma'

const prisma = new PrismaClient()

async function addSampleTranscriptions() {
  try {
    console.log('Adding sample transcriptions...')

    // Get JPCH patients
    const patients = await prisma.patient_info.findMany({
      where: {
        medicalcenter_info: {
          center_name: "Jim Pattison Children's Hospital"
        }
      }
    })

    if (patients.length === 0) {
      console.log('No patients found, creating sample patients first...')
      
      const jpch = await prisma.medicalcenter_info.findFirst({
        where: { center_name: "Jim Pattison Children's Hospital" }
      })

      if (!jpch) {
        console.error('JPCH not found!')
        return
      }

      // Create sample patients
      for (let i = 1; i <= 3; i++) {
        await prisma.patient_info.create({
          data: {
            patient_name: `Patient JPCH ${i}`,
            registered_date: new Date(),
            center_id: jpch.center_id,
            is_discharged: false
          }
        })
      }

      console.log('Created sample patients')
    }

    // Get patients again
    const updatedPatients = await prisma.patient_info.findMany({
      where: {
        medicalcenter_info: {
          center_name: "Jim Pattison Children's Hospital"
        }
      }
    })

    // Create sample transcriptions
    const sampleTranscriptions = [
      {
        upload_path: '/uploads/Audio/JPCH/room.recording_2178_001.wav',
        patient_notes: 'Patient complained of headache, administered acetaminophen',
        is_approved: false
      },
      {
        upload_path: '/uploads/Audio/JPCH/room.recording_2178_002.wav', 
        patient_notes: 'Vital signs stable, patient resting comfortably',
        is_approved: false
      },
      {
        upload_path: '/uploads/Audio/JPCH/room.recording_3438_001.wav',
        patient_notes: 'Blood pressure elevated, consulting with physician',
        is_approved: true
      },
      {
        upload_path: '/uploads/Audio/JPCH/room.recording_2178_003.wav',
        patient_notes: 'Patient requested pain medication, given ibuprofen',
        is_approved: false
      }
    ]

    let sessionId = 1000
    for (const transcription of sampleTranscriptions) {
      const randomPatient = updatedPatients[Math.floor(Math.random() * updatedPatients.length)]
      
      await prisma.patient_uploads.create({
        data: {
          patient_id: randomPatient.patient_id,
          session_id: sessionId++,
          upload_path: transcription.upload_path,
          patient_notes: transcription.patient_notes,
          is_approved: transcription.is_approved,
          upload_time: new Date()
        }
      })

      console.log(`Created transcription: ${transcription.patient_notes.substring(0, 30)}...`)
    }

    console.log('\n🎉 Sample transcriptions created successfully!')
    console.log('Now you should see:')
    console.log('- 3 unapproved transcriptions in Live Notes (red text)')
    console.log('- 1 approved transcription in Archived Notes (black text)')
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addSampleTranscriptions()