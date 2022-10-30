import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
const Profile = () => {
  return (
    <>
      <a
        href={`/api/auth/signout`}
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        Sign out
      </a>
    </>
  );
};

export default Profile;
