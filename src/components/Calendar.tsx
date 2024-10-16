"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CalendarTable = () => {
  return (
    <div className="bg-yellow-2 w-full h-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={[
          { title: "event 1", date: "2024-10-16" },
          { title: "event 2", date: "2024-11-18" },
        ]}
        height={"auto"}
      />
    </div>
  );
};

export default CalendarTable;
