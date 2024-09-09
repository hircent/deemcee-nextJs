import HeaderBox from "@/components/HeaderBox";
import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const loggedIn = { firstName: "hircent" };
  return (
    <main className="flex h-screen w-full font-inter ">
      <Sidebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="menu icon" />
          <div>
            <MobileNavbar user={loggedIn} />
          </div>
        </div>
        <header className="home-header sticky top-0 bg-white">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and ...."
          />
        </header>
        {children}
      </div>
    </main>
  );
};

export default Layout;
