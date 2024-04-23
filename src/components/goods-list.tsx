import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { getGoods } from "@/lib/server-utils";
import Image from "next/image";
import Link from "next/link";

type GoodsListProps = {
  category: string;
};

export default async function GoodsList({ category }: GoodsListProps) {
  const { goods } = await getGoods(category);


  // goods.forEach((good) => {
  //   if (typeof good.img === "string") {
  //     const imgArray = JSON.parse(good.img);
  //     console.log(imgArray); // Вывод массива изображений
  //   }
  // });

  function isValidImageUrl(url: string) {
    // Проверяем, начинается ли URL с "/" (относительный путь) или "http://" или "https://"
    return (
      typeof url === "string" &&
      (url.startsWith("/") ||
        url.startsWith("http://") ||
        url.startsWith("https://"))
    );
  }

  return (
    <section className="container flex flex-wrap justify-center p-0 sm:justify-between">
      {goods.map((good) => {
        // Парсинг good.img в массив изображений
        const imgArray = JSON.parse(good.img);

        // Убедитесь, что imgArray является массивом
        if (!Array.isArray(imgArray)) {
          console.error("good.img не является массивом изображений");
          return null;
        }
        return (
          <Link href={`/good/${good.slug}`} key={good.id}>
            <Card
              className="m-[5px] flex h-[220px] w-[320px] flex-col items-center justify-between rounded-[8px] px-[10px] pb-[20px] pt-[20px] hover:border-[#6e860b] sm:h-[350px] sm:w-[240px] sm:px-[21px] sm:pb-[30px] sm:pt-[60px]"
              style={{ boxShadow: "-1px 4px 40px -8px rgba(0 0 0 / 21%)" }}
            >
              {/* Проверяем, валиден ли URL изображения */}
              {isValidImageUrl(imgArray[0]) && (
                <picture>
                  <source media="(max-width: 768px)" srcSet={good.mobileImg} />
                  <Image
                    src={imgArray[0]} // Используем первое изображение из массива
                    alt=""
                    width={135}
                    height={130}
                    className="mb-[10px] max-h-[160px] w-[120px] sm:mb-0 sm:w-[125px] md:w-[110px]"
                  />
                </picture>
              )}

              <CardFooter className="items-end p-0">
                <div>
                  <CardTitle className="mb-[10px] text-[14px] font-normal text-gray-700">
                    {good.title}
                  </CardTitle>
                  <CardDescription className="dark-green text-[16px] font-bold">
                    {good.price}
                  </CardDescription>
                </div>
                <button className="btn btn-green">
                  <Image
                    src="/basket-green.svg"
                    alt="basket-green"
                    width={17}
                    height={22}
                    className="w-[17px] max-w-[17px]"
                  />
                </button>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </section>
  );
}
