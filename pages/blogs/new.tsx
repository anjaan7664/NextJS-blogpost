import React, { ButtonHTMLAttributes, useReducer } from "react";
import postReducer from "@/utils/postReducer";
import { BlogActionType } from "@/utils/postReducer";
import Router from "next/router";
import axios from "axios";
const initialState = {
  title: "",
  body: "",
};

const NewBlog = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [newPost, dispatch] = useReducer(postReducer, initialState);

  const handleTitle = (event: React.FormEvent<HTMLInputElement>) =>
    dispatch({
      type: BlogActionType.SET_TITLE,
      payload: event.currentTarget.value,
    });

  const handleBody = (event: React.FormEvent<HTMLTextAreaElement>) =>
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
        <h1 className="text-4xl font-semibold">Publish a new Blog</h1>
        <form className=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative gap-2">
          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            type="text"
            placeholder="Blog Title"
            value={newPost.title}
            onChange={handleTitle}
          />

          <textarea
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            rows={8}
            placeholder="Write your blog (in markdown)"
            value={newPost.body}
            onChange={handleBody}
          />

          <button
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-2"
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Publish Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default NewBlog;
