import { useState } from "react";
import { ToastContainer, toast } from
 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useRouter } from 'next/router';
  import { Oval } from  'react-loader-spinner'
  import { AiFillEye ,AiFillEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
    const [isLoading, setIsLoading] = useState(false) 
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!formData.email || !formData.password) {
  toast.error('Please fill all fields');
  setIsLoading(false);
  return;
}

    try {
      // Call login API endpoint
      const response = await axios.post("https://note-app-kawsar19.vercel.app/api/login-volunteer", formData);
      // Extract token from API response
      const { token ,user} = response.data;
      // Set token as default Authorization header for Axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Perform additional logic for successful login, e.g., redirect to dashboard
localStorage.setItem("token", token);
localStorage.setItem('isAuthenticated',true);
localStorage.setItem('user', JSON.stringify(user));

toast.success('Login successful');
      setFormData({
        email:"",
        password:""
      })
      
      router.push('/my-donors');
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
      toast.error('Login Failed');
     
    }finally {
      setIsLoading(false); // Set loading state to false after API call is completed
    }
  };
const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  };
  return (
    <div className="flex justify-center items-center h-screen">
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
        <h1 className="text-2xl font-semibold mb-6 text-red-400">ভলান্টিয়ার লগইন</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email" className="block font-medium mb-2">
              ইমেইল
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md outline-0  focus:border-blue-500 transition duration-300"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
<div className="mb-2">
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



          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
          >
            লগইন করুন
          </button>
          
          <div className="text-center mt-4">
  <p className="text-gray-600">একাউন্ট নেই? 
    <Link href="/registration">
      <span className="text-red-500 hover:text-red-700"> নিবন্ধন করুন </span>
    </Link>
  </p>
</div>


          
          
          <div className="bg-gray-100 mt-5 p-4 rounded-md shadow-md">
  <h1 className="text-lg font-semibold mb-4">Demo Account</h1>
  <p className="mb-2">
    Email: <span className="font-semibold">volunteer@gmail.com</span>
  </p>
  <p className="mb-2">
    Password: <span className="font-semibold">12345</span>
  </p>
</div>

        </form>
      </div>
    </div>
  );
};

export default Login;
