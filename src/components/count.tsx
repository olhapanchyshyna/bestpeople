"use client";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Plus } from 'lucide-react'
import { useState } from "react";

export default function Count() {
  const [count, setCount] = useState(1);
  return (
    <div className="flex w-[130px] items-center justify-between rounded-[43px] border-2 border-[#E6E6E6] p-[8px]">
      <button
        className="flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#F2F2F2]"
        onClick={() => {
          if (count <= 1) {
            return;
          } else if (count >= 2) {
            setCount(count - 1);
          }
        }}
      >
        <MinusIcon/>
      </button>
      <div>{count}</div>
      <button
        className="flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#F2F2F2]"
        onClick={() => setCount(count + 1)}
      >
        <PlusIcon/>
      </button>
    </div>
  );
}
