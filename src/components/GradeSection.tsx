"use client";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import SubmitButton from "./SubmitButton";
import { GradeData, GradeDataErrors } from "@/types/structure";
import { useFormState } from "react-dom";
import { deleteGrade, updateGrade } from "@/lib/actions/structure.actions";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

const EditGrade = ({ grade }: { grade: GradeData }) => {
  const [category, setCategory] = useState<string>(grade.category);
  const [isOpen, setOpen] = useState(false);
  const [zoderror, setZodError] = useState<GradeDataErrors | null>(null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(updateGrade, SERVER_ACTION_STATE);

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
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Grade</DialogTitle>
        </DialogHeader>
        <form action={formAction} ref={formRef}>
          <Input type="hidden" id="id" name="id" defaultValue={grade.id} />
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="grade_level">Grade</Label>
              <Input
                id="grade_level"
                type="number"
                defaultValue={grade.grade_level}
                name="grade_level"
              />
              <small className="text-red-500">{zoderror?.grade_level}</small>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                type="hidden"
                name="category"
                value={category}
              />
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="KIDDO" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectItem value="KIDDO" className="select-item">
                    KIDDO
                  </SelectItem>
                  <SelectItem value="KIDS" className="select-item">
                    KIDS
                  </SelectItem>
                  <SelectItem value="SUPERKIDS" className="select-item">
                    SUPERKIDS
                  </SelectItem>
                </SelectContent>
              </Select>
              <small className="text-red-500">{zoderror?.category?.[0]}</small>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                name="price"
                defaultValue={grade.price}
              />
              <small className="text-red-500">{zoderror?.price}</small>
            </div>
          </div>
          <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
            <SubmitButton label="Save" submitLabel="Saving" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const DeleteGrade = ({
  type,
  name,
  gradeId,
}: {
  type: string;
  name: string;
  gradeId: number;
}) => {
  const [isOpen, setOpen] = useState(false);
  const [zoderror, setZodError] = useState<GradeDataErrors | null>(null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(deleteGrade, SERVER_ACTION_STATE);
  const router = useRouter();

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
      router.refresh();
    }
    if (state.error) {
      toast({
        title: "Error",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
    }
  }, [state, toast, router]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-blue-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[400px] sm:max-w-[425px] bg-white rounded-md">
        <DialogHeader>
          <DialogTitle>Delete {type}</DialogTitle>
          <DialogDescription>
            Are you sure to delete {type}{" "}
            <span className="font-bold">{name}</span>?
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} ref={formRef}>
          <Input id="name" type="hidden" name="name" value={name} />
          <Input id="id" type="hidden" name="id" value={gradeId} />
          <div className="grid gap-4 py-4 border-b-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="delete-name" className="text-left">
                Name:
              </Label>
              <Input
                id="delete-name"
                name="confirmName"
                className="col-span-3"
              />
            </div>
          </div>

          <small className="text-slate-400">
            {`Please key in the ${type} name to confirm delete.`}
          </small>
          <DialogFooter>
            <SubmitButton
              label="Delete"
              submitLabel="Deleting"
              btnColor="bg-red-500"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const GradeSection = ({ data }: { data: GradeData[] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((grade) => (
        <Card
          key={grade.id}
          className="p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-medium text-gray-900">
                Grade {grade.grade_level}
              </h2>
              <div className="flex gap-2">
                <EditGrade grade={grade} />
                <DeleteGrade
                  type="Grade"
                  name={grade.category}
                  gradeId={grade.id}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                Category: {grade.category}
              </div>
              <span className="text-sm font-medium text-gray-900">
                Rm {grade.price.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GradeSection;
