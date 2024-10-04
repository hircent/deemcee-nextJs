"use client";

import { User, UserContextProps } from "@/types/index";
import { createContext,useContext, useEffect, useState } from "react";

const AuthContext = createContext<UserContextProps>({
  user:undefined,
  setUser: () => {}
})

export const AuthContextWrapper = ({children}:{children:React.ReactNode}) => {
  const [user,setUser] = useState<User | undefined>(undefined)

  return (
    <AuthContext.Provider value={{user:user,setUser: setUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = ()=>{
    const user = useContext(AuthContext)

    if(user == undefined){
        throw new Error("User is undefined")
    }

    return user;
}

