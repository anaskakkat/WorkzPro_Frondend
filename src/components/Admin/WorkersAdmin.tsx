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

interface Worker {
  _id: string;
  name: string;
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
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [workersPerPage] = useState(10);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getWorkers();

        setWorkers(response);
      } catch (err) {
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

  const handleDetailsClick = (worker: Worker) => {
    setSelectedWorker(worker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorker(null);
  };
  const handleChangePage = (value: number) => {
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
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
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
            <th></th>
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
                  alt={user.name}
                />
                <div className="ps-3">
                  <div className="text-base font-semibold capitalize">
                    {user.name}
                  </div>
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
                  className="bg-custom-gradient-black hover:text-blue-300 text-white text-xs font-semibold py-1.5 px-3 rounded-sm"
                >
                  Details
                </button>{" "}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
                  className={`font-medium border ${
                    user.isBlocked
                      ? "border-green-600 text-green-600 hover:bg-green-700 hover:text-white"
                      : "border-red-200 text-red-600 hover:bg-red-600 hover:text-white"
                  } bg-transparent rounded-md px-2 py-1.5 transition-colors duration-300`}
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
          onChange={() => handleChangePage}
          color="standard"
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
            <div className="max-w-lg mx-auto p-4 border border-gray-200 rounded-lg shadow-md bg-white">
              <img
                src={selectedWorker.profilePicture}
                alt={selectedWorker.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300"
              />
              <h2 className="text-xl font-semibold text-center mb-4 capitalize">
                {selectedWorker.name}
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <strong>Email:</strong>
                  <span className="text-gray-700">{selectedWorker.email}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Phone Number:</strong>
                  <span className="text-gray-700">
                    {selectedWorker.phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>Experience:</strong>
                  <span className="text-gray-700">
                    {selectedWorker.experience} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>Location:</strong>
                  <span className="text-gray-700">
                    {selectedWorker.locationName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>Wage per Day:</strong>
                  <span className="text-gray-700">
                    {selectedWorker.wageDay}
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>Work Radius:</strong>
                  <span className="text-gray-700">
                    {selectedWorker.workRadius} km
                  </span>
                </div>
                <div className="flex justify-between capitalize">
                  <strong>Status:</strong>
                  <span className="text-gray-700">{selectedWorker.status}</span>
                </div>
                <div>
                  <strong>Identity Proof:</strong>
                  <img
                    src={selectedWorker.identityProof}
                    alt="Identity Proof"
                    className="w-full h-48 mt-2 rounded-lg object-cover"
                  />
                </div>
              </div>
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
