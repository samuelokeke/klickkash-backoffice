"use server";

import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

type LoginActionProps = {
  email: string;
  password: string;
};


export async function login(values: LoginActionProps) {
  const payload = {
    email: values.email,
    password: values.password,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    if (response.status === 200 && response.ok) {
      createSession(json.data?.token);
    } else {
      throw new Error(json.message);
    }
  } catch (error) {
    if (error instanceof Error) return { message: error.message };
  }

  redirect("/dashboard");
}
