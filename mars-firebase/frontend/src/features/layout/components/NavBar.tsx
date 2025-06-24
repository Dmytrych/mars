'use client'

import useAuthStore from '@/store/auth-store';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from '@/firebase/auth';
import { redirect } from 'next/navigation';
import useAuth from '@/hooks/use-auth';

const NavBar = () => {
	useAuth()
	const { user, isLoading } = useAuthStore()

	const handleSignOutClick = () => {
		signOut()
			.then(() => {
				redirect('/')
			})
	}

	return (
		<nav className="bg-white border-b border-gray-200 shadow-sm">
			<div className="flex items-center justify-between h-16 mr-10 ml-10">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link href="/">Home</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						{user && <NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link href="/trainings">Trainings</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>}
					</NavigationMenuList>
				</NavigationMenu>
				<NavigationMenu>
					<NavigationMenuList>
						{!user || isLoading ? (
							<>
								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link href="/auth/login">Sign In</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link href="/auth/register">Sign Up</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							</>
						) : (
							<NavigationMenuItem>
								<NavigationMenuLink asChild onClick={handleSignOutClick}>
									<Button>Sign Out</Button>
								</NavigationMenuLink>
							</NavigationMenuItem>
						)}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</nav>
	);
};

export default NavBar;
