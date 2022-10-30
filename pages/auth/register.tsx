import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

async function createUser(email: string, password: string) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
    {
      email: email,
      password: password,
    }
  );
  const data = await response.data;
  if (response.status !== 200) {
    throw new Error(data.message || "Something went wrong!");
  } else {
    signIn("credentials", {
      redirect: true,
      username: email,
      password: password,
    });
  }
}

function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    const enteredName = nameInputRef.current?.value;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      }
    );
    const data = await response.data;
    if (response.status !== 200) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      signIn("credentials", {
        redirect: true,
        username: enteredEmail,
        password: enteredPassword,
      });
    }
  }

  return (
    <section className="">
      <div className="min-h-[78vh] ">
        <div className="z-50 w-full max-w-md p-6 m-4 mx-auto bg-white rounded-lg border">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
              Create New Account
            </h2>
          </div>
          <form className="mt-8" onSubmit={submitHandler}>
            <input type="hidden" name="remember" value="true" />
            <fieldset>
              <input
                aria-label="Name"
                name="name"
                type="text"
                id="name"
                ref={nameInputRef}
                className="mb-3 relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:shadow-outline-blue focus:z-10 focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                placeholder="Name"
              />
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

            <fieldset className="mt-6 flex flex-row justify-between">
              <button
                type="submit"
                className="w-2/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign Up
              </button>
              <Link href="/auth/login">
                <a className="w-2/5 text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Login
                </a>
              </Link>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AuthForm;
