import HeaderBox from "@/components/HeaderBox";
import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import { authUser } from "@/lib/actions/user.actions";
import { getUserRole } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await authUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={user} />

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
            user={user}
            subtext="Access and manage your account and ...."
          />
        </header>
        <section className="home overflow-y-scroll custom-scrollbar">
          {children}
        </section>
        {/* <footer className="w-full bg-yellow-2 px-5 max-md:hidden sm:px-8 py-4">
          here
        </footer> */}
      </div>
    </main>
  );
};

export default Layout;
