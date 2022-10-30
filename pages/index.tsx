import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BlogList } from "@/types/blogData.types";

import Pagination from "@/components/helpers/Pagination";
import Blog from "@/components/blog";
import LoadingSpinner from "@/components/LoadingSpinner";
const Home: React.FC = () => {
  const router = useRouter();
  const [pageNum, setPageNum] = useState<number>(
    router.query.page ? parseInt(router.query.page as string) : 1
  );
  const [data, setData] = useState<BlogList>();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, null, {
        params: {
          page: pageNum,
          perPage: 10,
          status: "approved",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  }, [pageNum]);

  if (isLoading) return <LoadingSpinner/>
  if (!data) return <p>No data</p>;

  const paginateFront = () => setPageNum(data.page + 1);
  const paginateBack = () => setPageNum(data.page - 1);

  return (
    <>
      <Head>
        <title>Blogpost</title>
        <meta
          name="description"
          content="Next.js blog post with admin control"
        />
      </Head>
      <div className="flex text-center flex-col mt-4 min-h-[78vh]">
        <h1 className="text-3xl font-bold">Global Blogs</h1>
        <div className="flex flex-col text-left">
          {data.docs.map((blog) => {
            return <Blog key={blog._id} blog={blog} />;
          })}
        </div>
        <Pagination
          postsPerPage={10}
          totalPosts={data.totalDocs}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
          currentPage={data.page}
          hasPrevPage={data.hasPrevPage}
          hasNextPage={data.hasNextPage}
        />
      </div>
    </>
  );
};

export default Home;
