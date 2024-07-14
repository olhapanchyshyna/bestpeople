import H2 from "@/components/h2";
import { auth, signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!session) redirect("/login");
  return (
    <section className="container my-[65px] ">
      <h2 className="text-center text-[36px] font-normal">
        Hello! <span className="dark-green">{user?.name}</span>{" "}
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
        Email: <span className="font-medium">{user?.email}</span>
      </div>

      <form
        className="m-auto mt-[10px] w-[100px]"
        action={async () => {
          "use server";
          await signOut();
          revalidatePath("/login", '');
        }}
      >
        <button type="submit" className="w-[100px] text-center text-red-400">
          Sign Out
        </button>
      </form>
    </section>
  );
}
