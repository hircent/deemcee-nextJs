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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import EnrolmentStatusBadge from "./EnrolmentStatusBadge";
import { Badge } from "./ui/badge";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

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
  const pathname = usePathname();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    isSelect?: boolean
  ) => {
    if (isSelect) {
      setFormData((prev) => ({
        ...prev,
        gender: e,
      }));
    } else {
      // Cast e to HTMLInputElement to access name and value properties
      const input = (e as React.ChangeEvent<HTMLInputElement>).target;
      setFormData((prev) => ({
        ...prev,
        [input.name]: input.value,
      }));
    }
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
        id: parentData.id,
        type: "parent",
        first_name: parentData.first_name,
        last_name: parentData.last_name,
        username: parentData.username,
        email: parentData.email,

        // Personal Details
        gender: parentData.details.gender,
        dob: parentData.details.dob,
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

        url: pathname,
        // ... add other fields as needed
      });
    }
  }, [parentData, pathname]);

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      setOpen(false);
      setZodError(null);
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
          <Loader />
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
                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="username"
                        >
                          Username <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          defaultValue={parentData?.username}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Username"
                        />
                      </div>
                      <small className="text-red-500">
                        {zoderror?.username?.[0]}
                      </small>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label className="text-sm sm:text-base" htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          defaultValue={parentData?.email}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Email"
                        />
                      </div>
                      <small className="text-red-500">
                        {zoderror?.email?.[0]}
                      </small>
                    </div>
                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="first_name"
                        >
                          First Name
                        </Label>
                        <Input
                          id="first_name"
                          name="first_name"
                          defaultValue={parentData?.first_name}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your First Name"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="last_name"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="last_name"
                          name="last_name"
                          defaultValue={parentData?.last_name}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Last Name"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Personal Details */}
              <TabsContent value="personal">
                <Card className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <div className="space-y-2">
                        <Label className="text-sm sm:text-base">
                          Gender <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          defaultValue={parentData?.details.gender}
                          onValueChange={(value) => {
                            handleInputChange(value, true);
                          }}
                        >
                          <SelectTrigger className="w-full text-sm sm:text-base col-span-2">
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                          <SelectContent className="select-content">
                            <SelectItem
                              key="male"
                              value="male"
                              className="select-item"
                            >
                              Male
                            </SelectItem>
                            <SelectItem
                              key="female"
                              value="female"
                              className="select-item"
                            >
                              Female
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <small className="text-red-500">
                        {zoderror?.gender?.[0]}
                      </small>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label className="text-sm sm:text-base" htmlFor="dob">
                          Date of Birth
                        </Label>
                        <Input
                          id="dob"
                          name="dob"
                          type="date"
                          defaultValue={parentData?.details.dob}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Date of Birth"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="ic_number"
                        >
                          IC Number
                        </Label>
                        <Input
                          id="ic_number"
                          name="ic_number"
                          defaultValue={parentData?.details.ic_number}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your IC Number"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="occupation"
                        >
                          Occupation
                        </Label>
                        <Input
                          id="occupation"
                          name="occupation"
                          defaultValue={parentData?.details.occupation}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Occupation"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="personal_email"
                        >
                          Personal Email
                        </Label>
                        <Input
                          id="personal_email"
                          name="personal_email"
                          defaultValue={parentData?.details.personal_email}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Personal Email"
                        />
                      </div>
                      <small className="text-red-500">
                        {zoderror?.personal_email?.[0]}
                      </small>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Family Information */}
              <TabsContent value="family">
                <Card className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="spouse_name"
                        >
                          Spouse Name
                        </Label>
                        <Input
                          id="spouse_name"
                          name="spouse_name"
                          defaultValue={parentData?.details.spouse_name}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Spouse Name"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="spouse_phone"
                        >
                          Spouse Phone
                        </Label>
                        <Input
                          id="spouse_phone"
                          name="spouse_phone"
                          defaultValue={parentData?.details.spouse_phone}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Spouse Phone"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="spouse_occupation"
                        >
                          Spouse Occupation
                        </Label>
                        <Input
                          id="spouse_occupation"
                          name="spouse_occupation"
                          defaultValue={parentData?.details.spouse_occupation}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Spouse Occupation"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="no_of_children"
                        >
                          Number of Children
                        </Label>
                        <Input
                          id="no_of_children"
                          name="no_of_children"
                          type="number"
                          defaultValue={parentData?.details.no_of_children}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Number of Children"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Banking Details */}
              <TabsContent value="banking">
                <Card className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="bank_name"
                        >
                          Bank Name
                        </Label>
                        <Input
                          id="bank_name"
                          name="bank_name"
                          defaultValue={parentData?.details.bank_name}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Bank Name"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="bank_account_name"
                        >
                          Account Name
                        </Label>
                        <Input
                          id="bank_account_name"
                          name="bank_account_name"
                          defaultValue={parentData?.details.bank_account_name}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Account Name"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="bank_account_number"
                        >
                          Account Number
                        </Label>
                        <Input
                          id="bank_account_number"
                          name="bank_account_number"
                          defaultValue={parentData?.details.bank_account_number}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Account Number"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Address */}
              <TabsContent value="address">
                <Card className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="address_line_1"
                        >
                          Address Line 1 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="address_line_1"
                          name="address_line_1"
                          defaultValue={parentData?.address.address_line_1}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Address Line 1"
                        />
                      </div>
                      <small className="text-red-500">
                        {zoderror?.address_line_1?.[0]}
                      </small>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="address_line_2"
                        >
                          Address Line 2
                        </Label>
                        <Input
                          id="address_line_2"
                          name="address_line_2"
                          defaultValue={parentData?.address.address_line_2}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Address Line 2"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <Label
                          className="text-sm sm:text-base"
                          htmlFor="address_line_3"
                        >
                          Address Line 3
                        </Label>
                        <Input
                          id="address_line_3"
                          name="address_line_3"
                          defaultValue={parentData?.address.address_line_3}
                          className="text-sm sm:text-base"
                          onChange={handleInputChange}
                          placeholder="Enter your Address Line 3"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      <div>
                        <div className="space-y-2">
                          <Label
                            className="text-sm sm:text-base"
                            htmlFor="postcode"
                          >
                            Postcode <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="postcode"
                            name="postcode"
                            type="number"
                            defaultValue={parentData?.address.postcode}
                            className="text-sm sm:text-base"
                            onChange={handleInputChange}
                            placeholder="Enter your Postcode"
                          />
                        </div>
                        <small className="text-red-500">
                          {zoderror?.postcode?.[0]}
                        </small>
                      </div>

                      <div>
                        <div className="space-y-2">
                          <Label
                            className="text-sm sm:text-base"
                            htmlFor="city"
                          >
                            City <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            defaultValue={parentData?.address.city}
                            className="text-sm sm:text-base"
                            onChange={handleInputChange}
                            placeholder="Enter your City"
                          />
                        </div>
                        <small className="text-red-500">
                          {zoderror?.city?.[0]}
                        </small>
                      </div>

                      <div>
                        <div className="space-y-2">
                          <Label
                            className="text-sm sm:text-base"
                            htmlFor="state"
                          >
                            State <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            defaultValue={parentData?.address.state}
                            className="text-sm sm:text-base"
                            onChange={handleInputChange}
                            placeholder="Enter your State"
                          />
                        </div>
                        <small className="text-red-500">
                          {zoderror?.state?.[0]}
                        </small>
                      </div>
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
                            <EnrolmentStatusBadge status={child.status} />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                              <div className="space-y-2">
                                <Label
                                  className="text-sm sm:text-base"
                                  htmlFor="fullname"
                                >
                                  Full Name
                                </Label>
                                <Input
                                  id="fullname"
                                  name="fullname"
                                  defaultValue={child.fullname}
                                  className="text-sm sm:text-base"
                                  readOnly
                                />
                              </div>
                            </div>

                            <div>
                              <div className="space-y-2">
                                <Label
                                  className="text-sm sm:text-base"
                                  htmlFor="deemcee_starting_grade"
                                >
                                  Starting Grade
                                </Label>
                                <Input
                                  id="deemcee_starting_grade"
                                  name="deemcee_starting_grade"
                                  defaultValue={child.deemcee_starting_grade.toString()}
                                  className="text-sm sm:text-base"
                                  readOnly
                                />
                              </div>
                            </div>

                            <div>
                              <div className="space-y-2">
                                <Label
                                  className="text-sm sm:text-base"
                                  htmlFor="enrolment_date"
                                >
                                  Enrolment Date
                                </Label>
                                <Input
                                  id="enrolment_date"
                                  name="enrolment_date"
                                  defaultValue={child.enrolment_date}
                                  className="text-sm sm:text-base"
                                  readOnly
                                />
                              </div>
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
                                <div>
                                  <div className="space-y-2">
                                    <Label
                                      className="text-sm sm:text-base"
                                      htmlFor="start_date"
                                    >
                                      Start Date
                                    </Label>
                                    <Input
                                      id="start_date"
                                      name="start_date"
                                      defaultValue={enrolment.start_date}
                                      className="text-sm sm:text-base"
                                      readOnly
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="space-y-2">
                                    <Label
                                      className="text-sm sm:text-base"
                                      htmlFor="grade"
                                    >
                                      Current Grade
                                    </Label>
                                    <Input
                                      id="grade"
                                      name="grade"
                                      defaultValue={enrolment.grade.toString()}
                                      className="text-sm sm:text-base"
                                      readOnly
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="space-y-2">
                                    <Label
                                      className="text-sm sm:text-base"
                                      htmlFor="remaining_lessons"
                                    >
                                      Remaining Lessons
                                    </Label>
                                    <Input
                                      id="remaining_lessons"
                                      name="remaining_lessons"
                                      defaultValue={enrolment.remaining_lessons.toString()}
                                      className="text-sm sm:text-base"
                                      readOnly
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="space-y-2">
                                    <Label
                                      className="text-sm sm:text-base"
                                      htmlFor="freeze_lessons"
                                    >
                                      Freeze Lessons
                                    </Label>
                                    <Input
                                      id="freeze_lessons"
                                      name="freeze_lessons"
                                      defaultValue={enrolment.freeze_lessons.toString()}
                                      className="text-sm sm:text-base"
                                      readOnly
                                    />
                                  </div>
                                </div>
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
