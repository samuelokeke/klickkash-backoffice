"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import Link from "next/link";
import { signUp } from "./actions";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/ui/password-input";
import { emailRegEx, phoneRegEx, pwdRegExp } from "@/lib/constants/regex.constant";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z
  .object({
    email: z.string().regex(emailRegEx, "Email is not valid"),
    phone: z.string().regex(phoneRegEx),
    password: z.string().regex(pwdRegExp, {
      message: "Password strength must be strong.",
    }),
    confirm: z.string().regex(pwdRegExp, {
      message: "Password strength must be strong.",
    }),
  })
  .refine((value) => value.password === value.confirm, {
    message: "Password does not match",
    path: ["confirm"],
  });

const SignUpForm = () => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<{ message: string } | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      confirm: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      const data = await signUp(values);
      console.log(data)
      setError(data);
    });
  }

  return (
    <>
      <div>
        {error && !pending && <p className="text-sm text-red-500 mt-2">{error.message}</p>}

        {pending && (
          <div className="flex items-center gap-1 mt-2">
            <Spinner size="small" /> <p className="text-sm">Loading...</p>
          </div>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-xs">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-xs">Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-xs">Password</FormLabel>
                <FormControl>
                  <PasswordInput type="password" placeholder="Enter password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-xs">Confirm password</FormLabel>
                <FormControl>
                  <PasswordInput type="password" placeholder="Re-enter password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center mt-12 mb-6">
            <Button type="submit" className="md:w-96 w-full text-sm" disabled={pending}>
              {pending ? "Processing..." : "Sign up"}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground font-medium text-center leading-none mb-6">
            Already have a Klickkash account?{" "}
            <Link className="text-primary" href="login">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
