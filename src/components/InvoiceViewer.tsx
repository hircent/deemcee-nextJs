import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PDFViewer } from "@react-pdf/renderer";
import EnrolmentInvoicePDF from "./EnrolmentInvoicePDF";

const InvoiceViewer = ({ invoice }: { invoice: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        View Invoice
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-full h-[100vh] p-0 flex flex-col">
          <div className="flex items-center justify-between border-b p-2">
            <DialogTitle className="text-lg">
              Invoice #{invoice.invoiceNumber}
            </DialogTitle>
          </div>
          <div className="flex-grow">
            <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
              <EnrolmentInvoicePDF invoice={invoice} />
            </PDFViewer>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvoiceViewer;
