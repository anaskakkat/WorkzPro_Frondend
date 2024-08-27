import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import defaultImage from "/public/user.png";
import { acceptRequest, getRequests, rejectRequest } from "../../api/admin";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setWorkerInfo } from "../../redux/slices/workerSlice";
import Loader from "../loader/Loader";
import {
  Modal,
  Box,
  Typography,
  TextareaAutosize,
  Button,
} from "@mui/material";

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
  imageUrl?: string;
}

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<AcceptRequestResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>("");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const response: AcceptRequestResponse[] = await getRequests();
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
          if (response && response.data) {
            const worker = {
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
            };
            dispatch(setWorkerInfo(worker));
            fetchRequests();
            toast.success(response.message);
          } else {
            throw new Error("Response data is missing.");
          }
        } else if (
          action === "reject" &&
          selectedRequestId &&
          rejectReason.trim()
        ) {
          // console.log("Request ----", selectedRequestId,'----',rejectReason);

          const response = await rejectRequest(selectedRequestId, rejectReason);
          // console.log("Request rejected----", response);
          if (response) {
            toast.success("Request rejected successfully.");
            fetchRequests();
          }
        }
      }
    } catch (err) {
      console.error(`Failed to ${action} request`, err);
      toast.error(`Failed to ${action} request.`);
    }
  };

  const openRejectModal = (requestId: string) => {
    setSelectedRequestId(requestId);
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
    setRejectReason("");
    setSelectedRequestId(null);
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      toast.error("Rejection reason cannot be empty or whitespace.");
      return;
    }
    if (selectedRequestId) {
      handleRequestAction(selectedRequestId, "reject");
      closeRejectModal();
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {requests.length > 0 ? (
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
                  <button
                    onClick={() => openRejectModal(request._id)}
                    className="font-medium text-red-600 hover:underline mx-2"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No requests to display.
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && (
        <Modal open={rejectModalOpen} onClose={closeRejectModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              borderRadius: 1,
              boxShadow: 24,
              p: 4,
              width: "400px",
            }}
          >
            <Typography variant="h6" component="h2" className="font-bold">
              Reject Request
            </Typography>
            <TextareaAutosize
              minRows={3}
              style={{
                width: "100%",
                marginTop: "16px",
                padding: "3px",
                borderColor: "#000000",
                borderRadius: "10px",
              }}
              placeholder="Enter rejection reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                onClick={closeRejectModal}
                variant="outlined"
                color="info"
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRejectSubmit}
                variant="outlined"
                color="error"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Requests;
