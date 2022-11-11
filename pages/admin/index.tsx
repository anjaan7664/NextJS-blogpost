import React from "react";

const Admin = () => {
  return <></>;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/admin/verify_post",
      permanent: false,
    },
  };
};
export default Admin;
