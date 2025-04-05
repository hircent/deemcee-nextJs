"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { PDFViewer } from "@react-pdf/renderer";
import EnrolmentInvoicePDF from "./EnrolmentInvoicePDF";
import { InvoiceData } from "@/types/payment";
import { Button } from "./ui/button";
import { FileText } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { getInvoiceDetailForPrint } from "@/lib/actions/student.action";
import Loader from "./Loader";

const InvoiceViewer = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState<InvoiceData | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (!open) {
      setLoading(true);
      return;
    }

    const fetchInvoice = async () => {
      try {
        const invoiceData = await getInvoiceDetailForPrint(id);
        setInvoice(invoiceData);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch invoice details",
          className: cn(`bottom-0 left-0`, "bg-error-100"),
          duration: 3000,
        });
      }
    };
    fetchInvoice();
  }, [open, id, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FileText
            size={18}
            className="text-gray-500 group-hover:text-blue-500 transition-colors"
          />{" "}
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="max-w-4xl w-full h-[100vh] p-0 flex flex-col">
          <div className="flex items-center justify-between border-b p-2">
            <DialogTitle className="text-lg">Invoice #{id}</DialogTitle>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="flex-grow">
              <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
                {invoice !== undefined ? (
                  <EnrolmentInvoicePDF invoice={invoice} />
                ) : (
                  <div>No invoice found</div>
                )}
              </PDFViewer>
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default InvoiceViewer;
