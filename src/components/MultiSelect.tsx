"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StarterKitItem } from "@/types/index";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Option = { label: string; value: string };

interface ISelectProps {
  placeholder: string;
  options: Option[];
  selectedOptions: StarterKitItem[];
  setSelectedOptions: Dispatch<SetStateAction<StarterKitItem[]>>;
}
const MultiSelect = ({
  placeholder,
  options: values,
  selectedOptions: selectedItems,
  setSelectedOptions: setSelectedItems,
}: ISelectProps) => {
  const handleSelectChange = (value: string, label: string) => {
    const starterKitItem: StarterKitItem = { value, label };

    if (!selectedItems.some((item) => item.value === value)) {
      setSelectedItems((prev) => [...prev, starterKitItem]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item.value !== value));
    }
  };

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.some((item) => item.value === value);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
          >
            <div>{placeholder}</div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-white"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {values.map((value: ISelectProps["options"][0], index: number) => {
            return (
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                key={index}
                checked={isOptionSelected(value.value)}
                onCheckedChange={() =>
                  handleSelectChange(value.value, value.label)
                }
                className="cursor-pointer hover:bg-yellow-9"
              >
                {value.label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MultiSelect;
