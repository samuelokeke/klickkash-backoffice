"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const getRolePermissions = async () => {
  const token = await cookies().get("token")?.value;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles/permissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const json = response.data?.data;
      console.log(json, "rolesshhh");
      return json;
    }
  } catch (error) {}
};
