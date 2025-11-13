import { FileQuestion } from "lucide-react"

export default function NothingToSee() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
        <FileQuestion className="w-10 h-10 text-emerald-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h3>
      <p className="text-gray-600 text-center max-w-md">
        This feature is currently under development. Check back soon for updates!
      </p>
    </div>
  )
}
