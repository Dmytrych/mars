'use client'

import {SessionProvider} from "next-auth/react";
import type { Session } from "next-auth";
import {SidebarProvider} from "@/components/ui/sidebar";

const Providers = ({ children, session }: { children: React.ReactNode, session: Session | null }) => {
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </SessionProvider>
  );
}

export default Providers
