import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

export const SERVER_ACTION_STATE = {
  zodErr: null,
  success: null,
  error: null,
  msg: "",
};

type STATE<T> = {
    zodErr?: T | null;
    success?: boolean | null;
    error?: boolean | null;
    msg?: string;
  };

interface UseFormSubmissionProps<T> {
  serverAction: (prevState: STATE<T>, formData: FormData) => Promise<STATE<T>>;
}

function useFormSubmission<T>({ serverAction }: UseFormSubmissionProps<T>) {
  const [zodError, setZodError] = useState<T | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const [state, formAction] = useFormState(
    serverAction, 
    SERVER_ACTION_STATE as STATE<T>
  );

  useEffect(() => {
    if (state.zodErr) {
      setZodError(state.zodErr);
    }
    
    if (state.success) {
      formRef.current?.reset();
      setOpen(false);
      toast({
        title: "Success",
        description: state.msg,
        className: cn(
          `bottom-0 left-0`,
          "bg-success-100"
        ),
        duration: 3000,
      });
    }
    
    if (state.error) {
      toast({
        title: "Error",
        description: state.msg,
        className: cn(
          `bottom-0 left-0`,
          "bg-error-100"
        ),
        duration: 3000,
      });
    }
  }, [state, toast]);

  return {
    zodError,
    setZodError,
    open,
    setOpen,
    formRef,
    state,
    formAction
  };
}

export default useFormSubmission;