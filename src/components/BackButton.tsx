"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="bg-yellow-2 rounded-md max-w-min">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="group flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4 group-hover:text-red-600" />
        Back
      </Button>
    </div>
  );
};

export default BackButton;
