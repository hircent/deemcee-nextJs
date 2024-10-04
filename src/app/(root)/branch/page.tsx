import { BranchListColumns } from "@/columns/branch.list.columns";
import { BranchListTable } from "@/components/BranchList";
import { getBranchList } from "@/lib/actions/branch.action";
import { BranchListProps } from "@/types/index";
import { redirect } from "next/navigation";
import React from "react";

export default async function Branch() {

  try {
    
    const branches:BranchListProps = await getBranchList()
  
    return (
      <section className="home overflow-y-scroll custom-scrollbar">
        <div className="home-content">
          <BranchListTable columns={BranchListColumns} data={branches.data}/>
        </div>
      </section>
    );
  } catch (error) {
    return <div>Error loading branches</div>
  }
};

