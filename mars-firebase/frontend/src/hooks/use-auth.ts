import { auth } from "@/common/firebase/clientApp";
import useAuthStore from "@/common/store/auth-store";
import { deleteCookie, setCookie } from "cookies-next";
import { onAuthStateChanged } from "firebase/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const useAuth = () => {
  const { user, token, loading, setUser, setToken, setLoading } = useAuthStore();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false)
        setUser(null)
        setToken(null)
        await deleteCookie("__session");
        redirect("/auth/login")
      } else {
        setUser(user)
        const idToken = await user?.getIdToken()
        setToken(idToken)
        await setCookie("__session", idToken);
      }
    });

    return () => {
      unsubscribe()
    }
  }, [])

  return { user, token, loading, setLoading }
}

export default useAuth
