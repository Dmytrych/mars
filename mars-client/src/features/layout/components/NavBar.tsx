'use client'

import {useSidebar} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {Menu, X} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const NavBar = () => {
  const { setOpenMobile, setOpen, open, isMobile } = useSidebar()

  const handleToggleMenu = () => {
    if (!isMobile) {
      setOpen(!open);
    } else {
      setOpenMobile(!open);
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Button variant='outline' size="icon" onClick={handleToggleMenu}>
            {open ? <X/> : <Menu/>}
          </Button>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
