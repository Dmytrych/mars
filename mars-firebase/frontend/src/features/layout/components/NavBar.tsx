'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import useAuthStore from "@/common/store/auth-store";
import { signOut } from "firebase/auth";
import { auth } from "@/common/firebase/clientApp";

const NavBar = () => {
  const { user } = useAuthStore()

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 mr-10 ml-10">
        <NavigationMenu>
          <NavigationMenuList className='gap-5'>
            <NavigationMenuItem>
              <Link href='/'>Home</Link>
            </NavigationMenuItem>
            {auth.currentUser && (
              <NavigationMenuItem>
                <Link href='/projects'>Projects</Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList className='gap-5'>
            {user && (
              <NavigationMenuItem>
                {user.displayName}
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              {user ? (
                <Button onClick={() => signOut(auth)}>Sign Out</Button>
              ) : (
                <>
                  <Link href='/auth/login'>
                    <Button>
                      Sign In
                    </Button>
                  </Link>
                  <Link href='/auth/register'>
                    <Button>
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default NavBar;
