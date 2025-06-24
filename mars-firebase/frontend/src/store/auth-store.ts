import { create } from 'zustand';
import { User } from 'firebase/auth';
import { auth } from '../firebase/clientApp';

interface  IAuth {
    user:  User |  null;
    isLoading:  boolean;
    setUser: (user: User | null) => void,
    setLoading: (loading: boolean) => void
}

const useAuthStore = create<IAuth>((set) => ({
	setUser: (user) => set({ user }),
	setLoading: (isLoading) => set({ isLoading }),
	user: auth.currentUser,
	isLoading: false,
}));

export default useAuthStore