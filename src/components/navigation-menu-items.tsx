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
import { Button } from "./ui/button";

type MenuItem = {
  name: string;
  src: string;
};

type CatalogMenuItems = MenuItem & {
  option: string;
};

const catalogItems: CatalogMenuItems[] = [
  { name: "All goods", src: "/catalog", option: "all" },
  { name: "Detox", src: "/catalog", option: "detox" },
  { name: "Anti-aging", src: "/catalog", option: "anti-aging" },
  {
    name: "Weight normalization",
    src: "/catalog",
    option: "weight-normalization",
  },
  { name: "Healthy heart", src: "/catalog", option: "healthy-heart" },
  { name: "Relax", src: "/catalog", option: "relax" },
  { name: "Immunity", src: "/catalog", option: "immunity" },
  { name: "Beauty", src: "/catalog", option: "beauty" },
];

const navItems: MenuItem[] = [
  { name: "Catalog", src: "/catalog" },
  { name: "About company", src: "/about-company" },
];

export default function NavigationMenuItems() {
  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <NavigationMenuItem key={item.name} className="my-[5px] hover:bg-[#f1f5f9] py-[8px] px-[10px] rounded-[5px]">
        <NavigationMenuLink href={item.src} className=''>{item.name}</NavigationMenuLink>
      </NavigationMenuItem>
    ));
  };

  return (
    <>
      <NavigationMenu className="hidden justify-between md:flex">
        <NavigationMenuList className="flex w-[250px] !justify-between text-base">
          {/* Catalog */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-0 text-base font-normal">
              Catalog
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex !w-[200px] list-none flex-col py-[20px] text-center">
              <ul>
                {catalogItems.map((item) => (
                  <NavigationMenuItem key={item.name} className="my-[5px] hover:text-[#6e860b]">
                    <NavigationMenuLink
                      href={`/catalog?category=${item.option}`}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* About company */}
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
          <SheetContent side="left" className="w-[60%] justify-between">
            <NavigationMenu className="m-auto mt-[50px] justify-between">
              <NavigationMenuList className="flex w-[140px] flex-col !justify-between text-base md:w-[350px]">
                {/* About company & Contacts */}

                {renderMenuItems(navItems.slice(1))}
                {/* Catalog */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-0 text-base font-normal">
                    Catalog
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="m-auto flex !w-[200px] list-none flex-col py-[20px] text-center">
                    <ul>
                      {catalogItems.map((item) => (
                        <NavigationMenuItem
                          key={item.name}
                          className="my-[5px] hover:text-[#6e860b]"
                        >
                          <NavigationMenuLink
                            href={`/catalog?category=${item.option}`}
                          >
                            {item.name}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </ul>
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
