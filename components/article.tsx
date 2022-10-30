import { BlogInterface } from "@/types/blogData.types";
import Link from "next/link";
import React from "react";

const Article: React.FC<{ blog: BlogInterface }> = ({ blog }) => {
  let date = new Date(blog.createdAt);
  let newDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <a className="shadow-custom m-2 p-2">
        <div className="flex flex-wrap py-8 border-b-2 md:flex-nowrap ">
          <div className="md:flex-grow">
            <h2 className="mb-2 text-3xl font-medium text-gray-900 title-font">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-400">By Author on {newDate}</p>
            <p className="mt-2 leading-relaxed text-gray-500">{blog.body.substring(0,250)}...</p>
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

export default Article;
