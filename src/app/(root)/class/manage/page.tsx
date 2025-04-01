import { getClassList } from "@/lib/actions/class.action";
import { SearchParamProps } from "@/types/index";
import { PaginationWrapper } from "@/components/PaginationWrapper";
import { ClassListColumns } from "@/columns/class.list.columns";

const ManageClass = async ({ searchParams }: SearchParamProps) => {
  const classListData = await getClassList({
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="p-4">
      <PaginationWrapper
        columns={ClassListColumns}
        paginationData={classListData}
        baseUrl="/class/manage"
      />
    </div>
  );
};

export default ManageClass;
