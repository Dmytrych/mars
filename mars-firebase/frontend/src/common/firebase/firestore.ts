import { collection, Firestore, getDocs, query } from "firebase/firestore";
import { db as defaultFirestore } from "./clientApp";

export async function getAll(db: Firestore = defaultFirestore) {
  let q = query(collection(db, "exerciseSets"));

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
}