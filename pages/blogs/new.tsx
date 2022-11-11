import React, { useEffect, useReducer, useState } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import postReducer from "@/utils/reducers/postReducer";
import { BlogActionType } from "@/utils/reducers/postReducer";
import Router from "next/router";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import Image from "next/image";
import Editor from "@/components/DraftEditor";
import { convertFromRaw, convertToRaw } from "draft-js";
const initialState = {
  title: "",
  body: "",
  image: "",
};
const config = {
  headers: { "content-type": "multipart/form-data" },
  onUploadProgress: (event: any) => {
    console.log(
      `Current progress:`,
      Math.round((event.loaded * 100) / event.total)
    );
  },
};

const NewBlog = () => {
  const { data: session, status } = useSession();

  const [isLoading, setLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [newPost, dispatch] = useReducer(postReducer, initialState);
  const [file, setFile] = useState<File>();
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const handleTitle = (event: React.FormEvent<HTMLInputElement>) =>
    dispatch({
      type: BlogActionType.SET_TITLE,
      payload: event.currentTarget.value,
    });

  const handleBody = (val:string) => {
    dispatch({
      type: BlogActionType.SET_BODY,
      payload: val,
    });
  };

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file as File);
    formData.append("title", newPost.title as string);
    formData.append("body", newPost.body as string);
    formData.append("authorId", session?.user._id as string);
    formData.append("authorName", session?.user.name as string);
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/create`,
      formData
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

        <form className="gap-y-3 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative gap-2">
          {file && (
            <div className="">
              <Image
                alt=""
                src={URL.createObjectURL(file)}
                layout="responsive"
                className="object-cover w-full shadow-lg rounded"
                width={100}
                height={40}
              />
            </div>
          )}

          <input
            type="file"
            accept="*"
            className="p-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            onChange={handleSetImage}
          />
          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            type="text"
            placeholder="Blog Title"
            value={newPost.title}
            onChange={handleTitle}
          />
          <Editor value={newPost.body} onChange={handleBody} />

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
export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
export default NewBlog;
