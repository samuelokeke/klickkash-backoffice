"use client";

import { Dispatch, SetStateAction, useRef, useState, useTransition } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { inviteUserToRole } from "./actions";
import { Role } from "@/lib/types/role.type";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/components/ui/phone-input";
import { phoneRegEx } from "@/lib/constants/regex.constant";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  first_name: z.string().min(4),
  last_name: z.string().min(4),
  email: z.string().email("Email is not valid"),
  phone_number: z.string().regex(phoneRegEx, {
    message: "Phone number must be valid.",
  }),
});

type InviteUserDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data?: { role: Role };
};

export default function InviteUserDialog({ isOpen, setIsOpen, data }: InviteUserDialogProps) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<{ message: string } | null>(null);

  const formActionWithRoleId = inviteUserToRole.bind(null, data?.role.id as string);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      const data = await formActionWithRoleId(values);

      if (data.status === "success") {
        setIsOpen(false);
        toast({ title: data.message });
      } else {
        toast({ title: data.message, variant: "destructive" });
        setError(data);
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite users</DialogTitle>
          <DialogDescription>Add user to a role. Click send when you&apos;re done.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-xs">First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-xs">Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="phone_number"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-xs">Phone number</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder="Enter a phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>{error?.message && <p className="text-red-500">{error.message}</p>}</div>
          </form>
        </Form>

        <DialogFooter>
          <Button type="submit" onClick={() => formRef.current?.requestSubmit()} disabled={pending}>
            Send invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
