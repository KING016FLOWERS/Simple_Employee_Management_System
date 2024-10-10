import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { IoLogoCodepen } from 'react-icons/io5';

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className='bg-gray-800 h-12 flex items-center justify-center'><IoLogoCodepen size={25} />
        <h3 className='text-0.5xl text-center font-contrail'> Employee Mangement System</h3>
      </div>
      <div className='px-4'>
        <NavLink 
          to="/admin-dashboard" 
          className={({ isActive }) => `${isActive ? 'bg-orange-500' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`}
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/employees"
          className={({ isActive }) => `${isActive ? 'bg-orange-500' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/departments"
          className={({ isActive }) => `${isActive ? 'bg-orange-500' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded`}
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>




      </div>
    </div>
  );
};

export default AdminSidebar;
