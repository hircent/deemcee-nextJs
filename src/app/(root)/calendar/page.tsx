import { HolidayEventListColumns } from "@/columns/holidayEvent.list.columns";
import CalendarTable from "@/components/Calendar";
import { PageListTable } from "@/components/PageList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCalendarData } from "@/lib/actions/calendar.action";
import { filterCalendarEvents } from "@/lib/utils";

const page = async () => {
  const calendarData = await getCalendarData();
  const { holidayEvents, eventList, otherEvents } =
    filterCalendarEvents(calendarData);
  return (
    <div className="home-content">
      <div className="bg-yellow-2 p-8">
        <Tabs defaultValue="calendar" className="">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="holidays">Holidays</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar">
            <CalendarTable data={calendarData} />
          </TabsContent>
          <TabsContent value="holidays">
            <PageListTable
              columns={HolidayEventListColumns}
              data={holidayEvents}
            />
          </TabsContent>
          <TabsContent value="events">
            <PageListTable columns={HolidayEventListColumns} data={eventList} />
          </TabsContent>
          <TabsContent value="others">
            <PageListTable
              columns={HolidayEventListColumns}
              data={otherEvents}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
