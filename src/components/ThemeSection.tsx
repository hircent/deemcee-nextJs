"use client";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { ThemeData } from "@/types/structure";
import SubmitButton from "./SubmitButton";

interface EditThemeProps {
  theme: ThemeData;
}

const EditTheme = ({ theme }: EditThemeProps) => {
  const [editedTheme, setEditedTheme] = useState<ThemeData>({ ...theme });
  const [isOpen, setIsOpen] = useState(false);

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
          <DialogTitle>Edit Theme</DialogTitle>
        </DialogHeader>
        <form action="">
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Theme</Label>
              <Input
                id="name"
                value={editedTheme.name}
                onChange={(e) =>
                  setEditedTheme({ ...editedTheme, category: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={editedTheme.category}
                onChange={(e) =>
                  setEditedTheme({ ...editedTheme, category: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={editedTheme.year}
                onChange={(e) =>
                  setEditedTheme({
                    ...editedTheme,
                    year: Number(e.target.value),
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

const DeleteTheme = ({
  type,
  name,
  themeId,
}: {
  type: string;
  name: string;
  themeId: number;
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

const ThemeSection = ({
  userRole,
  data,
}: {
  userRole: string[];
  data: ThemeData[];
}) => {
  const yearNow = new Date().getFullYear().toString();
  const [categoryFilter, setCategoryFilter] = useState<string>("KIDDOS");
  const [yearFilter, setYearFilter] = useState<string>(yearNow);

  const filteredThemes = data.filter((cat) => {
    if (categoryFilter && cat.category !== categoryFilter) return false; // Add this line
    if (yearFilter !== "all" && cat.year.toString() !== yearFilter)
      return false;
    return true;
  });

  const years = Array.from(new Set(data.map((cat) => cat.year.toString())));
  return (
    <div>
      {/* Filters Section */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          <Select
            value={String(categoryFilter)}
            onValueChange={(value) => setCategoryFilter(value)}
          >
            <SelectTrigger className="w-[140px] bg-yellow-2">
              <SelectValue placeholder="KIDDOS" />
            </SelectTrigger>
            <SelectContent className="bg-yellow-2">
              <SelectItem
                value="KIDDOS"
                className="cursor-pointer hover:bg-yellow-9"
              >
                KIDDOS
              </SelectItem>
              <SelectItem
                value="KIDS"
                className="cursor-pointer hover:bg-yellow-9"
              >
                KIDS
              </SelectItem>
              <SelectItem
                value="SUPERKIDS"
                className="cursor-pointer hover:bg-yellow-9"
              >
                SUPERKIDS
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[140px] bg-yellow-2">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-yellow-2">
              {years.map((year) => (
                <SelectItem
                  key={year}
                  value={year}
                  className="cursor-pointer hover:bg-yellow-9"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredThemes.map((theme) => (
          <Card
            key={theme.id}
            className="p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-medium text-gray-900">
                  {theme.name}
                </h2>
                <div className="flex gap-2">
                  <EditTheme theme={theme} />
                  <DeleteTheme
                    type="Theme"
                    name={theme.name}
                    themeId={theme.id}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Year: {theme.year}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThemeSection;
