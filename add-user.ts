import { PrismaClient } from './lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const realUsers = [
  { name: "Tom Murphy", id: "2378651", password: "tom212", role: "Staff", center: "Parkville Manor" },
  { name: "Robert Blue", id: "3127901", password: "rob107", role: "Admin", center: "Parkville Manor" },
  { name: "Sarah Love", id: "4712902", password: "lov298", role: "Admin", center: "Erindale Health Center" },
  { name: "Mary Andrews", id: "3701291", password: "dre432", role: "Staff", center: "Erindale Health Center" },
  { name: "John Adams", id: "4720943", password: "jon764", role: "Admin", center: "Kenderdine Medical Clinic" },
  { name: "Layla Tomkins", id: "8462192", password: "lay291", role: "Staff", center: "Kenderdine Medical Clinic" },
  { name: "Ifejesu Salam", id: "2001745", password: "Ify201", role: "Staff", center: "Jim Pattison Children's Hospital" },
  { name: "Thomas Vernon", id: "4101735", password: "tom219", role: "Admin", center: "Jim Pattison Children's Hospital" },
  { name: "Jessica Nia", id: "1285723", password: "nia112", role: "Admin", center: "Evergreen Medical Clinic" },
  { name: "Adrea James", id: "1095422", password: "dre139", role: "Staff", center: "Evergreen Medical Clinic" }
]

async function addRealUsers() {
  try {
    // First, clear existing test users (keep medical centers)
    await prisma.user_info.deleteMany({})
    console.log("Cleared existing test users")

    // Add all real users
    for (const userData of realUsers) {
      // Find the medical center
      const center = await prisma.medicalcenter_info.findFirst({
        where: { center_name: userData.center }
      })

      if (!center) {
        console.error(`Center not found: ${userData.center}`)
        continue
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10)

      // Create the user
      const user = await prisma.user_info.create({
        data: {
          user_name: userData.name,
          staff_id: userData.id,
          password: hashedPassword,
          user_role: userData.role,
          center_id: center.center_id,
          charter_id: `${userData.role.toUpperCase()}_${center.center_name.replace(/\s+/g, '_').toUpperCase()}_${userData.id}`
        }
      })

      console.log(`✓ Added ${userData.name} (${userData.id}) - ${userData.role} at ${userData.center}`)
    }

    console.log("\n🎉 Successfully added all real user credentials!")
    console.log("You can now log in with your actual credentials:")
    console.log("Organization: Jim Pattison Children's Hospital")
    console.log("Staff ID: 2001745")
    console.log("Password: Ify201")
    
  } catch (error) {
    console.error("Error adding users:", error)
  } finally {
    await prisma.$disconnect()
  }
}

addRealUsers()