import Loader from "@/components/Loader";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-8">
      <Loader />
      <div className="text-center ml-2">Loading...</div>
    </div>
  );
};

export default Loading;
