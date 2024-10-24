import { HolidayEventListColumns } from "@/columns/holidayEvent.list.columns";
import CalendarTable from "@/components/Calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCalendarData } from "@/lib/actions/calendar.action";
import { filterCalendarEvents } from "@/lib/utils";
import { CalendarListTable } from "@/components/CalendarListPage";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import CreateHolidayEvent from "@/components/CreateHolidayEvent";

const page = async () => {
  const calendarData = await getCalendarData();
  const { holidayEvents, eventList, otherEvents } =
    filterCalendarEvents(calendarData);
  const user = await authUser();
  const userRole = getUserRole(user);
  return (
    <div className="home-content">
      <div className="flex justify-between">
          <div></div>
          {userRole.includes("superadmin") && <CreateHolidayEvent/>}
        </div>
      <div className="bg-yellow-2 p-8">
        <Tabs defaultValue="calendar">
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
            <CalendarListTable
              columns={HolidayEventListColumns}
              data={holidayEvents}
            />
          </TabsContent>
          <TabsContent value="events">
            <CalendarListTable columns={HolidayEventListColumns} data={eventList} />
          </TabsContent>
          <TabsContent value="others">
            <CalendarListTable
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
