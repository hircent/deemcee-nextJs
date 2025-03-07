export type PromoCodeData = {
  id: number;
  code: string;
  amount: string;
  min_purchase_amount: string;
  quantity: number;
  used: number;
  for_all_branches: boolean;
  promo_type: string;
  expired_at: string;
  branch: null | number;
};

export type DeletePromoCodeProps = {
  name: string;
  confirmName?: string;
  id: number;
};

export type PromoCodeFormErrors = {
  confirmName?: string;
};

export type CreateUpdatePromoCodeFormErrors = {
  code?: string;
  amount?: string;
  min_purchase_amount?: string;
  quantity?: string;
  branch?: string;
  for_all_branches?: boolean;
  promo_type?: string;
  expired_at?: string;
};
