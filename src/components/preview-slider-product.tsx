"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import Loading from "./loading";
import VerticalProductSlider from "./vertical-product-slider";

export function PreviewSliderProduct({ imgArray }: { imgArray: [] }) {
  const [currentImg, setCurrentImg] = useState("");

  return (
    <>
      <VerticalProductSlider
        setCurrentImg={setCurrentImg}
        imgArray={imgArray}
      />
      <div className="flex h-[320px] items-center md:h-auto">
        {currentImg ? (
          <Image
            src={currentImg}
            alt={currentImg}
            width={200}
            height={300}
            className={cn("order-1 mb-[30px] h-auto md:order-none md:mb-0", {})}
          />
        ) : (
          <Loading className="order-1 mb-[30px] h-auto md:order-none md:mb-0" />
        )}
      </div>
    </>
  );
}
