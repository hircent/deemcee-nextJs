import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "./SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import {
  ENROLMENT_STATUS_CHOICES,
  SERVER_ACTION_STATE,
} from "@/constants/index";
import Loader from "./Loader";
import { EnrolmentDetails, UpdateEnrolmentError } from "@/types/student";
import {
  getEnrolmentDetailForUpdateView,
  updateEnrolment,
} from "@/lib/actions/student.action";
import { cn } from "@/lib/utils";
import { getGradeList, getTierList } from "@/lib/actions/structure.actions";
import { GradeData, TierListData } from "@/types/structure";

export const EditEnrolment = ({
  id,
  status,
  open,
  onOpenChange,
}: {
  id: number;
  status: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [enrolmentStatus, setEnrolmentStatus] = useState<string>(status);
  const [selectedTier, setSelectedTier] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGradeLoading, setIsGradeLoading] = useState<boolean>(false);
  const [tiers, setTiers] = useState<TierListData[]>([]);
  const [grades, setGrades] = useState<GradeData[]>([]);
  const [currentGrade, setCurrentGrade] = useState<string>("0");
  const { toast } = useToast();
  const [state, formAction] = useFormState(
    updateEnrolment,
    SERVER_ACTION_STATE
  );
  const [zoderror, setZodError] = useState<UpdateEnrolmentError | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) {
      setIsLoading(true);
      return;
    }

    const fetchEnrolmentDetails = async () => {
      try {
        const [res, tierList] = await Promise.all([
          getEnrolmentDetailForUpdateView(id),
          getTierList(),
        ]);
        setTiers(tierList);
        setSelectedTier(res.tier.id.toString());
        setCurrentGrade(res.grade.grade_level.toString());
        setIsLoading(false);
        setEnrolmentStatus(res.status);
        setIsActive(res.is_active);
      } catch (error) {
        toast({
          title: "Error",
          description: JSON.stringify(error),
          className: cn(`bottom-0 left-0`, "bg-error-100"),
          duration: 3000,
        });
      }
    };

    fetchEnrolmentDetails();
  }, [open]);

  useEffect(() => {
    setIsGradeLoading(true);
    if (selectedTier === undefined) return;

    const getGrades = async () => {
      const gradeList = await getGradeList(selectedTier);
      setGrades(gradeList);
      setIsGradeLoading(false);
    };

    getGrades();
  }, [selectedTier]);

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      formRef.current?.reset();
      onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[500px] h-max overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Edit Enrolment</DialogTitle>
            <DialogDescription>Viewing details for enrolment</DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <Loader />
          ) : (
            <form className="space-y-4" action={formAction} ref={formRef}>
              <Input type="hidden" name="id" value={id} />
              <Input type="hidden" name="grade_level" value={currentGrade} />
              <Input
                type="hidden"
                name="is_active"
                value={isActive ? "true" : "false"}
              />

              {/* Temporary remove this is_active field, might be used later */}
              {/* <div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <Label htmlFor="is_active">Is Active</Label>
                  <div className="col-span-2 flex items-center space-x-2">
                    <Checkbox
                      id="is_active"
                      defaultChecked={isActive}
                      className={cn("h-5 w-5 border-gray-300", {
                        " text-green-400 ": isActive,
                      })}
                      onClick={() => {
                        setIsActive(!isActive);
                      }}
                    />
                    <Label
                      htmlFor="is_active"
                      className="text-sm text-gray-600"
                    >
                      Active
                    </Label>
                  </div>
                </div>
              </div> */}

              <div className="space-y-2">
                <Input type="hidden" name="status" value={enrolmentStatus} />
                <Label htmlFor="status">Status :</Label>
                <Select
                  value={enrolmentStatus}
                  onValueChange={setEnrolmentStatus}
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="select-content">
                    {ENROLMENT_STATUS_CHOICES.map((esc) => (
                      <SelectItem
                        key={esc.value}
                        value={esc.value}
                        className="select-item"
                      >
                        {esc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tier">Tier :</Label>
                <Input
                  id="tier"
                  name="tier"
                  value={selectedTier}
                  type="hidden"
                />
                <Select onValueChange={setSelectedTier} value={selectedTier}>
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
              {isGradeLoading ? (
                <div className="h-28 bg-indigo-100 rounded-md">
                  <Loader />
                </div>
              ) : (
                <div className="flex justify-center flex-wrap gap-2 h-28 text-sm">
                  {grades.map((grade) => (
                    <div
                      key={grade.id}
                      className="flex justify-center items-center w-36 p-2 bg-indigo-100 text-indigo-600 rounded-md"
                    >
                      {"G" +
                        grade.grade_level +
                        " - " +
                        grade.currency +
                        " " +
                        grade.price}
                    </div>
                  ))}
                </div>
              )}
              <DialogFooter>
                <SubmitButton label="Save" submitLabel="Saving" />
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
