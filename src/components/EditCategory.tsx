import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { Button } from "./ui/button"
import { CategoryData, CategoryFormErrors } from "@/types/structure"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"
import SubmitButton from "./SubmitButton"
import { cn } from "@/lib/utils"
import { useState , useRef ,useEffect } from "react"
import { useToast } from "./ui/use-toast"
import { useFormState } from "react-dom";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { editCategory } from "@/lib/actions/structure.actions"

const EditCategory = ({data}: {data: CategoryData}) => {
    const [isActive, setIsActive] = useState<boolean>(data?.is_active)
    const [zoderror, setZodError] = useState<CategoryFormErrors | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [state, formAction] = useFormState(editCategory, SERVER_ACTION_STATE);

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
            className: cn(
              `bottom-0 left-0`,
              "bg-success-100"
            ),
            duration: 3000,
          });
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
        >
            <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogOverlay className="bg-black/80" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} />
      <DialogContent className="w-full max-w-md p-6 bg-white">
        <DialogHeader className="border-b border-gray-300 pb-3">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">Edit Category</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">Make changes to your category details here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4 sm:space-y-6" ref={formRef}>
            <Input type="hidden" id="id" name="id" defaultValue={data?.id}/>
            <div className="flex flex-col space-y-6">
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        <Label htmlFor="name" className="text-sm sm:text-base">
                        Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                        id="name"
                        name="name"
                        placeholder="Enter event title"
                        defaultValue={data?.name}
                        className="w-full text-sm sm:text-base col-span-2"
                        />
                    </div>
                    <small className="text-red-500">{zoderror?.name?.[0]}</small>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        <Label htmlFor="label" className="text-sm sm:text-base">
                            Label <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="label"
                            name="label"
                            placeholder="Enter event title"
                            defaultValue={data?.label}
                            className="w-full text-sm sm:text-base col-span-2"
                            />
                    </div>
                    <small className="text-red-500">{zoderror?.label?.[0]}</small>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        <Label htmlFor="year" className="text-sm sm:text-base">
                            Year <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="year"
                            name="year"
                            placeholder="Enter event title"
                            defaultValue={data?.year}
                            className="w-full text-sm sm:text-base col-span-2"
                        />
                    </div>
                    <small className="text-red-500">{zoderror?.year?.[0]}</small>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <Input type="hidden" name="is_active" value={isActive ? "true" : "false"}/>
                        <Label htmlFor="status" className="text-sm sm:text-base">
                            Status <span className="text-red-500">*</span>
                        </Label>
                        <div className="col-span-2 flex items-center space-x-2">
                            <Checkbox
                                id="status"
                                defaultChecked={isActive}
                                className={cn("h-5 w-5 border-gray-300", {
                                    " text-green-400 ": isActive
                                })}
                                onClick={()=>{setIsActive(!isActive)}}
                            />
                            <Label htmlFor="status" className="text-sm text-gray-600">
                                Active
                            </Label>
                        </div>
                    </div>
                    <small className="text-red-500">{zoderror?.is_active}</small>
                </div>
            </div>
            <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
                <SubmitButton label='Save' submitLabel="Saving"/>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditCategory
