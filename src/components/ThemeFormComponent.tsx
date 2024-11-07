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
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { camelCase, cn } from "@/lib/utils";
import SubmitButton from "./SubmitButton";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { useFormState } from "react-dom";
import { createTheme, getCategorySelectionList } from "@/lib/actions/structure.actions";
import { CategoryData, ThemeDetailsError } from "@/types/structure";

const ThemeForm = ({type}:{type:string}) => {
  const [category,setCategory] = useState<string>("all");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [zoderror, setZodError] = useState<ThemeDetailsError | null>(null);
    const [categorySelectionList, setCategorySelectionList] = useState<CategoryData[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [state, formAction] = useFormState(createTheme, SERVER_ACTION_STATE);

    useEffect(() => {
        if (state.zodErr) {
          setZodError(state.zodErr);
        }
        if (state.success) {
          toast({
            title: "Success",
            description: state.msg,
            className: cn(
              `bottom-0 left-0`,
              "bg-success-100"
            ),
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
            className: cn(
              `bottom-0 left-0`,
              "bg-error-100"
            ),
            duration: 3000,
          });
        }
        
      }, [state, toast]);

      const getCategoryList = async () => {
        setIsLoading(true);
        setOpen(true);
        try {
          const categoryData = await getCategorySelectionList();
          setCategorySelectionList(categoryData);
          setIsLoading(false);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch category data" + error,
            duration: 2000,
            className: cn("bottom-0 left-0 bg-red-100"),
          });
          setIsLoading(false);
        }
      };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            getCategoryList();
          }}
          className="group p-2 bg-gray-100 rounded-md hover:bg-yellow-2"
        >
          <Plus size={18} className="text-red-600 group-hover:text-gray-600" />{" "}
          Add
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-full max-h-[90vh] overflow-y-auto custom-scrollbar bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            {`Create ${camelCase(type)}`}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p>Loading...</p>
          </div>
        ) : (
        <form action={formAction} ref={formRef}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Theme <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                name="name"
              />
              <small className="text-red-500">{zoderror?.name?.[0]}</small>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
              <Input id="category" name="category" type="hidden" value={category}/>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="all" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="cursor-pointer hover:bg-yellow-9">Select a category</SelectItem>
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
              <small className="text-red-500">{zoderror?.category?.[0]}</small>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson_one">Lesson 1 <span className="text-red-500">*</span></Label>
              <Input
                id="lesson_one"
                name="lesson_one"
              />
              <small className="text-red-500">{zoderror?.lesson_one?.[0]}</small>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson_two">Lesson 2 <span className="text-red-500">*</span></Label>
              <Input
                id="lesson_two"
                name="lesson_two"
              />
              <small className="text-red-500">{zoderror?.lesson_two?.[0]}</small>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson_three">Lesson 3 <span className="text-red-500">*</span></Label>
              <Input
                id="lesson_three"
                name="lesson_three"
              />
              <small className="text-red-500">{zoderror?.lesson_three?.[0]}</small>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson_four">Lesson 4 <span className="text-red-500">*</span></Label>
              <Input
                id="lesson_four"
                name="lesson_four"
              />
              <small className="text-red-500">{zoderror?.lesson_four?.[0]}</small>
            </div>
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

export default ThemeForm;
