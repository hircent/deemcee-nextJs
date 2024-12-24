"use client";

import { usePathname } from "next/navigation";
import ClassesForm from "./ClassesFormComponent";

const CreateClasses = () => {
  const pathname = usePathname();

  if (pathname == "/class/manage") {
    return <ClassesForm type={"Class"} />;
  }

  return <div></div>;
};

export default CreateClasses;
