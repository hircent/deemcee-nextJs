"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PromoCodeData } from "@/types/promocode";
import { extractDate } from "@/lib/utils";
import { DeletePromoCode } from "@/components/DeletePromoCode";
import EditPromoCode from "@/components/EditPromoCode";

export const PromoCodeListColumns: ColumnDef<PromoCodeData>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "min_purchase_amount",
    header: "Min Purchase Amount",
  },
  {
    id: "quantity",
    header: "Quantity ( Used / Total )",
    cell: ({ row }) => {
      const promo = row.original;

      return <div>{promo.used + " / " + promo.quantity}</div>;
    },
  },
  {
    id: "expired_at",
    header: "Expired At",
    cell: ({ row }) => {
      const expired_at = row.original.expired_at;
      return extractDate(expired_at);
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const promo = row.original;

      return (
        <div className="flex gap-4">
          <EditPromoCode id={promo.id} />
          <DeletePromoCode name={promo.code} id={promo.id} />
        </div>
      );
    },
  },
];
