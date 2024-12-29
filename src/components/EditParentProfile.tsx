"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
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
import {
  EditProps,
  ParentFullDetailsData,
  UpdateUserFullDetailsError,
} from "@/types/index";
import { cn } from "@/lib/utils";
import {
  getParentFullDetails,
  updateUserFullDetails,
} from "@/lib/actions/user.actions";
import { Badge } from "./ui/badge";

interface FormFieldProps {
  id: string;
  label: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
  readOnly?: boolean;
  min?: string;
  className?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({
  id,
  label,
  defaultValue,
  type = "text",
  required = false,
  readOnly = false,
  min,
  className,
  name,
  onChange,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm sm:text-base" htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        name={name}
        defaultValue={defaultValue}
        type={type}
        min={min}
        className={cn(
          "text-sm sm:text-base",
          readOnly && "bg-gray-50",
          className
        )}
        readOnly={readOnly}
        onChange={onChange}
      />
    </div>
  );
};

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
  const [zoderror, setZodError] = useState<UpdateUserFullDetailsError | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(
    updateUserFullDetails,
    SERVER_ACTION_STATE
  );
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = new FormData();

    // Append all form data to FormData object
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formDataObj.append(key, value.toString());
      }
    });
    // Call your server action with the FormData object
    await action(formDataObj);
  };

  useEffect(() => {
    if (parentData) {
      setFormData({
        // Basic Info
        id: id,
        first_name: parentData.first_name,
        last_name: parentData.last_name,
        username: parentData.username,
        email: parentData.email,

        // Personal Details
        gender: parentData.details.gender,
        dob: parentData.created_at,
        ic_number: parentData.details.ic_number,
        occupation: parentData.details.occupation,
        personal_email: parentData.details.personal_email,

        // Address
        address_line_1: parentData.address.address_line_1,
        address_line_2: parentData.address.address_line_2,
        address_line_3: parentData.address.address_line_3,
        city: parentData.address.city,
        postcode: parentData.address.postcode,
        state: parentData.address.state,

        // ... add other fields as needed
      });
    }
  }, [parentData]);

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      setOpen(false);
      toast({
        title: "Success",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-success-100"),
        duration: 3000,
      });
    }
    if (state.error) {
      toast({
        title: "Error",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
    }
  }, [state, toast]);

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
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4" ref={formRef}>
            <Tabs defaultValue="basic" className="space-y-6">
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <TabsList className="bg-white border w-full sm:w-auto flex whitespace-nowrap">
                  <TabsTrigger value="basic" className="text-sm sm:text-base">
                    Basic Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="personal"
                    className="text-sm sm:text-base"
                  >
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
                    <FormField
                      id="first_name"
                      label="First Name"
                      name="first_name"
                      defaultValue={parentData?.first_name}
                      onChange={handleInputChange}
                    />
                    <FormField
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      defaultValue={parentData?.last_name}
                      onChange={handleInputChange}
                    />
                    <FormField
                      id="username"
                      label="Username"
                      name="username"
                      defaultValue={parentData?.username}
                      onChange={handleInputChange}
                      required
                    />
                    <FormField
                      id="email"
                      label="Email"
                      name="email"
                      defaultValue={parentData?.email}
                      onChange={handleInputChange}
                      type="email"
                      required
                    />
                  </div>
                </Card>
              </TabsContent>

              {/* Personal Details */}
              <TabsContent value="personal">
                <Card className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      id="gender"
                      label="Gender"
                      name="gender"
                      defaultValue={parentData?.details.gender}
                      onChange={handleInputChange}
                    />
                    <FormField
                      id="dob"
                      label="Date of Birth"
                      name="dob"
                      defaultValue={parentData?.created_at}
                      onChange={handleInputChange}
                      type="date"
                    />
                    <FormField
                      id="ic_number"
                      label="IC Number"
                      name="ic_number"
                      defaultValue={parentData?.details.ic_number}
                      onChange={handleInputChange}
                    />
                    <FormField
                      id="occupation"
                      label="Occupation"
                      name="occupation"
                      defaultValue={parentData?.details.occupation}
                      onChange={handleInputChange}
                    />
                    <FormField
                      id="personal_email"
                      label="Personal Email"
                      name="personal_email"
                      defaultValue={parentData?.details.personal_email}
                      onChange={handleInputChange}
                      type="email"
                    />
                  </div>
                </Card>
              </TabsContent>

              {/* Family Information */}
              <TabsContent value="family">
                <Card className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      id="spouse_name"
                      label="Spouse Name"
                      name="spouse_name"
                      defaultValue={parentData?.details.spouse_name}
                      onChange={handleInputChange}
                    />
                    <FormField
                      id="spouse_phone"
                      label="Spouse Phone"
                      name="spouse_phone"
                      defaultValue={parentData?.details.spouse_phone}
                      onChange={handleInputChange}
                    />
                    <FormField
                      id="spouse_occupation"
                      label="Spouse Occupation"
                      name="spouse_occupation"
                      defaultValue={parentData?.details.spouse_occupation}
                      onChange={handleInputChange}
                    />
                    <FormField
                      id="no_of_children"
                      label="Number of Children"
                      name="no_of_children"
                      defaultValue={parentData?.details.no_of_children}
                      onChange={handleInputChange}
                      type="number"
                      min="0"
                    />
                  </div>
                </Card>
              </TabsContent>

              {/* Banking Details */}
              <TabsContent value="banking">
                <Card className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    <FormField
                      id="bank_name"
                      label="Bank Name"
                      name="bank_name"
                      defaultValue={parentData?.details.bank_name}
                      onChange={handleInputChange}
                    />
                    <FormField
                      id="bank_account_name"
                      label="Account Name"
                      name="bank_account_name"
                      defaultValue={parentData?.details.bank_account_name}
                      onChange={handleInputChange}
                    />
                    <FormField
                      id="bank_account_number"
                      label="Account Number"
                      name="bank_account_number"
                      defaultValue={parentData?.details.bank_account_number}
                      onChange={handleInputChange}
                    />
                  </div>
                </Card>
              </TabsContent>

              {/* Address */}
              <TabsContent value="address">
                <Card className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    <FormField
                      id="address_line_1"
                      label="Address Line 1"
                      name="address_line_1"
                      defaultValue={parentData?.address.address_line_1}
                      onChange={handleInputChange}
                      required
                    />
                    <FormField
                      id="address_line_2"
                      label="Address Line 2"
                      name="address_line_2"
                      defaultValue={parentData?.address.address_line_2}
                      onChange={handleInputChange}
                    />
                    <FormField
                      id="address_line_3"
                      label="Address Line 3"
                      name="address_line_3"
                      defaultValue={parentData?.address.address_line_3}
                      onChange={handleInputChange}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      <FormField
                        id="postcode"
                        label="Postcode"
                        name="postcode"
                        defaultValue={parentData?.address.postcode}
                        onChange={handleInputChange}
                        required
                      />
                      <FormField
                        id="city"
                        label="City"
                        name="city"
                        defaultValue={parentData?.address.city}
                        onChange={handleInputChange}
                        required
                      />
                      <FormField
                        id="state"
                        label="State"
                        name="state"
                        defaultValue={parentData?.address.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Children Section */}
              <TabsContent value="chilren" className="h-[50vh] relative">
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
                  <div className="space-y-6">
                    {parentData?.children?.map((child, index) => (
                      <Card
                        key={child.id}
                        className={cn(
                          "p-4 sm:p-6 space-y-6",
                          { "bg-slate-100": index % 2 === 0 },
                          { "bg-yellow-2": index % 2 !== 0 }
                        )}
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
                            <FormField
                              id="fullname"
                              label="Full Name"
                              defaultValue={child.fullname}
                              readOnly
                            />
                            <FormField
                              id="deemcee_starting_grade"
                              label="Starting Grade"
                              defaultValue={child.deemcee_starting_grade.toString()}
                              type="number"
                              readOnly
                            />
                            <FormField
                              id="enrolment_date"
                              label="Enrolment Date"
                              defaultValue={child.enrolment_date}
                              type="date"
                              readOnly
                            />
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
                                <FormField
                                  id="start_date"
                                  label="Start Date"
                                  defaultValue={enrolment.start_date}
                                  type="date"
                                  readOnly
                                />
                                <FormField
                                  id="grade"
                                  label="Current Grade"
                                  defaultValue={enrolment.grade.toString()}
                                  type="number"
                                  readOnly
                                />
                                <FormField
                                  id="remaining_lessons"
                                  label="Remaining Lessons"
                                  defaultValue={enrolment.remaining_lessons.toString()}
                                  type="number"
                                  readOnly
                                />
                                <FormField
                                  id="freeze_lessons"
                                  label="Freeze Lessons"
                                  defaultValue={enrolment.freeze_lessons.toString()}
                                  type="number"
                                  readOnly
                                />
                              </div>
                            </div>
                          ))}

                        {(!child.enrolments ||
                          child.enrolments.length === 0) && (
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
        )}
      </DialogContent>
    </Dialog>
  );
};
