import React from 'react';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import { RiHome3Fill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from '../assets/FrameFlowLogoTransparentCropped.png';
import { categories } from '../utils/data';
import { GrLogout } from 'react-icons/gr'
import { googleLogout } from '@react-oauth/google';


const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-100 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-100 ease-in-out capitalize';

const Sidebar = ({user, closeToggle}) => {

  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false);
  }

  const navigate = useNavigate();


  async function handleLogout() {
    try {
      await googleLogout({ clientId: process.env.REACT_APP_GOOGLE_API_TOKEN });
      console.log('User signed out.');
      localStorage.clear();

      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
        <div className='flex flex-col'>
          <Link
          to="/"
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
          >
            <img src={logo} alt="logo" className='w-full' />
          </Link>
          <div className='flex flex-col gap-4'>
            <NavLink
            to="/"
            className={(isActive) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
            >
              <RiHome3Fill />
              Home
            </NavLink>
            <h3 className='mt-2 mb-1 px-5 text-base 2xl:text-xl'>Discover</h3>
            {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} alt="category" className="w-8 h-8 rounded-full shadow-sm" />
              {category.name}
            </NavLink>
          ))}
          </div>
          </div>
          {user && (
            <Link
            to={`user-profile/${user?._id}`}
            className="flex my-5 mb-4 gap-4 p-2 items-center bg-gray-50 rounded-lg shadow-lg mx-3"
            onClick={handleCloseSidebar}
            >
              <img src={user.image} className="w-10 h-10 rounded-full" alt='user-profile'/>
              <p>{user.userName}</p>
              <IoIosArrowForward />
            </Link>
          )}
              <button 
              onClick={handleLogout}
              className="flex mb-4 gap-4 p-2 items-center bg-gray-50 rounded-lg shadow-lg mx-3"
              >
                <GrLogout color='black' fontSize='22' className='ml-3'/>
                <p className='ml-1'>Logout</p>
              </button>
        </div>
  )
}

export default Sidebar
