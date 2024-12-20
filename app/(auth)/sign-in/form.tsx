"use client";

import React, { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "./actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { pwdRegExp } from "@/lib/constants/regex.constant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/ui/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const initialState = {
  message: "",
};

const formSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().regex(pwdRegExp, {
    message: "Password strength must be strong.",
  }),
  terms: z.boolean({ message: "Terms should be selected" }),
});

const SignInForm = () => {
  const [state, formAction] = useFormState(createUser, initialState);
  const [pending, setPending] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    setPending(true);
    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);

    await formAction(formData);

    setPending(false);
  }

  return (
    <Form {...form}>
      <div>{state?.message && !pending && <p className="text-sm text-red-500 mt-2">{state.message}</p>}</div>

      {pending && (
        <div className="flex items-center gap-1 mt-2">
          <Spinner size="small" /> <p className="text-sm">Loading...</p>
        </div>
      )}

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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Controller
              name="terms"
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  id="terms"
                  className="rounded-xs"
                  onCheckedChange={(checked) => onChange(checked)}
                  checked={value}
                />
              )}
            />

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

        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </Form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      Submit
    </Button>
  );
}

export default SignInForm;
