"use server";
import { initAdmin } from "@lib/firebase/firebaseAdmin";
import { setSession } from "./getSession";

const allowed_emails = ["ivan.tarnyagin@gmail.com", "rottenburgerjr@gmail.com"];

export async function validateLogin(
  idToken: string
): Promise<"logged-in" | "not-logged-in" | "error"> {
  try {
    const adminSDK = await initAdmin();
    const decodedToken = await adminSDK.auth().verifyIdToken(idToken);
    const email = decodedToken.email;
    if (email && allowed_emails.includes(email)) {
      console.log("✅Authorized");
      try {
        await setSession({ login: "admin" });
        return "logged-in";
      } catch (e) {
        console.error("Error logging in user: ", e);
        return "error";
      }
    }
    return "not-logged-in";
  } catch (e) {
    console.error("Poop", e);
    return "error";
  }
}
