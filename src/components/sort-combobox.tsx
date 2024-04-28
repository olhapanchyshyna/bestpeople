"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const sortBy = [
//   {
//     value: "cheapToExpensive",
//     label: "from cheap to expensive",
//   },
//   {
//     value: "expensiveToCheap",
//     label: "from expensive to cheap",
//   },
// ];

export default function SortCombobox() {
  return (
    <div className="flex items-center">
      <div className="mr-[10px] text-[14px] text-[#808080]">Sort By</div>
      <Select>
        <SelectTrigger className="w-[210px]">
          <SelectValue placeholder="Price" className="text-left" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cheap">From cheap to expensive</SelectItem>
          <SelectItem value="expensive">From expensive to cheap</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
