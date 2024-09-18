import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useUserDeatils } from "../../../redux/hooks/userSelectors";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useUserDeatils();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(user.userName);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleEditClick = () => setIsEditMode(!isEditMode);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      toast.success("Please select a valid image file.");
    }
  };

  const handleSaveClick = () => {
    console.log("Saved Name:", editedName);
    console.log("Selected File:", selectedFile);
    try {
      // const response=await editprofile()
      
    } catch (error) {
      console.log(error);
      
      
    }

    setIsEditMode(false);
  };

  return (
    <div className="container mx-auto p-8 w-96 my-28 md:mx-8 md:my-4 border border-blue-400 rounded-xl  h-[calc(100vh-6rem)]">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : user.profilePicture
            }
            alt="Profile"
            className="h-28 w-28 rounded-full border-4 border-blue-400 object-cover"
          />
          {isEditMode && (
            <button
              className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-300"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <FaEdit className="text-blue-500" />
            </button>
          )}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="text-center mt-4">
        {isEditMode ? (
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            className="text-lg mb-2 border-b border-gray-300 focus:outline-none"
          />
        ) : (
          <p className="text-lg mb-2">{user.userName}</p>
        )}
        <p className="text-lg mb-2">{user.email}</p>
        <p className="text-lg mb-4">{user.phoneNumber}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center">
        {!isEditMode ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleEditClick}
          >
            Edit
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleSaveClick}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
