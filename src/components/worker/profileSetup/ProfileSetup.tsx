import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Select,
} from "@mui/material";
import { Modal, Box as MuiBox } from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { toast } from "react-hot-toast";
import {
  getWorkerServices,
  logoutWorker,
  setProfileData,
} from "../../../api/worker";
import { useSelector, useDispatch } from "react-redux";
import {
  removeWorkerInfo,
  setWorkerInfo,
} from "../../../redux/slices/workerSlice";
import CustomTextField from "../../styleComponents/StyledTextField";
import { initAutocomplete } from "../../../utils/googleMapUtils";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  maxWidth: "800px",
  margin: "auto",
}));
const CustomSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    height: "45px",
    fontSize: "14px",
    "& fieldset": {
      borderColor: theme.palette.text.secondary,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.text.secondary,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.text.secondary,
    },
  },
  "& .MuiSelect-select": {
    padding: "10px 14px",
    fontSize: "14px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "18px",
  },
}));
const ProfileSetup: React.FC = () => {
  const workerId = useSelector((state: any) => state.workerInfo.workerInfo);

  // console.log(workerId)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [experience, setExperience] = useState("");
  const [wageDay, setWageDay] = useState("");
  const [location, setLocation] = useState("");
  const [identityProof, setIdentityProof] = useState<File | null>(null);
  const [showIdentityProof, setShowIdentityProof] = useState<
    string | ArrayBuffer | null
  >(null);
  const [serviceList, setServiceList] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectRadius, setSelectRadius] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState<string>("");
  const searchInput = useRef<HTMLInputElement>(null);
  const [locationCoords, setLocationCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  // console.log("locationCoords:", locationCoords, "----", location);
  // console.log("------selectRadius:-----", selectRadius,);
  const dispatch = useDispatch();
  useEffect(() => {
    initAutocomplete(searchInput, setLocationCoords, setLocation);
  }, [searchInput]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getWorkerServices();
      console.log("--response---", response);
      setServiceList(response);
    } catch (error) {
      console.error("Error workerServices services:", error);
    }
  };
  // useEffect(() => {
  //   if (profilePic) {
  //     const objectUrl = URL.createObjectURL(profilePic);
  //     setProfilePicUrl(objectUrl);

  //     return () => URL.revokeObjectURL(objectUrl);
  //   } else {
  //     setProfilePicUrl(workerId?.profilePicture || "default-profile-pic.jpg");
  //   }
  // }, [profilePic, workerId?.profilePicture]);

  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logoutWorker();
      console.log(response);
      if (response?.status === 200) {
        dispatch(removeWorkerInfo());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIdentityProofChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setShowIdentityProof(reader.result);
      reader.readAsDataURL(file);
      setIdentityProof(file);
    }
  };
  // console.log("location--",location);

  const handleSubmit = async () => {
    if (
      !experience ||
      !wageDay ||
      !location ||
      !selectedService ||
      !identityProof ||
      !profilePic ||
      !selectRadius
    ) {
      toast.error(
        "Please fill all fields and upload both profile picture and identity proof"
      );
      return;
    }

    const formData = new FormData();
    formData.append("experience", experience);
    formData.append("wageDay", wageDay);
    formData.append("service", selectedService);
    formData.append("identityProof", identityProof!);
    formData.append("profilePic", profilePic);
    formData.append("workerId", workerId._id);
    formData.append("locationName", location);
    formData.append("workRadius", selectRadius.toString());
    if (locationCoords) {
      formData.append("location", JSON.stringify(locationCoords));
    }
    try {
      setLoading(true);
      const response = await setProfileData(formData);
      const workerInfo = {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        role: response.data.role,
        wallet: response.data.wallet,
        isBlocked: response.data.isBlocked,
        isProfileSetup: response.data.isProfileSetup,
        status: response.data.status,
        profilePicture: response.data.profilePicture,
        identityProof: response.data.identityProof,
        location: response.data.location,
        experience: response.data.experience,
        service: response.data.service,
        images: response.data.images,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
        workRadius: response.data.workRadius,
        wageDay: response.data.wageDay,
      };
      // console.log("--------resp:-------", response);

      dispatch(setWorkerInfo(workerInfo));
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  //assign radious
  const radiusOptions: number[] = [5, 10, 15, 20];
  return (
    <>
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <MuiBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Profile Submitted
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Please be patient. Verification is under processing.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{ mt: 3 }}
          >
            Logout
          </Button>
        </MuiBox>
      </Modal>

      {/* //--------------- */}
      <div className="p-4 md:p-8">
        <StyledBox>
          <Typography
            variant="h5"
            gutterBottom
            className="text-lg md:text-xl text-center text-custom_navyBlue mb-6"
          >
            Profile Setup
          </Typography>

          <div className="flex flex-col md:flex-row">
            {/* Left side - Images */}
            <div className="md:w-1/3 mb-6 md:mb-0 md:mr-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-6 justify-center">
                  <img
                    src={profilePicUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
                  />
                  <label htmlFor="profile-pic" className="text-sm">
                    Change
                    <IconButton
                      component="span"
                      className="absolute bottom-0 right-0"
                      color="primary"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <input
                    id="profile-pic"
                    type="file"
                    accept="image/*"
                    className="hidden "
                    onChange={handleProfilePicChange}
                  />
                </div>
              </div>
            </div>

            {/* Right side - Input fields */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                  <CustomTextField
                    label="Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                  <CustomTextField
                    label="Wage/Day"
                    type="number"
                    value={wageDay}
                    onChange={(e) => setWageDay(e.target.value)}
                    required
                  />
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                  <InputLabel className="">Service</InputLabel>
                  <CustomSelect
                    value={selectedService}
                    onChange={(e) =>
                      setSelectedService(e.target.value as string)
                    }
                    required
                    input={<OutlinedInput label="Service" />}
                  >
                    {serviceList.map((service: any, index) => (
                      <MenuItem key={index} value={service._id}>
                        {service.name as string}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                  <CustomTextField
                    label="Location"
                    ref={searchInput}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                  <InputLabel>Work Radius</InputLabel>
                  <CustomSelect
                    value={selectRadius}
                    onChange={(e) => setSelectRadius(e.target.value as number)}
                    required
                    input={<OutlinedInput label="Work Radius" />}
                  >
                    {radiusOptions.map((radius) => (
                      <MenuItem key={radius} value={radius}>
                        {radius} km
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </FormControl>
              </div>
              <div className="flex  flex-row  gap-2 ">
                {showIdentityProof && (
                  <img
                    src={showIdentityProof as string}
                    alt="Identity Proof"
                    className=" h-auto max-h-36 object-cover rounded border-2 border-gray-300 mb-4"
                  />
                )}
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: "gray",
                      color: "white",
                      "&:hover": { backgroundColor: "#003383" },
                    }}
                  >
                    Upload Identity Proof
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleIdentityProofChange}
                    />
                  </Button>
                </FormControl>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className="mt-6 w-full"
                size="large"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : undefined
                }
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </StyledBox>
      </div>
    </>
  );
};

export default ProfileSetup;
