import { ClassListColumns } from "@/columns/class.list.columns";
import { PageListTable } from "./PageList";
import { ClassListData } from "@/types/class";
import { Button } from "./ui/button";

import { ListProps } from "@/types/index";
import Link from "next/link";
import Pagination from "./Pagination";

const ManageClassSection = ({
  classData,
}: {
  classData: ListProps<ClassListData>;
}) => {
  console.log(classData.next);
  console.log(classData.previous);
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
