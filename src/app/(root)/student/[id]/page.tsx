import { StudentCard } from "@/components/StudentCard";
import React from "react";

const StudentProfile = ({ params }: { params: { id: number } }) => {
  const student = {
    id: 2976,
    first_name: "Romeo Nicholas Christopher",
    last_name: null,
    fullname: "Romeo Nicholas Christopher",
    gender: "Male",
    dob: "2019-08-19",
    school: "SMK",
    deemcee_starting_grade: 1,
    status: "IN_PROGRESS",
    enrolment_date: "2024-12-03",
    branch: 2,
    parent: {
      id: 2532,
      username: "mikonicchris.com",
      email: "miko@nicchris.com",
      is_active: true,
    },
    enrolments: [
      {
        id: 5865,
        start_date: "2024-11-30",
        status: "IN_PROGRESS",
        remaining_lessons: 21,
        is_active: true,
        freeze_lessons: 4,
        grade: 1,
      },
    ],
    payment: [
      {
        id: 123,
        grade: 2,
        status: "pending",
        term_fees: 1900,
        paid: 1200,
        outstanding: 700,
      },
    ],
  };

  return (
    <div className="home-content">
      <div className="h-max bg-yellow-2 rounded-md p-8">
        <StudentCard student={student} />
      </div>
    </div>
  );
};

export default StudentProfile;
