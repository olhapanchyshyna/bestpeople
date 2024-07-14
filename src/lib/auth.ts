import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { cookies } from "next/headers";
import { getGoodsBasketByUserId } from "./actions/get/get-goods-basket-by-user-id";
import authConfig from "./auth.config";
import { getServerSideArrayCookie } from "./cookies/server/get-server-side-array-cookie";
import prisma from "./db";
import { revalidatePath } from 'next/cache'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    signIn: async (user) => {
      const basketCookie = await getServerSideArrayCookie("basket");

      const hasGoods = await getGoodsBasketByUserId(user.user.id);

      if (basketCookie && user.user.id) {
        if (hasGoods) {
          await prisma.userBest.update({
            where: { id: +user.user.id },
            data: {
              goodsBasket: JSON.stringify([...basketCookie, ...hasGoods]),
            },
          });
          // console.log(1111)
          // revalidatePath('/basket', 'page');
        } else {
          await prisma.userBest.update({
            where: { id: +user.user.id },
            data: {
              goodsBasket: JSON.stringify(basketCookie),
            },
          });
        }
        cookies().delete("basket");
      }

      if (user) {
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string; // убедитесь, что token.id существует и является строкой
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
