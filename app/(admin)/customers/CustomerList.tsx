"use client";

import React from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Customer } from "@/lib/types/customer.type";
import { ResponseData } from "@/lib/types/response.type";

type CustomerListProps = {
  data: ResponseData<"customers", Customer[]>;
};

const CustomerList = ({ data }: CustomerListProps) => {
  const router = useRouter();

  const viewCustomer = (customerId: string) => {
    router.push(`/customers/${customerId}`);
  };

  return (
    <Table>
      <TableCaption>A list of your recent Customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">First name</TableHead>
          <TableHead>Last name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone number</TableHead>
          <TableHead>Account type</TableHead>
          <TableHead>Terms & Conditions</TableHead>
          <TableHead>Activated</TableHead>
          <TableHead className="text-right">Date created</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.customers.map((customer) => (
          <TableRow key={customer.id} className="cursor-pointer" onClick={() => viewCustomer(customer.id)}>
            <TableCell className="font-medium">{customer.first_name ?? "—"}</TableCell>
            <TableCell>{customer.last_name ?? "—"}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.phone_number}</TableCell>
            <TableCell>{customer.account_signup_type}</TableCell>
            <TableCell>
              {customer.checked_terms_conditions ? (
                <CheckCheckIcon color="#04a145" />
              ) : (
                <CheckCheckIcon color="hsl(var(--border))" />
              )}
            </TableCell>
            <TableCell>
              {customer.is_activated ? (
                <CheckCheckIcon color="#04a145" />
              ) : (
                <CheckCheckIcon color="hsl(var(--border))" />
              )}
            </TableCell>
            <TableCell className="text-right">{format(customer.created_at, "yyy-MM-dd")}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
};

export default CustomerList;
