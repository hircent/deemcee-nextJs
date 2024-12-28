"use client";

import { Button } from "@/components/ui/button";
import { Pencil, PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { useFormState } from "react-dom";
import { SERVER_ACTION_STATE } from "@/constants/index";
import SubmitButton from "./SubmitButton";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditProps, ParentFullDetailsData } from "@/types/index";
import { cn } from "@/lib/utils";
import { getParentFullDetails } from "@/lib/actions/user.actions";
import { Badge } from "./ui/badge";

const EnrolmentStatus = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "IN_PROGRESS":
        return "bg-green-100 text-green-800";
      case "GRADUATED":
        return "bg-blue-100 text-blue-800";
      case "DROPPED_OUT":
        return "bg-red-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Badge
      className={`${getStatusColor(status)} font-medium text-xs px-2 py-1`}
    >
      {status.replace("_", " ")}
    </Badge>
  );
};

export const EditParentProfile = ({ type, id }: EditProps) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [parentData, setParentData] = useState<
    ParentFullDetailsData | undefined
  >(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const getParentDetails = async () => {
    setLoading(true);
    try {
      const parentData = await getParentFullDetails({ id });
      setParentData(parentData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch parent details:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="group p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => getParentDetails()}
        >
          <Pencil
            size={18}
            className="text-gray-500 group-hover:text-blue-500 transition-colors"
          />{" "}
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[95vw] max-w-5xl mx-auto h-auto overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6 rounded-lg">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Make changes to your details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action="" className="mt-4" ref={formRef}>
          <Tabs defaultValue="basic" className="space-y-6">
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <TabsList className="bg-white border w-full sm:w-auto flex whitespace-nowrap">
                <TabsTrigger value="basic" className="text-sm sm:text-base">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="personal" className="text-sm sm:text-base">
                  Personal
                </TabsTrigger>
                <TabsTrigger value="family" className="text-sm sm:text-base">
                  Family
                </TabsTrigger>
                <TabsTrigger value="banking" className="text-sm sm:text-base">
                  Banking
                </TabsTrigger>
                <TabsTrigger value="address" className="text-sm sm:text-base">
                  Address
                </TabsTrigger>
                <TabsTrigger value="chilren" className="text-sm sm:text-base">
                  Children
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Basic Information */}
            <TabsContent value="basic">
              <Card className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">First Name</Label>
                    <Input
                      defaultValue={parentData?.first_name}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Last Name</Label>
                    <Input
                      defaultValue={parentData?.last_name}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Username</Label>
                    <Input
                      defaultValue={parentData?.username}
                      disabled
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Email</Label>
                    <Input
                      defaultValue={parentData?.email}
                      type="email"
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Personal Details */}
            <TabsContent value="personal">
              <Card className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Gender</Label>
                    <Input
                      defaultValue={parentData?.details.gender}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Date of Birth
                    </Label>
                    <Input
                      defaultValue={parentData?.created_at}
                      type="date"
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">IC Number</Label>
                    <Input
                      defaultValue={parentData?.details.ic_number}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Occupation</Label>
                    <Input
                      defaultValue={parentData?.details.occupation}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Personal Email
                    </Label>
                    <Input
                      defaultValue={parentData?.details.personal_email}
                      type="email"
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Family Information */}
            <TabsContent value="family">
              <Card className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Spouse Name</Label>
                    <Input
                      defaultValue={parentData?.details.spouse_name}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Spouse Phone</Label>
                    <Input
                      defaultValue={parentData?.details.spouse_phone}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Spouse Occupation
                    </Label>
                    <Input
                      defaultValue={parentData?.details.spouse_occupation}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Number of Children
                    </Label>
                    <Input
                      defaultValue={parentData?.details.no_of_children}
                      type="number"
                      min="0"
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Banking Details */}
            <TabsContent value="banking">
              <Card className="p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Bank Name</Label>
                    <Input
                      defaultValue={parentData?.details.bank_name}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Account Name</Label>
                    <Input
                      defaultValue={parentData?.details.bank_account_name}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Account Number
                    </Label>
                    <Input
                      defaultValue={parentData?.details.bank_account_number}
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Address */}
            <TabsContent value="address">
              <Card className="p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Address Line 1
                    </Label>
                    <Input
                      defaultValue={parentData?.address.address_line_1}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Address Line 2
                    </Label>
                    <Input
                      defaultValue={parentData?.address.address_line_2}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">
                      Address Line 3
                    </Label>
                    <Input
                      defaultValue={parentData?.address.address_line_3}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm sm:text-base">Postcode</Label>
                      <Input
                        defaultValue={parentData?.address.postcode}
                        className="text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm sm:text-base">City</Label>
                      <Input
                        defaultValue={parentData?.address.city}
                        className="text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm sm:text-base">State</Label>
                      <Input
                        defaultValue={parentData?.address.state}
                        className="text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Children Section */}
            <TabsContent value="chilren" className="h-[60vh] relative">
              <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  {parentData?.children?.map((child, index) => (
                    <Card
                      key={child.id}
                      className={`p-4 sm:p-6 space-y-6 ${
                        index % 2 === 0 ? "bg-slate-100" : "bg-blue-50"
                      }`}
                    >
                      {/* Child's Basic Information */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            Child Information
                          </h3>
                          <EnrolmentStatus status={child.status} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-2">
                            <Label className="text-sm sm:text-base">
                              Full Name
                            </Label>
                            <Input
                              value={child.fullname}
                              className="text-sm sm:text-base bg-gray-50"
                              readOnly
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm sm:text-base">
                              Starting Grade
                            </Label>
                            <Input
                              value={child.deemcee_starting_grade.toString()}
                              type="number"
                              className="text-sm sm:text-base bg-gray-50"
                              readOnly
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm sm:text-base">
                              Enrolment Date
                            </Label>
                            <Input
                              value={child.enrolment_date}
                              type="date"
                              className="text-sm sm:text-base bg-gray-50"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>

                      {/* Current Enrolment Information */}
                      {child.enrolments &&
                        child.enrolments.length > 0 &&
                        child.enrolments.map((enrolment) => (
                          <div key={enrolment.id} className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold">
                                Current Enrolment
                              </h3>
                              <Badge
                                className={
                                  enrolment.is_active
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }
                              >
                                {enrolment.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                              <div className="space-y-2">
                                <Label className="text-sm sm:text-base">
                                  Start Date
                                </Label>
                                <Input
                                  value={enrolment.start_date}
                                  type="date"
                                  className="text-sm sm:text-base bg-gray-50"
                                  readOnly
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm sm:text-base">
                                  Current Grade
                                </Label>
                                <Input
                                  value={enrolment.grade.toString()}
                                  type="number"
                                  className="text-sm sm:text-base bg-gray-50"
                                  readOnly
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm sm:text-base">
                                  Remaining Lessons
                                </Label>
                                <Input
                                  value={enrolment.remaining_lessons.toString()}
                                  type="number"
                                  className="text-sm sm:text-base bg-gray-50"
                                  readOnly
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm sm:text-base">
                                  Freeze Lessons
                                </Label>
                                <Input
                                  value={enrolment.freeze_lessons.toString()}
                                  type="number"
                                  className="text-sm sm:text-base bg-gray-50"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                      {(!child.enrolments || child.enrolments.length === 0) && (
                        <div className="text-center text-gray-500">
                          No current enrollments
                        </div>
                      )}
                    </Card>
                  ))}

                  {parentData?.children.length === 0 && (
                    <Card className="p-4 sm:p-6">
                      <p className="text-center text-gray-500">
                        No children found
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <SubmitButton label="Save" submitLabel="Saving" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
