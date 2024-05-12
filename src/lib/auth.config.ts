import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./actions/get/get-user-by-email";
import { LoginSchema } from "./validations";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

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
} satisfies NextAuthConfig;
