"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { logIn } from '@/lib/actions/set/login'

const inputStyles =
  "border-0 border-b-2 font-extralight text-gray-600 focus-visible:border-[#B3DB11]";

export default function AuthForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(() => {
      logIn(values);
      form.reset();
    });
  }

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
                  className={`mb-[30px] ${inputStyles}`}
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
        <div className="mt-[30px] flex items-center justify-between">
          <Button
            disabled={isPending}
            className="green-bg w-[120px] px-[40px] py-[16px] text-white hover:bg-[#6e860b] hover:text-white sm:w-[180px]"
          >
            Log In
          </Button>
          <p className="mt-2 text-sm text-[#DB4444]">Forgot your password?</p>
        </div>
      </form>
    </Form>
  );
}
