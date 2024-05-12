"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { HomeIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname(); // Получаем текущий путь
  const [pathElements, setPathElements] = useState<string[]>([]);

  useEffect(() => {
    if (pathname) {
      // Разделяем путь на элементы, удаляем пустые элементы
      const elements = pathname.split("/").filter(Boolean);
      setPathElements(elements);
    }
  }, [pathname]);

  return (
    <section
      className={cn(
        "h-[120px] bg-[url('/breadcrumbs-bg.png')] bg-cover bg-no-repeat",
      )}
    >
      <div className="container flex h-full items-center">
        <Breadcrumb>
          <BreadcrumbList className="color-white">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon />
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            {pathElements.map((element, index) => (
              <div key={element} className="flex items-center justify-between">
                <BreadcrumbItem className="mr-[5px]">
                  {index === pathElements.length - 1 ? (
                    <BreadcrumbPage>{element}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={`/${element}${element === "catalog" ? "?category=all" : ""}`}
                    >
                      {element}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index === pathElements.length - 1 ? (
                  ""
                ) : (
                  <BreadcrumbSeparator />
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
}
