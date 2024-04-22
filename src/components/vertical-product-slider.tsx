"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const img = [
  { id: 0, img: "/coktail-banana.png" },
  { id: 1, img: "/coktail-pistachio.png" },
  { id: 2, img: "/coktail-salt-caramel.png" },
  { id: 3, img: "/coktail-strawberry.png" },
  { id: 4, img: "/coktail-banana.png" },
  { id: 5, img: "/coktail-banana.png" },
  { id: 6, img: "/coktail-banana.png" },
];

type VerticalProductSliderProps = {
  setCurrentImg: (img: string) => void;
};

export default function VerticalProductSlider({
  setCurrentImg,
}: VerticalProductSliderProps) {
  const [embla, setEmbla] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    if (embla) {
      const onSwitch = () => {
        setCurrentSlide(embla.selectedScrollSnap());
      };

      embla.on("select", onSwitch);

      return () => {
        if (embla) {
          embla.off("select", onSwitch);
        }
      };
    }
  }, [embla]);

  useEffect(() => {
    setCurrentImg(img[currentSlide].img);
  }, [currentSlide, setCurrentImg]);

  return (
    <Carousel
      setApi={setEmbla}
      opts={{
        align: "start",
        loop: true,
      }}
      orientation="vertical"
      className="w-full max-w-[100px]"
    >
      <CarouselContent className="h-[450px]">
        {img.map((item) => (
          <CarouselItem
            key={item.id}
            className="items-center md:basis-1/4 cursor-pointer"
            onClick={() => {
              setCurrentImg(item.img);
              setCurrentSlide(item.id);
            }}
          >
            <div className="p-1">
              <Card
                className={cn(
                  item.id === currentSlide ? "border-[#B3DB11]" : "",
                  "border-2",
                )}
              >
                <CardContent className="flex items-center justify-center p-4">
                  <Image
                    src={item.img}
                    alt="cocktail"
                    width={100}
                    height={70}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
