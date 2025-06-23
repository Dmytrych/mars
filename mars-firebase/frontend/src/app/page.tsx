import { getAll } from "@/common/firebase/firestore";
import { getAuthenticatedAppForUser } from "@/common/firebase/serverApp";
import { getFirestore } from "firebase/firestore";

const HomePage = async () => {
  const { firebaseServerApp } = await getAuthenticatedAppForUser()

  const data = await getAll(getFirestore(firebaseServerApp))
  return (
    <div className="flex justify-center">
      {JSON.stringify(data)}
    </div>
  );
}

export default HomePage;
