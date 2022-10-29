import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import classes from "./auth-form.module.css";
import axios from "axios";

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
  }else{
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
        name:enteredName,
        email: enteredEmail,
        password: enteredPassword,
      }
    );
    const data = await response.data;
    if (response.status !== 200) {
      throw new Error(data.message || "Something went wrong!");
    }else{
      signIn("credentials", {
        redirect: true,
        username: enteredEmail,
        password: enteredPassword,
      });
    }
  }

  return (
    <section className={classes.auth}>
      <form onSubmit={submitHandler}>
        <fieldset className={classes.control}>
          <label htmlFor="email">Your Name</label>
          <input type="text" id="name" required ref={nameInputRef} />
        </fieldset>
        <fieldset className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </fieldset>
        <fieldset className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </fieldset>
        <fieldset className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </fieldset>
        <fieldset className={classes.actions}>
          <button type="submit">Create Account</button>
        </fieldset>
      </form>
    </section>
  );
}

export default AuthForm;
