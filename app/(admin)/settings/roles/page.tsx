import React from "react";
import axios from "@/config/axios.config";
import RolesList from "./RolesList";
import RolesHeader from "./RolesHeader";

const Roles = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles`);

  const roles = response.data?.data;

  return (
    <div>
      <RolesHeader />

      <div>
        <RolesList roles={roles} />
      </div>
    </div>
  );
};

export default Roles;
