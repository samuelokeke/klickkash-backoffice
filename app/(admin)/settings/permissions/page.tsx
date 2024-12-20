import React from "react";
import RolePermissionList from "./PermissionList";
import { Button } from "@/components/ui/button";
import { getRolePermissions } from "./actions";

const Permissions = async () => {
  const response = await getRolePermissions();

  const role = response.data;

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
