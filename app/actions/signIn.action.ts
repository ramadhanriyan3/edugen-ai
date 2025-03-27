"use server";

import { signIn as authSignIn } from "@/auth";

export const signIn = async (
  provider: "google" | "nodemailer",
  email?: FormData,
  redirectPath?: string
) => {
  if (provider === "google") {
    return await authSignIn("google", { redirectTo: redirectPath });
  } else {
    return await authSignIn("nodemailer", email!, {
      redirectTo: redirectPath!,
    });
  }
};
