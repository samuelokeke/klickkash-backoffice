import React from "react";
import axios from "@/config/axios.config";

const Settings = async () => {
  const rolesResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles`);
  const permResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles/permissions`);

  const roles = rolesResponse.data?.data;
  const permissions = permResponse.data?.data;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Analytics</h1>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6 min-h-32 bg-white grid place-content-center text-center border rounded-sm p-6">
          <p className="font-medium mb-5">Roles count</p>

          <h2 className="text-4xl font-thin">{roles?.roles?.length ?? 0}</h2>
        </div>

        <div className="col-span-6 min-h-32 bg-white grid place-content-center text-center border rounded-sm p-6">
          <p className="font-medium mb-5">Permissions count</p>

          <h2 className="text-4xl font-thin">{permissions?.permissions?.length ?? 0}</h2>
        </div>
      </div>
    </div>
  );
};

export default Settings;
