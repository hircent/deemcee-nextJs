
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye } from "lucide-react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { CategoryData } from "@/types/structure"

const ViewCategory = ({data}:{data:CategoryData}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
        >
            <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogOverlay className="bg-black/80" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} />
      <DialogContent className="w-full max-w-md p-6 bg-white">
        <DialogHeader className="border-b border-gray-300 pb-3">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">Category</DialogTitle>
          <DialogDescription className="text-sm sm:text-base"></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
                <Label htmlFor="name" className="text-sm sm:text-base">
                    Name
                </Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Enter event title"
                    defaultValue={data?.name}
                    className="w-full text-sm sm:text-base col-span-2"
                    readOnly={true}
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Label htmlFor="label" className="text-sm sm:text-base">
                    Label
                </Label>
                <Input
                    id="label"
                    name="label"
                    placeholder="Enter event title"
                    defaultValue={data?.label}
                    className="w-full text-sm sm:text-base col-span-2"
                    readOnly={true}
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Label htmlFor="year" className="text-sm sm:text-base">
                    Year
                </Label>
                <Input
                    id="year"
                    name="year"
                    placeholder="Enter event title"
                    defaultValue={data?.year}
                    className="w-full text-sm sm:text-base col-span-2"
                    readOnly={true}
                />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
                <Label htmlFor="status" className="text-sm sm:text-base">
                    Status
                </Label>
                <div className="col-span-2 flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                        data.is_active ? 'bg-green-400' : 'bg-gray-400'
                    }`}>
                    </span>{data.is_active ? 'Active' : 'Inactive'}
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewCategory
