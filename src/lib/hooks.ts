"use client"

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useCustomHook() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleTakeCategory = useCallback(
        (itemOption: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("category", itemOption);
            params.set("page", "1");

            const queryString = params.toString();
            router.push(`${pathname}?${queryString}`);
        },
        [pathname, searchParams, router],
    );

    const handleTakePrise = useCallback(
        (min: string, max: string ) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("min", min);
            params.set("max", max);
            params.set("page", "1");

            const queryString = params.toString();
            router.push(`${pathname}?${queryString}`);
        },
        [pathname, searchParams, router],
    );

    const handleTakeSort = useCallback(
        (itemOption: string ) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("sort", itemOption);
            params.set("page", "1");

            const queryString = params.toString();
            router.push(`${pathname}?${queryString}`);
        },
        [pathname, searchParams, router],
    );

    return {handleTakeCategory, handleTakePrise, handleTakeSort};
}

