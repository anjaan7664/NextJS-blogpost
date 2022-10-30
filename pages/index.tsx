import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BlogList } from "@/types/blogData.types";
import Article from "@/components/article";
import { Pagination, Stack } from "@mui/material";
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
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  }, [pageNum]);
  const onPageChange = (event: React.ChangeEvent<unknown>, pageNum: number) => {
    setPageNum(pageNum);
  };
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  return (
    <>
      <Head>
        <title>Blogpost</title>
        <meta
          name="description"
          content="Next.js blog post with admin control"
        />
      </Head>
      <div className="flex text-center flex-col mt-4">
        <h1 className="text-3xl font-bold">Global Articles</h1>
        <div className="flex flex-col text-left">
          {data.docs.map((blog) => {
            return <Article key={blog._id} blog={blog} />;
          })}
        </div>
        <Stack spacing={2}>
          <Pagination
            page={data.page}
            count={data.totalPages}
            shape="rounded"
            onChange={onPageChange}
            className="mx-auto my-2"
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
    </>
  );
};

export default Home;
