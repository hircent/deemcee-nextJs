import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { PDFViewer } from "@react-pdf/renderer";
import CertificatePDF from "./CertificatePDF";
import { Button } from "./ui/button";
import { CertificateData } from "@/types/certificate";
import { Printer } from "lucide-react";

const CertViewer = ({ cert }: { cert: CertificateData }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Printer
            size={18}
            className="text-gray-500 group-hover:text-blue-600 transition-colors"
          />
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 flex flex-col">
        <div className="flex items-center justify-between border-b p-2">
          <DialogTitle className="text-lg">Certificate #{cert.id}</DialogTitle>
        </div>
        <div className="flex-grow">
          <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
            <CertificatePDF cert={cert} />
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertViewer;
