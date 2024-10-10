import React from 'react';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className='flex items-center text-white justify-between h-12 bg-orange-600 px-4'>
      <p className='flex-grow text-center'>Welcome {user.name}</p>
      <button className='px-4 py-1 bg-purple-800 hover:bg-red-900 rounded text-white transition duration-200'
      onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
