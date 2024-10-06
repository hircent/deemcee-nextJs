import HeaderBox from "@/components/HeaderBox";
import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authUser()
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={user}/>

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="menu icon" />
          <div>
            <MobileNavbar />
          </div>
        </div>
        <header className="home-header sticky top-0">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={user?.username || "Guest"}
            subtext="Access and manage your account and ...."
          />
        </header>
        {children}
      </div>
    </main>
  );
};

export default Layout;
