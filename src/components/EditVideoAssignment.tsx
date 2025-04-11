"use client";
import React, { useState, useEffect, useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VideoIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Loader from "./Loader";
import SubmitButton from "./SubmitButton";
import {
  VideoAssignment,
  VideoAssignmentDetails,
  VideoAssignmentFormErrors,
} from "@/types/student";
import { getEmbedUrl } from "@/lib/utils";
import {
  editVideoAssignment,
  getVideoAssignmentDetails,
} from "@/lib/actions/video.action";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";
import { SERVER_ACTION_STATE } from "@/constants/index";
import { getThemeList } from "@/lib/actions/structure.actions";
import { ThemeData } from "@/types/structure";

const EditVideoAssignment = ({
  video,
  student_id,
  category,
}: {
  video: VideoAssignment;
  student_id: number;
  category: string;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<VideoAssignmentDetails | undefined>(
    undefined
  );
  const [zoderror, setZodError] = useState<VideoAssignmentFormErrors | null>(
    null
  );
  const [themeList, setThemeList] = useState<ThemeData[]>([]);
  const [theme, setTheme] = useState<string | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [state, formAction] = useFormState(
    editVideoAssignment,
    SERVER_ACTION_STATE
  );

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      formRef.current?.reset();
      setOpen(false);
      setZodError(null);
      toast({
        title: "Success",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-success-100"),
        duration: 3000,
      });
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

  useEffect(() => {
    const fetchThemeAndVideoDetails = async () => {
      if (!open) return;
      setIsLoading(true);
      try {
        const [videoDetails, themes] = await Promise.all([
          getVideoAssignmentDetails({ videoId: video.id }),
          getThemeList(
            new Date(video.submit_due_date).getFullYear().toString(),
            category
          ),
        ]);

        setFormData(videoDetails);

        if (videoDetails.theme !== null) {
          setTheme(videoDetails.theme.id.toString());

          const has_theme = themes.filter(
            (theme) => theme.id === videoDetails.theme?.id
          );

          if (has_theme.length === 0) {
            themes.push({
              id: videoDetails.theme.id,
              name: videoDetails.theme.name,
              year: videoDetails.theme.year,
              category: videoDetails.theme.category,
              order: videoDetails.theme.order,
            });
          }
        }

        setThemeList(themes);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch video details and theme list",
          className: cn(`bottom-0 left-0`, "bg-error-100"),
          duration: 3000,
        });
      }
    };
    fetchThemeAndVideoDetails();
  }, [video, open, category, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpen(true)}
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
              Make changes to your video details here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          {isLoading && (
            <div className="py-4">
              <Loader />
            </div>
          )}

          {!isLoading && !formData && (
            <div className="text-center py-8 text-gray-500">
              No lessons found
            </div>
          )}

          {!isLoading && formData && (
            <form action={formAction} ref={formRef}>
              <Input
                type="hidden"
                id="student_id"
                name="student_id"
                value={student_id}
              />
              <Input type="hidden" id="id" name="id" value={video.id} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                {/* Left side - Edit Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video_url">Video URL</Label>
                    <Input
                      id="video_url"
                      name="video_url"
                      defaultValue={formData.video_url || ""}
                      placeholder="Enter YouTube or Facebook video URL"
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">
                      Supports YouTube (youtu.be or youtube.com) and Facebook
                      video URLs
                    </p>
                    <small className="text-red-500">
                      {zoderror?.video_url?.[0]}
                    </small>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Input
                      id="theme"
                      name="theme"
                      type="hidden"
                      defaultValue={theme}
                    />
                    <Select
                      value={theme?.toString()}
                      onValueChange={(value) => setTheme(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent className="select-content">
                        {themeList.map((theme) => (
                          <SelectItem
                            key={theme.id}
                            value={theme.id.toString()}
                            className="select-item"
                          >
                            {theme.name} {theme.year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <small className="text-red-500">
                      {zoderror?.theme?.[0]}
                    </small>
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="submission_date">Submission Date</Label>
                      <Input
                        id="submission_date"
                        name="submission_date"
                        type="date"
                        defaultValue={
                          formData.submission_date ||
                          new Date().toISOString().split("T")[0]
                        }
                        className="w-full"
                      />
                      <small className="text-red-500">
                        {zoderror?.submission_date?.[0]}
                      </small>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="submit_due_date">Due Date</Label>
                      <Input
                        id="submit_due_date"
                        type="date"
                        value={formData.submit_due_date}
                        className="w-full"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Right side - Video Preview */}
                <div className="h-full flex flex-col">
                  <Label className="mb-2">Video Preview</Label>
                  <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                    {formData.video_url ? (
                      <iframe
                        src={getEmbedUrl(formData.video_url)}
                        className="w-full h-full min-h-[300px]"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full min-h-[300px] flex items-center justify-center text-gray-500">
                        No video URL provided
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <SubmitButton label="Save" submitLabel="Saving" />
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default EditVideoAssignment;
