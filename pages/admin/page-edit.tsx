import PostApprove from "@/components/admin/PostApproval";
import PageDataEdit from "@/components/admin/PageDataEdit";
import UsersAdmin from "@/components/admin/UsersAdmin";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Admin = () => {
  const [pageName, setPageName] = useState("");

  return (
    <>
      <div className="flex flex-col gap-4 mt-4 w-full">
        <div className="flex flex-row w-full text-center justify-center gap-10">
          <button
            onClick={() => setPageName("privacy_policy")}
            className={`bg-blue-500 hover:bg-blue-700            } text-white font-bold py-2 px-4 rounded`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => {
              setPageName("about_us");
            }}
            className={`
                bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          >
            About Us
          </button>

          <button
            onClick={() => {
              setPageName("terms_of_service");
            }}
            className={`
                bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          >
            Terms Of Service
          </button>
        </div>
      </div>
      <div>{pageName && <PageDataEdit pageName={pageName} />}</div>
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
