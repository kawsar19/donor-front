import React, { useState } from "react";
import { FaHome, FaUserPlus, FaUserEdit, FaUser } from "react-icons/fa";
import { MdBloodtype  } from "react-icons/md";
import { CgProfile  } from "react-icons/cg";
import { BiDonateBlood  } from "react-icons/bi";
import { useRouter } from "next/router";
import DonorForm from './DonorForm';

const Botyombar = ({setOperationFlag}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility
  
  const [activePath, setActivePath] = useState(router.pathname); 

  const handleNavigation = (path) => {
    if (path === "/add-donor") {
      setIsModalOpen(true); // Open modal when "Add Donor" button is clicked
    } else {
      router.push(path);
    }
    
    setActivePath(path); 
    
  };

  return (
    <>
      <nav className="h-14 fixed bottom-0 left-0 right-0 w-full bg-gray-900 flex justify-around items-center bg-amber-100">
        <button
          onClick={() => handleNavigation("/my-donors")}
          className="flex flex-col items-center"
          title="Home"
        >
          <FaHome className={`text-2xl ${
            activePath === "/my-donors" ? "text-yellow-400" : "text-white"
          }`} />
          
          
        </button>
        <button
          onClick={() => handleNavigation("/add-donor")}
          className="flex flex-col items-center"
          title="Add Donor"
        >
          <MdBloodtype className={`text-3xl ${
            activePath === "/add-donor" ? "text-yellow-400" : "text-white"
          }`} />
          
        </button>
        <button
          onClick={() => handleNavigation("/blood-requests")}
          className="flex flex-col items-center"
          title="Request Blood Profile"
        >
          <BiDonateBlood className={`text-3xl ${
            activePath === "/blood-requests" ? "text-yellow-400" : "text-white"
          }`} />
          
        </button>
        <button
          onClick={() => handleNavigation("/my-profile")}
          className="flex flex-col items-center"
          title="Request Blood Profile"
        >
          <FaUser className={`text-2xl ${
            activePath === "/my-profile" ? "text-yellow-400" : "text-white"
          }`} />
          
        </button>
      </nav>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-500 z-50"
          onClick={() => setIsModalOpen(false)} // Close modal when clicking outside the modal
        >
          <div
            className="bg-white p-4 rounded-md transition-all duration-300 w-4/5 "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Add Donor Modal</h2>
            
            <DonorForm setOperationFlag={setOperationFlag} setIsModalOpen={setIsModalOpen}/>
            <p>Modal content goes here...</p>
            <button
              className="bg-gray-500 text-white px-4 py-2 mt-4 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Botyombar;
