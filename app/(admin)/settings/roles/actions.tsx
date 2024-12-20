"use server";

import { isAxiosError } from "axios";
import axios from "@/config/axios.config";

/**
 * get all role permissions
 * @returns RolePermissions
 */
export const getRolePermissions = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles/permissions`);

    if (response.status === 200) {
      return response.data?.data;
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
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles`, values);

    if (response.status === 201) {
      return response.data;
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
  const payload = {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    phone_number: values.phone_number,
    role_id: role_id,
  };

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles/invite`, payload);

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        return { message: error.response.data.message };
      }
    } else if (error instanceof Error) {
      if (error instanceof Error) {
        return { message: error.message };
      }
    }
  }
};
