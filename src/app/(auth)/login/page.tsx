import AuthForm from "@/components/auth-form";
import H2 from "@/components/h2";
import { getServerSession } from 'next-auth'

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  // const session = await getServerSession();
  
  // if (session) {
  //   console.log('session ffffff')
  //   redirect("/account");
  // }

  return (
    <main>
      <H2 className="mb-[40px] font-light lg:text-[36px]" text="Log In" />

      <AuthForm />

      <p className="mt-16 text-center text-sm text-zinc-400">
        No account yet?{" "}
        <Link href="/register" className="font-medium ">
          Register
        </Link>
      </p>
    </main>
  );
}
