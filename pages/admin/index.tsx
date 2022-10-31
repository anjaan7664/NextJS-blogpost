import PostApprove from "@/components/admin/PostApproval";
import UsersAdmin from "@/components/admin/UsersAdmin";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Admin = () => {
  const [showUser, setShowUser] = useState(true);
  return (
    <>
      <div className="flex flex-col gap-4 mt-4 w-full">
        <div className="flex flex-row w-full text-center justify-center gap-10">
          <button
            onClick={() => setShowUser(true)}
            className={`${
              showUser
                ? "bg-gray-500 hover:bg-gray-700"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
          >
            All Users
          </button>

          <button
            onClick={() => setShowUser(false)}
            className={`${
              !showUser
                ? "bg-gray-500 hover:bg-gray-700"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
          >
            Approve Posts
          </button>
        </div>
      </div>
      <div>
        {!showUser && <PostApprove />}
        {showUser && <UsersAdmin />}
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
  if (session.user.role !== "admin") {
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
export default Admin;
