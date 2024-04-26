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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <NavigationMenuItem key={item.name} className="my-[5px]">
        <NavigationMenuLink href={item.src}>{item.name}</NavigationMenuLink>
      </NavigationMenuItem>
    ));
  };

  const handleClick = useCallback(
    (itemOption: string) => {
      // Создаем новый экземпляр URLSearchParams и устанавливаем параметры category и page
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", itemOption);
      params.set("page", "1");

      // Преобразуем параметры в строку запроса и используем router.push один раз
      const queryString = params.toString();
      router.push(`${pathname}?${queryString}`);

      // Устанавливаем новое значение activeOption
    },
    [pathname, searchParams, router],
  );

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
              {catalogItems.map((item) => (
                <NavigationMenuItem key={item.name} className="my-[5px]">
                  <NavigationMenuLink href={`/catalog?category=${item.option}`}>
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
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
                    {catalogItems.map((item) => (
                      <NavigationMenuItem key={item.name} className="my-[5px]">
                        <NavigationMenuLink
                          href={`/catalog?category=${item.option}`}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
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
