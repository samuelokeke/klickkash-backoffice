import React from "react";
import CreateRoleForm from "./form";
import { getRolePermissions } from "../../permissions/actions";

const CreateRole = async () => {
  const response = await getRolePermissions();

  const data = response?.data;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Create role</h2>

      <CreateRoleForm data={data} />
    </div>
  );
};

export default CreateRole;
