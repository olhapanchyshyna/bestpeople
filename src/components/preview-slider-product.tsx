"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import VerticalProductSlider from "./vertical-product-slider";

export function PreviewSliderProduct() {
  const [currentImg, setCurrentImg] = useState("");
  return (
    <>
      <VerticalProductSlider setCurrentImg={setCurrentImg} />
      <Image
        src={currentImg || "/loading.png"}
        alt={currentImg}
        width={200}
        height={200}
        className={cn("h-[200px] md:order-none order-1 mb-[30px] md:mb-0", {
          ["animate-spin duration-2000"]: !currentImg,
        })}
      />
    </>
  );
}
