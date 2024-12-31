import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useMemo, memo, useState } from "react";
import { BranchRole, BranchSelectorProps } from "@/types/index";
import {
  getBranchSelector,
  setBranchCookie,
} from "@/lib/actions/branch.action";
import { usePathname } from "next/navigation";
import { camelCase } from "@/lib/utils";
import { branchSelectorPermission } from "@/constants/index";

// Custom hook to handle branch data fetching
const useBranchData = (userRole: BranchRole[]) => {
  const [branchSelector, setBranchSelector] = useState<BranchSelectorProps[]>(
    []
  );

  useEffect(() => {
    const fetchBranchData = async () => {
      if (!userRole?.[0]) return;

      if (userRole[0].branch_role === "superadmin") {
        const branchData = await getBranchSelector();
        setBranchSelector(branchData);
      } else {
        setBranchSelector([
          {
            id: userRole[0].branch_id,
            name: userRole[0].branch_name || "",
          },
        ]);
      }
    };

    fetchBranchData();
  }, [userRole]); // Only depends on userRole changes

  return branchSelector;
};

interface BranchSelectorComponentProps {
  userRole: BranchRole[];
}

function BranchSelectorBase({ userRole }: BranchSelectorComponentProps) {
  const initialBranchId = userRole?.[0]?.branch_id?.toString() || "";
  const [branch, setBranch] = useState(initialBranchId);
  const [ableSelect, setAbleSelect] = useState<boolean>(false);
  const pathName = usePathname();

  // Use the custom hook to handle branch data
  const branchSelector = useBranchData(userRole);

  // Memoize the branch change handler
  const handleBranchChange = useCallback((value: string) => {
    setBranch(value);
  }, []);

  // Handle branch cookie updates
  useEffect(() => {
    if (!pathName) return;

    const changeBranch = async () => {
      await setBranchCookie(branch, pathName);
    };
    changeBranch();

    setAbleSelect(!branchSelectorPermission.includes(pathName));
  }, [branch, pathName]);

  // Memoize the branch selector items
  const branchSelectorItems = useMemo(() => {
    if (!branchSelector?.length) return null;

    return branchSelector.map((v) => (
      <SelectItem key={v.id} value={v.id.toString()} className="select-item">
        <div className="text-left">{camelCase(v.name)}</div>
      </SelectItem>
    ));
  }, [branchSelector]);

  if (!userRole?.[0] || !branchSelector?.length) {
    return null;
  }

  return (
    <Select
      onValueChange={handleBranchChange}
      value={branch}
      disabled={ableSelect}
    >
      <SelectTrigger className="bg-yellow-2 border-yellow-11 w-[300px]">
        <SelectValue placeholder="Select a branch" />
      </SelectTrigger>
      <SelectContent className="select-content flex justify-start">
        <SelectGroup>{branchSelectorItems}</SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Memoize the entire component
export const BranchSelector = memo(BranchSelectorBase);
