import React, { useState, useEffect} from "react";
import { Box, TextField, Button, Typography, IconButton, MenuItem, Select, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { toast } from "react-hot-toast";
import { workerServices } from "../../../api/worker";
import axios from "axios";


const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  maxWidth: "800px",
  margin: "auto",
}));
const ProfileSetup: React.FC = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [experience, setExperience] = useState("");
  const [wageDay, setWageDay] = useState("");
  const [location, setLocation] = useState("");
  const [identityProof, setIdentityProof] = useState<File | null>(null);
  const [showIdentityProof, setShowIdentityProof] = useState<string | ArrayBuffer | null>(null);
  const [serviceList, setServiceList] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await workerServices();
        // console.log("response:", response);
        setServiceList(response);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleIdentityProofChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setShowIdentityProof(reader.result);
      reader.readAsDataURL(file);
      setIdentityProof(file);
    }
  };

  const updateWorkerProfile = async (profileData: FormData) => {
    try {
      const response = await  profileData()
// if(response){
// }
    } catch (error) {
      console.error("Error updating worker profile:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!experience || !wageDay || !location || !selectedService || !identityProof || !profilePic) {
      toast.error("Please fill all fields and upload both profile picture and identity proof");
      return;
    }

    const formData = new FormData();
    formData.append("experience", experience);
    formData.append("wageDay", wageDay);
    formData.append("location", location);
    formData.append("service", selectedService);
    
    if (identityProof) {
      formData.append("identityProof", identityProof);
    }

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const result = await updateWorkerProfile(formData);
      console.log("Profile updated successfully:", result);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <StyledBox>
        <Typography variant="h5" gutterBottom className="text-lg md:text-xl text-center text-custom_navyBlue">
          Profile Setup
        </Typography>

        <div className="flex items-center mb-4 justify-center">
          <div className="relative">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : "default-profile-pic.jpg"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
            />
            <label htmlFor="profile-pic" className="text-sm">
              Change
              <IconButton component="span" className="absolute bottom-0 right-0" color="primary">
                <PhotoCamera />
              </IconButton>
            </label>
            <input
              id="profile-pic"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
          <FormControl fullWidth margin="normal">
            <TextField
              label="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              sx={{
                fontSize: "1rem",
                "& .MuiInputBase-input": { padding: "12px" },
              }}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Wage/Day"
              type="number"
              value={wageDay}
              onChange={(e) => setWageDay(e.target.value)}
              required
              sx={{
                fontSize: "1rem",
                "& .MuiInputBase-input": { padding: "12px" },
              }}
            />
          </FormControl>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormControl fullWidth margin="normal">
            <InputLabel>Service</InputLabel>
            <Select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value as string)}
              required
              sx={{
                fontSize: "1rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #d1d5db",
                },
                "& .MuiSelect-select": {
                  padding: "12px",
                },
              }}
              input={<OutlinedInput label="Service" />}
            >
              {serviceList.map((service: any, index) => (
                <MenuItem key={index} value={service._id}>
                  {service.name as string}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              sx={{
                fontSize: "1rem",
                "& .MuiInputBase-input": { padding: "12px" },
              }}
            />
          </FormControl>
        </div>

        <div className="flex items-center gap-4 mb-4">
          {showIdentityProof && (
            <img
              src={showIdentityProof as string}
              alt="Identity Proof"
              className="w-auto h-36 object-cover rounded border-2 border-gray-300"
            />
          )}
          <FormControl fullWidth margin="normal">
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
        >
          Update
        </Button>
      </StyledBox>
    </div>
  );
};

export default ProfileSetup;