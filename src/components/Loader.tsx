import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
    </div>
  );
};

export default Loader;
