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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  getAllPrincipalAndBranchGrade,
  getBranchDetails,
  updateBranch,
} from "@/lib/actions/branch.action";
import { BranchGrade, EditProps, Principal } from "@/types/index";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { branchFormSchema, BranchFormValues } from "@/constants/form";

export function EditUser({ type, id }: EditProps) {

  const { toast } = useToast();


  return (
    <div>{id}</div>
  );
}
