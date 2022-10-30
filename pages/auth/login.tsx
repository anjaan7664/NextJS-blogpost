import React, { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
const LoginFormComponent = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({});

  const router = useRouter();

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    // optional: Add validation

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });
    if (!result?.error) {
      // set some auth state
      router.replace("/");
    } else {
      setErrors(result.error);
    }
  }

  return (
    <div className="min-h-[78vh] ">
      <div className="z-50 w-full max-w-md p-6 m-4 mx-auto bg-white rounded-lg border">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
            Sign in to Account
          </h2>
        </div>
        <form className="mt-8" onSubmit={submitHandler}>
          <input type="hidden" name="remember" value="true" />
          <fieldset>
            <input
              aria-label="Email"
              name="email"
              type="email"
              id="email"
              ref={emailInputRef}
              className="mb-3 relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:shadow-outline-blue focus:z-10 focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
              placeholder="Email"
            />

            <input
              id="password"
              aria-label="Password"
              name="password"
              ref={passwordInputRef}
              type="password"
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:shadow-outline-blue focus:z-10 focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
              placeholder="Password"
            />
          </fieldset>

          <fieldset className="flex items-center mt-6 ml-1 justify-between">
            <div className="flex items-center">
              <input
                v-model="form.remember"
                id="remember_me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
              />
              <label className="block ml-2 text-sm leading-5 text-gray-900">
                Remember me
              </label>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
            </div>

            <div className="text-sm leading-5">
              <a
                href="#"
                className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:underline focus:outline-none"
              >
                Forgot your password?
              </a>
            </div>
          </fieldset>

          <fieldset className="mt-6 flex flex-row justify-between">
            <button
              type="submit"
              className="w-2/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Sign in
            </button>
            <Link href="/auth/register">
              <a className="w-2/5 text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Signup
              </a>
            </Link>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginFormComponent;
