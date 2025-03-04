"use client";
import { usePathname } from "next/navigation";
import GradeFilterBar from "./GradeFilterBar";
import { CountryListData } from "@/types/country";
import { TierListData } from "@/types/structure";

const StructureFilterBar = ({
  countryList,
  tierList,
}: {
  countryList: CountryListData[];
  tierList: TierListData[];
}) => {
  const pathname = usePathname();
  if (pathname == "/structure/grade")
    return <GradeFilterBar countryList={countryList} tierList={tierList} />;
  return null;
};

export default StructureFilterBar;
