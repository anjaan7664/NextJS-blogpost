import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BlogInterface } from "@/types/blogData.types";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import parse from 'html-react-parser';

const Blog = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const blogSlug = router.query.blog;
  const [data, setData] = useState<BlogInterface>();
  const [isLoading, setLoading] = useState(false);

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
  if (!data) return <p>No data</p>;

  const deleteBlog = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/deleteBlog`,
      {
        blogId: data._id,
      }
    );
    const responseData = await response.data;
    if (response.status !== 200) {
      throw new Error(responseData.message || "Something went wrong!");
    } else {
      router.push("/");
    }
  };

  let date = new Date(data.createdAt);
  let newDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  return (
    <div>
      <div className="container w-full auto min-h-[80vh]">
        <div className="w-full text-xl leading-normal text-gray-800 ">
          <div className="font-sans">
            <div className="text-base font-bold text-blue-500 md:text-sm relative">
              <Image
                src={`/assets/images/blogs/${data.image}`}
                alt="Picture of the author"
                layout="responsive"
                className="object-cover w-full"
                width={100}
                height={20}
              />
              <Link href="/">
                <a className="absolute text-2xl  top-2 left-3 w-full">
                  <p className=" inline-flex items-center mt-4 text-base cursor-pointer absolute text-white">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                    </svg>
                    Back To Blogs
                  </p>
                </a>
              </Link>
            </div>
            <h1 className="pt-6 pb-2 font-sans text-3xl font-bold text-gray-900 break-normal md:text-4xl">
              {data.title}
            </h1>
            <p className="text-sm font-normal text-gray-600 md:text-base">
              Published on {newDate} by &nbsp;
              <span className="font-semibold text-gray-700">
                {data.authorName}
              </span>
            </p>
            {session &&
              (session?.user.role === "admin" ||
                session?.user._id === data.authorId) && (
                <div className="text-sm flex mt-2">
                  <Link href={`/blogs/edit/${data.slug}`}>
                    <a className="text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                      Edit This Blog
                    </a>
                  </Link>
                  <button
                    className=" bg-red-500 ml-2 hover:bg-red-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                    onClick={deleteBlog}
                  >
                    Delete This Blog
                  </button>
                </div>
              )}
          </div>
          <p className="py-6">{parse(data.body)}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
