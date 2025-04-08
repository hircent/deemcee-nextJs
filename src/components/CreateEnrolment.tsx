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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import SubmitButton from "./SubmitButton";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { useFormState } from "react-dom";
import { EnrolmentFormErrors } from "@/types/student";
import { createEnrolment } from "@/lib/actions/student.action";
import { TimeslotData } from "@/types/index";
import { getTimeslots } from "@/lib/actions/class.action";
import { getGradeList, getTierList } from "@/lib/actions/structure.actions";
import { GradeData, TierListData } from "@/types/structure";
import Loader from "./Loader";

const CreateEnrolment = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [zoderror, setZodError] = useState<EnrolmentFormErrors | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isTierSelected, setIsTierSelected] = useState<boolean>(true);
  const [selectedTier, setSelectedTier] = useState<string | undefined>(
    undefined
  );
  const [grades, setGrades] = useState<GradeData[]>([]);
  const [ableSelectTimeslot, setAbleSelectTimeslot] = useState(false);
  const [ableSelectDate, setAbleSelectDate] = useState(false);
  const [startingGrade, setStartingGrade] = useState<string | undefined>(
    undefined
  );
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [timeslots, setTimeslots] = useState<TimeslotData[]>([]);
  const [confirmTimeslot, setConfirmTimeslot] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>(
    "Select Grade and Commencement Date"
  );

  const [tiers, setTiers] = useState<TierListData[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(
    createEnrolment,
    SERVER_ACTION_STATE
  );

  // ZodErrors
  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      toast({
        title: "Success",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-success-100"),
        duration: 3000,
      });
      formRef.current?.reset();
      setOpen(false);
      setZodError(null);
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

  // Get Timeslots
  useEffect(() => {
    const fetchTimeslots = async () => {
      if (startDate && startingGrade) {
        setTimeslots([]);
        const grade = grades.filter((grade) => grade.id === +startingGrade);
        try {
          const timeslots = await getTimeslots({
            date: startDate,
            grade: +grade[0].grade_level,
          });

          if (timeslots.length === 0) {
            setPlaceholder("No available time slots");
          } else {
            setPlaceholder("Select a time slot");
            setTimeslots(timeslots);
          }
        } catch (error) {
          console.error("Error fetching timeslots:", error);
        }
      }
    };

    fetchTimeslots();
  }, [startDate, startingGrade, grades]);

  const getTiers = async () => {
    const tierList = await getTierList();
    setTiers(tierList);
    setIsLoading(false);
    console.log({ tierList });
  };

  useEffect(() => {
    if (selectedTier === undefined) return;

    const getGrades = async () => {
      const gradeList = await getGradeList(selectedTier);
      setGrades(gradeList);
    };

    getGrades();
  }, [selectedTier]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="group p-2 bg-blue-200 rounded-md hover:bg-blue-300 shadow-md"
          onClick={() => {
            getTiers();
          }}
        >
          <Plus size={18} className="text-red-600" /> New Enrolment
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[800px]  max-h-[90vh] overflow-y-auto custom-scrollbar bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Create Enrolment
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <Loader />
        ) : (
          <form action={formAction} ref={formRef} className="space-y-4">
            <Input type="hidden" name="student" value={id} />
            <div className="space-y-4">
              <div>
                <div className="space-y-2">
                  <Label htmlFor="tier">
                    Tier <span className="text-red-500">*</span>
                  </Label>
                  <Input id="tier" value={selectedTier} type="hidden" />
                  <Select
                    onValueChange={(value) => {
                      setSelectedTier(value);
                      setIsTierSelected(false);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Tier" />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      {tiers.map((tier) => (
                        <SelectItem
                          key={tier.id}
                          value={tier.id.toString()}
                          className="select-item"
                        >
                          {tier.name + " (" + tier.year + ")"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="space-y-2">
                  <Label htmlFor="grade">
                    Starting Grade <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="grade"
                    value={startingGrade}
                    name="grade"
                    type="hidden"
                  />
                  <Select
                    onValueChange={(value) => {
                      setStartingGrade(value);
                      setAbleSelectDate(true);
                    }}
                  >
                    <SelectTrigger disabled={isTierSelected}>
                      <SelectValue placeholder="Select starting grade" />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      {grades.map((grade) => (
                        <SelectItem
                          key={grade.id}
                          value={grade.id.toString()}
                          className="select-item"
                        >
                          {"Grade " +
                            grade.grade_level +
                            " - " +
                            grade.currency +
                            " " +
                            grade.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <small className="text-red-500">{zoderror?.grade}</small>
              </div>

              <div>
                <div className="space-y-2">
                  <Label htmlFor="start_date">
                    Commencement Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setAbleSelectTimeslot(true);
                    }}
                    disabled={!ableSelectDate}
                  />
                </div>
                <small className="text-red-500">{zoderror?.start_date}</small>
              </div>

              <div>
                <div className="space-y-2">
                  <Label htmlFor="classroom">
                    Time Slot <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="classroom"
                    name="classroom"
                    type="hidden"
                    value={confirmTimeslot}
                  />
                  <Select onValueChange={(value) => setConfirmTimeslot(value)}>
                    <SelectTrigger disabled={!ableSelectTimeslot}>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      {timeslots.map((ts) => (
                        <SelectItem
                          disabled={ts.student_in_class! >= 6}
                          key={ts.id}
                          value={ts.id.toString()}
                          className="select-item"
                        >
                          {ts.label +
                            " - " +
                            "(" +
                            ts.student_in_class! +
                            "/6)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
              <SubmitButton label="Create" submitLabel="Creating" />
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateEnrolment;
