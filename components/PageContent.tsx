import { PageInterface } from "@/types/pageType.types";
import React from "react";
import Head from "next/head";
import parse from 'html-react-parser';
const PageContent: React.FC<{ data: PageInterface }> = ({ data }) => {
   
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
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        {parse(data.description)}
      </div>
    </>
  );
};

export default PageContent;
