"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { HOME_REDIRECT } from "@/constants/message";
import { signInResponse } from "@/types/index";
import { useAuthContext } from "@/context/userContext";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const AuthForm = ({ type }: { type: string }) => {
  const { user, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toastResponse = (res: signInResponse) => {
    if (res.success) {
      toast({
        title: "Successful",
        description: HOME_REDIRECT,
        duration: 3000,
        className: cn("bottom-0 left-0 bg-success-100"),
      });
    } else {
      toast({
        title: "Failed",
        description: res.msg,
        duration: 5000,
        className: cn("bottom-0 left-0 bg-error-100"),
      });
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setIsLoading(true);
    try {
      const res: signInResponse = await signIn({
        email: values.email,
        password: values.password,
      });

      if (res.success && res.data) {
        setUser(res.data);
      }

      toastResponse(res);

      setTimeout(() => {
        router.push("/");
      }, 2100);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        duration: 4000,
        className: cn("bottom-0 left-0 bg-error-100"),
      });
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/images/logo-hor.svg"
            width={250}
            height={70}
            alt="Deemcee logo"
          />
          {/* <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            {appConfig.app_name}
          </h1> */}
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            Sign In
            <p className="text-16 font-normal text-gray-600">
              Please enter your detail
            </p>
          </h1>
        </div>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div className="form-item">
                <FormLabel className="form-label">Email</FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder="Enter you email"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="form-message mt-2" />
                </div>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div className="form-item">
                <FormLabel className="form-label">Password</FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder="Enter you password"
                      className="input-class"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="form-message mt-2" />
                </div>
              </div>
            )}
          />
          <div className="flex flex-col gap-4">
            <Button type="submit" className="form-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />{" "}
                  &nbsp;Loading...
                </>
              ) : type === "sign-in" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AuthForm;
