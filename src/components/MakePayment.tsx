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
import {
  CreateUpdatePromoCodeFormErrors,
  PromoCodeData,
} from "@/types/promocode";
import {
  editPromoCode,
  getPaymentPromoCodeList,
} from "@/lib/actions/promocode.action";
import Loader from "./Loader";
import { getPaymentDetails } from "@/lib/actions/payment.action";
import { PaymentData } from "@/types/payment";

const MakePayment = ({ id }: { id: number }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [zoderror, setZodError] =
    useState<CreateUpdatePromoCodeFormErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [paymentData, setPaymentData] = useState<PaymentData | undefined>(
    undefined
  );
  const [promoCode, setPromoCode] = useState<PromoCodeData[]>([]);
  const [selectedPromoCode, setSelectedPromoCode] = useState<string>("");

  const [state, formAction] = useFormState(editPromoCode, SERVER_ACTION_STATE);

  const [amountToPay, setAmountToPay] = useState<string>("");

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    if (state.success) {
      formRef.current?.reset();
      setOpen(false);
      setZodError(null);
      toast({
        title: "Success",
        description: state.msg,
        className: cn(`bottom-0 left-0`, "bg-success-100"),
        duration: 3000,
      });
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

  const getPromoCodeAndPaymentDetails = async () => {
    setPromoCode([]);
    setPaymentData(undefined);
    setAmountToPay("");
    try {
      const [promoCodeList, paymentData] = await Promise.all([
        getPaymentPromoCodeList(),
        getPaymentDetails(id),
      ]);

      if (promoCodeList && paymentData) {
        setLoading(false);
        setPromoCode(promoCodeList);
        setPaymentData(paymentData);
        setAmountToPay(paymentData?.amount);
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
      const calculatedAmount = Math.max(
        0,
        +originalAmount - +promoAmount
      ).toString();

      setAmountToPay(calculatedAmount);
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
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[500px] h-max max-h-[90vh] overflow-y-auto custom-scrollbar">
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
            className="space-y-4 sm:space-y-6"
            ref={formRef}
          >
            <Input type="hidden" name="id" value={id} />

            <div className="font-semibold text-lg mb-2">SUMMARY PAYMENT</div>

            {/* G2 Term Payment - Left-Right Layout */}
            <div className="flex justify-between items-center">
              <Label htmlFor="g2TermPayment" className="text-sm font-medium">
                G{paymentData?.grade} Term Payment
              </Label>
              <div className="text-right font-medium">
                RM {Number(paymentData?.amount).toFixed(2)}
                <Input
                  type="hidden"
                  name="g2TermPayment"
                  value={paymentData?.amount}
                />
              </div>
            </div>
            {/* Payment Date - Left-Right Layout */}
            <div className="flex justify-between items-center">
              <Label htmlFor="paymentDate" className="text-sm font-medium">
                Payment Date
              </Label>
              <div className="flex w-1/2">
                <Input
                  type="date"
                  id="paymentDate"
                  name="paymentDate"
                  placeholder="yyyy-mm-dd"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
              </div>
            </div>

            {/* Promo Code - Left-Right Layout */}
            <div className="flex justify-between items-center">
              <Input type="hidden" name="promoCode" value={selectedPromoCode} />
              <Label htmlFor="promoCode" className="text-sm font-medium">
                Promo Code
              </Label>
              <div className="w-1/2">
                <Select
                  name="promoCode"
                  value={selectedPromoCode}
                  onValueChange={setSelectedPromoCode}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select promo code" />
                  </SelectTrigger>
                  <SelectContent className="select-content">
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

            {/* Total - Left-Right Layout */}
            <div className="flex justify-between items-center">
              <Label htmlFor="totalAmount" className="text-sm font-medium">
                Total
              </Label>
              <div className="text-right font-medium">
                RM {Number(paymentData?.amount).toFixed(2)}
                <Input
                  type="hidden"
                  name="totalAmount"
                  value={paymentData?.amount}
                />
              </div>
            </div>

            {/* Credit - Left-Right Layout */}
            <div className="flex justify-between items-center">
              <Label htmlFor="creditAmount" className="text-sm font-medium">
                Credit
              </Label>
              <div className="text-right font-medium">
                RM {Number(paymentData?.pre_outstanding).toFixed(2)}
                <Input
                  type="hidden"
                  name="creditAmount"
                  value={paymentData?.pre_outstanding}
                />
              </div>
            </div>

            {/* Separator before Amount to Pay */}
            <div className="pt-2">
              <Separator className="h-px bg-slate-200 w-full" />
            </div>

            {/* Amount to Pay - Left-Right Layout with Separator */}
            <div className="flex justify-between items-center pt-2">
              <Label htmlFor="amountToPay" className="text-sm font-medium">
                Amount to Pay
              </Label>
              <div className="flex items-center">
                <span className="mr-2 font-medium">RM</span>
                <div className="w-32 text-right">
                  <Input
                    type="number"
                    id="amountToPay"
                    name="amountToPay"
                    value={amountToPay} // Changed from defaultValue to value
                    onChange={(e) => setAmountToPay(e.target.value)}
                    className="text-right font-bold"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
              <SubmitButton label="Pay" submitLabel="Paying" />
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MakePayment;
