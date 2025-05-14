'use client'

import { useSession } from "next-auth/react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

type HomeMenuProps = {
  buttons: {
    label: string;
    href: string;
  }[]
}

export default function HomeMenu({ buttons }: HomeMenuProps) {
  const session = useSession({
    required: true,
  });

  return (
    <div className="title-screen flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome, {session.data?.user?.name}</h1>
      <div className="flex flex-col md:flex-row gap-4 align-middle justify-center">
        {buttons.map((button) => (
          <Button asChild><Link href={button.href}>{button.label}</Link></Button>
        ))}
      </div>
    </div>
  );
}
