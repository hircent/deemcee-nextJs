import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { BranchRole } from "@/types/index";
import { setBranchCookie } from "@/lib/actions/branch.action";
import { usePathname } from "next/navigation";

const branches = [
  { id: 1, name: "HQ" },
  { id: 2, name: "Deemcee Bandar Sri Damansara" },
  { id: 3, name: "Deemcee Sri Petaling" },
  { id: 4, name: "Deemcee Kota Kemuning" },
  { id: 5, name: "Deemcee Aman Suria, PJ" },
  { id: 6, name: "Deemcee Len Seng, Cheras" },
  { id: 7, name: "Deemcee Bandar Puteri, Puchong" },
  { id: 8, name: "Deemcee Sibu, Sarawak" },
  { id: 9, name: "Deemcee Kepong Baru" },
  { id: 10, name: "DeEmcee Ipoh" },
  { id: 11, name: "Deemcee Saradise, Kuching" },
  { id: 12, name: "DeEmcee Seremban" },
];

export function BranchSelector({ userRole }: { userRole: BranchRole[] }) {
  const [branch, setBranch] = useState(userRole[0].branch_id.toString());
  const pathName = usePathname();
  console.log(pathName);
  useEffect(() => {
    const changeBranch = async () => {
      await setBranchCookie(branch, pathName);
    };
    changeBranch();
    console.log(branch);
  }, [branch, pathName]);
  return (
    <Select
      onValueChange={(value) => {
        setBranch(value);
      }}
      value={branch}
    >
      <SelectTrigger className=" bg-yellow-2 border-yellow-11 w-[300px]">
        <SelectValue placeholder="Select a branch" />
      </SelectTrigger>
      <SelectContent className="bg-white flex justify-start">
        <SelectGroup>
          {branches.map((v) => (
            <SelectItem
              key={v.id}
              value={v.id.toString()}
              className="cursor-pointer hover:bg-yellow-6"
            >
              <div className="text-left">{v.name}</div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
