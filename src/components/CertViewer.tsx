"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CertificateData } from "@/types/certificate";
import { Printer } from "lucide-react";
import { printCertificate } from "@/lib/actions/certificate.action";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { PDFViewer } from "@react-pdf/renderer";
import CertificatePDF from "./CertificatePDF";

const CertViewer = ({ cert }: { cert: CertificateData }) => {
  const [open, setOpen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  // Only render PDF components on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = async () => {
    try {
      // Call the API to mark the certificate as printed
      await printCertificate(cert.id);
      toast({
        title: "Success",
        description: `Certificate ${cert.student.first_name} ${cert.student.last_name} has been marked as printed.`,
        className: cn(`bottom-0 left-0`, "bg-success-100"),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark certificate as printed. Please try again.",
        className: cn(`bottom-0 left-0`, "bg-error-100"),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-2">
        <DialogTrigger asChild>
          <Button className="group p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Printer
              size={18}
              className="text-gray-500 group-hover:text-blue-600 transition-colors"
            />
          </Button>
        </DialogTrigger>
        {!cert.is_printed && (
          <Button
            onClick={handlePrint}
            variant="default"
            className="mr-12 p-1 px-4 bg-green-200 text-green-600 hover:bg-green-300 rounded-lg"
          >
            Mark as Printed
          </Button>
        )}
      </div>
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
