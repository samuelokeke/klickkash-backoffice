"use server";

import { redirect } from "next/navigation";

type SignUpActionProps = {
  email: string;
  phone: string;
  password: string;
  confirm: string;
};

export async function signUp(values: SignUpActionProps) {
  const payload = {
    email: values.email,
    phone_number: values.phone,
    password: values.password,
    confirm_password: values.confirm,
    signup_type: "regular",
    checked_terms_conditions: true,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.status !== 201 && !response.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
  }

  const params = new URLSearchParams({ email: payload.email });
  redirect(`/otp?${params.toString()}`);
}
