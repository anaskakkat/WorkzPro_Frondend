import React, { useEffect, useState } from "react";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/system";
import toast from "react-hot-toast";
import { createServices } from "../../api/admin";

interface IService {
  _id: number;
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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // const response = await getServices();
        // setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch services.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBlockUnblock = async (
    serviceId: number,
    isBlocked: boolean
  ) => {};

  const handleEdit = (serviceId: number) => {
    console.log(`Edit service with ID: ${serviceId}`);
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
        console.log('asdsadsa');
        
        toast.success(response.data.message);
        handleClose(); 
      }
    } catch (error) {
      console.error("Failed to create service", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
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
            <tr>
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
                  className="bg-white border-b"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{service.name}</td>
                  <td className="px-6 py-4">
                    {service.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="contained"
                      color={service.isBlocked ? "success" : "error"}
                      onClick={() =>
                        handleBlockUnblock(service._id, service.isBlocked)
                      }
                      className="mr-2"
                    >
                      {service.isBlocked ? "Unblock" : "Block"}
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => handleEdit(service._id)}
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
    </div>
  );
};

export default Services;
