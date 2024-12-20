import React from "react";

type RoleDetailsProps = {
  params: { roleId: string };
};

const RoleDetails = ({ params }: RoleDetailsProps) => {
  return (
    <div>
      <h1 className="text-xl font-medium">Role Details {params.roleId}</h1>
    </div>
  );
};

export default RoleDetails;
