import React from "react";
import CreateRoleForm from "./form";
import axios from "@/config/axios.config"

const CreateRole = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles/permissions`);

  const data = response.data?.data;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Create role</h2>

      <CreateRoleForm data={data} />
    </div>
  );
};

export default CreateRole;
