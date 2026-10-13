"use server";

import { redirect } from "next/navigation";
import { checkCredentials, createSession } from "@/lib/auth";

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(username, password)) {
    // Frena un poco los intentos por fuerza bruta
    await new Promise((r) => setTimeout(r, 800));
    redirect("/admin/login?error=1");
  }

  await createSession();
  redirect("/admin");
}
