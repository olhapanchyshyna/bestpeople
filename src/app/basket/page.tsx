
import BasketPage from '@/components/basket-page'
import { getGoodsBasketByUserId } from "@/lib/actions/get/get-goods-basket-by-user-id";
import { getGoodsById } from "@/lib/actions/get/get-goods-by-id";
import { auth } from "@/lib/auth";
import { getServerSideArrayCookie } from "@/lib/cookies/server/get-server-side-array-cookie";

export default async function Page() {
  const session = await auth();

  const cookieGoodsArrays = session
    ? await getGoodsBasketByUserId(session?.user?.id)
    : await getServerSideArrayCookie("basket");

  const a = cookieGoodsArrays?.map((item) => +item.id);
  const goods = await getGoodsById(a);

  return <BasketPage goods={goods} cookieGoodsArrays={cookieGoodsArrays} />;
}
