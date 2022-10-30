import { UserInterface } from "@/types/userData.types";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
const AllUsers: React.FC<{ user: UserInterface, removeUser:Function }> = ({ user, removeUser }) => {
  const [role, setRole] = useState(user.role);

  const changeRole = async (val: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/makeAdmin`,
      {
        role: val,
        id: user._id,
      }
    );
    const data = await response.data;
    if (response.status !== 200) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      setRole(val);
    }
  };

  const deleteUser = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/removeUser`,
      {
  
        id: user._id,
      }
    );
    const data = await response.data;
    if (response.status !== 200) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      removeUser(user._id)
    }
  };
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {user.name}
      </td>
      <td className="py-4 px-6">{user.email}</td>
      <td className="py-4 px-6">{role}</td>
      <td className="py-4 px-4">
        {role === "admin" && (
          <button
            onClick={() => {
              changeRole("user");
            }}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-5 rounded"
          >
            Make User
          </button>
        )}
        {role === "user" && (
          <button
            onClick={() => {
              changeRole("admin");
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Make Admin
          </button>
        )}
      </td>
      <td className="py-4 px-4">
        {" "}
        <button
          onClick={deleteUser}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded"
        >
          Delete User
        </button>
      </td>
    </tr>
  );
};

export default AllUsers;
