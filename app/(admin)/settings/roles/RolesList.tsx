"use client";

import React, { MouseEvent, useState } from "react";
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
import { Role } from "@/lib/types/role.type";
import { CheckCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ResponseData } from "@/lib/types/response.type";
import InviteUserDialog from "./InviteUserDialog";

type RolesListProps = {
  roles: ResponseData<"roles", Role[]>;
};

const RolesList = ({ roles }: RolesListProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const viewRole = (roleId: string) => {
    router.push(`/settings/roles/${roleId}`);
  };

  const inviteUser = (event: MouseEvent<HTMLButtonElement>, roleId: string) => {
    event.stopPropagation();

    setIsOpen(true);
  };

  return (
    <Table>
      <TableCaption>A list of your recent Roles.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Role</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Deleted</TableHead>
          <TableHead className="text-right">Date created</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {roles?.roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="font-medium">{role.role}</TableCell>
            <TableCell>{role.description}</TableCell>
            <TableCell>
              {role.is_deleted ? <CheckCheckIcon color="#04a145" /> : <CheckCheckIcon color="hsl(var(--border))" />}
            </TableCell>
            <TableCell className="text-right">{format(role.created_at, "yyy-MM-dd")}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" onClick={(event) => inviteUser(event, role.id)}>
                Invite users
              </Button>

              <Button variant="outline" onClick={() => viewRole(role.id)}>
                View
              </Button>

              <InviteUserDialog isOpen={isOpen} setIsOpen={setIsOpen} data={{ role }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
};

export default RolesList;
