import React, { useState, useEffect } from "react";
import { PageInterface } from "lib/types/pageType.types";
import axios from "axios";

import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PageEdit from "../editor/PageEdit";

const PageDataEdit: React.FC<{ pageName: String }> = ({ pageName }) => {

  const [pageData, setData] = useState<PageInterface>();

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`, null, {
        params: {
          link_name: pageName,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  }, [pageName]);

  if (isLoading) return <LoadingSpinner />;
  if (!pageData) return <p>No data</p>;
console.log(pageData)
  return (
    <>
      <div className="flex flex-col min-h-[80vh] text-center mt-4 w-9/12 mx-auto">
        <h1 className="text-4xl font-semibold">Edit this Page</h1>
        <PageEdit pageData={pageData} />
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
export default PageDataEdit;
