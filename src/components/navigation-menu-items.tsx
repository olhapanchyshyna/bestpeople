"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Phone from "./phone";
import { Button } from "./ui/button";

type MenuItem = {
  name: string;
  src: string;
};

const catalogItems: MenuItem[] = [
  { name: "Detox", src: "/catalog" },
  { name: "Anti-aging", src: "/catalog" },
  { name: "Weight normalization", src: "/catalog" },
  { name: "Healthy heart", src: "/catalog" },
  { name: "Relax", src: "/catalog" },
  { name: "Immunity", src: "/catalog" },
  { name: "Beauty", src: "/catalog" },
];

const navItems: MenuItem[] = [
  { name: "Catalog", src: "/catalog" },
  { name: "About company", src: "/about-company" },
  { name: "Contacts", src: "/contacts" },
];

export default function NavigationMenuItems() {
  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <NavigationMenuItem key={item.name} className="my-[5px]">
        <NavigationMenuLink href={item.src}>{item.name}</NavigationMenuLink>
      </NavigationMenuItem>
    ));
  };

  return (
    <>
      <NavigationMenu className="hidden justify-between md:flex">
        <NavigationMenuList className="flex w-[350px] !justify-between text-base">
          {/* Catalog */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-0 text-base font-normal">
              Catalog
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex !w-[200px] list-none flex-col py-[20px] text-center">
              {renderMenuItems(catalogItems)}
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* About company & Contacts */}
          {renderMenuItems(navItems.slice(1))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="order-1 md:order-none md:hidden">
        <Sheet key="left">
          <SheetTrigger asChild>
            <Button variant="outline" className="border-none px-[5px] py-[5px]">
              <Image
                src="/hamburger-menu.svg"
                alt="white line"
                width={30}
                height={24}
              />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[50%] justify-between">
            <NavigationMenu className="m-auto mt-[50px] justify-between">
              <NavigationMenuList className="flex w-[120px] flex-col !justify-between text-base md:w-[350px]">
                {/* About company & Contacts */}
                {renderMenuItems(navItems.slice(1))}
                {/* Catalog */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-0 text-base font-normal">
                    Catalog
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="m-auto flex !w-[200px] list-none flex-col py-[20px] text-center">
                    {renderMenuItems(catalogItems)}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
