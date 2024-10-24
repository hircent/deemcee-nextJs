"use client";

import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import { User } from "@/types/index";
import { createContext, useContext, useEffect, useState } from "react";

type UserRole = string[];

type UserContextProps = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  userRole: UserRole;
  setUserRole: React.Dispatch<React.SetStateAction<UserRole>>;
};
const AuthContext = createContext<UserContextProps | undefined>(undefined);

export const AuthContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userRole, setUserRole] = useState<UserRole>([]);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = await authUser();
      const userRole = getUserRole(user);
      setUserRole(userRole);
      setUser(user);
    };

    fetchUserRole();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user: user, setUser: setUser, userRole, setUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const user = useContext(AuthContext);

  if (user == undefined) {
    throw new Error("User is undefined");
  }

  return user;
};
