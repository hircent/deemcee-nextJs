import BackButton from "@/components/BackButton";
import { EditStudent } from "@/components/EditStudent";
import { StudentCard } from "@/components/StudentCard";
import { getStudentById } from "@/lib/actions/student.action";
import React from "react";

const StudentProfile = async ({ params }: { params: { id: number } }) => {
  const student = await getStudentById(params.id);

  return (
    <div className="home-content">
      <div className="flex justify-between">
        <BackButton />
        <EditStudent student={student} />
      </div>
      <div className="h-max bg-yellow-2 rounded-md p-8">
        <StudentCard student={student} />
      </div>
    </div>
  );
};

export default StudentProfile;
