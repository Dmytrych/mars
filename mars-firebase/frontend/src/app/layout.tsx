'use client'

import "./globals.css";
import Providers from "@/components/Providers";
import NavBar from "@/features/layout/components/NavBar";
import useAuth from "@/hooks/use-auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuth()

  return (
    <Providers>
      <html lang="en">
        <body
          className="antialiased w-full"
        >
          <div className="flex flex-col grow">
            <NavBar/>
            {children}
          </div>
        </body>
      </html>
    </Providers>
  );
}
