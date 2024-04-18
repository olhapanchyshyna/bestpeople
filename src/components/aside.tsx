import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import ButtonCustom from "./button";
import SliderRange from "./slider-range";

const allCategory = [
  { name: "Detox", option: "option-one" },
  { name: "Anti-aging", option: "option-two" },
  { name: "Weight normalization", option: "option-tree" },
  { name: "Healthy heart", option: "option-four" },
  { name: "Relax", option: "option-five" },
  { name: "Immunity", option: "option-six" },
  { name: "Beauty", option: "option-seven" },
];

export default function Aside() {
  return (
    <aside className="sticky top-2 flex w-[240px] flex-col px-[10px]">
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-[20px] no-underline">
            All category
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="option-one">
              {allCategory.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={item.option}
                    id={item.option}
                    className="green border-[#CCCCCC] focus:border-[#B3DB11] active:border-[#B3DB11]"
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
          <AccordionContent className="h-auto">
            <SliderRange />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-[20px] no-underline">
            Popular
          </AccordionTrigger>
          <AccordionContent>
            {allCategory.map((item) => (
              <ButtonCustom
                key={item.name}
                text={item.name}
                href=""
                className="light-bg m-[5px] px-[16px] py-[6px] text-[#1A1A1A] hover:bg-[#B3DB11] hover:text-white"
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
