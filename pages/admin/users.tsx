import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserList } from "@/types/userData.types";
import AllUsers from "@/components/user/AllUsers";
import Pagination from "@/components/helpers/Pagination";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";
const Users = () => {
  const router = useRouter();
  const [pageNum, setPageNum] = useState<number>(
    router.query.page ? parseInt(router.query.page as string) : 1
  );
  const [data, setData] = useState<UserList>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/allUsers`, null, {
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


  if (isLoading) return <LoadingSpinner/>
  if (!data) return <p>No data</p>;

  const paginateFront = () => setPageNum(data.page + 1);
  const paginateBack = () => setPageNum(data.page - 1);

  const removeUser = (id:string) =>{
    const newData = data.docs.filter((user) => user._id !== id);
    setData({ ...data, docs: newData });
  }
  return (
    <>
      <div className="flex text-center flex-col mt-4">
        <h1 className="text-3xl font-bold my-4">All Users</h1>
        <div className="flex flex-col text-left overflow-x-auto relative border mb-4">
          <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Action</th>
                <th className="py-3 px-6">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.docs.map((user) => {
                return <AllUsers key={user._id} user={user} removeUser={removeUser}/>;
              })}
            </tbody>
          </table>
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
  if (session.user.role !== 'admin') {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
export default Users;
