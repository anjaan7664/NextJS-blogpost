import React, { useState, useEffect, useReducer } from "react";
import { BlogInterface } from "@/types/blogData.types";

import Router, { useRouter } from "next/router";

import axios from "axios";
import Test from "@/components/helpers/Test";
import BlogEdit from "@/components/helpers/BlogEdit";

const EditBlog = () => {
  const router = useRouter();
  const [blog, setData] = useState<BlogInterface>();

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const blogSlug = router.query.blog;

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/getBlog`, null, {
        params: {
          slug: blogSlug,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  }, [blogSlug]);

  if (isLoading) return <p>Loading...</p>;
  if (!blog) return <p>No data</p>;

  return (
    <>
      <div className="flex flex-col min-h-[80vh] text-center mt-4 w-9/12 mx-auto">
        <h1 className="text-4xl font-semibold">Edit this Blog</h1>

        <BlogEdit blog={blog} />
      </div>
    </>
  );
};

export default EditBlog;
