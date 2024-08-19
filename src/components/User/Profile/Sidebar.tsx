import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: 'Profile', path: '/profile', icon: <FaUser className="w-5 h-5" /> },
  { name: 'Bookings', path: '/bookings', icon: <FaCalendarAlt className="w-5 h-5" /> },
];

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const location = useLocation();

  return (
    <div className={`top-0 left-0 h-full w-64 bg-blue-950 text-white p-5 transition-transform duration-300 ease-in-out md:translate-x-0`}>
      <div className="flex flex-col h-full">
        <nav className="flex-grow">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-lg hover:bg-custom_lightBlue hover:text-black ${
                    location.pathname === item.path ? 'bg-custom_buttonColor' : ''
                  }`}
                  onClick={() => setActivePage(item.name.toLowerCase())}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
