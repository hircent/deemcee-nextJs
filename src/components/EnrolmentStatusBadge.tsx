import { getStatusColor } from "@/lib/utils";
import { Badge } from "./ui/badge";

const EnrolmentStatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      className={`${getStatusColor(status)} font-medium text-xs px-2 py-1`}
    >
      {status.replace("_", " ")}
    </Badge>
  );
};

export default EnrolmentStatusBadge;
