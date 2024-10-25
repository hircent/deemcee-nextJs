import { useAuthContext } from "@/context/userContext";
import React from "react";
import { DeleteCalendar } from "./DeleteCalendar";
import { DeleteActionProps } from "@/types/index";
import { IsPrincipalOrHigher } from "@/constants/index";
import { EditCalendar } from "./EditCalendar";

const Actions = ({id,type,name}:DeleteActionProps) => {
  const { userRole } = useAuthContext();

  return (
    <div>
      {IsPrincipalOrHigher.includes(userRole[0]) ? (
        <div className="flex gap-4">
          <EditCalendar type={type} id={id}/>
          <DeleteCalendar name={name} id={id} type={type}/>
        </div>
      ) : (
        <div>
          <p>View</p>
        </div>
      )}
    </div>
  );
};

export default Actions;
