import React, { useEffect, useState } from "react";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/system";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  blockService,
  createServices,
  getServices,
  updateService,
} from "../../api/admin";
interface IService {
  _id: string;
  name: string;
  description: string;
  isBlocked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const MotionBox = motion(Box);
const MotionTableRow = motion.tr;

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#BFDBFE",
    },
    "&:hover fieldset": {
      borderColor: "#3B82F6",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Services: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [newService, setNewService] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<IService | null>(null);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response);
    } catch (err) {
      setError("Failed to fetch services.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  const handleBlockUnblock = async (serviceId: string, isBlocked: boolean) => {
    const action = isBlocked ? "unlist" : "list";
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${action} this service?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
      customClass: {
        container: "custom-swal",
      },
    });
    if (result.isConfirmed) {
      try {
        const response = await blockService(serviceId, isBlocked);
        // console.log(response);

        Swal.fire("Success!", response.message, "success");

        setServices((prevServices) =>
          prevServices.map((service) =>
            service._id === serviceId
              ? { ...service, isBlocked: !isBlocked }
              : service
          )
        );
      } catch (error) {
        console.error("Error blocking/unblocking service:", error);
        Swal.fire("Error!", "Failed to update service status.", "error");
      }
    }
  };

  const handleAddService = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateServiceName = (name: string): boolean => {
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9\s]{4,48}[a-zA-Z0-9]$/;
    return regex.test(name.trim());
  };

  const validateServiceDescription = (description: string): boolean => {
    const regex = /^[\s\S]{5,200}$/;
    return regex.test(description.trim());
  };

  const handleCreateService = async () => {
    try {
      const trimmedName = newService.name.trim();
      const trimmedDescription = newService.description.trim();

      if (!validateServiceName(trimmedName)) {
        toast.error(
          "Service name must be between 4 to 20 alphanumeric characters and cannot start or end with whitespace."
        );
        return;
      }

      if (!validateServiceDescription(trimmedDescription)) {
        toast.error(
          "Service description must be between 5 to 50 characters and cannot start or end with whitespace."
        );
        return;
      }

      const response = await createServices(trimmedName, trimmedDescription);
      console.log("Response from frontend:", response);

      if (response && response.status === 200) {
        toast.success(response.data.message);
        setNewService({ name: "", description: "" });
        await fetchServices();
        handleClose();
      }
    } catch (error) {
      console.error("Failed to create service", error);
    }
  };

  const handleEdit = (serviceId: string) => {
    const serviceToEdit = services.find((service) => service._id === serviceId);
    if (serviceToEdit) {
      setEditingService(serviceToEdit);
      setEditModalOpen(true);
    }
  };

  const handleUpdateService = async () => {
    if (!editingService) return;

    try {
      const response = await updateService(
        editingService._id,
        editingService.name,
        editingService.description
      );

      if (response) {
        console.log(response.message);

        toast.success("Service updated successfully");
        setEditModalOpen(false);
        setEditingService(null);
        fetchServices();
      }
    } catch (error) {
      console.error("Failed to update service", error);
      toast.error("Failed to update service");
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container align-middle mx-auto p-4">
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddService}
        style={{ marginBottom: "1rem", backgroundColor: "#3B82F6" }}
        className="text-white"
      >
        Create Service
      </Button>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700  bg-gray-50">
            <tr className="bg-blue-50">
              <th scope="col" className="px-6 py-3">
                Sr. No
              </th>
              <th scope="col" className="px-6 py-3">
                Service Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {services.map((service, index) => (
                <MotionTableRow
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white border-b hover:bg-custom_bg_blue"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{service.name}</td>
                  <td
                    className={`px-6 py-4 ${
                      service.isBlocked ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {service.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className=" py-4">
                    <Button
                      variant="outlined"
                      color={service.isBlocked ? "success" : "error"}
                      onClick={() =>
                        handleBlockUnblock(service._id, service.isBlocked)
                      }
                    >
                      {service.isBlocked ? " List" : "Unlist"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => handleEdit(service._id)}
                      sx={{ margin: "0 8px" }}
                    >
                      Edit
                    </Button>
                  </td>
                </MotionTableRow>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {/* create modal  */}
      <AnimatePresence>
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            className="flex items-center justify-center overflow- "
          >
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-[90%] max-w-md bg-white shadow-lg p-6 rounded-sm"
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h4"
                className="pb-2 text-center text-custom_navyBlue"
              >
                Create New Service
              </Typography>
              <StyledTextField
                fullWidth
                label="Service Name"
                variant="outlined"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                className="mb-8"
              />
              <StyledTextField
                fullWidth
                label="Service Description"
                variant="outlined"
                multiline
                rows={2}
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                className="mb-4"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleClose}
                  color="secondary"
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateService} variant="outlined">
                  Create
                </Button>
              </div>
            </MotionBox>
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {editModalOpen && editingService && (
          <Modal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            aria-labelledby="edit-modal-title"
            aria-describedby="edit-modal-description"
            closeAfterTransition
            className="flex items-center justify-center overflow-y-auto"
          >
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-[90%] max-w-md bg-white shadow-lg p-6 rounded-sm"
            >
              <Typography
                id="edit-modal-title"
                variant="h6"
                component="h4"
                className="pb-2 text-center text-custom_navyBlue"
              >
                Edit Service
              </Typography>
              <StyledTextField
                fullWidth
                label="Service Name"
                variant="outlined"
                value={editingService.name}
                onChange={(e) =>
                  setEditingService({ ...editingService, name: e.target.value })
                }
                className="mb-8"
              />
              <StyledTextField
                fullWidth
                label="Service Description"
                variant="outlined"
                multiline
                rows={2}
                value={editingService.description}
                onChange={(e) =>
                  setEditingService({
                    ...editingService,
                    description: e.target.value,
                  })
                }
                className="mb-4"
              />
              <div className="flex justify-end">
                <Button
                  onClick={() => setEditModalOpen(false)}
                  color="secondary"
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateService}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </div>
            </MotionBox>
          </Modal>
        )}
      </AnimatePresence>
    </div>
    // edit modal
  );
};

export default Services;
