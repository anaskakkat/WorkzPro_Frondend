import React from "react";

const ProfileSetupModal: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold">Profile Setup Required</h2>
        <p className="mt-2">Please complete your profile setup.....................</p>
      </div>
    </div>
  );
};

export default ProfileSetupModal;
