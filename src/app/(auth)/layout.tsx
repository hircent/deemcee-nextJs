import React from "react";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      <div className="auth-asset">
        <div className="px-8">
          <Image
            src="/images/home.jpg"
            alt="Auth image"
            width={700}
            height={500}
            priority={true}
            className="rounded-xl w-auto h-auto"
          />
        </div>
      </div>
      {children}
      <Toaster />
    </main>
  );
};

export default Layout;
