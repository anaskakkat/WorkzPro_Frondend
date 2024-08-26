import React, { useEffect, useState } from "react";
import { IFormErrors } from "../../../types/formError";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import toast from "react-hot-toast";
import {
  deleteService,
  editService,
  fecthServices,
  saveService,
} from "../../../api/worker";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { ServiceData } from "../../../types/IWorker";

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [problemName, setProblemName] = useState("");
  const [estimatedSlots, setEstimatedSlots] = useState("");
  const [amount, setAmount] = useState("");
  const [services, setServices] = useState<ServiceData[]>();
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);
  const workerId = useSelector(
    (state: RootState) => state.workerInfo.workerInfo._id
  );

  useEffect(() => {
    handleAddService();
  }, []);

  const validate = (): IFormErrors => {
    const newErrors: IFormErrors = {};

    if (!/^(?!\s*$)[a-zA-Z\s]+$/.test(problemName.trim())) {
      newErrors.problemName =
        "Problem name should only contain letters and spaces and cannot be empty or just whitespace.";
    }

    if (!/^[1-8]$/.test(estimatedSlots)) {
      newErrors.estimatedSlots =
        "Estimated slots should be a number between 1 and 8.";
    }

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount should be a positive number.";
    }

    Object.values(newErrors).forEach((error) => toast.error(error));

    return newErrors;
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: IFormErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    let data: ServiceData = {
      service: problemName,
      slot: Number(estimatedSlots),
      amount: Number(amount),
    };

    try {
      if (isEditMode && currentServiceId) {
        const response = await editService(workerId, data, currentServiceId);
        toast.success(response.data);
      } else {
        const response = await saveService(workerId, data);
        if (response.data.status === 200) {
          toast.success(response.data.message);
        }
      }

      setProblemName("");
      setEstimatedSlots("");
      setAmount("");
      setIsModalOpen(false);
      setIsEditMode(false);
      setCurrentServiceId(null);

      handleAddService();
    } catch (error) {
      console.error("Error adding or updating service:", error);
      toast.error("An error occurred while processing your request.");
    }
  };

  const handleEdit = (serviceId: string) => {
    const serviceToEdit = services?.find(
      (service) => service._id === serviceId
    );
    if (serviceToEdit) {
      setProblemName(serviceToEdit.service);
      setEstimatedSlots(serviceToEdit.slot.toString());
      setAmount(serviceToEdit.amount.toString());
      setIsModalOpen(true);
      setIsEditMode(true);
      setCurrentServiceId(serviceId);
    }
  };

  const handleDelete = async (serviceId: string) => {
    try {
      const response = await deleteService(workerId, serviceId);
      if (response.data) {
        toast.success(response.data);
        handleAddService();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the service.");
    }
  };

  const handleAddService = async () => {
    try {
      const response = await fecthServices(workerId);
      if (response.data.status === 200) {
        setServices(response.data.services);
      } else {
        console.log("Error fetching services");
        toast.error("Error fetching services");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching services.");
    }
  };

  return (
    <>
      <div className="w-full h-3/4 flex flex-col  bg-white rounded-lg shadow-2xl">
        <div className="px-3 flex bg-blue-100 w-full justify-between rounded-t-lg items-center py-2">
          <h3 className="font-semibold text-custom_navyBlue">Services</h3>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white font-medium px-4 py-1 border border-blue-500 hover:border-transparent rounded"
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              setProblemName("");
              setEstimatedSlots("");
              setAmount("");
            }}
          >
            Add
          </button>
        </div>
        <hr />
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-sm text-gray-700">
                <th className="border-b px-4 py-2 font-medium text-left">
                  Service
                </th>
                <th className="border-b px-4 py-2 text-left font-medium">
                  Slot
                </th>
                <th className="border-b px-4 py-2 text-left font-medium">
                  Amount
                </th>
                <th className="border-b px-4 py-2 text-left font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {services &&
                services.map((service) => (
                  <tr
                    key={service._id}
                    className="border-b text-sm text-gray-600 hover:bg-blue-100"
                  >
                    <td className="px-4 py-2">{service.service}</td>
                    <td className="px-4 py-2">{service.slot}</td>
                    <td className="px-4 py-2">{service.amount}</td>
                    <td className="flex items-center px-4 py-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleEdit(service._id!)}
                      >
                        <EditNoteOutlinedIcon />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(service._id!)}
                      >
                        <DeleteOutlinedIcon />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-custom_navyBlue">
              {isEditMode ? "Edit Service Details" : "Add Service Details"}
            </h2>
            <form onSubmit={handleModalSubmit}>
              {/* Problem Name Input */}
              <div className="mb-4">
                <label className="block">Problem Name</label>
                <input
                  type="text"
                  value={problemName}
                  onChange={(e) => setProblemName(e.target.value)}
                  className="w-full text-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-300"
                  placeholder="Enter problem name"
                  required
                />
              </div>

              {/* Estimated Slots and Amount Inputs */}
              <div className="mb-4 flex flex-row gap-4">
                <div className="flex flex-col w-1/2">
                  <label className="mb-1 text-gray-700">Estimated Slots</label>
                  <input
                    type="number"
                    value={estimatedSlots}
                    onChange={(e) => setEstimatedSlots(e.target.value)}
                    className="w-full text-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-300"
                    placeholder="Enter Estimated Slots"
                    required
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label className="mb-1 text-gray-700">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full text-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-300"
                    placeholder="Enter Amount"
                    required
                  />
                </div>
              </div>

              {/* Buttons for Submit and Cancel */}
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {isEditMode ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setCurrentServiceId(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
