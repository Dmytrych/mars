'use client'

import RegistrationForm from "@/features/auth/components/RegistrationForm";
import {RegistrationFormData} from "@/features/auth/types";
import {redirect} from "next/navigation";
import { useAuthStore } from "@/common/store/auth-store";

const RegisterPage = () => {
  const { user, register } = useAuthStore()

  if (!user) {
    redirect("/");
  }

  const handleSubmit = async (formData: RegistrationFormData) => {
    register(formData)
      .then(() => redirect("/auth/login"));
  }

  return (
    <RegistrationForm onSubmit={handleSubmit}/>
  );
}

export default RegisterPage;
