import { PaymentReportListColumns } from "@/columns/report.list.columns";
import { PageListTable } from "@/components/PageList";
import { getPaymentReportList } from "@/lib/actions/payment.action";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

const COL1 = [
  { name: "enrolment", value: "2", label: "New Enrolment" },
  { name: "dout", value: "2", label: "Dropped Out" },
  { name: "tin", value: "2", label: "Transfer In" },
  { name: "tout", value: "2", label: "Transfer Out" },
];

const COL2 = [
  { name: "freezed", value: "2", label: "Freezed" },
  { name: "advanced", value: "2", label: "Advanced" },
  { name: "extended", value: "2", label: "Extended" },
  { name: "graduated", value: "2", label: "Graduated" },
];

const COL3 = [
  { name: "active", value: "2", label: "Total Active Students" },
  { name: "fees", value: "2", label: "Total Fees" },
  { name: "royalty", value: "2", label: "Royalty (20%)" },
];

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
              {COL1.map((item) => (
                <div key={item.name} className="grid grid-cols-2 gap-2">
                  <div>{item.label}</div>
                  <div className="text-left font-bold">:{" " + item.value}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {COL2.map((item) => (
                <div key={item.name} className="grid grid-cols-2 gap-2">
                  <div>{item.label}</div>
                  <div className="text-left font-bold">:{" " + item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blue border-l-2 border-slate-300 flex justify-center items-center w-full h-full gap-4">
            {COL3.map((item, index) => (
              <div key={item.name} className="flex gap-2">
                <div className="flex flex-col items-centre justify-center p-4">
                  <div className="text-center font-bold">{item.value}</div>
                  <div>{item.label}</div>
                </div>
                {index !== 2 && (
                  <Separator
                    className="w-px bg-slate-300"
                    orientation="vertical"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <PageListTable
            columns={PaymentReportListColumns}
            data={paymentReportData}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
