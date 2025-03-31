import { ClassListColumns } from "@/columns/class.list.columns";
import { PageListTable } from "./PageList";
import { ListProps } from "@/types/index";
import Pagination from "./Pagination";
import { ColumnDef } from "@tanstack/react-table";

type PaginationWrapperProps<T> = {
  columns: ColumnDef<T>[];
  paginationData: ListProps<T>;
  baseUrl: string;
};

export function PaginationWrapper<T>({
  paginationData,
  columns,
  baseUrl,
}: PaginationWrapperProps<T>) {
  return (
    <div>
      <PageListTable columns={columns} data={paginationData.data} />
      <div>
        <Pagination
          next={paginationData.next}
          previous={paginationData.previous}
          baseUrl={baseUrl}
        />
      </div>
    </div>
  );
}
