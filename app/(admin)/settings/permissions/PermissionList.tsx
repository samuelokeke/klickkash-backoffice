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
import { Permission } from "@/lib/types/role.type";
import { ResponseData } from "@/lib/types/response.type";

type RolePermissionsListProps = {
  role: ResponseData<"permissions", Permission[]>;
};

const RolePermissionsList = ({ role }: RolePermissionsListProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent Role Permissions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Permission</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Date created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {role?.permissions.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="font-medium">{role.permission}</TableCell>
            <TableCell>{role.category}</TableCell>
            <TableCell>{role.description}</TableCell>
            <TableCell className="text-right">{format(role.created_at, "yyy-MM-dd")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
};

export default RolePermissionsList;
