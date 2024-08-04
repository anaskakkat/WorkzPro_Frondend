import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import defaultImage from "/public/user.png";
import { acceptRequest, getRequests } from "../../api/admin";
import toast from "react-hot-toast";

interface Request {
  _id: string;
  userName: string;
  email: string;
  imageUrl?: string;
}

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getRequests();
        // console.log(response);

        setRequests(response.workers);
      } catch (err) {
        setError("Failed to fetch requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

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
        const response=  await acceptRequest(requestId);
          console.log(response);
          toast.success(response.message)
        } else {
          //   await rejectRequest(requestId);
        }

        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );
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
                  alt={request.userName}
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    {request.userName}
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
                {/* <button
                  onClick={() => handleRequestAction(request._id, 'reject')}
                  className="font-medium text-red-600 hover:underline mx-2 "
                >
                  Reject
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
