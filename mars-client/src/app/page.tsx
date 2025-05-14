'use client'

import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const session = useSession({
    required: true,
  });

  return (
    <div className="title-screen flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Who are you?</h1>
      <div className="flex flex-col md:flex-row gap-4 align-middle justify-center">
        <Button asChild><Link href="/client">Client</Link></Button>
        <Button asChild><Link href="/trainer">Trainer</Link></Button>
      </div>
    </div>
  );
}
