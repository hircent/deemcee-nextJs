"use client";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TierListData } from "@/types/structure";
import { CountryListData } from "@/types/country";
import { getTierList } from "@/lib/actions/structure.actions";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const GradeFilterBar = ({
  countryList,
  tierList,
}: {
  countryList: CountryListData[];
  tierList: TierListData[];
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCountry, setSelectedCountry] = useState<string>("Malaysia");
  const [tiers, setTiers] = useState<TierListData[]>(tierList);
  const [placeholder, setPlaceholder] = useState<string>("All Tiers");
  const [selectedTier, setSelectedTier] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const getTiers = async () => {
      const tierList = await getTierList();
      setTiers(tierList);
      setPlaceholder("All Tiers");
      setSelectedTier(undefined);
    };
    getTiers();
  }, []);

  useEffect(() => {
    if (selectedTier) {
      const newUrl = formUrlQuery({
        params: searchParams!.toString(),
        key: "tier",
        value: selectedTier,
      });

      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = removeKeysFromQuery({
        params: searchParams!.toString(),
        keysToRemove: ["tier"],
      });
      router.push(newUrl, { scroll: false });
    }
  }, [selectedTier, router, searchParams, pathname]);

  if (pathname !== "/structure/grade") return null;
  return (
    <Card className="p-4 bg-yellow-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-[160px] bg-yellow-2">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="bg-yellow-2">
            {countryList?.map((country) => (
              <SelectItem
                key={country.id}
                value={country.name}
                className="select-item"
              >
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTier} onValueChange={setSelectedTier}>
          <SelectTrigger className="w-[200px] bg-yellow-2">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-yellow-2">
            {tiers?.map((tier) => (
              <SelectItem
                key={tier.id}
                value={tier.id.toString()}
                className="select-item"
              >
                {tier.name + " (" + tier.year + ")"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default GradeFilterBar;
