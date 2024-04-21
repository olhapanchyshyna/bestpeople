import notFound from "@/app/not-found";
import H2 from '@/components/h1'
import { getGood } from "@/lib/server-utils";
import Image from 'next/image'

type GoodPageProps = {
  params: {
    slug: string;
  };
};

export default async function GoodPage({ params }: GoodPageProps) {
  const slug = params.slug;
  const good = await getGood(slug);

  if (!good) return notFound();

  console.log(good.title);

  return (
    <section className="container flex flex-col my-[50px]">
      <div className="flex flex-row justify-between">
        <div>
					<Image src={good.img} alt={good.title} width={300} height={300} />
				</div>
        <div className='max-w-[500px]'>
					<H2 text={good.title} className='leading-[45px]' />
					<div>{good.price}</div>
				</div>
      </div>

      <div></div>
      <div></div>
    </section>
  );
}
