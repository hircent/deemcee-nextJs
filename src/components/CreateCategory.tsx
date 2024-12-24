"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import CategoryForm from "./CategoryFormComponent";
import GradeForm from "./GradeFormComponent";
import ThemeForm from "./ThemeFormComponent";

const CreateCategory = () => {
  const pathname = usePathname();
  const name = pathname?.split("/")[2];

  if (!name) {
    return (
      <div className="hidden">
        <Button
          className="group p-2 bg-gray-100 rounded-md hover:bg-yellow-2"
          disabled
        >
          <Plus size={18} className="text-red-600 group-hover:text-gray-600" />{" "}
          Add
        </Button>
      </div>
    );
  }

  if (name == "category") return <CategoryForm type={name} />;

  if (name == "grade") return <GradeForm type={name} />;

  if (name == "theme") return <ThemeForm type={name} />;
};

export default CreateCategory;
