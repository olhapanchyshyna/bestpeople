"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthFormBtnProps = {
  type: "signUp" | "logIn";
};
export default function AuthFormBtn({ type }: AuthFormBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className='green-bg w-[120px] sm:w-[180px] px-[40px] py-[16px] text-white hover:bg-[#6e860b] hover:text-white'>
      {type === "logIn" ? "Log In" : "Sign Up"}
    </Button>
  );
}