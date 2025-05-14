'use client'

import LoginForm from "./LoginForm";
import {signIn} from "next-auth/react";

export default function LoginPage() {
  const handleLogin = (data: { email: string; password: string }) => {
    signIn('credentials', { redirect: false, password: data.password, email: data.email });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h1 className="mb-4 text-2xl font-bold text-center">Login</h1>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
