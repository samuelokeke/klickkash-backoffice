import React from "react";
import RolesList from "./RolesList";
import RolesHeader from "./RolesHeader";
import { getRoles } from "./actions";

const Roles = async () => {
  const response = await getRoles();

  const roles = response?.data;

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
