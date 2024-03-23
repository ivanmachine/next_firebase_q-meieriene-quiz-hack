"use client";

import GoogleLogo from "@public/googleLogo.png";
import Image from "next/image";
import s from "./LogInWithGoogle.module.scss";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, FirebaseAuthProvider } from "@/lib/firebase/firebase_config";
import { validateLogin } from "@/lib/auth/validateLogin";

export default function LogInWithGoogle() {
  async function handleLogin() {
    try {
      await signInWithPopup(auth, FirebaseAuthProvider);
      const idToken = await auth.currentUser?.getIdToken();
      console.log("Using token to login: ", idToken);
      if (idToken) {
        const status = await validateLogin(idToken);
        alert(status);
      } else alert("No token");
    } catch (e) {
      console.error("Error signing in: ", e);
    }
  }
  return (
    <button onClick={handleLogin} className={s.login__with__google}>
      <Image alt="google logo" width={40} height={40} src={GoogleLogo} />
      <p>Log in with google</p>
    </button>
  );
}
