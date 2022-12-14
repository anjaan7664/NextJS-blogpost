import Link from "next/link";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const TheHeader = () => {
  const { data: session } = useSession();
  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="w-full bg-[#141215] shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-6xl md:items-center md:flex ">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <a>
                <h2 className="text-2xl font-bold text-white">KOOKY</h2>
              </a>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              navbar ? "block" : "hidden"
            } flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ml-0 w-full`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {!session && (
                <>
                  <li className="text-white hover:text-indigo-200">
                    <Link href="/">
                      <a href="">Home</a>
                    </Link>
                  </li>
                  <li className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">
                    <Link href="/auth/login">
                      <a className="">Sign in</a>
                    </Link>
                  </li>
                  <li className="inline-block w-full px-4 py-2 text-center text-white bg-gray-400 rounded-md shadow hover:bg-gray-800">
                    <Link href="/auth/register">
                      <a className="">SignUp</a>
                    </Link>
                  </li>
                </>
              )}
              {session?.user && (
                <>
                  <li className="text-white hover:text-indigo-200">
                    <Link href="/">
                      <a href="">Home</a>
                    </Link>
                  </li>
                  <li className="text-white hover:text-indigo-200">
                    <Link href="/blogs/new">
                      <a href="">NewPost</a>
                    </Link>
                  </li>
                  {session.user.role === "admin" && (
                    <li className="text-white hover:text-indigo-200">
                      <Link href="/admin">
                        <a href="">Admin</a>
                      </Link>
                    </li>
                  )}
                  <li className="text-white hover:text-indigo-200">
                    <Link href="/profile">
                      <a className="">Profile</a>
                    </Link>
                  </li>
                  <li className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      SignOut
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TheHeader;
