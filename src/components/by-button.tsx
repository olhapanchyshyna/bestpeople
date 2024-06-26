"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setOrderDetails } from "@/lib/actions/set/set-order-details";
import { Goods } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";

type ByButtonProps = {
  goods: Goods[];
  formData: any;
  setEmptyFields: Dispatch<SetStateAction<string[]>>;
};

export default function ByButton({
  goods,
  formData,
  setEmptyFields,
}: ByButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();
  const user = data?.user;

  const checkout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://bestpeople-ten.vercel.app/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: goods }),
      });
      const responseData = await response.json();
      if (response.ok && responseData.url) {
        window.location.href = responseData.url;
      } else {
        console.error("Failed to process payment");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Dialog>
        <DialogTrigger className="green-bg mt-[30px] w-[200px]  rounded-[42px] px-[40px] py-[13px] text-white hover:bg-[#6e860b] hover:text-white">
          Order
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>You are not logged in to your account</DialogTitle>
            <DialogDescription>
              To continue, log in to your account or create a new one.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-between">
            <DialogClose asChild className="dark-green-bg w-[200px] text-white">
              <Link
                href="/register"
                className="w-[100px] rounded-[43px] text-white md:w-[200px] md:text-[16px]"
              >
                <Button className="w-[100px] md:w-[200px]">Register</Button>
              </Link>
            </DialogClose>
            <DialogClose asChild className="dark-green-bg w-[200px] text-white">
              <Link
                href="/login"
                className="w-[100px] rounded-[43px] text-white md:w-[200px] md:text-[16px]"
              >
                <Button className="w-[100px] md:w-[200px]">Log in</Button>
              </Link>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <button
      className="green-bg mt-[30px] w-[200px] rounded-[42px] px-[40px] py-[13px] text-white hover:bg-[#6e860b] hover:text-white"
      disabled={isLoading}
      onClick={async () => {
        const emptyFields: string[] = [];
        Object.entries(formData).forEach(([key, value]) => {
          if (!value && key !== "message") {
            emptyFields.push(key);
          }
        });
        if (emptyFields.length > 0) {
          setEmptyFields(emptyFields);

          return;
        }

        if (emptyFields.length === 0) {
          await setOrderDetails(user.id, formData);
          checkout();
        }
      }}
    >
      {isLoading ? "Processing..." : "Order"}
    </button>
  );
}
