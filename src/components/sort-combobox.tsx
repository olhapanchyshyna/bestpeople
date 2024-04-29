import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomHook } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const sortOptions = [
  { value: "cheap", label: "From cheap to expensive" },
  { value: "expensive", label: "From expensive to cheap" },
];

export default function SortCombobox() {
  const { handleTakeSort } = useCustomHook();
  const searchParams = useSearchParams();
  const sortText = searchParams.get("sort") || "Price";
  const [sort, setSort] = useState<string>("Price");

  useEffect(() => {
    if (sortText === "cheap") {
      setSort("From cheap to expensive");
    } else if (sortText === "expensive") {
      setSort("From expensive to cheap");
    } else {
      setSort("Price");
    }
  }, [sortText]);

  const handleValueChange = (value: string) => {
    handleTakeSort(value);
    if (value === "cheap") {
      setSort("From cheap to expensive");
    } else if (value === "expensive") {
      setSort("From expensive to cheap");
    } else {
      setSort("Price");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="mr-[10px] text-[14px] text-[#808080]">Sort By</div>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-[190px] sm:w-[210px]">
          <SelectValue placeholder={sort} className="text-left" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
