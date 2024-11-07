'use client'

import { Button } from "@/components/ui/button";
import {
  PencilIcon,
  KeyIcon
} from "lucide-react";
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
import { useFormState } from "react-dom";
import { SERVER_ACTION_STATE } from "@/constants/index";
import SubmitButton from "./SubmitButton";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";

const EditProfile = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    className="flex-1 sm:flex-none bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors duration-200 text-sm sm:text-base px-3 py-2"
                    onClick={()=>{setOpen(true)}}
                >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit Profile</span>
                </Button>
            </DialogTrigger>
            <DialogOverlay
                className="bg-black/80"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            />
            <DialogContent className="w-full max-w-[1000px] h-auto overflow-y-auto custom-scrollbar bg-white">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl font-semibold">
                        Edit Profile
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base">
                        Make changes to your details here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <form ref={formRef}>
                    <div className="space-y-6">
                        
                        <DialogFooter className="gap-4 sm:gap-0">
                            <SubmitButton label='Save' submitLabel="Saving"/>
                        </DialogFooter>
                    </div>
                </form>
                </DialogContent>
            </Dialog>
    )   
}

const ChangePassword = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    className="flex-1 sm:flex-none bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center space-x-2 transition-colors duration-200 text-sm sm:text-base px-3 py-2"
                    onClick={()=>{setOpen(true)}}
                >
                    <KeyIcon className="w-4 h-4" />
                    <span>Change Password</span>
                </Button>
            </DialogTrigger>
            <DialogOverlay
                className="bg-black/80"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            />
            <DialogContent className="w-full max-w-[1000px] h-auto overflow-y-auto custom-scrollbar bg-white">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl font-semibold">
                        Change Password
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base">
                        Make changes to your password here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <form ref={formRef}>
                    <div className="space-y-6">
                        
                        <DialogFooter className="gap-4 sm:gap-0">
                            <SubmitButton label='Save' submitLabel="Saving"/>
                        </DialogFooter>
                    </div>
                </form>
                </DialogContent>
            </Dialog>
    )   
}

const UserProfileActions = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center space-y-4 space-y-reverse sm:space-y-0 sm:space-x-4">
        <div className="flex w-full sm:w-auto space-x-3">
            <EditProfile/>
            <ChangePassword/>
        </div>
    </div>
  )
}

export default UserProfileActions
