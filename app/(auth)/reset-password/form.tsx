"use client";

import React, { useTransition, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { resetPassword } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/ui/password-input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

function ResetPasswordForm() {
  const { toast } = useToast();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ error: string; message: string } | null>(null);

  const hash_key = params.get("hash_key");

  const formSchema = z.object({
    password: z.string(),
    confirm_password: z.string(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.

    startTransition(async () => {
      const result = await resetPassword({
        password: values.password,
        confirm_password: values.confirm_password,
        hash_key: hash_key!,
      });

      if (!result?.error) {
        setResult(result);
      } else {
        toast({ title: result.message });
      }
    });
  }

  return (
    <>
      {result && <div></div>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            name="confirm_password"
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

          <div className="flex justify-center mb-8 mt-8">
            <Button type="submit" className="w-96 text-sm" disabled={pending}>
              {pending ? "Processing..." : "Proceed"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default ResetPasswordForm;
