import axios from "axios";
import React, { useEffect, useState } from "react";
import { BlogList } from "@/types/blogData.types";
import PostApproval from "@/components/admin/PostTable";
import Pagination from "@/components/helpers/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import PostTable from "@/components/admin/PostTable";
const PostApprove: React.FC = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [data, setData] = useState<BlogList>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, null, {
        params: {
          page: pageNum,
          perPage: 10,
          status: "pending",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  }, [pageNum]);

  if (isLoading) return <LoadingSpinner />;
  if (!data) return <p>No data</p>;
  const paginateFront = () => setPageNum(data.page + 1);
  const paginateBack = () => setPageNum(data.page - 1);

  const handleDelete = (id: string) => {
    const newData = data.docs.filter((blog) => blog._id !== id);
    setData({ ...data, docs: newData });
  };

  return (
    <>
      <div className="flex text-center flex-col mt-6 min-h-[77vh]">
        <h1 className="text-3xl font-bold">Approve Posts</h1>
        {data.totalDocs === 0 && (
          <h1 className="text-4xl mt-8">No posts to Post</h1>
        )}
        {data.totalDocs !== 0 && (
          <>
            <div className="flex flex-col text-left overflow-x-auto relative border mt-8">
              <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-6">Title</th>
                    <th className="py-3 px-6">Author</th>
                    <th className="py-3 px-6">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.docs.map((blog) => {
                    return (
                      <PostTable
                        blog={blog}
                        key={blog._id}
                        handleDelete={handleDelete}
                      />
                    );
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
          </>
        )}
      </div>
    </>
  );
};
export default PostApprove;
