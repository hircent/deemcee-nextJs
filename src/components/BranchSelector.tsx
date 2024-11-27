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
import { branchSelectorPermission } from "@/constants/index";

export function BranchSelector({ userRole }: { userRole: BranchRole[] }) {
  const [branch, setBranch] = useState(userRole[0].branch_id.toString());
  const [branchSelector, setBranchSelector] = useState<BranchSelectorProps[]>(
    []
  );
  const [ableSelect, setAbleSelect] = useState<boolean>(false);
  const pathName = usePathname();

  useEffect(() => {
    const getBranchSelectorData = async () => {
      const branchData = await getBranchSelector();
      setBranchSelector(branchData);
    };

    if (userRole[0].branch_role == "superadmin") {
      getBranchSelectorData();
    } else {
      setBranchSelector([
        { id: userRole[0].branch_id, name: userRole[0].branch_name },
      ]);
    }
  }, [userRole]);

  useEffect(() => {
    const changeBranch = async () => {
      await setBranchCookie(branch, pathName!);
    };
    changeBranch();

    if (branchSelectorPermission.includes(pathName!)) {
      setAbleSelect(false);
    } else {
      setAbleSelect(true);
    }
  }, [branch, pathName]);
  return (
    <Select
      onValueChange={(value) => {
        setBranch(value);
      }}
      value={branch}
      disabled={ableSelect}
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
