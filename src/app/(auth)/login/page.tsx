import AuthForm from "@/components/auth-form";
import H2 from "@/components/h2";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H2 className="mb-[30px] font-light lg:text-[36px]" text="Log In" />

      <AuthForm type="logIn" />

      <p className="mt-16 text-center text-sm text-zinc-400">
        No account yet?{" "}
        <Link href="/signup" className="font-medium ">
          Sign up
        </Link>
      </p>
    </main>
  );
}
