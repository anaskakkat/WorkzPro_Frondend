import React, { useEffect, useState } from "react";
import { getUsers, blockUser, unblockUser } from "../../api/admin";
import Swal from "sweetalert2";
import defaultImage from "/user.png";
import Loader from "../loader/Loader";
import { Pagination } from "@mui/material";
interface User {
  _id: number;
  userName: string;
  email: string;
  status: string;
  imageUrl?: string;
  isBlocked: boolean;
}

const UsersAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [usersPerPage] = useState(10);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUnblock = async (userId: number, isBlocked: boolean) => {
    try {
      const action = isBlocked ? "unblock" : "block";
      const result = await Swal.fire({
        title: `Are you sure?`,
        text: `Do you want to ${action} this user?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        if (isBlocked) {
          await unblockUser(userId);
        } else {
          await blockUser(userId);
        }

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlocked: !isBlocked } : user
          )
        );
      }
    } catch (err) {
      console.error("Failed to update user status", err);
    }
  };
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  if (loading) return <Loader />;
  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const pageCount = Math.ceil(users.length / usersPerPage);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sr. No
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr
              key={user._id}
              className="bg-white border-b hover:bg-custom_bg_blue"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.imageUrl || defaultImage}
                  alt={user.userName}
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">{user.userName}</div>
                  <div className="font-normal text-gray-500">{user.email}</div>
                </div>
              </th>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      user.isBlocked ? "bg-red-500" : "bg-green-500"
                    } me-2`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${
                      user.isBlocked ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
                  className={`font-medium text-${
                    user.isBlocked ? "green" : "red"
                  }-600`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center my-4">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </div>
    </div>
  );
};

export default UsersAdmin;
