"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { BranchRole, BranchSelectorProps } from "@/types/index";
import {
  getBranchSelector,
  setBranchCookie,
} from "@/lib/actions/branch.action";
import { usePathname } from "next/navigation";
import { camelCase } from "@/lib/utils";

export function BranchSelector({ userRole }: { userRole: BranchRole[] }) {
  const [branch, setBranch] = useState(userRole[0].branch_id.toString());
  const [branchSelector, setBranchSelector] = useState<BranchSelectorProps[]>(
    []
  );
  const pathName = usePathname();

  useEffect(() => {
    const getBranchSelectorData = async () => {
      const branchData = await getBranchSelector();
      setBranchSelector(branchData);
    };
    getBranchSelectorData();
  }, []);

  useEffect(() => {
    const changeBranch = async () => {
      await setBranchCookie(branch, pathName);
    };
    changeBranch();
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
          {branchSelector.map((v) => (
            <SelectItem
              key={v.id}
              value={v.id.toString()}
              className="cursor-pointer hover:bg-yellow-6"
            >
              <div className="text-left">{camelCase(v.name)}</div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
