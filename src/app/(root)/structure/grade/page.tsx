import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import GradeSection from "@/components/GradeSection";
import { getGradeList } from "@/lib/actions/structure.actions";
import { SearchParamProps } from "@/types/index";

const Grade = async ({ searchParams }: SearchParamProps) => {
  const user = await authUser();
  const userRole = getUserRole(user);
  const tier = searchParams.tier ? searchParams.tier.toString() : "1";
  const gradeData = await getGradeList(tier);

  if (gradeData.length === 0) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Grade</h1>
        </div>

        <div className="flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              No Grade Found
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Grade</h1>
      </div>

      <GradeSection data={gradeData} currency={gradeData[0].currency} />
    </div>
  );
};

export default Grade;
