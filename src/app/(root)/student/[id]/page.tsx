import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarDays,
  Book,
  School,
  UserRound,
  CreditCard,
} from "lucide-react";

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
        "term fees": 1900,
        paid: 1200,
        outstanding: 700,
      },
    ],
  };

  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="home-content">
      <div className="h-max bg-yellow-2 rounded-md p-8">
        <div className="mx-auto space-y-6">
          {/* Header Section with Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2 bg-white/50 backdrop-blur-sm border-neutral-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-neutral-800">
                      {student.fullname}
                    </CardTitle>
                    <p className="text-sm text-neutral-600">
                      ID: {student.id} | {student.school}
                    </p>
                  </div>
                  <Badge
                    variant={
                      student.status === "IN_PROGRESS" ? "default" : "secondary"
                    }
                    className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  >
                    {student.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-neutral-600">Gender</p>
                    <p className="font-medium text-neutral-800">
                      {student.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Date of Birth</p>
                    <p className="font-medium text-neutral-800">
                      {formatDate(student.dob)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Branch</p>
                    <p className="font-medium text-neutral-800">
                      Branch {student.branch}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Starting Grade</p>
                    <p className="font-medium text-neutral-800">
                      Grade {student.deemcee_starting_grade}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-neutral-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-neutral-800">
                  Parent Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-neutral-600">Email</p>
                  <p className="font-medium text-neutral-800">
                    {student.parent.email}
                  </p>
                  <p className="text-sm text-neutral-600 mt-2">Username</p>
                  <p className="font-medium text-neutral-800">
                    {student.parent.username}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="enrollments" className="space-y-4">
            <TabsList className="bg-white/50 border border-neutral-200">
              <TabsTrigger
                value="enrollments"
                className="data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-900 flex items-center gap-2"
              >
                <Book className="h-4 w-4" />
                Enrollments
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-900 flex items-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                Payments
              </TabsTrigger>
            </TabsList>

            {/* Enrollments Tab */}
            <TabsContent value="enrollments" className="space-y-4">
              <Card className="bg-white/50 backdrop-blur-sm border-neutral-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-neutral-50 hover:bg-neutral-100">
                        <TableHead className="text-neutral-700">ID</TableHead>
                        <TableHead className="text-neutral-700">
                          Start Date
                        </TableHead>
                        <TableHead className="text-neutral-700">
                          Grade
                        </TableHead>
                        <TableHead className="text-neutral-700">
                          Status
                        </TableHead>
                        <TableHead className="text-neutral-700">
                          Remaining Lessons
                        </TableHead>
                        <TableHead className="text-neutral-700">
                          Freeze Lessons
                        </TableHead>
                        <TableHead className="text-neutral-700">
                          Progress
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {student.enrolments.map((enrollment) => (
                        <TableRow
                          key={enrollment.id}
                          className="hover:bg-neutral-50"
                        >
                          <TableCell className="text-neutral-800">
                            {enrollment.id}
                          </TableCell>
                          <TableCell className="text-neutral-800">
                            {formatDate(enrollment.start_date)}
                          </TableCell>
                          <TableCell className="text-neutral-800">
                            Grade {enrollment.grade}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                enrollment.is_active ? "default" : "secondary"
                              }
                              className="bg-emerald-100 text-emerald-700"
                            >
                              {enrollment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-neutral-800">
                            {enrollment.remaining_lessons}
                          </TableCell>
                          <TableCell className="text-neutral-800">
                            {enrollment.freeze_lessons}
                          </TableCell>
                          <TableCell className="w-[200px]">
                            <Progress
                              value={(enrollment.remaining_lessons / 25) * 100}
                              className="h-2 bg-neutral-200"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-4">
              <Card className="bg-white/50 backdrop-blur-sm border-neutral-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-neutral-50 hover:bg-neutral-100">
                        <TableHead className="text-neutral-700">ID</TableHead>
                        <TableHead className="text-neutral-700">
                          Grade
                        </TableHead>
                        <TableHead className="text-neutral-700">
                          Term Fees
                        </TableHead>
                        <TableHead className="text-neutral-700">
                          Paid Amount
                        </TableHead>
                        <TableHead className="text-neutral-700">
                          Outstanding
                        </TableHead>
                        <TableHead className="text-neutral-700">
                          Status
                        </TableHead>
                        <TableHead className="text-neutral-700">
                          Progress
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {student.payment.map((payment) => (
                        <TableRow
                          key={payment.id}
                          className="hover:bg-neutral-50"
                        >
                          <TableCell className="text-neutral-800">
                            {payment.id}
                          </TableCell>
                          <TableCell className="text-neutral-800">
                            Grade {payment.grade}
                          </TableCell>
                          <TableCell className="text-neutral-800">
                            ${payment["term fees"]}
                          </TableCell>
                          <TableCell className="text-neutral-800">
                            ${payment.paid}
                          </TableCell>
                          <TableCell className="text-rose-600">
                            ${payment.outstanding}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="warning"
                              className="bg-amber-100 text-amber-700"
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="w-[200px]">
                            <Progress
                              value={
                                (payment.paid / payment["term fees"]) * 100
                              }
                              className="h-2 bg-neutral-200"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
