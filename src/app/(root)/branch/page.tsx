import { BranchListColumns } from "@/columns/branch.list.columns";
import { BranchListTable } from "@/components/BranchList";
import { getBranchList } from "@/lib/actions/branch.action";
import { BranchListProps } from "@/types/index";
import React from "react";

export default async function Branch() {
  const branches:BranchListProps = await getBranchList()

  return (
    <section className="home overflow-y-scroll custom-scrollbar">
      <div className="home-content">
        {/* <ol>
          {branches.data.map((v)=>(
            <li key={v.id}>
              <p>Name: {v.name}</p>
              <p>Display Name : {v.display_name}</p>
              <p>Operation Date : {v.operation_date}</p>
            </li>
          ))}
        </ol> */}

        <BranchListTable columns={BranchListColumns} data={branches.data}/>
      </div>
    </section>
  );
};

