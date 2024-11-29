import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { GenerateCalendarThemeLessonError } from "@/types/structure";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SubmitButton from "./SubmitButton";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { generateCalendarThemeLesson } from "@/lib/actions/structure.actions";

const GenerateCalendarThemeLesson = () => {
  const [zoderror, setZodError] =
    useState<GenerateCalendarThemeLessonError | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(
    generateCalendarThemeLesson,
    SERVER_ACTION_STATE
  );

  let currentYear = new Date().getFullYear().toString();

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
          variant="outline"
          className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 space-x-2 transition-colors duration-200 text-xs sm:text-base px-3 py-2"
        >
          Generate Theme Lesson
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-full max-w-md p-6 bg-white">
        <DialogHeader className="border-b border-gray-300 pb-3">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Generate Daily Theme Lesson
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Enter the year you want to generate theme lesson for.
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className="space-y-4 sm:space-y-6"
          ref={formRef}
        >
          <div className="flex flex-col space-y-6">
            <div className="mt-4">
              <div className="grid grid-cols-3 gap-4">
                <Label htmlFor="year" className="text-sm sm:text-base">
                  Year <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="year"
                  name="year"
                  placeholder="Enter generate year"
                  type="number"
                  defaultValue={currentYear}
                  className="w-full text-sm sm:text-base col-span-2"
                />
              </div>
              <small className="text-red-500">{zoderror?.year?.[0]}</small>
            </div>
          </div>
          <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
            <SubmitButton label="Generate" submitLabel="Generating" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateCalendarThemeLesson;
