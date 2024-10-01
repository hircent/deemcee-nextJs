import { HeaderBoxProps } from "@/types/index";
import React from "react";

const HeaderBox = ({ type, title, user, subtext }: HeaderBoxProps) => {
  return (
    <div className="flex justify-between">
      <div className="header-box">
        <h1 className="header-box-title">
          {title}
          {type === "greeting" && (
            <span className="text-bankGradient">&nbsp;{user}</span>
          )}
        </h1>
        {/* <p className="header-box-subtext">{subtext}</p> */}
      </div>
      <div>me</div>
    </div>
  );
};

export default HeaderBox;
