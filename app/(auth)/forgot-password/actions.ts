"use server";

import { redirect } from "next/navigation";

export async function forgotPassword(values: { email: string }) {
  const payload = { email: values.email };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.status === 200 && response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
  }
}

export async function verifyForgotPasswordOTP(values: { email: string; otp: string }) {
  const payload = { email: values.email, token: values.otp };

  let hashKey;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    hashKey = response.headers.get("hash-id-key");

    if (response.status !== 200 && !response.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
  }

  const params = new URLSearchParams({ hash_key: hashKey! });
  redirect(`/reset-password?${params.toString()}`);
}
