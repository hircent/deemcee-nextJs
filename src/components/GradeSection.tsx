"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import SubmitButton from "./SubmitButton";
import { GradeData } from "@/types/structure";

interface EditGradeProps {
  grade: GradeData;
  onEdit: (updatedGrade: GradeData) => void;
}

const EditGrade = ({ grade, onEdit }: EditGradeProps) => {
  const [editedGrade, setEditedGrade] = useState<GradeData>({ ...grade });
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    onEdit(editedGrade);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <form action="">
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Grade</Label>
              <Input
                id="name"
                value={editedGrade.grade_level}
                onChange={(e) =>
                  setEditedGrade({ ...editedGrade, category: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={editedGrade.category}
                onChange={(e) =>
                  setEditedGrade({ ...editedGrade, category: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={editedGrade.price}
                onChange={(e) =>
                  setEditedGrade({
                    ...editedGrade,
                    price: Number(e.target.value),
                  })
                }
              />
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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <form>
          <div className="grid gap-4 py-4 border-b-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="branchName" className="text-left">
                Name:
              </Label>
              <Input id="branchName" className="col-span-3" />
            </div>
          </div>

          <small className="text-slate-400">
            {`Please key in the ${type} name to confirm delete.`}
          </small>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-red-500 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Deleting.." : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const GradeSection = ({ data }: { data: GradeData[] }) => {
  const [grades, setGrades] = useState<GradeData[]>(data);

  const handleEdit = (updatedGrade: GradeData) => {
    setGrades(
      grades.map((grade) =>
        grade.id === updatedGrade.id ? updatedGrade : grade
      )
    );
  };

  const handleDelete = (gradeId: number) => {
    if (window.confirm("Are you sure you want to delete this grade?")) {
      setGrades(grades.filter((grade) => grade.id !== gradeId));
    }
  };

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
                <EditGrade grade={grade} onEdit={handleEdit} />
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
