"use server";

import { cookies } from "next/headers";

export const getRolePermissions = async () => {
  const token = await cookies().get("token")?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/roles/permissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {}
};
