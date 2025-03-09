import SearchBar from "@/components/SearchBar";
import SectionNav from "@/components/SectionNav";
import { CertificateLinks } from "@/constants/index";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="home-content">
      <div className="flex flex-wrap justify-between gap-2">
        <SearchBar />
        <div></div>
      </div>
      <div className="rounded-md border bg-yellow-2 text-gray-500 p-2 px-4">
        <SectionNav links={CertificateLinks} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
