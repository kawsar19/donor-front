import React, { useState } from 'react';
import { ToastContainer, toast } from
 'react-toastify';
 import { useRouter } from 'next/router';
  import 'react-toastify/dist/ReactToastify.css';
  import { Oval } from  'react-loader-spinner'
  import Link from 'next/link';
  import { AiFillEye ,AiFillEyeInvisible } from 'react-icons/ai';
  
const Register = () => {
  
 const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodGroup: '',
    contactNumber: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if ( !email || !password || !bloodGroup || !contactNumber || !address) {
    toast.error('দয়া করে সবগুলো ইনপুট ফিল্ড পূরণ করুন');
    return;
  }
    setIsLoading(true);
    

    try {
      // Make a POST request with the form data
      const response = await fetch('https://note-app-kawsar19.vercel.app/api/register-volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
       
        // Handle successful registration
        toast.success('অভিনন্দন! সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে');
        
        setFormData({
          name: '',
          email: '',
          password: '',
          bloodGroup: '',
          contactNumber: '',
          address: ''
        });
        
        router.push('/login');
      } else {
        // Handle registration error
        toast.error('Registration failed');
      }
    } catch (error) {
      toast.error('Registration failed');
      
    }
    finally {
      setIsLoading(false); // Set loading state to false after API call is completed
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center">
    {isLoading && 
<div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center h-screen z-50">
  <div className="z-10 relative">
<Oval
  height={80}
  width={80}
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
  </div>
</div>

}
    <ToastContainer />
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-6 text-red-400">ভলান্টিয়ার রেজিস্ট্রেশন </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="block font-medium mb-2">
             নাম
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 outline-0 rounded-md focus:border-blue-500 transition duration-300"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          
            <div className="mb-3">
            <label htmlFor="email" className="block font-medium mb-2">
              ইমেইল
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 outline-0 rounded-md focus:border-blue-500 transition duration-300"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block font-medium mb-2">
              পাসওয়ার্ড
            </label>
<div className="relative ">
    <input
      type={isPasswordVisible ? "text" : "password"}
      id="password"
      className="w-full p-2 border border-gray-300 rounded-md outline-0  focus:border-blue-500 transition duration-300"
      name="password"
      value={formData.password}
      onChange={handleChange}
    />
    <button
      type="button"
      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
    >
      {isPasswordVisible ? (
        <AiFillEyeInvisible className="w-5 h-5 text-gray-500" />
      ) : (
        <AiFillEye className="w-5 h-5 text-gray-500" />
      )}
    </button>
  </div>
          </div>
          <div className="mb-3">
            <label htmlFor="bloodGroup" className="block font-medium mb-2">
             রক্তের গ্রুপ
            </label>
            <select
              id="bloodGroup"
              className="w-full p-2 border border-gray-300 outline-0 rounded-md focus:border-blue-500 transition duration-300"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="">গ্রুপ সিলেক্ট করুন</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="contactNumber" className="block font-medium mb-2">
              ফোন নাম্বার
            </label>
            <input
              type="text"
              id="contactNumber"
              className="w-full p-2 border border-gray-300 outline-0 rounded-md focus:border-blue-500 transition duration-300"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          
          {/* Address */}
          <div className="mb-3">
            <label htmlFor="address" className="block font-medium mb-2">
              ঠিকানা
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border border-gray-300 outline-0 rounded-md focus:border-blue-500 transition duration-300 "
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder=""
            />
          </div>
          

          {/* State */}

          <button
            type="submit"
            className="bg-red-500 w-full text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
           রেজিস্ট্রেশন
          </button> 
                    <div className="text-center mt-4">
  <p className="text-gray-600">একাউন্ট 
    আছে? 
    <Link href="/login">
      <span className="text-red-500 hover:text-red-700"> লগইন করুন </span>
    </Link>
  </p>
</div>
        </form>
      </div>
    </div>
  );
};

export default Register;

