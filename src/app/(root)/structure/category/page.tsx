import CategorySection from "@/components/CategorySection"
import { getCategoryData } from "@/lib/actions/structure";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";

export default async function CategoryPage() {
    const user = await authUser();
    const userRole = getUserRole(user)

    const catList = await getCategoryData()
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
            </div>

            <CategorySection userRole={userRole} data={catList}/>
        </div>
    )
}
