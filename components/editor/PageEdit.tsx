import React, { useEffect, useReducer, useState } from "react";
import { PageActionType } from "lib/utils/reducers/pageReducer";
import axios from "axios";
import Router from "next/router";
import { PageInterface } from "lib/types/pageType.types";
import pageReducer from "lib/utils/reducers/pageReducer";
import DraftEditor from "../common/DraftEditor";
const PageEdit: React.FC<{ pageData: PageInterface }> = ({ pageData }) => {
  const initialState = {
    title: pageData.title,
    description: pageData.description,
  };

  const [newPost, dispatch] = useReducer(pageReducer, initialState);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState("");

  const handleTitle = (event: React.FormEvent<HTMLInputElement>) =>
    dispatch({
      type: PageActionType.SET_TITLE,
      payload: event.currentTarget.value,
    });

  const handleBody = (val: string) =>
    dispatch({
      type: PageActionType.SET_DESCRIPTION,
      payload: val,
    });

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pages/update`,
      null,
      {
        params: {
          link_name: pageData.link_name,
          title: newPost.title,
          description: newPost.description,
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
    <div>
    
      <form className=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative gap-2">
        <input
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          type="text"
          placeholder="Blog Title"
          value={newPost.title}
          onChange={handleTitle}
        />


        <DraftEditor value={newPost.description} onChange={handleBody} />
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

export default PageEdit;
