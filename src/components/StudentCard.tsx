import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book, CreditCard, Check, X, CheckCircle } from "lucide-react";
import { cn, formatDateTime, getCategoryByGrade } from "@/lib/utils";
import { StudentCardProps } from "@/types/student";
import StudentEnrolmentActions from "./StudentEnrolmentActions";
import EditVideoAssignment from "./EditVideoAssignment";
import MakePayment from "./MakePayment";
import CreateEnrolment from "./CreateEnrolment";

export function StudentCard({ student }: StudentCardProps) {
  return (
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
                className={cn({
                  "bg-emerald-100 text-emerald-700":
                    student.status === "IN_PROGRESS",
                  "bg-red-100 text-red-700": student.status === "DROPPED_OUT",
                  "bg-yellow-100 text-yellow-700":
                    student.status === "GRADUATED",
                })}
              >
                {student.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-neutral-600">Gender</p>
                <p className="font-medium text-neutral-800">{student.gender}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Date of Birth</p>
                <p className="font-medium text-neutral-800">
                  {formatDateTime(new Date(student.dob)).dateOnly}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Branch</p>
                <p className="font-medium text-neutral-800">{student.branch}</p>
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

        {student.parent && (
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
        )}
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="enrollments" className="space-y-4">
        <TabsList className="bg-white/50 border border-neutral-200">
          <TabsTrigger
            value="enrollments"
            className="data-[state=active]:bg-green-200 data-[state=active]:text-neutral-900 flex items-center gap-2"
          >
            <Book className="h-4 w-4" />
            Enrollments
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="data-[state=active]:bg-green-200 data-[state=active]:text-neutral-900 flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
        </TabsList>

        {/* Enrollments Tab */}
        {student.enrolments.length === 0 ? (
          <div className="p-4 flex justify-center">
            <CreateEnrolment id={student.id} />
          </div>
        ) : (
          <TabsContent value="enrollments" className="space-y-4">
            <Card className="bg-white/50 backdrop-blur-sm border-neutral-200">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-100">
                      <TableHead className="text-neutral-700">Grade</TableHead>
                      <TableHead className="text-neutral-700">
                        Start Date
                      </TableHead>
                      <TableHead className="text-neutral-700">
                        End Date
                      </TableHead>
                      <TableHead className="text-neutral-700">Status</TableHead>
                      <TableHead className="text-neutral-700">Videos</TableHead>
                      <TableHead className="text-neutral-700">
                        Remaining Lessons
                      </TableHead>
                      <TableHead className="text-neutral-700">
                        Is Active
                      </TableHead>
                      <TableHead className="text-neutral-700">
                        Extension
                      </TableHead>
                      <TableHead className="text-neutral-700">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.enrolments?.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell className="text-neutral-800">
                          Grade {enrollment.grade}
                        </TableCell>
                        <TableCell className="text-neutral-800">
                          {
                            formatDateTime(new Date(enrollment.start_date))
                              .dateOnly
                          }
                        </TableCell>
                        <TableCell className="text-neutral-800">
                          {
                            formatDateTime(new Date(enrollment.end_date))
                              .dateOnly
                          }
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

                        <TableCell className="text-neutral-800 flex flex-col items-start">
                          {enrollment.video_assignments.map((video) => (
                            <EditVideoAssignment
                              key={video.video_number}
                              video={video}
                              student_id={student.id}
                              category={getCategoryByGrade(enrollment.grade)}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="text-neutral-800">
                          {enrollment.remaining_lessons}
                        </TableCell>
                        <TableCell className="text-neutral-800 justify-center">
                          {enrollment.is_active ? (
                            <div className="rounded-full bg-green-100 p-1 w-fit">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="rounded-full bg-red-100 p-1 w-fit">
                              <X className="h-4 w-4 text-red-600" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {enrollment.extensions.total > 0 ? (
                            enrollment.extensions.extension.map((ext) => (
                              <div
                                className="flex flex-col gap-2 text-sm"
                                key={ext.id}
                              >
                                <div className="text-neutral-800">
                                  {
                                    formatDateTime(new Date(ext.start_date))
                                      .dateOnly
                                  }
                                </div>
                                <div className="text-neutral-800">
                                  <Badge
                                    variant="secondary"
                                    className={cn(
                                      ext.status === "EXTENDED"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-orange-100 text-orange-700"
                                    )}
                                  >
                                    {ext.status}
                                  </Badge>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="flex gap-2 text-red-500">
                              <Badge
                                variant="secondary"
                                className="bg-purple-100 text-purple-700"
                              >
                                Never
                              </Badge>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="w-[100px]">
                          <StudentEnrolmentActions
                            enrolment={enrollment}
                            studentId={student.id}
                            extensions={enrollment.extensions.total}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Payments Tab */}
        {student.payments.length !== 0 && (
          <TabsContent value="payments" className="space-y-4">
            <Card className="bg-white/50 backdrop-blur-sm border-neutral-200">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50">
                      <TableHead className="text-neutral-700">Grade</TableHead>
                      <TableHead className="text-neutral-700">Type</TableHead>
                      <TableHead className="text-neutral-700">
                        Term Fees
                      </TableHead>
                      <TableHead className="text-neutral-700">
                        Discount
                      </TableHead>
                      <TableHead className="text-neutral-700">
                        Early Advance Rebate
                      </TableHead>
                      <TableHead className="text-neutral-700">
                        Paid Amount
                      </TableHead>
                      <TableHead className="text-neutral-700">
                        Credit Balance
                      </TableHead>
                      <TableHead className="text-neutral-700">
                        Post-Payment Balance
                      </TableHead>
                      <TableHead className="text-neutral-700">Status</TableHead>
                      <TableHead className="text-neutral-700">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.payments?.map((payment) => (
                      <TableRow
                        key={payment.id}
                        className="hover:bg-neutral-50"
                      >
                        <TableCell className="text-neutral-800">
                          G{payment.grade}
                        </TableCell>
                        <TableCell className="text-neutral-800">
                          {payment.enrolment_type}
                        </TableCell>
                        <TableCell className="text-neutral-800">
                          {payment.amount}
                        </TableCell>
                        <TableCell className="text-neutral-800">
                          {payment.discount}
                        </TableCell>
                        <TableCell className="text-neutral-800">
                          {payment.early_advance_rebate}
                        </TableCell>
                        <TableCell className="text-neutral-800">
                          {payment.paid_amount}
                        </TableCell>
                        <TableCell className="text-orange-600">
                          {payment.pre_outstanding}
                        </TableCell>
                        <TableCell className="text-emerald-600">
                          {payment.post_outstanding}
                        </TableCell>
                        <TableCell>
                          {payment.status === "PAID" ? (
                            <div className="flex gap-2 text-green-500">
                              <CheckCircle size={18} />
                              <span>Paid</span>
                            </div>
                          ) : (
                            <MakePayment id={payment.id} />
                          )}
                        </TableCell>
                        <TableCell className="w-[100px]">View</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
