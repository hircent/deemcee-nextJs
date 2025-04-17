import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import { getEnrolmentLesson } from "@/lib/actions/student.action";
import { EnrolmentLessonProps } from "@/types/student";
import { cn, getStatusColor } from "@/lib/utils";
import Loader from "./Loader";
import { Badge } from "./ui/badge";

export const ViewEnrolmentLesson = ({
  id,
  open,
  onOpenChange,
}: {
  id: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lessonData, setLessonData] = useState<EnrolmentLessonProps[] | []>([]);
  const [day, setDay] = useState<string | undefined>(undefined);
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchLessonData = async () => {
      if (!open) return;
      setIsLoading(true);

      try {
        const data = await getEnrolmentLesson(id);
        if (data.length > 0) {
          setLessonData(data);
          setDay(data[0].day);
          setStartTime(data[0].start_time);
          setEndTime(data[0].end_time);
        }
      } catch (err) {
        console.error("Error fetching lesson data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessonData();
  }, [id, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[600px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Lesson Details</DialogTitle>
            <DialogDescription>
              Viewing lesson details for enrolment
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {isLoading && <Loader />}

            {!isLoading && lessonData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No lessons found
              </div>
            )}

            {!isLoading && lessonData.length > 0 && (
              <div className="space-y-4">
                <div className="text-sm space-y-1">
                  <div>
                    <span className="font-medium">Schedule: </span>
                    Every {day}, {startTime?.slice(0, 5)} -{" "}
                    {endTime?.slice(0, 5)}
                  </div>
                </div>
                {lessonData.map((lesson, index) => (
                  <div
                    key={lesson.class_lesson.theme_lesson.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-gray-50"
                  >
                    <div className="flex items-start space-x-4">
                      <span className="font-medium text-gray-500 mt-1">
                        {index + 1}.
                      </span>
                      <div className="space-y-1">
                        <h3 className="font-medium">
                          {lesson.class_lesson.theme_lesson.theme} -{" "}
                          {lesson.class_lesson.theme_lesson.name}
                        </h3>
                        <p className="text-sm text-gray-500">{lesson.date}</p>
                        {lesson.replacement !== null && (
                          <p className="flex text-sm text-gray-500 gap-2">
                            Replaced on: {lesson.replacement.date}
                            <Badge
                              className={cn("text-xs ml-2", {
                                "bg-success-100 text-success-600":
                                  lesson.replacement.status === "ATTENDED",
                                "bg-orange-100 text-orange-600":
                                  lesson.replacement.status === "PENDING",
                                "bg-error-100 text-error-600":
                                  lesson.replacement.status === "ABSENT",
                              })}
                            >
                              {lesson.replacement.status}
                            </Badge>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                          lesson.status
                        )}`}
                      >
                        {lesson.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
