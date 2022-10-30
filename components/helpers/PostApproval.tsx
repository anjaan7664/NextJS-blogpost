import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { BlogInterface } from "@/types/blogData.types";
const PostApproval: React.FC<{ blog: BlogInterface, handleDelete:Function}> = ({ blog, handleDelete }) => {
  const approval = async (val: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/postApproval`,
      {
        status: val,
        id: blog._id,
      }
    );
    const data = await response.data;
    if (response.status !== 200) {
      throw new Error(data.message || "Something went wrong!");
    } else {
     handleDelete(blog._id)
    }
  };
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Link href={`/blogs/${blog.slug}`}>
          <a className="underline">{blog.title}</a>
        </Link>
      </td>
      <td className="py-4 px-6">{blog.authorId}</td>

      <td className="py-4 px-6">
        <button
          onClick={() => {
            approval("approved");
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Approve
        </button>

        <button
          onClick={() => {
            approval("rejected");
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default PostApproval;
