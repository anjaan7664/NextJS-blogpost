import { BlogInterface } from "@/types/blogData.types";
import postReducer from "@/utils/reducers/postReducer";
import React, { useReducer, useState } from "react";
import { BlogActionType } from "@/utils/reducers/postReducer";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import DraftEditor from "../DraftEditor";

const EditBlog: React.FC<{ blog: BlogInterface }> = ({ blog }) => {
  const initialState = {
    title: blog.title,
    body: blog.body,
    image: blog.image,
  };

  const [newPost, dispatch] = useReducer(postReducer, initialState);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [file, setFile] = useState<File>();
  const handleTitle = (event: React.FormEvent<HTMLInputElement>) =>
    dispatch({
      type: BlogActionType.SET_TITLE,
      payload: event.currentTarget.value,
    });

  const handleBody = (val: string) => {
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
    formData.append("blogId", blog._id);
    formData.append("title", newPost.title);
    formData.append("body", newPost.body);

    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/updateBlog`,
      formData
    );

    setLoading(false);

    if (status !== 200) {
      setErrors(data.errors);
    }

    Router.push("/");
  };

  return (
    <div>
      <form className=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative gap-2">
        <div className="">
          <Image
            alt=""
            src={
              file
                ? URL.createObjectURL(file)
                : `/assets/images/blogs/${newPost.image}`
            }
            layout="responsive"
            className="object-cover w-full shadow-lg rounded"
            width={100}
            height={40}
          />
        </div>
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

        <DraftEditor value={newPost.body} onChange={handleBody} />
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-2"
          type="button"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
