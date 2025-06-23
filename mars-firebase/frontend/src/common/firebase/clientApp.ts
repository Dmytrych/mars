"use client";

import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./config";

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
await setPersistence(auth, browserLocalPersistence)

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);