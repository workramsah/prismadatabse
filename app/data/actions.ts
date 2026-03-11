"use server";

import prisma from "../app";

type State = { success?: boolean; error?: string } | null;

export async function createUser(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const email = formData.get("email")?.toString().trim();
  const name = formData.get("name")?.toString().trim() ?? null;

  if (!email) {
    return { error: "Email is required." };
  }

  try {
    await prisma.user.create({
      data: { email, name: name || undefined },
    });
    return { success: true };
  } catch (e) {
    const message =
      e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2002"
        ? "A user with this email already exists."
        : "Failed to create user. Try again.";
    return { error: message };
  }
}
