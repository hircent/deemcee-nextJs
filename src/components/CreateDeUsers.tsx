"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import GradeForm from "./GradeFormComponent";
import Create from "./Create";
import StudentForm from "./StudentForm";

const CreateDeUsers = ({ country }: { country: string }) => {
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

  // if (name == "parent") return <Create type={name} />;

  if (name == "student") return <StudentForm country={country} />;
};

export default CreateDeUsers;
