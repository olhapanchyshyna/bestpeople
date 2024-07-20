"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { logIn } from "@/lib/actions/set/login";
import { LoginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";

const inputStyles =
  "border-0 border-b-2 font-extralight text-gray-600 focus-visible:border-[#B3DB11]";

export default function AuthForm() {
  const [isPending, startTransition] = useTransition();
  const { status } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState<string | undefined>("");
  const [pending, setPending] = useState(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(() => {
      setPending(true)
      logIn(values).then((res) => {
        if (res && res.error) {
          setMessage(res.error);
        }
      });
      form.reset();
    });
  }

  useLayoutEffect(() => {
    if (status === "authenticated") {
      router.push("/account");
      setPending(false)
    }
  }, [status]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  className={`mb-[10px] mt-[20px] ${inputStyles}`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  className={inputStyles}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {message && (
          <p className="!mt-0 text-center text-[14px] text-[#DB4444]">
            {message}
          </p>
        )}
        <Button
          disabled={pending}
          className="green-bg m-auto flex w-[170px] px-[40px] py-[16px] text-white hover:bg-[#6e860b] hover:text-white sm:w-[200px]"
        >
          {pending ? 'Loading...' : 'Log In'}
          
        </Button>
      </form>
    </Form>
  );
}
