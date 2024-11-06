import { useAuthContext } from "@/context/userContext";
import React from "react";
import { DeleteCalendar } from "./DeleteCalendar";
import { DeleteActionProps } from "@/types/index";
import { IsPrincipalOrHigher } from "@/constants/index";
import { EditCalendar } from "./EditCalendar";

const Actions = ({id,type,name}:DeleteActionProps) => {
  const { user } = useAuthContext();

  let role :string = 'none';
  if(user){
    role = user.branch_role[0].branch_role
  }
  return (
    <div>
      {IsPrincipalOrHigher.includes(role) ? (
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
