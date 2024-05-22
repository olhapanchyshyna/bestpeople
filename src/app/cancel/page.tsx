import ButtonCustom from "@/components/button";
import H2 from "@/components/h2";
import Image from "next/image";
import { redirect } from "next/navigation";

type TSearchParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: TSearchParams) {
  if (searchParams.cancelled) {
    return (
      <section className="container m-auto mb-[50px] mt-[20px] flex flex-col md:my-[50px]">
        <H2 text="Payment failed" className="" />
        <Image
          src="/error-payment-2.png"
          width={200}
          height={100}
          alt="404"
          className="m-auto w-[150px] md:w-[200px]"
        />
        <h4 className="text-center">Please, try again </h4>
        <ButtonCustom text="Home Page" href="/" className="m-auto mt-[45px]" />
      </section>
    );
  } else {
    redirect("/");
    return null; // Возвращаем null, чтобы ничего не рендерилось до редиректа
  }
}
