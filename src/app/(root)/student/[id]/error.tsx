"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="home-content">
      <div className="h-max bg-yellow-2 rounded-md p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Something went wrong!
            </h2>
            <p className="text-gray-600">
              {error.message ||
                "An unexpected error occurred. Please try again later."}
            </p>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => reset()} variant="outline">
              Try again
            </Button>

            <Button
              onClick={() => (window.location.href = "/")}
              variant="default"
            >
              Go to Homepage
            </Button>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="w-full max-w-2xl mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm font-mono text-gray-700 break-words">
                {error.stack}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
