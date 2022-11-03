import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { PageInterface } from "@/types/pageType.types";
import Pagination from "@/components/helpers/Pagination";
import Blog from "@/components/blog";
import LoadingSpinner from "@/components/LoadingSpinner";
const Home: React.FC = () => {
  const router = useRouter();
  const [pageNum, setPageNum] = useState<number>(
    router.query.page ? parseInt(router.query.page as string) : 1
  );
  const [data, setData] = useState<PageInterface>();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`, null, {
        params: {
          link_name: "about_us",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  }, [pageNum]);

  if (isLoading) return <LoadingSpinner />;
  if (!data) return <p>No data</p>;

  console.log(data);
  const createMarkup = () => {
    return { __html: data.description };
  }
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta
          name="description"
          content="Next.js blog post with admin control"
        />
      </Head>
      <div className="flex text-center flex-col mt-4 min-h-[78vh]">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <div dangerouslySetInnerHTML={createMarkup()} className='editor'></div>
      </div>
    </>
  );
};

export default Home;
