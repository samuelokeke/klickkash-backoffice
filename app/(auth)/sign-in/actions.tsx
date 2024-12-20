"use server";

import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUser(prevState: any, formData: FormData) {
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    return { message: json.message };
  }

  redirect("/dashboard");
}
