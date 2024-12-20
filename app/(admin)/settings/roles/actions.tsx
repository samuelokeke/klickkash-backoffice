"use server";

import { cookies } from "next/headers";

/**
 * get all role permissions
 * @returns RolePermissions
 */
export const getRoles = async () => {
  const token = await cookies().get("token")?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {}
};

/**
 * create a new role
 * values: CreateRoleProps
 * @returns response data
 */

type CreateRoleProps = {
  role_name: string;
  description: string;
  permissions: string[];
};

export const createNewRole = async (values: CreateRoleProps) => {
  const token = await cookies().get("token")?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (response.status === 201) {
      return response.json();
    }
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
  }
};

/**
 * invite a user to role
 * values: InviteUserToRoleProps
 * @returns response data
 */
type InviteUserToRoleProps = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export const inviteUserToRole = async (role_id: string, values: InviteUserToRoleProps) => {
  const token = await cookies().get("token")?.value;

  const payload = {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    phone_number: values.phone_number,
    role_id: role_id,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles/invite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 201) {
      return response.json();
    }
  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error) {
      const response = (error as { response?: { data: { message: string } } }).response;

      return { message: response?.data.message };
    } else if (error instanceof Error) {
      return { message: error.message };
    }
  }
};
