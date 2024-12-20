"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { z } from "zod";
import { login } from "./actions";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/ui/password-input";
import { emailRegEx, pwdRegExp } from "@/lib/constants/regex.constant";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().regex(emailRegEx, "Email is not valid"),
  password: z.string().regex(pwdRegExp, {
    message: "Password strength must be strong.",
  }),
});

const LoginForm = () => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<{ message: string } | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      const data = await login(values);
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

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="rounded-xs" />
              <label
                htmlFor="terms"
                className="text-xs text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me signed in
              </label>
            </div>

            <Link className="text-xs text-primary" href="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <div className="flex justify-center mb-8">
            <Button type="submit" className="w-96 text-sm" disabled={pending}>
              {pending ? "Processing..." : "Login"}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground font-medium text-center leading-none mb-8">
            New to Klickkash?{" "}
            <Link className="text-muted-foreground" href="sign-up">
              Create an account
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
