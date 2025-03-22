import { PaymentReportListColumns } from "@/columns/report.list.columns";
import { PageListPaginatedTable } from "@/components/PageListPaginated";
import { getPaymentReportList } from "@/lib/actions/payment.action";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

const page = async () => {
  const today = new Date();
  const paymentReportData = await getPaymentReportList({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });
  return (
    <div className="py-4">
      <div className="flex flex-col gap-4">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 border border-slate-300 rounded-md p-4 sm:p-6 min-h-max">
          <div className="grid grid-cols-2 gap-2 w-full h-full">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>New Enrolment</div>
                <div className="text-left font-bold">:{" 0"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>Dropped Out</div>
                <div className="text-left font-bold">:{" 0"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>Transfer In</div>
                <div className="text-left font-bold">:{" 0"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>Transfer Out</div>
                <div className="text-left font-bold">:{" 0"}</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>Freezed</div>
                <div className="text-left font-bold">
                  :{" " + paymentReportData.attendances.freeze}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>Advanced</div>
                <div className="text-left font-bold">:{" 0"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>Extended</div>
                <div className="text-left font-bold">:{" 0"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>Graduated</div>
                <div className="text-left font-bold">:{" 0"}</div>
              </div>
            </div>
          </div>
          <div className="bg-blue border-l-2 border-slate-300 flex justify-center items-center w-full h-full gap-4">
            <div className="flex gap-2">
              <div className="flex flex-col items-centre justify-center p-4 min-w-max">
                <div className="text-center font-bold">
                  {paymentReportData.student_info.in_progress}
                </div>
                <div className="text-center">Total Active Students</div>
              </div>

              <Separator className="w-px bg-slate-300" orientation="vertical" />
              <div className="flex flex-col items-centre justify-center p-4 min-w-max">
                <div className="text-center font-bold">
                  {paymentReportData.branch_info.currency +
                    " " +
                    paymentReportData.total_paid_amount}
                </div>
                <div className="text-center">Total Fees</div>
              </div>

              <Separator className="w-px bg-slate-300" orientation="vertical" />
              <div className="flex flex-col items-centre justify-center p-4 min-w-max">
                <div className="text-center font-bold">
                  {paymentReportData.branch_info.currency +
                    " " +
                    paymentReportData.loyalty_fees}
                </div>
                <div className="text-center">
                  {"Royalty (" +
                    paymentReportData.branch_info.branch_percentage +
                    "%)"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <PageListPaginatedTable
            columns={PaymentReportListColumns}
            data={paymentReportData.payments}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
