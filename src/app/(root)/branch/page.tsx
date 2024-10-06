import { BranchListColumns } from "@/columns/branch.list.columns";
import { BranchListTable } from "@/components/BranchList";
import { Button } from "@/components/ui/button";
import { getBranchList } from "@/lib/actions/branch.action";
import { BranchListProps } from "@/types/index";
import { Search } from "lucide-react";
import React from "react";

export default async function Branch() {
  const handleSearch = ()=>{

  }

  try {
    
    const branches:BranchListProps = await getBranchList()
  
    return (
        <div className="home-content">
          <div className="flex justify-between">
            <div className="relative flex flex-shrink-0 w-64">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 bg-yellow-2"
                placeholder={"search"}
              />
              <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <Button className="rounded-md px-4 py-2 bg-yellow-2">Create</Button>
          </div>
          <BranchListTable columns={BranchListColumns} data={branches.data}/>
        </div>
    );
  } catch (error) {
    return <div>Error loading branches</div>
  }
};

