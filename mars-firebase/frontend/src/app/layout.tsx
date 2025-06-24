'use client'

import './globals.css';
import NavBar from '@/features/layout/components/NavBar';

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className="antialiased w-full"
			>
				<div className="flex flex-col grow">
					<NavBar />
					{children}
				</div>
			</body>
		</html>
	);
}
