"use client";
import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <button
      className="w-[100px] text-center text-red-400 m-auto"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
