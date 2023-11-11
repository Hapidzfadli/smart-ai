import React from 'react';
import { AiTwotoneHome, AiOutlineAppstore, AiOutlineDollarCircle, AiOutlineShopping, AiOutlineBarChart } from "react-icons/ai";
import { HiCubeTransparent } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
function Navbar() {
  return (
    <nav className="p-4 rounded-md" style={{backgroundColor: '#fff'}}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className=" text-xl font-semibold">Smart Store</div>
          <ul className="flex space-x-5 text-md">
            <li className=''>
                <a href="/" rel='noreferrer' className='flex items-center transition duration-50 hover:scale-105'>Home</a>
            </li>
            <li>
                <a href="/" rel='noreferrer' className='flex items-center transition duration-50 hover:scale-105'>About Us</a>
            </li>
            <li>
            <a href="/" rel='noreferrer' className='flex items-center transition duration-50 hover:scale-105'>Dashboard</a>
            </li>
            <li>
            <a href="/" rel='noreferrer' className='flex items-center transition duration-50 hover:scale-105'>Generate AI</a>
            </li>
          </ul>
          <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center">
            Try it now <span className='ml-2'> <BsArrowRight></BsArrowRight></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
