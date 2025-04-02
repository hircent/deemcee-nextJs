"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormState } from "react-dom";
import { SERVER_ACTION_STATE } from "@/constants/index";
import SubmitButton from "./SubmitButton";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { PromoCodeData } from "@/types/promocode";
import { getPaymentPromoCodeList } from "@/lib/actions/promocode.action";
import Loader from "./Loader";
import { getPaymentDetails, makePayment } from "@/lib/actions/payment.action";
import { MakePaymentFormErrors, PaymentData } from "@/types/payment";
import { usePathname, useRouter } from "next/navigation";

const MakePayment = ({ id }: { id: number }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [zoderror, setZodError] = useState<MakePaymentFormErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [paymentData, setPaymentData] = useState<PaymentData | undefined>(
    undefined
  );
  const [promoCode, setPromoCode] = useState<PromoCodeData[]>([]);
  const [promoPrice, setPromoPrice] = useState<string>("0");
  const [selectedPromoCode, setSelectedPromoCode] = useState<string>("0");
  const [promoCodePlaceholder, setPromoCodePlaceholder] =
    useState<string>("No promo code");
  const [promoCodeSelecteAble, setPromoCodeSelecteAble] =
    useState<boolean>(true);

  const [state, formAction] = useFormState(makePayment, SERVER_ACTION_STATE);

  const [amountToPay, setAmountToPay] = useState<string>("");
  const [discountedAmount, setDiscountedAmount] = useState<string>("");

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      toast({
        title: "Success",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-success-100"),
        duration: 3000,
      });
      formRef.current?.reset();
      setOpen(false);
      setZodError(null);
      router.refresh();
    }
    if (state.error) {
      toast({
        title: "Error",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
    }
  }, [state, toast]);

  function getAmountToPay(creditBalance: number, discountedPrice: number) {
    if (+creditBalance >= discountedPrice) {
      setAmountToPay("0");
    } else {
      setAmountToPay((discountedPrice - +creditBalance).toString());
    }
  }

  const getPromoCodeAndPaymentDetails = async () => {
    setPromoCode([]);
    setPaymentData(undefined);
    setAmountToPay("");
    try {
      const [promoCodeList, paymentData] = await Promise.all([
        getPaymentPromoCodeList(),
        getPaymentDetails(id),
      ]);

      if (promoCodeList.length > 0) {
        setPromoCodePlaceholder("Select promo code");
        setPromoCodeSelecteAble(false);
        setPromoCode(promoCodeList);
      }

      if (paymentData) {
        setLoading(false);
        setPaymentData(paymentData);
        getAmountToPay(
          +paymentData?.pre_outstanding || 0,
          +paymentData?.amount || 0
        );
        setDiscountedAmount(
          (+paymentData?.amount - +paymentData?.pre_outstanding).toString()
        );
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch promo code and payment data",
        className: cn(`bottom-0 left-0`, "bg-error-100"),
        duration: 3000,
      });
      setOpen(false);
    }
  };

  useEffect(() => {
    if (selectedPromoCode) {
      const promoAmount =
        promoCode.find((code) => code.id === Number(selectedPromoCode))
          ?.amount || 0;

      const originalAmount = paymentData?.amount || "0";
      const creditBalance = paymentData?.pre_outstanding || "0";
      const discountedPrice = +originalAmount - +promoAmount;
      setDiscountedAmount(discountedPrice.toString());
      setPromoPrice(promoAmount.toString());
      getAmountToPay(+creditBalance, discountedPrice);
    }
  }, [selectedPromoCode, paymentData, promoCode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="flex gap-2 text-yellow-500 hover:cursor-pointer"
          onClick={() => getPromoCodeAndPaymentDetails()}
        >
          <Clock size={18} />
          <span>Pay</span>
        </div>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay
          className="bg-black/80"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        />
        <DialogContent className="w-[500px] max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader className="space-y-2 sm:space-y-4">
            <DialogTitle className="text-xl sm:text-2xl font-semibold">
              Make Payment
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Here&apos;s the {paymentData?.student} payment details.
            </DialogDescription>
          </DialogHeader>

          <Separator className="h-px bg-slate-200" />
          {isLoading ? (
            <Loader />
          ) : (
            <form
              action={formAction}
              className="space-y-4 sm:space-y-6 mt-[-30px]"
              ref={formRef}
            >
              <Input type="hidden" name="id" value={id} />

              <div className="font-semibold text-lg mb-2">SUMMARY PAYMENT</div>

              <div className="flex justify-between items-center">
                <Label htmlFor="termPayment" className="text-sm font-medium">
                  G{paymentData?.grade} Term Payment
                </Label>
                <div className="text-right font-medium">
                  {paymentData?.currency +
                    " " +
                    Number(paymentData?.amount).toFixed(2)}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="payment_date" className="text-sm font-medium">
                  Payment Date
                </Label>
                <div className="flex w-1/2">
                  <Input
                    type="date"
                    id="payment_date"
                    placeholder="yyyy-mm-dd"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Input
                  type="hidden"
                  name="promo_code"
                  value={selectedPromoCode}
                />
                <Label htmlFor="promo_code" className="text-sm font-medium">
                  Promo Code
                </Label>
                <div className="w-1/2">
                  <Select
                    name="promo_code"
                    value={selectedPromoCode}
                    onValueChange={setSelectedPromoCode}
                    disabled={promoCodeSelecteAble}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={promoCodePlaceholder} />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      <SelectItem value="0" className="select-item">
                        None
                      </SelectItem>
                      {promoCode.map((code) => (
                        <SelectItem
                          key={code.id}
                          value={code.id.toString()}
                          className="select-item"
                        >
                          {code.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="totalAmount" className="text-sm font-medium">
                  Promo Price
                </Label>
                <div className="text-right font-medium">
                  {paymentData?.currency + " " + Number(promoPrice).toFixed(2)}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="totalAmount" className="text-sm font-medium">
                  Discounted Amount
                </Label>
                <div className="text-right font-medium">
                  {paymentData?.currency +
                    " " +
                    Number(discountedAmount).toFixed(2)}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="creditAmount" className="text-sm font-medium">
                  Credit Balance
                </Label>
                <div className="text-right font-medium">
                  {paymentData?.currency +
                    " " +
                    Number(paymentData?.pre_outstanding).toFixed(2)}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Label htmlFor="amount_to_pay" className="text-sm font-medium">
                  Amount to Pay
                </Label>
                <div className="text-right font-medium text-red-500">
                  {paymentData?.currency + " " + Number(amountToPay).toFixed(2)}
                  <div className="text-right font-medium">
                    <Input
                      id="amount_to_pay"
                      type="hidden"
                      name="amount_to_pay"
                      value={amountToPay}
                    />
                  </div>
                </div>
              </div>

              <Separator className="h-px bg-slate-200 w-full" />

              <div className="flex justify-between items-center">
                <Label htmlFor="paidAmount" className="text-sm font-medium">
                  Paid amount
                </Label>
                <div className="flex items-center">
                  <span className="mr-2 font-medium">
                    {paymentData?.currency}
                  </span>
                  <div className="w-32 text-right">
                    <Input
                      type="number"
                      id="paidAmount"
                      name="paid_amount"
                      className="text-right font-bold"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                <SubmitButton label="Pay" submitLabel="Paying" />
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default MakePayment;
