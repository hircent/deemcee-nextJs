import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Parent {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

interface Enrolment {
  id: number;
  start_date: string;
  status: string;
  remaining_lessons: number;
  is_active: boolean;
  freeze_lessons: number;
  grade: number;
}

interface Payment {
  id: number;
  grade: number;
  status: string;
  term_fees: number;
  paid: number;
  outstanding: number;
}

interface StudentData {
  id: number;
  first_name: string;
  last_name: string | null;
  fullname: string;
  gender: string;
  dob: string;
  school: string;
  deemcee_starting_grade: number;
  status: string;
  enrolment_date: string;
  branch: number;
  parent: Parent;
  enrolments: Enrolment[];
  payment: Payment[];
}

interface StudentCardProps {
  data: StudentData;
}

export function StudentCard({ data }: StudentCardProps) {
  return (
    <Card className="bg-[#FAFBEE] border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#2C3E50]">
          {data.fullname}
        </CardTitle>
        <CardDescription className="text-[#34495E]">
          Student ID: {data.id} | Gender: {data.gender} | DOB: {data.dob}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[#2C3E50]">
              School Information
            </h3>
            <p className="text-[#34495E]">School: {data.school}</p>
            <p className="text-[#34495E]">
              Grade: {data.deemcee_starting_grade}
            </p>
          </div>

          {/* Tabs for Enrolments and Payments */}
          <Tabs defaultValue="enrolments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enrolments">Enrolments</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            {/* Enrolments Tab */}
            <TabsContent value="enrolments">
              <Accordion type="single" collapsible className="w-full">
                {data.enrolments.map((enrolment) => (
                  <AccordionItem
                    key={enrolment.id}
                    value={`enrolment-${enrolment.id}`}
                  >
                    <AccordionTrigger className="text-[#2C3E50] hover:no-underline">
                      <div className="flex items-center space-x-4">
                        <span>Enrolment ID: {enrolment.id}</span>
                        <Badge
                          variant={
                            enrolment.status === "IN_PROGRESS"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {enrolment.status}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Remaining Lessons</TableHead>
                            <TableHead>Freeze Lessons</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>{enrolment.start_date}</TableCell>
                            <TableCell>{enrolment.remaining_lessons}</TableCell>
                            <TableCell>{enrolment.freeze_lessons}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments">
              <Accordion type="single" collapsible className="w-full">
                {data.payment.map((payment) => (
                  <AccordionItem
                    key={payment.id}
                    value={`payment-${payment.id}`}
                  >
                    <AccordionTrigger className="text-[#2C3E50] hover:no-underline">
                      <div className="flex items-center space-x-4">
                        <span>Payment ID: {payment.id}</span>
                        <Badge
                          variant={
                            payment.status === "pending"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Grade</TableHead>
                            <TableHead>Term Fees</TableHead>
                            <TableHead>Paid</TableHead>
                            <TableHead>Outstanding</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>{payment.grade}</TableCell>
                            <TableCell>${payment.term_fees}</TableCell>
                            <TableCell>${payment.paid}</TableCell>
                            <TableCell>${payment.outstanding}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-[#34495E]">
        Parent: {data.parent.username} ({data.parent.email})
      </CardFooter>
    </Card>
  );
}
