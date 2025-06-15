'use client'

import { db } from "@/common/firebase/clientApp";
import { getAll } from "@/common/firebase/firestore";
import { useEffect } from "react";

const HomePage = async () => {
  useEffect(() => {
    getAll(db).then((data) => console.log(data))
  }, [])

  return (
    <div className="flex justify-center">
      Home page
    </div>
  );
}

export default HomePage;
