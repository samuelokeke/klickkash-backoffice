import React from "react";
import axios from "@/config/axios.config";
import RolePermissionList from "./PermissionList";
import { Button } from "@/components/ui/button";

const Permissions = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles/permissions`);

  const role = response.data?.data;

  return (
    <div>
      <div className="flex justify-between gap-2">
        <h1 className="text-xl font-bold mb-6">Permissions</h1>

        <Button>Add permission</Button>
      </div>

      <div>
        <RolePermissionList role={role} />
      </div>
    </div>
  );
};

export default Permissions;
