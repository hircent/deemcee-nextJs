import { authUser } from "@/lib/actions/user.actions"
import { getUserRole } from "@/lib/utils"
import GradeSection from "@/components/GradeSection"
import { getGradeData } from "@/lib/actions/structure";

const Grade = async () => {
  const user = await authUser();
  const userRole = getUserRole(user)
  const gradeData = await getGradeData()

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Grade</h1>
      </div>

      <GradeSection data={gradeData}/>
    </div>
  )
}

export default Grade
