import React, { useState, useEffect } from "react";
import { BlogInterface } from "lib/types/blogData.types";

import { useRouter } from "next/router";

import axios from "axios";
import BlogEdit from "@/components/editor/BlogEdit";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

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

  if (isLoading) return <LoadingSpinner />;
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

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
export default EditBlog;
