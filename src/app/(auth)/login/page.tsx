import AuthForm from "@/components/auth-form";
import H2 from "@/components/h2";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/account");
  }
  return (
    <main>
      <H2 className="mb-[30px] font-light lg:text-[36px]" text="Log In" />

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
