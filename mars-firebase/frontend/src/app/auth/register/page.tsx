'use client'

import { createUserWithCredentials } from '@/firebase/auth';
import useAuthStore from '@/store/auth-store';
import RegistrationForm from '@/features/auth/components/RegistrationForm';
import {RegistrationFormData} from '@/features/auth/types';
import {redirect} from 'next/navigation';

const RegisterPage = () => {
	const { user } = useAuthStore()

	if (!user) {
		redirect('/');
	}

	const handleSubmit = async (formData: RegistrationFormData) => {
		createUserWithCredentials(formData.email, formData.password)
			.then(() => redirect('/auth/login'));
	}

	return (
		<RegistrationForm onSubmit={handleSubmit}/>
	);
}

export default RegisterPage;
