"use client";

import { RegisterShema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { register } from "@/lib/actions/set/register";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Input } from "./ui/input";

const inputStyles =
  "border-0 border-b-2 font-extralight text-gray-600 focus-visible:border-[#B3DB11]";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterShema>>({
    resolver: zodResolver(RegisterShema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterShema>) {
    startTransition(() => {
      register(values).then((res) => {
        if (res.success) {
          router.push("/login");
        }
        setMessage(res.error || res.success);
      });
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Name"
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
        {message && <p className="text-[#DB4444] text-center text-[14px] !mt-0">{message}</p>}
        <Button
          disabled={isPending}
          className="green-bg m-auto flex w-[170px] px-[40px] py-[16px] text-white hover:bg-[#6e860b] hover:text-white sm:w-[200px]"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
