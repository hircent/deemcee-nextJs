import { ClassListColumns } from "@/columns/class.list.columns";
import { PageListTable } from "./PageList";
import { ClassListData } from "@/types/class";
import { ListProps } from "@/types/index";
import Pagination from "./Pagination";

const ManageClassSection = ({
  classData,
}: {
  classData: ListProps<ClassListData>;
}) => {
  return (
    <div>
      <PageListTable columns={ClassListColumns} data={classData.data} />
      <div>
        <Pagination
          next={classData.next}
          previous={classData.previous}
          baseUrl="/class/manage"
        />
      </div>
    </div>
  );
};

export default ManageClassSection;
