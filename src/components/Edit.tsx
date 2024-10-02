import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"

export function Edit() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="group p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Pencil 
                size={18} 
                className="text-gray-500 group-hover:text-blue-500 transition-colors"
            />
        </Button>
      </DialogTrigger>
      <DialogOverlay className="bg-black/80" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} />
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-black-2 text-white">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
