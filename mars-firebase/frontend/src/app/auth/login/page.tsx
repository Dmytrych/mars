'use client'

import { LoginFormData } from '@/features/auth/types';
import { redirect } from 'next/navigation';
import LoginForm from '@/features/auth/components/LoginForm';
import useAuth from '@/hooks/use-auth';
import { signInWithCredentials } from '@/firebase/auth';

const LoginPage = () => {
	const { user } = useAuth()

	if (user) {
		redirect('/')
	}

	const handleSubmit = async (formData: LoginFormData) => {
		const { email, password } = formData
		await signInWithCredentials(email, password)
	}

	return (
		<LoginForm onSubmit={handleSubmit} />
	);
}

export default LoginPage;
