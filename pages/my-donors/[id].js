// pages/posts/[postId].js

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import DonorForm from '../../src/components/DonorForm'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Post() {
  
  const router = useRouter()
  const { id } = router.query
  const [donor, setDonor] = useState({})
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("2023-04-20");
  const [totalDonation, setTotalDonation] = useState(0);

 const handleFormSubmit = async (e) => {
  e.preventDefault();

  // get the JWT token from localStorage
  const token = localStorage.getItem('token');

  // create an object with the updated data
  const updatedDonor = {
    name: name,
    phone: phone,
    address: address,
    bloodGroup: bloodGroup,
    lastDonationDate: lastDonationDate,
    totalDonation: totalDonation
  };

  // send an update request to your server with the JWT token in the header
  try {
    const response = await fetch(`https://note-app-kawsar19.vercel.app/api/update-donor/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedDonor)
    });
    console.log(response)

    if (!response.ok) {
      throw new Error('Failed to update donor.');
    }
    
    toast("Donor Updated successfully", {
      onClose: () =>{ 
        setTimeout(function() {
          router.push("/my-donors")
        },3000);
       
        
      }
    });
    
    
    // update the donor state with the updated data
    
    

  } catch (error) {
    console.error(error);
  }
};


  
  

  const handleBack = () => {
    router.back()
  }
  
  useEffect(() => {
    async function fetchDonor() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`https://note-app-kawsar19.vercel.app/api/donors/${id}`, {
    headers,
  });
  const data = await response.json();
 
  setDonor(data);
  setName(data.name)
  setPhone(data.phone)
  setAddress(data.address)
  setBloodGroup(data.bloodGroup)
  
  setLastDonationDate(data.lastDonationDate)
  setTotalDonation(data.totalDonation)
  
  setLoading(false);
}

    fetchDonor()
  }, [])
  
  

  return (
    <div>
<ToastContainer />
          <form className="w-full  bg-white rounded-lg shadow-md p-6" onSubmit={handleFormSubmit}>
      <h1 className="text-2xl font-bold mb-6">Donor Form</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
        <input className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-0 "  id="name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
        <input className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-0" id="phone" type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
        <input className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-0" id="address" type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodGroup">Blood Group</label>
  <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-0" id="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
    <option value="" disabled>Select Blood Group</option>
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

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastDonationDate">Last Donation Date</label>
  <input
    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500  outline-0"
    id="lastDonationDate"
    type="date"
    placeholder="YYYY-MM-DD"
    value={lastDonationDate}
    onChange={(e) => setLastDonationDate(e.target.value)}
  />
</div>

        
        
<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalDonation">Total Donations</label>
<input className="w-full px-4 py-2 rounded-lg border  border-gray-300 focus:border-blue-500 outline-0" id="totalDonation" type="number" placeholder="Total Donations" value={totalDonation} onChange={(e) => setTotalDonation(parseInt(e.target.value))} />
</div>
<div className="flex justify-end">
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" type="submit">Submit</button>
</div>
</form>
      <button onClick={handleBack}>Back</button>
    </div>
  )
}

export default Post

