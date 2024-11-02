export type CategoryData = {
    id: number;
    name: string;
    label: string;
    year: number;
    is_active: boolean;
}

export type CategoryFormErrors = {
    name?: string;
    label?: string;
    year?: string;
    is_active?: boolean;
  };