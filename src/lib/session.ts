import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_SESSION_NAME } from "@/lib/constEnv";

type SessionPayload = {
  // userId: string | number;
  // expiresAt: Date;
  token: string;
  refreshToken: string;
};

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(token: string, refreshToken: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ token, refreshToken });

  (await cookies()).set(COOKIE_SESSION_NAME, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  redirect("/app/dashboard");
}

export async function verifySession() {
  const cookie = (await cookies()).get(COOKIE_SESSION_NAME)?.value;
  const session = await decrypt(cookie);

  if (!session?.token) {
    redirect("/app/auth");
  }

  return { isAuth: true, token: session.token, refreshToken: session.token };
}

export async function updateSession() {
  const session = (await cookies()).get(COOKIE_SESSION_NAME)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  (await cookies()).set(COOKIE_SESSION_NAME, session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  (await cookies()).delete(COOKIE_SESSION_NAME);
  redirect("/app/auth");
}
