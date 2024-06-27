import H2 from "@/components/h2";
import OrderForm from "@/components/order-form";
import { Table, TableCell, TableFooter, TableRow } from "@/components/ui/table";
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
  let deliveryCost = 0;
  let priseAllGoods = 0;

  const goodsWithQuantity = goods.map((good) => {
    const currentGood = cookieGoodsArrays?.find(
      (item) => item.id === good.id.toString(),
    );
    return {
      ...good,
      quantity: currentGood?.quantity || 1,
    };
  });

  goods?.map((invoice) => {
    const currentGood = cookieGoodsArrays?.find(
      (item) => item.id === invoice.id.toString(),
    );

    if (currentGood && currentGood.quantity) {
      priseAllGoods += currentGood.quantity * invoice.price;
    }
  });

  return (
    <section className="container mb-[35px] mt-[44px] md:mb-[85px]">
      <H2 text="Placing an order" className="mb-[42px]" />
      <div className="flex justify-between md:flex-row flex-col">
        <div className='order-2 md:order-none'>
          <OrderForm goods={goodsWithQuantity} />
        </div>
        <div className="order-1 md:order-none mb-[40px] md:mb-0 h-[220px] w-[260px] rounded-[8px] border-2 border-[#E6E6E6] px-[16px] py-[24px] md:w-[230px]">
          <h2 className="mb-[10px] text-[20px]">To pay</h2>
          <Table>
            <TableFooter>
              <TableRow className="border-b text-[#808080]">
                <TableCell className="rounded-[8px] px-0  py-3" colSpan={3}>
                  Price
                </TableCell>
                <TableCell className="dark-green px-0 py-3 text-right text-[16px]">
                  {priseAllGoods}$
                </TableCell>
              </TableRow>
              <TableRow className="text-[#808080]">
                <TableCell className="px-0 py-3" colSpan={3}>
                  Delivery
                </TableCell>
                <TableCell className="px-0 py-3 text-right text-[16px] text-black">
                  Free
                </TableCell>
              </TableRow>
              <TableRow className="text-[#808080]">
                <TableCell className="px-0 py-3" colSpan={3}>
                  Total
                </TableCell>
                <TableCell className="dark-green px-0 py-3 text-right text-[16px]">
                  {deliveryCost === 0
                    ? priseAllGoods
                    : priseAllGoods + deliveryCost}
                  $
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </section>
  );
}
