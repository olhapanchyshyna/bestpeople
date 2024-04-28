"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCustomHook } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonCustom from "./button";
import SliderDistance from "./slider-distance";
import { Button } from './ui/button'
import Link from 'next/link'

const allCategory = [
  { name: "All goods", option: "all" },
  { name: "Detox", option: "detox" },
  { name: "Anti-aging", option: "anti-aging" },
  { name: "Weight normalization", option: "weight-normalization" },
  { name: "Healthy heart", option: "healthy-heart" },
  { name: "Relax", option: "relax" },
  { name: "Immunity", option: "immunity" },
  { name: "Beauty", option: "beauty" },
];

const popularCategory = [
  { name: "All goods", option: "all" },
  { name: "Detox", option: "detox" },
  { name: "Relax", option: "relax" },
  { name: "Beauty", option: "beauty" },
];

export default function Aside() {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const {handleTakeCategory} = useCustomHook();

  useEffect(() => {
    const category = searchParams.get("category");
    setActiveOption(category);
    setActiveButton(category);
  }, [searchParams]);

  return (
    <aside className="sticky top-2 mb-[40px] flex w-[100%] flex-col bg-[#f7fbe7] px-[10px] md:w-[240px] md:bg-transparent">
      <Button className='bg-[#FCA600] hover:bg-[#d95145] w-[60%]'> <Link href='/catalog?category=all'>Reset Filters</Link></Button>
      <Accordion type="multiple" defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-[20px] no-underline">
            All category
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="option-one">
              {allCategory.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <RadioGroupItem
                    checked={activeOption === item.option}
                    onClick={() => handleTakeCategory(item.option)}
                    value={item.option}
                    id={item.option}
                    className={cn(
                      "green border-[#CCCCCC] focus:border-[#B3DB11] active:border-[#B3DB11]",
                      activeOption === item.option
                        ? "border-[#B3DB11] bg-[##B3DB11]"
                        : "",
                    )}
                  />
                  <Label
                    htmlFor={item.option}
                    className="text-[14px] font-normal text-[#1A1A1A]"
                  >
                    {item.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-[20px] no-underline">
            Prise
          </AccordionTrigger>
          <AccordionContent className="">
            <SliderDistance />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-[20px] no-underline">
            Popular
          </AccordionTrigger>
          <AccordionContent>
            {popularCategory.map((item) => (
              <ButtonCustom
                onClick={() => {
                  handleTakeCategory(item.option);
                  setActiveButton(item.option);
                }}
                key={item.name}
                text={item.name}
                href=""
                className={cn(
                  "light-bg m-[5px] px-[16px] py-[6px] text-[#1A1A1A] ",
                  activeButton === item.option
                    ? "!bg-[#B3DB11] text-white"
                    : "",
                )}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
