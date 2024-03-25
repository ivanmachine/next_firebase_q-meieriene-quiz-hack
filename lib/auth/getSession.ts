"use server";
import { unsealData, sealData } from "iron-session";
import { cookies } from "next/headers";
import { User } from "./types";

const sessionPassword = process.env.SESSION_PASSWORD;
if (!sessionPassword) throw new Error("SESSION_PASSWORD is not set");

export async function getSession(): Promise<User | null> {
  const encryptedSession = cookies().get("auth_session");
  if (!(encryptedSession && encryptedSession.value)) return null;
  if (encryptedSession.value && sessionPassword) {
    // This WILL fail if auth_session json encoding is shit
    const session = await unsealData(encryptedSession.value, {
      password: sessionPassword,
    });
    if (typeof session === "string") return JSON.parse(session);
    else throw new Error("Session is not of type string");
  } else {
    throw new Error("Either encryptedSession or sessionPassword is null");
  }
}

export async function setSession(user: User): Promise<void> {
  if (sessionPassword) {
    // This might fail
    const encryptedSession = await sealData(JSON.stringify(user), {
      password: sessionPassword,
    });
    const secure_if_production = process.env.DEVENV === "dev" ? true : false;
    cookies().set("auth_session", encryptedSession, {
      sameSite: "strict",
      httpOnly: true,
      secure: secure_if_production,
    });
  } else throw new Error("No sessionPassword");
  // paste u
}
