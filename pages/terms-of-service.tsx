import axios from "axios";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { PageInterface } from "lib/types/pageType.types";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PageContent from "@/components/cms/PageContent";
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
          link_name: 'terms_of_service',
         
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  }, [pageNum]);

  if (isLoading) return <LoadingSpinner/>
  if (!data) return <p>No data</p>;

console.log(data)
  return (
  
     <PageContent data={data} />
   
  );
};

export default Home;
