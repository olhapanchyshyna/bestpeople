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

type VerticalProductSliderProps = {
  setCurrentImg: (img: string) => void;
  imgArray: [];
  currentImg: string;
};

export default function VerticalProductSlider({
  currentImg,
  setCurrentImg,
  imgArray,
}: VerticalProductSliderProps) {
  const [embla, setEmbla] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isVertical, setIsVertical] = useState<boolean>();

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
    setCurrentImg(imgArray[currentSlide]);
  }, [currentSlide, setCurrentImg, imgArray]);

  // Функция для определения ориентации карусели в зависимости от ширины экрана
  function setOrientation() {
    if (window.innerWidth >= 768) {
      setIsVertical(true);
    } else {
      setIsVertical(false);
    }
  }

  // Используем useEffect для установки начального состояния и подписки на изменения ширины экрана
  useEffect(() => {
    setOrientation();
    if (embla) {
      embla?.reInit({
        axis: isVertical ? "y" : "x",
      });
    }
  }, [embla, isVertical]);

  useEffect(() => {
    // Добавить слушатель для изменения ширины экрана
    window.addEventListener("resize", setOrientation);

    // Удалить слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("resize", setOrientation);
    };
  }, []);

  if (!currentImg) return null;

  return (
    <Carousel
      setApi={setEmbla}
      opts={{
        align: "start",
        loop: true,
      }}
      orientation={isVertical ? "vertical" : "horizontal"}
      className="order-2 w-full max-w-[400px] md:order-none md:max-w-[100px]"
    >
      <CarouselContent className="md:h-[450px]">
        {imgArray.map((img, index) => (
          <CarouselItem
            key={index}
            className="h-[120px] basis-1/3 cursor-pointer items-center"
            onClick={() => {
              setCurrentImg(img);
              setCurrentSlide(index);
            }}
          >
            <div className="p-1">
              <Card
                className={cn(
                  index === currentSlide ? "border-[#B3DB11]" : "",
                  "border-2",
                )}
              >
                <CardContent className="flex h-[110px] items-center justify-center p-4">
                  <Image
                    src={img}
                    alt="cocktail"
                    width={90}
                    height={70}
                    className="max-h-[100px]"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:inline-flex" />
      <CarouselNext className="hidden md:inline-flex" />
    </Carousel>
  );
}
