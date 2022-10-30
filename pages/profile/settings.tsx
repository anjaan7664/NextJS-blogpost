import React, { ButtonHTMLAttributes, useReducer } from "react";
import postReducer from "@/utils/postReducer";
import { useSession, signIn, signOut } from "next-auth/react";
import { BlogActionType } from "@/utils/postReducer";
import Router from "next/router";
import axios from "axios";
const initialState = {
  title: "",
  body: "",
};

const Setting = () => {
  const { data: session } = useSession();
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [newPost, dispatch] = useReducer(postReducer, initialState);
  const handleTitle = (event: React.FormEvent<HTMLInputElement>) =>
    dispatch({
      type: BlogActionType.SET_TITLE,
      payload: event.currentTarget.value,
    });

  const handleEmail = (event: React.FormEvent<HTMLInputElement>) =>
    dispatch({
      type: BlogActionType.SET_BODY,
      payload: event.currentTarget.value,
    });
  const handlePassword = (event: React.FormEvent<HTMLInputElement>) =>
    dispatch({
      type: BlogActionType.SET_BODY,
      payload: event.currentTarget.value,
    });

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/create`,
      null,
      {
        params: {
          title: newPost.title,
          body: newPost.body,
          authoreId: 32434,
        },
      }
    );

    setLoading(false);

    if (status !== 200) {
      setErrors(data.errors);
    }

    Router.push("/");
  };

  return (
    <>
      <div className="flex flex-col min-h-[80vh] text-center mt-4 w-9/12 mx-auto">
        <h1 className="text-4xl font-semibold">Your Info</h1>
        <form className=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative gap-2">
          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            type="text"
            placeholder="Your Name"
            value={newPost.title}
            onChange={handleTitle}
          />
          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            type="text"
            placeholder="Your Email"
            value={newPost.title}
            onChange={handleEmail}
          />
          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            type="text"
            placeholder="Your Password"
            value={newPost.title}
            onChange={handlePassword}
          />

          <button
            className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg mt-2"
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Update Info
          </button>
        </form>
      </div>
    </>
  );
};

export default Setting;
