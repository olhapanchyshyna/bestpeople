import { getGoodsBasketByUserId } from "@/lib/actions/get/get-goods-basket-by-user-id";
import { getUserByEmail } from "@/lib/actions/get/get-user-by-email";
import { getServerSideArrayCookie } from "@/lib/cookies/server/get-server-side-array-cookie";
import prisma from "@/lib/db";
import { LoginSchema } from "@/lib/validations";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            throw new Error("неправильные пароль или емейл");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password,
          );

          if (isPasswordCorrect) {
            const { id, name, email } = user;
            return {
              id: `${id}`,
              name,
              email,
              image: null,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async signIn({ user }) {
      if (!user || !user.id) return false; // Убедитесь, что user и user.id существуют
      const basketCookie = await getServerSideArrayCookie("basket");
      const hasGoods = await getGoodsBasketByUserId(user.id);

      if (basketCookie && user.id) {
        if (hasGoods) {
          await prisma.userBest.update({
            where: { id: +user.id },
            data: {
              goodsBasket: JSON.stringify([...basketCookie, ...hasGoods]),
            },
          });
        } else {
          await prisma.userBest.update({
            where: { id: +user.id },
            data: {
              goodsBasket: JSON.stringify(basketCookie),
            },
          });
        }
        cookies().delete("basket");
      }

      return true;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession( req, res , authOptions);

//   if (!session) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const userId = session.user.id;

//   res.status(200).json({ userId });
// }
