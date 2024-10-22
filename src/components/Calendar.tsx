"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarData } from "@/types/calendar";
import { processCalendarData } from "@/lib/utils";
import { EventClickArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { useCallback, useState } from "react";

const CalendarTable = ({ data }: { data: CalendarData[] }) => {
  const processedEvents = processCalendarData(data);
  const [currentYear, setCurrentYear] = useState(2024);

  const handleDatesSet = useCallback(
    (arg: any) => {
      const newYear = arg.view.currentStart.getFullYear();
      if (newYear !== currentYear) {
        setCurrentYear(newYear);
        // Trigger your action here
        console.log(`Year changed to ${newYear}`);
        // You can call any function or dispatch any action here
        // For example: fetchEventsForYear(newYear);
      }
    },
    [currentYear]
  );

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log(clickInfo.event.title);
  };

  return (
    <div className="bg-yellow-2 w-full h-full">
      <div className="flex flex-wrap border-t-2 border-gray-200 py-4">
        <div className="flex items-center justify-start py-2 px-2 w-1/2 sm:w-1/6">
          <div className="w-4 h-4 rounded-full mr-2 bg-[#FDE68A]"></div>
          <span className="text-sm sm:text-base">Center holiday</span>
        </div>
        <div className="flex items-center justify-start py-2 px-2 w-1/2 sm:w-1/6">
          <div className="w-4 h-4 rounded-full mr-2 bg-[#BBF7D0]"></div>
          <span className="text-sm sm:text-base">Public holiday</span>
        </div>
        <div className="flex items-center justify-start py-2 px-2 w-1/2 sm:w-1/6">
          <div className="w-4 h-4 rounded-full mr-2 bg-[#BFDBFE]"></div>
          <span className="text-sm sm:text-base">Event</span>
        </div>
        <div className="flex items-center justify-start py-2 px-2 w-1/2 sm:w-1/6">
          <div className="w-4 h-4 rounded-full mr-2 bg-[#FDA4AF]"></div>
          <span className="text-sm sm:text-base">Other</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[768px]">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={processedEvents}
            height={"auto"}
            eventClick={handleEventClick}
            datesSet={handleDatesSet}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarTable;
