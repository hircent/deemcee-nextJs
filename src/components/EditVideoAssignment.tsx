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
  DialogPortal,
} from "@/components/ui/dialog";
import { VideoIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { VideoAssignment } from "@/types/student";
import Loader from "./Loader";
import SubmitButton from "./SubmitButton";

const EditVideoAssignment = ({ video }: { video: VideoAssignment }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => {
            setOpen(true);
          }}
          className="group p-2 hover:bg-gray-100 rounded-full transition-colors flex gap-2 hover:cursor-pointer"
        >
          <VideoIcon
            size={14}
            className="text-gray-500 group-hover:text-blue-500 transition-colors"
          />
          <div className="text-xs">
            {video.submission_date
              ? `Video ${video.video_number.toString()}`
              : `V${video.video_number} ${video.submit_due_date}`}
          </div>
        </div>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[1000px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-semibold">
              Edit Video
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Make changes to your video details here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">{isLoading && <Loader />}</div>
          <DialogFooter>
            <SubmitButton label="Save" submitLabel="Saving" />
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default EditVideoAssignment;
