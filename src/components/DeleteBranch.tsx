"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteProps } from "@/types/index";
import { Trash2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { FormField } from "./ui/form";
import { useState } from "react";
import { deleteBranch } from "@/lib/actions/branch.action";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

const deleteFormSchema = z.object({
  name: z.string(),
});

export function DeleteBranch({ type, name, id }: DeleteProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof deleteFormSchema>>({
    resolver: zodResolver(deleteFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof deleteFormSchema>) => {
    setLoading(true);
    setOpen(false);

    try {
      await deleteBranch({ name: values.name, confirmName: name, id });
      toast({
        title: "Success",
        description: `${type} "${name}" has been deleted successfully.`,
        duration: 2000,
        className: cn("bottom-0 left-0 bg-success-100"),
      });
    } catch (err: any) {
      if (err instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.message,
          duration: 3000,
          className: cn("bottom-0 left-0 bg-error-100"),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred",
          duration: 3000,
          className: cn("bottom-0 left-0 bg-error-100"),
        });
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Trash2
            size={18}
            className="text-gray-500 group-hover:text-red-500 transition-colors"
          />
        </Button>
      </DialogTrigger>
      <DialogOverlay
        className="bg-black/80"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />
      <DialogContent className="w-[400px] sm:max-w-[425px] bg-white rounded-md">
        <DialogHeader>
          <DialogTitle>Delete {type}</DialogTitle>
          <DialogDescription>
            Are you sure to delete {type}{" "}
            <span className="font-bold">{name}</span>?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div className="grid gap-4 py-4 border-b-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="branchName" className="text-left">
                    Name:
                  </Label>
                  <Input id="branchName" className="col-span-3" {...field} />
                </div>
              </div>
            )}
          />
          <small className="text-slate-400">
            Please key in the branch name to confirm delete.
          </small>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-red-500 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Deleting.." : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
