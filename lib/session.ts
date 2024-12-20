import "server-only";
import { cookies } from "next/headers";
import { decodeJwt, SignJWT } from "jose";
import { SessionPayload } from "./types/session.type";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode("Klickcash.jwt.secret");

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(token: string | undefined = "") {
  try {
    const decoded = decodeJwt(token);
    return decoded;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
