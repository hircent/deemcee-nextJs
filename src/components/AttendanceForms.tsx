"use client"
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { time } from 'console';


const data = [
  {
    id: 1,
    time: '10:00 AM - 11:00 AM',
    classname: 'A101',
    category: 'Kiddos',
    student:[
      {
        id:1,
        name:'John Doe',
        status:""
      },
      {
        id:2,
        name:'Jane Doe',
        status:""
      },
      {
        id:3,
        name:'Bob Doe',
        status:""
      },
    ]
  },
  {
    id: 2,
    time: '12:00 PM - 1:00 PM',
    classname: 'A102',
    category: 'Kids',
    student:[
      {
        id:4,
        name:'John Doe',
        status:""
      },
      {
        id:5,
        name:'Bob Doe',
        status:""
      },
      {
        id:6,
        name:'Sandra Doe',
        status:""
      },
    ]
  },
  {
    id: 3,
    time: '2:00 PM - 3:00 PM',
    classname: 'A103',
    category: 'Kiddos',
    student:[
      {
        id:7,
        name:'Vera',
        status:""
      },
      {
        id:8,
        name:'Kane',
        status:""
      },
      {
        id:9,
        name:'James',
        status:""
      },
      {
        id:10,
        name:'Hircent',
        status:""
      },
    ]
  }
]


interface Student {
  id: number;
  name: string;
  status?: 'Attended' | 'Absent' | 'Freeze';
}

interface Teacher {
  id: number;
  name: string;
}

interface ClassData {
  id: number;
  time: string;
  classname: string;
  category: string;
  teacher: string;
  submitted: boolean;
  student: Student[];
}

const AttendanceForms = () => {
  const teachers: Teacher[] = [
    { id: 1, name: "Mr. Smith" },
    { id: 2, name: "Mrs. Johnson" },
    { id: 3, name: "Ms. Williams" }
  ];

  // Initialize attendance state with proper typing
  const [classAttendance, setClassAttendance] = useState<ClassData[]>(
    data.map(classData => ({
      ...classData,
      teacher: '',
      submitted: false,
      student: classData.student.map(student => ({
        ...student,
        status: undefined
      }))
    }))
  );

  const handleTeacherChange = (classId: number, teacherName: string) => {
    setClassAttendance(prev => 
      prev.map(classData => 
        classData.id === classId 
          ? { ...classData, teacher: teacherName }
          : classData
      )
    );
  };

  const handleStatusChange = (classId: number, studentId: number, status: 'Attended' | 'Absent' | 'Freeze') => {
    setClassAttendance(prev =>
      prev.map(classData =>
        classData.id === classId
          ? {
              ...classData,
              student: classData.student.map(student =>
                student.id === studentId
                  ? { ...student, status }
                  : student
              )
            }
          : classData
      )
    );
  };

  const isClassComplete = (classData: ClassData): boolean => {
    return Boolean(classData.teacher && classData.student.every(student => student.status));
  };

  const handleSubmit = (classId: number) => {
    setClassAttendance(prev =>
      prev.map(classData =>
        classData.id === classId
          ? { ...classData, submitted: true }
          : classData
      )
    );
    
    const classToSubmit = classAttendance.find(c => c.id === classId);
    console.log('Submitting attendance for class:', classToSubmit);
    // Handle your submit logic here
  };

  const getStatusButtonStyle = (currentStatus: string | undefined, buttonStatus: string): string => {
    if (currentStatus === buttonStatus) {
      switch (buttonStatus) {
        case 'Attended':
          return 'bg-green-500 text-white hover:bg-green-600';
        case 'Absent':
          return 'bg-red-500 text-white hover:bg-red-600';
        case 'Freeze':
          return 'bg-blue-500 text-white hover:bg-blue-600';
        default:
          return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
      }
    }
    return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };

  return (
      <Table className="w-full border-2 border-gray-200 border-t-0">
        <TableHeader className='bg-yellow-10 text-yellow-12'>
          <TableRow>
            <TableHead className="w-[150px] border-r-2 ">Time</TableHead>
            <TableHead className="w-[200px] border-r-2">Teacher</TableHead>
            <TableHead className="w-[150px] border-r-2">Classname</TableHead>
            <TableHead className="w-[200px] border-r-2">Student Name</TableHead>
            <TableHead className="w-[300px] border-r-2">Status</TableHead>
            <TableHead className="w-[150px] border-r-2">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classAttendance.map((classData) => (
            <React.Fragment key={classData.id}>
              {classData.student.map((student, studentIndex) => (
                <TableRow key={`${classData.id}-${student.id}`}>
                  {studentIndex === 0 && (
                    <>
                      <TableCell className="align-middle border-r-2" rowSpan={classData.student.length}>
                        {classData.time}
                      </TableCell>
                      <TableCell className="align-middle border-r-2" rowSpan={classData.student.length}>
                        <Select
                          value={classData.teacher}
                          onValueChange={(value) => handleTeacherChange(classData.id, value)}
                          disabled={classData.submitted}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select teacher" />
                          </SelectTrigger>
                          <SelectContent>
                            {teachers.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.name}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="align-middle border-r-2" rowSpan={classData.student.length}>
                        {classData.classname}
                      </TableCell>
                    </>
                  )}
                  <TableCell className='border-r-2'>{student.name}</TableCell>
                  <TableCell className='border-r-2'>
                    <div className="flex gap-2">
                      {(['Attended', 'Absent', 'Freeze'] as const).map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          className={`px-3 py-1 text-sm ${getStatusButtonStyle(student.status, status)}`}
                          onClick={() => handleStatusChange(classData.id, student.id, status)}
                          disabled={classData.submitted}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                  {studentIndex === 0 && (
                    <TableCell className="align-middle" rowSpan={classData.student.length}>
                      {!classData.submitted ? (
                        <Button
                          className="bg-blue-900 text-white w-full hover:bg-blue-700"
                          disabled={!isClassComplete(classData)}
                          onClick={() => handleSubmit(classData.id)}
                        >
                          Submit
                        </Button>
                      ) : (
                        <div className="flex items-center justify-center text-green-500 gap-2">
                          <Check size={16} />
                          <span>Submitted</span>
                        </div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
  );
};

export default AttendanceForms;