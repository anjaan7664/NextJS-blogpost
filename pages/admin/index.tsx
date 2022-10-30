
import Link from "next/link";
import React from "react";

const Admin = () => {

  return (
    <>
     <div className="flex flex-col gap-4">
      <Link href='/admin/users'>
        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          All Users
        </a>
      </Link>
      <Link href='/admin/approve'>
        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Approve Posts
        </a>
      </Link>
      <Link href='/admin/user'>
        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          All Users
        </a>
      </Link>
     </div>
    </>
  );
};

export default Admin;
