import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { fetchWorker, updateWorkerProfile } from "../../../api/worker";
import { useWorkerId } from "../../../redux/hooks/userSelectors";
import Loader from "../../Loader/Loader";
import CircularProgress from "@mui/material/CircularProgress";

import {
  validateName,
  validatePhoneNumber,
} from "../../../utils/profileValidation";
import toast from "react-hot-toast";

interface Worker {
  name: string;
  email: string;
  profilePicture: string;
  phoneNumber: string;
  service: {
    name: string;
  };
}

const ProfileWorker = () => {
  const workerId = useWorkerId();
  const [profile, setProfile] = useState<Worker | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [tempProfile, setTempProfile] = useState<Worker | null>(null);
  const [isSaving, setIsSaving] = useState(false); // New state for tracking save operation

  useEffect(() => {
    handleFetchWorker();
  }, [workerId]);

  const handleFetchWorker = async () => {
    try {
      const response = await fetchWorker(workerId);
      if (response.status === 200) {
        setProfile(response.worker);
      } else {
        console.error("Failed to fetch worker data");
      }
    } catch (error) {
      console.error("Error fetching worker data:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (tempProfile) {
      setTempProfile((prevProfile) => ({
        ...prevProfile!,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProfilePicture(file);
      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setTempProfile((prevProfile) => ({
        ...prevProfile!,
        profilePicture: imageUrl,
      }));
      console.log("New profile picture selected:", file.name);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Exiting edit mode, discard changes
      setTempProfile(null);
      setNewProfilePicture(null);
    } else {
      // Entering edit mode, create a copy of the current profile
      setTempProfile({ ...profile! });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (tempProfile) {
      if (!validateName(tempProfile.name)) {
        toast.error(
          "Invalid name. Please enter a valid name without empty spaces."
        );
        return;
      }

      if (!validatePhoneNumber(tempProfile.phoneNumber)) {
        toast.error(
          "Invalid phone number. Please enter a 10-digit phone number."
        );
        return;
      }

      const formData = new FormData();
      formData.append("name", tempProfile.name);
      formData.append("phoneNumber", tempProfile.phoneNumber);

      if (newProfilePicture) {
        formData.append(
          "profilePic",
          newProfilePicture,
          newProfilePicture.name
        );
      } else {
        console.log("No new profile picture to upload");
      }
      setIsSaving(true);
      try {
        const response = await updateWorkerProfile(workerId, formData);
        console.log("API Response:", response);

        if (response && response.status === 200) {
          console.log("Profile updated:", response);
          toast.success("Profile updated successfully!");
          setIsEditing(false);
          setNewProfilePicture(null);
          setProfile(tempProfile);
          setTempProfile(null);
          handleFetchWorker();
        } else {
          toast.error("Failed to update profile. Please try again.");
        }
      } catch (error) {
        toast.error("Failed to update profile. Please try again.");
        console.error("Error updating profile:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (!profile) {
    return <Loader />;
  }

  const displayProfile = isEditing ? tempProfile : profile;

  return (
    <div className="border border-blue-300 w-1/2 container p-3 ">
      <div className="w-full justify-center">
        <div className="flex text-blue-800 justify-end">
          <button onClick={toggleEdit}>
            {isEditing ? "Cancel" : <EditIcon />}
          </button>
        </div>
        <div className="flex flex-col items-center gap-2 ">
          <div className="relative ">
            <img
              src={displayProfile?.profilePicture}
              alt="Profile"
              width="120"
              height="120"
              className="rounded-full border-2 border-blue-400"
            />
            {isEditing && (
              <label
                className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-1 cursor-pointer text-blue-600"
                htmlFor="profileImage"
              >
                <EditIcon fontSize="small" />
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                />
              </label>
            )}
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={tempProfile?.name}
                onChange={handleChange}
                className="mt-2 p-1 border rounded"
              />
              <input
                type="text"
                name="phoneNumber"
                value={tempProfile?.phoneNumber}
                onChange={handleChange}
                className="mt-2 p-1 border rounded"
              />
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="mt-3 bg-blue-500 text-white p-2 rounded flex items-center"
              >
                {isSaving ? <CircularProgress size={24} /> : "Save"}
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-custom_navyBlue capitalize">
                {displayProfile?.name}
              </h2>
              <p className="font-medium">{displayProfile?.email}</p>
              <p className="font-medium">{displayProfile?.phoneNumber}</p>
              <p className="font-medium">{displayProfile?.service.name}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileWorker;
