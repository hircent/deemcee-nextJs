"use client";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import {
  CategoryData,
  GradeDataErrors,
  ThemeData,
  ThemeDetails,
  ThemeDetailsError,
} from "@/types/structure";
import SubmitButton from "./SubmitButton";
import {
  deleteTheme,
  editTheme,
  getThemeDetails,
} from "@/lib/actions/structure.actions";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";
import { IsSuperadmin, SERVER_ACTION_STATE } from "@/constants/index";
import { useRouter } from "next/navigation";

const EditTheme = ({
  id,
  categorySelectionList,
}: {
  id: number;
  categorySelectionList: CategoryData[];
}) => {
  const [editedTheme, setEditedTheme] = useState<ThemeDetails | null>(null);
  const [catID, setCatID] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [zoderror, setZodError] = useState<ThemeDetailsError | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(editTheme, SERVER_ACTION_STATE);
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
      setZodError(null);
      setIsOpen(false);
      setTimeout(() => {
        router.refresh();
      }, 300);
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

  const getTheme = async () => {
    setIsLoading(true);

    try {
      const themeData = await getThemeDetails(id);
      setEditedTheme(themeData);
      setCatID(themeData.category.toString());
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch theme details" + error,
        duration: 2000,
        className: cn("bottom-0 left-0 bg-red-100"),
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={getTheme}
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
      <DialogContent className="max-h-[90vh] overflow-y-auto custom-scrollbar bg-white">
        <DialogHeader>
          <DialogTitle>Edit Theme</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Make changes to your Theme details here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p>Loading...</p>
          </div>
        ) : (
          <form action={formAction} ref={formRef}>
            <Input type="hidden" id="id" name="id" defaultValue={id} />
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Theme <span className="text-red-500">*</span>
                </Label>
                <Input id="name" name="name" defaultValue={editedTheme?.name} />
                <small className="text-red-500">{zoderror?.name?.[0]}</small>
              </div>
              <div className="space-y-2">
                <Input type="hidden" name="category" defaultValue={catID!} />
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={catID!}
                  onValueChange={(value) => {
                    setCatID(value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="KIDDOS" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categorySelectionList.map((cat) => (
                      <SelectItem
                        key={cat.id}
                        value={cat.id.toString()}
                        className="cursor-pointer hover:bg-yellow-9"
                      >
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <small className="text-red-500">
                  {zoderror?.category?.[0]}
                </small>
              </div>

              {editedTheme?.lessons.map((v, i) => (
                <div className="space-y-2" key={v.id}>
                  <Label htmlFor={v.name}>
                    {"Lesson " + v.order}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={v.name}
                    name={"lesson_" + v.order}
                    defaultValue={v.name}
                  />
                  <small className="text-red-500">
                    {/* {zoderror?.[v.name]?.[0]} */}
                  </small>
                </div>
              ))}
            </div>
            <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
              <SubmitButton label="Save" submitLabel="Saving" />
            </DialogFooter>
          </form>
        )}
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
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const [_, setZodError] = useState<GradeDataErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(deleteTheme, SERVER_ACTION_STATE);
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
      setZodError(null);
      setOpen(false);
      setTimeout(() => {
        router.refresh();
      }, 300);
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
        <form action={formAction} ref={formRef}>
          <Input id="id" type="hidden" name="id" value={themeId} />
          <Input id="name" type="hidden" name="name" value={name} />
          <div className="grid gap-4 py-4 border-b-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmName" className="text-left">
                Name:
              </Label>
              <Input
                id="confirmName"
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
              label="Save"
              submitLabel="Saving"
              btnColor="bg-red-500"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ThemeSection = ({
  userRole,
  data,
  categorySelectionList,
}: {
  userRole: string[];
  data: ThemeData[];
  categorySelectionList: CategoryData[];
}) => {
  const yearNow = new Date().getFullYear().toString();
  const [categoryFilter, setCategoryFilter] = useState<string>(
    categorySelectionList[0].label
  );
  // const [yearFilter, setYearFilter] = useState<string>(yearNow);

  const filteredThemes = data.filter((cat) => {
    if (categoryFilter && cat.category !== categoryFilter) return false; // Add this line
    // if (yearFilter !== "all" && cat.year.toString() !== yearFilter) return false;
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
            <SelectTrigger className="w-[180px] bg-yellow-2">
              <SelectValue placeholder="KIDDOS" />
            </SelectTrigger>
            <SelectContent className="bg-yellow-2">
              {categorySelectionList.map((cat) => (
                <SelectItem
                  key={cat.id}
                  value={cat.label}
                  className="cursor-pointer hover:bg-yellow-9"
                >
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <Select value={yearFilter} onValueChange={setYearFilter}>
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
          </Select> */}
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
                  {theme.order + ". " + theme.name}
                </h2>
                {IsSuperadmin.includes(userRole[0]) && (
                  <div className="flex gap-2">
                    <EditTheme
                      id={theme.id}
                      categorySelectionList={categorySelectionList}
                    />
                    <DeleteTheme
                      type="Theme"
                      name={theme.name}
                      themeId={theme.id}
                    />
                  </div>
                )}
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
