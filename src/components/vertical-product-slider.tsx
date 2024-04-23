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

// const img = [
//   { id: 0, img: "/coktail-banana.png" },
//   { id: 1, img: "/coktail-pistachio.png" },
//   { id: 2, img: "/coktail-salt-caramel.png" },
//   { id: 3, img: "/coktail-strawberry.png" },
//   { id: 4, img: "/coktail-banana.png" },
//   { id: 5, img: "/coktail-banana.png" },
//   { id: 6, img: "/coktail-banana.png" },
// ];

type VerticalProductSliderProps = {
  setCurrentImg: (img: string) => void;
  imgArray: [];
};

export default function VerticalProductSlider({
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
  }, [currentSlide, setCurrentImg,imgArray]);

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
  }, [embla ,isVertical]);

  useEffect(() => {
    // Добавить слушатель для изменения ширины экрана
    window.addEventListener("resize", setOrientation);

    // Удалить слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("resize", setOrientation);
    };
  }, []);

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
            className="basis-1/3 cursor-pointer items-center h-[120px]"
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
                <CardContent className="flex items-center justify-center p-4 h-[110px]">
                  <Image src={img} alt="cocktail" width={90} height={70} className='max-h-[100px]' />
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
