"use client";

import AuthFormBtn from "./auth-form-btn";
import { Input } from "./ui/input";

const inputStyles =
  "border-0 border-b-2 font-extralight text-gray-600 focus-visible:border-[#B3DB11]";

type AuthFormProps = {
  type: "signUp" | "logIn";
};

export default function AuthForm({ type }: AuthFormProps) {
  // const [signUpError, dispatchSignUp] = useFormState(signUp, undefined)
  // const [logInError, dispatchLogIn] = useFormState(logIn, undefined)
  return (
    <form>
      <div className="space-y-1 ">
        <Input
          id="email"
          name="email"
          type="email"
          required
          maxLength={100}
          placeholder="Email"
          className={`mb-[30px] ${inputStyles}`}
        />
      </div>

      <div className="mb-4 mt-2 space-y-1">
        <Input
          id="password"
          name="password"
          type="password"
          required
          maxLength={100}
          placeholder="Password"
          className={inputStyles}
        />
      </div>

      <div className="mt-[30px] flex justify-between items-center">
        <AuthFormBtn type={type} />
        {type === "logIn" && (
          <p className="mt-2 text-sm text-[#DB4444]">Forgot your password?</p>
        )}
      </div>

      {/* 
      {signUpError && (
        <p className="mt-2 text-sm text-red-500">{signUpError.message}</p>
      )}
      {logInError && (
        <p className="mt-2 text-sm text-red-500">{logInError.message}</p>
      )} */}
    </form>
  );
}
