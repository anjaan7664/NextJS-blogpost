import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BlogList } from "@/types/blogData.types";

import Pagination from "@/components/helpers/Pagination";
import Blog from "@/components/blog";
import { unstable_getServerSession } from "next-auth/next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pageNum, setPageNum] = useState<number>(
    router.query.page ? parseInt(router.query.page as string) : 1
  );
  const [data, setData] = useState<BlogList>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/userBlogs`, null, {
        params: {
          page: pageNum,
          perPage: 10,
          id: session?.user._id,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  }, [pageNum, session?.user._id]);

  if (isLoading) return <LoadingSpinner />;
  if (!data) return <p>No data</p>;

  const paginateFront = () => setPageNum(data.page + 1);
  const paginateBack = () => setPageNum(data.page - 1);

  return (
    <>
     

      <div className="flex text-center flex-col mt-6 min-h-[77vh]">
        <h1 className="text-3xl font-bold">My Posts</h1>
        {data.totalDocs === 0 && (
          <>
            <h1 className="text-4xl mt-8">
              Add a new post please.  &nbsp;
              <Link href="/blogs/new">
                <a className=" underline">Create Post</a>
              </Link>
            </h1>
          </>
        )}
        {data.totalDocs !== 0 && (
          <>
            <div className="flex text-center flex-col mt-4">
              <h1 className="text-3xl font-bold">Global Blogs</h1>
              <div className="flex flex-col text-left">
                {data.docs.map((blog) => {
                  return (
                    <div key={blog._id} className="border p-4">
                      <div className="flex flex-row ">
                        <p className="text-blue-400">Status</p>{" "}
                        <p>{blog.status}</p>
                      </div>
                      <Blog blog={blog} />
                    </div>
                  );
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
        )}
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
export default Profile;
