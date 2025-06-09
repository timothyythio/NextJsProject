"use server";

import { SignInFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

//sign in user with credentials (using credentials provider)

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = SignInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    //let NextJS handle any redirection errors
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

//sign out user

export async function signOutUser() {
  //calls the sign out from /auth
  await signOut();
}
