import { ClassListColumns } from "@/columns/class.list.columns";
import { PageListTable } from "./PageList";
import { ClassListData } from "@/types/class";
import { Button } from "./ui/button";

import { ListProps } from "@/types/index";
import Link from "next/link";

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

      <div className="flex flex-col mt-2">
        {classData.next ? (
          <Button className="p-4 bg-white w-20">
            <Link href={`/class/manage?page=2`}>Next</Link>
          </Button>
        ) : (
          <div></div>
        )}

        {classData.previous ? (
          <Button className="p-4 bg-white w-20">
            <Link href={`/class/manage`}>Pre</Link>
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ManageClassSection;
