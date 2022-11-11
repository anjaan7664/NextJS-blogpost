import { BlogInterface } from "@/types/blogData.types";
import Link from "next/link";
import React from "react";
import parse from 'html-react-parser';
const Blog: React.FC<{ blog: BlogInterface; status?: string }> = ({
  blog,
  status,
}) => {
  let date = new Date(blog.createdAt);
  let newDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <a className="shadow-custom m-2 p-2">
        <div className="flex flex-wrap my-4 border-b-2 md:flex-nowrap ">
          <div className="md:flex-grow">
            {status && (
              <p>
                Status -
                <span
                  className={`${
                    status === "pending"
                      ? "text-yellow-600"
                      : status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }  px-2 rounded py-2`}
                >
                  {status}
                </span>
              </p>
            )}
            <h2 className="mb-2 text-3xl font-medium text-gray-900 title-font">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-500">By <span className="font-semibold text-gray-700">{blog.authorName}</span> on {newDate}</p>
            <p className="mt-2 leading-relaxed text-gray-500">
              {parse(blog.body)}
            </p>
            <p className="inline-flex items-center mt-4 text-indigo-500">
              Read More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Blog;
