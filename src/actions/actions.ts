"use server";

import { API_BASE_URL } from "@/lib/constEnv";
import { getErrorMessage } from "@/lib/errorsMessage";
import { createSession, deleteSession, verifySession } from "@/lib/session";
import { loginFormSchema } from "@/utils/schemas";

type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
      timestamp?: number;
    }
  | undefined;

type LoginResponse = {
  token: string;
  refreshToken: string;
};

type LoggedInUser = {
  id: string;
  email: string;
  role: "Owner" | "Employee";
  fullName: string;
};

type Salon = {
  id: string;
  name: string;
  logoPath: string;
};

export async function loginUserAction(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${API_BASE_URL}/api/Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify(validatedFields.data),
  });

  const data = (await response.json()) as LoginResponse | { title: string };

  if ("token" in data) {
    await createSession(data.token, data.refreshToken);
  } else {
    return {
      message:
        getErrorMessage((data as { title: string }).title) ??
        "Coś poszło nie tak :( Już działamy",
      timestamp: Date.now(),
    };
  }
}

export async function logoutUserAction() {
  await deleteSession();
}

export async function loadLoggedInUserAction(): Promise<LoggedInUser | null> {
  const session = await verifySession();
  if (!session?.token) return null;

  const response = await fetch(`${API_BASE_URL}/api/Auth/GetLoggedInUser`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) return null;

  return (await response.json()) as LoggedInUser;
}

export async function loadSalonsAction(): Promise<Salon[] | null> {
  const session = await verifySession();
  if (!session?.token) return null;

  const response = await fetch(`${API_BASE_URL}/api/Salon/GetUserSalons`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) return null;

  return (await response.json()) as Salon[];
}
