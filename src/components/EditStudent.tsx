"use client";
import { Button } from "@/components/ui/button";
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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Pencil, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";
import {
  GRADE,
  ReferralChannels,
  SERVER_ACTION_STATE,
} from "@/constants/index";
import SubmitButton from "./SubmitButton";
import { StudentCardProps, StudentFormErrors } from "@/types/student";
import { editStudent } from "@/lib/actions/student.action";

const STATUS = ["IN_PROGRESS", "DROPPED_OUT", "GRADUATED"];

export function EditStudent({ student }: StudentCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [zoderror, setZodError] = useState<StudentFormErrors | null>(null);
  const [status, setStatus] = useState<string>(student.status);
  const [gender, setGender] = useState<string>(student.gender);
  const [referralChannel, setReferralChannel] = useState<string | null>(
    student.referral_channel
  );
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(editStudent, SERVER_ACTION_STATE);

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      formRef.current?.reset();
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="group p-2 px-3 rounded-md bg-yellow-2"
        >
          <Pencil
            size={16}
            className="text-gray-600 group-hover:text-blue-600 mr-1"
          />
          Edit
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[1000px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Edit Student
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Make changes to your student details here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className="space-y-4 sm:space-y-6"
          ref={formRef}
        >
          <div className="flex flex-col space-y-6">
            <h3 className="text-lg font-medium">Student Information</h3>
            <Input type="hidden" id="id" name="id" defaultValue={student.id} />
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="space-y-2">
                  <Label htmlFor="first_name">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="Enter first name"
                    defaultValue={student.first_name}
                  />
                </div>
              </div>

              <div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Enter last name"
                    defaultValue={student.last_name?.toString()}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="space-y-2">
                  <Label htmlFor="fullname">
                    Fullname <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    placeholder="Enter fullname name"
                    defaultValue={student.fullname}
                  />
                </div>
                <small className="text-red-500">{zoderror?.fullname}</small>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Input type="hidden" name="gender" value={gender} />
                <Select
                  name="gender"
                  value={gender}
                  onValueChange={(value) => setGender(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="select-content">
                    <SelectItem value="Male" className="select-item">
                      Male
                    </SelectItem>
                    <SelectItem value="Female" className="select-item">
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <small className="text-red-500">{zoderror?.gender}</small>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="space-y-2">
                  <Label htmlFor="dob">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    defaultValue={student.dob}
                  />
                </div>
                <small className="text-red-500">{zoderror?.dob}</small>
              </div>

              {/* School Information */}
              <div>
                <div className="space-y-2">
                  <Label htmlFor="school">
                    School <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="school"
                    name="school"
                    placeholder="Enter school name"
                    defaultValue={student.school}
                  />
                </div>
              </div>
              <small className="text-red-500">{zoderror?.school}</small>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="space-y-2">
                  <Label htmlFor="deemcee_starting_grade">Starting Grade</Label>
                  <Input
                    type="hidden"
                    name="deemcee_starting_grade"
                    value={student.deemcee_starting_grade}
                  />
                  <Select value={student.deemcee_starting_grade.toString()}>
                    <SelectTrigger disabled>
                      <SelectValue placeholder="Select starting grade" />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      {GRADE.map((grade) => (
                        <SelectItem
                          key={grade.id}
                          value={grade.id.toString()}
                          className="select-item"
                        >
                          {grade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="space-y-2">
                  <Label htmlFor="enrolment_date">
                    Enrollment Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="enrolment_date"
                    name="enrolment_date"
                    type="date"
                    defaultValue={student.enrolment_date}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="space-y-2">
                  <Label htmlFor="status">
                    Status <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="status"
                    name="status"
                    type="hidden"
                    defaultValue={status}
                  />
                  <Select
                    value={status}
                    onValueChange={(value) => setStatus(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      {STATUS.map((st) => (
                        <SelectItem
                          key={st}
                          value={st.toString()}
                          className="select-item"
                        >
                          {st}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <small className="text-red-500">{zoderror?.status}</small>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Referral Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referral_channel">Referral Channel</Label>
                <Input
                  type="hidden"
                  name="referral_channel"
                  defaultValue={referralChannel?.toString()}
                />
                <Select
                  name="referral_channel"
                  value={referralChannel?.toString()}
                  onValueChange={(value) => setReferralChannel(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select referral channel" />
                  </SelectTrigger>
                  <SelectContent className="select-content">
                    {ReferralChannels.map((channel) => (
                      <SelectItem
                        key={channel}
                        value={channel}
                        className="select-item"
                      >
                        {channel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <small className="text-red-500">{zoderror?.referral_channel}</small> */}
              </div>

              <div>
                <div className="space-y-2">
                  <Label htmlFor="referral">Referral Name</Label>
                  <Input
                    id="referral"
                    name="referral"
                    placeholder="Enter referral name"
                    defaultValue={student.referral?.toString()}
                  />
                </div>
                {/* <small className="text-red-500">{zoderror?.referral_name}</small> */}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
            <SubmitButton label="Save" submitLabel="Saving" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
