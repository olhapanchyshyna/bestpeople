// "use client";
// import { getGoodsBasketByUserId } from "@/lib/actions/get/get-goods-basket-by-user-id";
// import { getServerSideArrayCookie } from "@/lib/cookies/server/get-server-side-array-cookie";
// import { useBasketStore } from "@/lib/store/useBasketStore";
// import { useSession } from "next-auth/react";
// import { startTransition, useEffect } from "react";

// export default function BasketIcon() {
//   const { data: session, status } = useSession();
//   const {
//     totalQuantity,
//     setTotalQuantity,
//     setGoodsBasket,
//     setIsPending,
//     goodsBasket,
//   } = useBasketStore();

//   useEffect(() => {
//     startTransition(async () => {
//       let goods;

//       if (status !== "loading") {
//         if (session && session.user) {
//           goods = await getGoodsBasketByUserId(session.user.id);
//         } else {
//           goods = await getServerSideArrayCookie("basket");
//         }
//         const total = goods?.reduce(
//           (total, currentItem) => total + currentItem.quantity,
//           0,
//         );

//         setTotalQuantity(total);
//         setGoodsBasket(goods);
//         setIsPending(false);
//       }
//     });
//   }, [status]);

//   return (
//     <>
//       {totalQuantity ? (
//         <div className="absolute right-[-8px] top-[-8px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#fca600] py-[1px] text-[8px] leading-[3px] text-white">
//           {totalQuantity}
//         </div>
//       ) : null}
//     </>
//   );
// }
