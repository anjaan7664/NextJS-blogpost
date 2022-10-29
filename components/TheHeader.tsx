import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const TheHeader = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="container flex flex-row self-center justify-between w-full max-w-screen-xl mx-auto ml-0">
      <div className="">
        <Link href="/">
          <a>KookyInfomedia</a>
        </Link>
      </div>

      <ul className="flex flex-row gap-2 ">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {!session && (
          <>
            <li>
              <Link href="/auth/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/auth/register">
                <a>SignUp</a>
              </Link>
            </li>
          </>
        )}
        {session && (
          <>
            <li>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/blogs/new">
                <a>New Post</a>
              </Link>
            </li>
            <li>
              <Link href="/auth/login">
                <a
                  href={`/api/auth/signout`}
                  className=""
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default TheHeader;
