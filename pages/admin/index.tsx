import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Admin = () => {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-[78vh] mt-4">
        <Link href="/admin/users">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            All Users
          </a>
        </Link>
        <Link href="/admin/approve">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Approve Posts
          </a>
        </Link>
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
export default Admin;
