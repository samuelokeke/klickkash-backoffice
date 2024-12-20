"use server";

import { decodeJwt, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";
import { User } from "@/lib/types/user.type";

export async function logout() {
  deleteSession();
  redirect("/login");
}

interface JwtPayload extends JWTPayload, User {}

export default async function getAuth() {
  const token = await cookies().get("token")?.value;

  const user = decodeJwt(token as string) as JwtPayload;

  return { user };
}
