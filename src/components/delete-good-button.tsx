"use client";

import { getClientSideArrayCookie } from "@/lib/cookies/client/get-client-side-array-cookie";
import { setClientSideArrayCookie } from "@/lib/cookies/client/set-client-side-array-cookie";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { rPath } from '@/lib/actions/revalidate-path'

type DeleteGoodButtonProps = {
  id: number;
};

export default function DeleteGoodButton({ id }: DeleteGoodButtonProps) {
  const deletwGoodFromBasket = (id: number) => {
    // Get current cookie
    const currentCookie = getClientSideArrayCookie("basket");

    // Filter out the good with the id that matches the id passed to the function
    const updatedCookie = currentCookie?.filter(
      (item) => item.id !== id.toString(),
    );
    // Set the new cookie
    setClientSideArrayCookie("basket", [...(updatedCookie || [])], 30);

		rPath("/basket");
  };

  return (
    <Button variant="link" onClick={() => deletwGoodFromBasket(id)}>
      <CrossCircledIcon
        className="h-[20px] w-[20px] cursor-pointer hover:stroke-red-400"
        style={{ color: "#374151" }}
      />
    </Button>
  );
}
