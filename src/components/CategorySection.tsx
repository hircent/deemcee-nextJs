"use client";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryData } from "@/types/structure";
import EditCategory from "./EditCategory";
import ViewCategory from "./ViewCategory";

const CategorySection = ({
  userRole,
  data,
}: {
  userRole: string[];
  data: CategoryData[];
}) => {
  const yearNow = new Date().getFullYear().toString();
  const [statusFilter, setStatusFilter] = useState<"all" | boolean>(true);
  const [yearFilter, setYearFilter] = useState<string>(yearNow);

  const filteredCategories = data.filter((cat) => {
    if (statusFilter !== "all" && cat.is_active !== statusFilter) return false;
    if (yearFilter !== "all" && cat.year.toString() !== yearFilter)
      return false;
    return true;
  });

  const years = Array.from(new Set(data.map((cat) => cat.year.toString())));
  return (
    <div>
      {/* Filters Section */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          <Select
            value={String(statusFilter)}
            onValueChange={(value) =>
              setStatusFilter(value === "all" ? "all" : value === "true")
            }
          >
            <SelectTrigger className="w-[140px] bg-yellow-2">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-yellow-2">
              <SelectItem value="all" className="select-item">
                All Status
              </SelectItem>
              <SelectItem value="true" className="select-item">
                Active
              </SelectItem>
              <SelectItem value="false" className="select-item">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[140px] bg-yellow-2">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-yellow-2">
              <SelectItem value="all" className="select-item">
                All Years
              </SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year} className="select-item">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className="p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-medium text-gray-900">
                  {category.name}
                </h2>
                <div className="flex gap-2">
                  <EditCategory data={category} />
                  <ViewCategory data={category} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      category.is_active ? "bg-green-400" : "bg-gray-400"
                    }`}
                  ></span>
                  {category.is_active ? "Active" : "Inactive"}
                </div>
                <span className="text-xs text-gray-500">
                  Year: {category.year}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
