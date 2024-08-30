import React, { useEffect, useState } from "react";
import { blockWorker, getWorkers, unblockWorker } from "../../api/admin";
import Swal from "sweetalert2";
import defaultImage from "/user.png";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Pagination,
} from "@mui/material";
import Loader from "../loader/Loader";

interface User {
  _id: string;
  userName: string;
  email: string;
  status: string;
  isBlocked: boolean;
  experience: number;
  locationName: string;
  identityProof: string;
  profilePicture: string;
  wageDay: number;
  workRadius: number;
  phoneNumber: number;
}

const WorkersAdmin: React.FC = () => {
  const [workers, setWorkers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [workersPerPage] = useState(10);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getWorkers();

        setWorkers(response);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUnblock = async (userId: string, isBlocked: boolean) => {
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
          const response = await unblockWorker(userId);
          if (response) {
            toast.success(response.message);
          }
        } else {
          const response = await blockWorker(userId);
          if (response) {
            toast.success(response.message);
          }
        }

        setWorkers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlocked: !isBlocked } : user
          )
        );
      }
    } catch (err) {
      console.error("Failed to update user status", err);
    }
  };

  const handleDetailsClick = (worker: User) => {
    setSelectedWorker(worker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorker(null);
  };
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  if (loading) return <Loader />;
  const indexOfLastWorker = page * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;
  const currentWorkers = workers.slice(indexOfFirstWorker, indexOfLastWorker);
  const pageCount = Math.ceil(workers.length / workersPerPage);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
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
          {currentWorkers.map((user, index) => (
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
                  src={user.profilePicture || defaultImage}
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
              <td>
                <button
                  onClick={() => handleDetailsClick(user)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
                >
                  Details
                </button>{" "}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
                  className={`font-medium border-2 ${
                    user.isBlocked
                      ? "border-green-600 text-green-600 hover:bg-green-500 hover:text-white"
                      : "border-red-200 text-red-600 hover:bg-red-500 hover:text-white"
                  } bg-transparent rounded-lg px-4 py-2 transition-colors duration-300`}
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

      <Dialog
        open={isModalOpen}
        fullWidth
        maxWidth="sm"
        onClose={handleCloseModal}
      >
        <DialogTitle>Worker Details</DialogTitle>
        <DialogContent>
          {selectedWorker && (
            <div>
              <img
                src={selectedWorker.profilePicture}
                alt={selectedWorker.userName}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <p>
                <strong>Name:</strong> {selectedWorker.userName}
              </p>
              <p>
                <strong>Email:</strong> {selectedWorker.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedWorker.phoneNumber}
              </p>
              <p>
                <strong>Experience:</strong> {selectedWorker.experience} years
              </p>
              <p>
                <strong>Location:</strong> {selectedWorker.locationName}
              </p>
              <p>
                <strong>Wage per Day:</strong> {selectedWorker.wageDay}
              </p>
              <p>
                <strong>Work Radius:</strong> {selectedWorker.workRadius} km
              </p>
              <p>
                <strong>Status:</strong> {selectedWorker.status}
              </p>
              <p>
                <strong>Identity Proof:</strong>
              </p>
              <img
                src={selectedWorker.identityProof}
                alt="Identity Proof"
                className="w-88 h-48 mt-2 rounded-lg"
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkersAdmin;
