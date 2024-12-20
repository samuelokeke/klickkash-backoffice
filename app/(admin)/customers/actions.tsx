"use server";

import { cookies } from "next/headers";

export async function getCustomers() {
  const token = await cookies().get("token")?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/customers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error) {}
}
