"use client"

// useCustomHook.js
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useCustomHook() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = useCallback(
        (itemOption: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("category", itemOption);
            params.set("page", "1");

            const queryString = params.toString();
            router.push(`${pathname}?${queryString}`);
        },
        [pathname, searchParams, router],
    );

    return handleClick;
}
