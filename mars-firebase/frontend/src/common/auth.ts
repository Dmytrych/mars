import NextAuth, {AuthOptions, DefaultSession} from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { db } from "./firebase/clientApp";

export const handlers = NextAuth({
  adapter: FirestoreAdapter(db)
})
