import React from "react";

const Pagination: React.FC<{
  postsPerPage: number;
  totalPosts: number;
  paginateFront: Function;
  paginateBack: Function;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}> = ({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
  hasNextPage,
  hasPrevPage,
}) => {
  return (
    <div className="py-2">
      <div>
        <p className="text-sm text-gray-700">
          Showing &nbsp;
          <span className="font-semibold">
            {currentPage * postsPerPage - 10}
          </span>
          &nbsp; to&nbsp;
          <span className="font-semibold"> {currentPage * postsPerPage} </span>
          of
          <span className="font-semibold"> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className="block"></nav>
      <div>
        <div
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px mt-2"
          aria-label="Pagination"
        >
          <button
            disabled={!hasPrevPage}
            onClick={() => {
              paginateBack();
            }}
            className={`${hasPrevPage ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'} relative inline-flex items-center px-2 py-2 rounded-l-md border  text-sm font-medium text-white `}
          >
            <span>Previous</span>
          </button>

          <button
            disabled={!hasNextPage}
            onClick={() => {
              paginateFront();
            }}
            className={`${hasNextPage ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'} relative inline-flex items-center px-4 py-2 rounded-r-md border  text-sm font-medium text-white `}
          >
            <span>Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
