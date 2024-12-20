"use client";

import React, { useMemo, useState, useTransition } from "react";
import { z } from "zod";
import Link from "next/link";
import { createNewRole } from "../actions";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Permission } from "@/lib/types/role.type";
import { ResponseData } from "@/lib/types/response.type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiSelect } from "@/components/ui/multi-select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  role_name: z.string().min(3),
  description: z.string().min(10),
  permissions: z.string().array(),
});

type CreateRoleFormProps = {
  data: ResponseData<"permissions", Permission[]>;
};

const CreateRoleForm = ({ data }: CreateRoleFormProps) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<{ message: string } | null>(null);

  const permissions = useMemo(
    () => data.permissions.map((permission) => ({ value: permission.id, label: permission.permission })),
    [data]
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role_name: "",
      description: "",
      permissions: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      const data = await createNewRole(values);

      if (data.status === "success") {
        toast({ title: data.message, description: `${values.role_name} role has been created` });

        router.push("/settings/roles");
      } else {
        setError(data);
      }
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
            name="role_name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-xs">Role name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter role name" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-xs">Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter role description" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="permissions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permissions</FormLabel>
                <MultiSelect
                  options={permissions}
                  onValueChange={(items) => field.onChange(items)}
                  defaultValue={field.value}
                  placeholder="Select permissions"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                  {...field}
                />
                <FormDescription>
                  You can manage role permissions in your <Link href="/settings/permissions">permissions</Link>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-12 mb-6">
            <Button type="submit" className="md:w-auto w-full text-sm" disabled={pending}>
              {pending ? "Processing..." : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateRoleForm;
