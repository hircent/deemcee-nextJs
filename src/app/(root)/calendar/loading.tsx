import Loader from "@/components/Loader";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center m-auto h-44 w-64 bg-yellow-2 rounded-md">
      <Loader />
      <div className="text-center ml-2">Loading...</div>
    </div>
  );
};

export default Loading;
