"use client";

import { User, UserContextProps } from "@/types/index";
import { createContext,useContext, useEffect, useState } from "react";

const AuthContext = createContext<UserContextProps>({user:undefined,isLoading:true})

export const AuthContextWrapper = ({children}:{children:React.ReactNode}) => {
  const [user,setUser] = useState<User | undefined>(undefined)
  const [isLoading,setLoading] = useState<boolean>(true)
  // const [isMount,setMount] = useState<boolean>(false)

  async function getUser() {

    try {
      const response = await fetch("/api/users",{
        headers:{
          Accept: "application/json",
          method: "GET",
        }
      })

      if(response.ok){
        const data = await response.json()
        setUser(data)
        setLoading(false)
        // setMount(true)
      }
      
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    getUser()
  },[])
  return (
    <AuthContext.Provider value={{user:user,isLoading:isLoading}}>
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

