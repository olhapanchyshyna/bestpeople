

import H2 from "@/components/h2";
import SignoutButton from '@/components/signout-button'
import { authOptions } from '@/lib/auth-options'
// import { signOut } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signOut } from 'next-auth/react'
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  
  return (
    <section className="container my-[65px] flex flex-col">
      <h2 className="text-center text-[36px] font-normal">
        Hello! <span className="dark-green">{session.user?.name}</span>{" "}
      </h2>
      <H2
        text="You are in the buyer's personal account"
        className="text-center  text-[20px] font-normal  lg:text-[20px]"
      />

      <Image
        src="/account.png"
        alt="account"
        width={200}
        height={200}
        className="m-auto"
      />

      <div className="mt-[60px] text-center">
        Email: <span className="font-medium">{session.user?.email}</span>
      </div>

      <SignoutButton/>
    </section>
  );
}
