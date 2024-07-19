import H2 from "@/components/h2";
import RegisterForm from "@/components/register-form";
import Link from "next/link";

export default async function Page() {
  return (
    <main>
      <H2 className="mb-[30px] font-light lg:text-[36px]" text="Register" />

      <RegisterForm />

      <p className="mt-16 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link href="/login" className="font-medium">
          Log in
        </Link>
      </p>
    </main>
  );
}
