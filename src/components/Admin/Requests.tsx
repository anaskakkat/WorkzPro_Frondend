import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import defaultImage from "/public/user.png";
import { acceptRequest, getRequests } from "../../api/admin";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {setWorkerInfo } from "../../redux/slices/workerSlice";

interface AcceptRequestResponse {
    _id: string;
    name: string;
    email: string;
    phoneNumber: number;
    role: string;
    status: string;
    isProfileSetup: boolean;
    createdAt: string;
    updatedAt: string;
    wallet: number;
    imageUrl?:string
}

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<AcceptRequestResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const response: AcceptRequestResponse[] = await getRequests();
      console.log('fetchRequests:--',response);
      const filtered = response.filter((request) => !request.isProfileSetup);
      setRequests(filtered);
    } catch (err) {
      setError("Failed to fetch requests.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchRequests();
  }, []);

  const handleRequestAction = async (
    requestId: string,
    action: "accept" | "reject"
  ) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure?`,
        text: `Do you want to ${action} this request?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${action}!`,
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        if (action === "accept") {
          const response = await acceptRequest(requestId);
          console.log('Accept Request Response:', response);
          if (response && response.data) {
          const worker={
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            phoneNumber: response.data.phoneNumber,
            role: response.data.role,
            status: response.data.status,
            isProfileSetup: response.data.isProfileSetup,
            createdAt: response.data.createdAt,
            updatedAt: response.data.updatedAt,
            wallet: response.data.wallet,
          }
          dispatch(setWorkerInfo(worker))
          fetchRequests()

          toast.success(response.message);
        } else {
          throw new Error('Response data is missing.');
        }
        }
      }
    } catch (err) {
      console.error(`Failed to ${action} request`, err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr
              key={request._id}
              className="bg-white border-b hover:bg-gray-100"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                <img
                  className="w-10 h-10 rounded-full"
                  src={request.imageUrl || defaultImage}
                  alt={request.name}
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    {request.name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">{request.email}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleRequestAction(request._id, "accept")}
                  className="font-medium text-green-600 hover:underline mx-2"
                >
                  Accept
                </button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
