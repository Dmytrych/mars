import {
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./clientApp";

export function onAuthStateChanged(cb: () => void) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: () => void) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithCredentials(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error("Error signing in", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}