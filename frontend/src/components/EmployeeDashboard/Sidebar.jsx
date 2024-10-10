import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { IoLogoCodepen, IoSettings } from 'react-icons/io5';
import { useAuth } from '../../context/authContext';

const Sidebar = () => {

  const{user} = useAuth()
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
    <div className='bg-gray-800 h-12 flex items-center justify-center'><IoLogoCodepen size={25} />
      <h3 className='text-0.5xl text-center font-contrail'> Employee Mangement System</h3>
      </div>
      <div className='px-4'>
        <NavLink 
          to="/employee-dashboard" 
          className={({ isActive }) => `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`}
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) => `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink 
          to="/employee-dashboard/setting"
          className={({ isActive }) => `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <IoSettings />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
