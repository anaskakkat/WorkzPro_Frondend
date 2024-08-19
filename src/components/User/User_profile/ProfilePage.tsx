import React, { useState } from 'react';
import Sidebar from '../Profile/Sidebar';
import Profile from '../Profile/Profile';
import Bookings from '../bookings/Bookings';

const ProfilePage: React.FC = () => {
  const [activePage, setActivePage] = useState('profile');

  return (
    <div className="flex h-screen">
      <Sidebar setActivePage={setActivePage} />
      <div className="flex-1 p-5">
        {activePage === 'profile' && <Profile />}
        {activePage === 'bookings' && <Bookings />}
      </div>
    </div>
  );
};

export default ProfilePage;
