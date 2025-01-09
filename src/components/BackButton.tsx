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
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
    </div>
  );
};

export default BackButton;
