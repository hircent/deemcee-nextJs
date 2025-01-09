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
import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";
import { GRADE, SERVER_ACTION_STATE } from "@/constants/index";
import SubmitButton from "./SubmitButton";
import { ClassFormErrors } from "@/types/class";
import { editClass } from "@/lib/actions/class.action";
import { StudentCardProps } from "@/types/student";

const STATUS = ["IN_PROGRESS", "DROPPED_OUT", "GRADUATED"];

export function EditStudent({ student }: StudentCardProps) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [zoderror, setZodError] = useState<ClassFormErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(editClass, SERVER_ACTION_STATE);

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
            Make changes to your student details here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className="space-y-4 sm:space-y-6"
          ref={formRef}
        >
          <div className="flex flex-col space-y-6">
            <h3 className="text-lg font-medium">Student Information</h3>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Input type="hidden" name="gender" value={student.gender} />
                <Select name="gender" value={student.gender}>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="space-y-2">
                  <Label htmlFor="deemcee_starting_grade">
                    Starting Grade <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="deemcee_starting_grade"
                    name="deemcee_starting_grade"
                    type="hidden"
                    defaultValue={student.deemcee_starting_grade}
                  />
                  <Select value={student.deemcee_starting_grade.toString()}>
                    <SelectTrigger>
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
                    defaultValue={student.status}
                  />
                  <Select value={student.status.toString()}>
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
