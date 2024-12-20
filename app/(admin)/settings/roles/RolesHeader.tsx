"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const RolesHeader = () => {
  return (
    <div className="flex justify-between gap-2">
      <h1 className="text-xl font-bold mb-6">Roles</h1>

      <Link href="/settings/roles/new">
        <Button>Add role</Button>
      </Link>
    </div>
  );
};

export default RolesHeader;
