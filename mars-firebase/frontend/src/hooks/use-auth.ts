import { auth } from '@/firebase/clientApp';
import useAuthStore from '@/store/auth-store';
import { deleteCookie, setCookie } from 'cookies-next';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

const useAuth = () => {
	const { user, isLoading, setUser, setLoading } = useAuthStore();
  
	useEffect(() => {
		return onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setLoading(false)
				setUser(null)
				await deleteCookie('__session');
			} else {
				setUser(user)
				const idToken = await user?.getIdToken()
				await setCookie('__session', idToken);
			}
		});
	}, [setUser, setLoading])

	return { user, isLoading, setLoading }
}

export default useAuth
