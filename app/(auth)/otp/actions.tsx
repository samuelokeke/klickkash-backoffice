"use server";

import { redirect } from "next/navigation";

type VerifyTokenProps = {
  email: string;
  token: string;
};

export async function verifyToken(values: VerifyTokenProps) {
  const payload = {
    email: values.email,
    token: values.token,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-otp`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.status !== 200 && !response.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
  }

  redirect("/login");
}
