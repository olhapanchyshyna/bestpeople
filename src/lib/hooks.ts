"use client"

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useCustomHook() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateSearchParams = useCallback(
        (paramsToUpdate: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(paramsToUpdate).forEach(([key, value]) => {
                params.set(key, value);
            });
            params.set("page", "1");

            const queryString = params.toString();
            router.push(`${pathname}?${queryString}`);
        },
        [pathname, searchParams, router],
    );

    const handleTakeCategory = useCallback(
        (itemOption: string) => {
            updateSearchParams({ category: itemOption });
        },
        [updateSearchParams],
    );

    const handleTakePrice = useCallback(
        (min: string, max: string) => {
            updateSearchParams({ min, max });
        },
        [updateSearchParams],
    );

    const handleTakeSort = useCallback(
        (itemOption: string) => {
            updateSearchParams({ sort: itemOption });
        },
        [updateSearchParams],
    );

    return { handleTakeCategory, handleTakePrice, handleTakeSort };
}
