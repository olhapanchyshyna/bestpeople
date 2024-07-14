import BasketPage from "@/components/basket-page";
import { getGoodsBasketByUserId } from "@/lib/actions/get/get-goods-basket-by-user-id";
import { getGoodsById } from "@/lib/actions/get/get-goods-by-id";
import { auth } from "@/lib/auth";
import { getServerSideArrayCookie } from "@/lib/cookies/server/get-server-side-array-cookie";


export default async function Page() {
  const session = await auth();

  if (!session) {
    const goodsBasketCookie = await getServerSideArrayCookie("basket");
    const ids = goodsBasketCookie?.map((item) => +item.id);
    const goodsData = await getGoodsById(ids);

    return (
      <BasketPage
        goodsBasketByUserId={goodsBasketCookie}
        goodsData={goodsData}
      />
    );
  } else if (session) {
    const goodsBasketByUserId = await getGoodsBasketByUserId(session?.user?.id);
    const ids = goodsBasketByUserId?.map((item) => +item.id);
    const goodsData = await getGoodsById(ids);

    return (
      <BasketPage
        goodsBasketByUserId={goodsBasketByUserId}
        goodsData={goodsData}
      />
    );
  }
}
