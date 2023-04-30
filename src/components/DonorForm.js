import React, { useState } from "react";
import axios from 'axios'; 
const DonorForm = ({setIsModalOpen,setOperationFlag}) => {
  
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [totalDonation, setTotalDonation] = useState(0);

  const handleFormSubmit = (e) => {
  e.preventDefault();
  // Use the form values for further processing or API calls
  console.log("Form submitted!");
  console.log("Name:", name);
  console.log("Phone:", phone);
  console.log("Address:", address);
  console.log("Blood Group:", bloodGroup);
  console.log("Last Donation Date:", lastDonationDate);
  console.log("Total Donation:", totalDonation);

  // Retrieve token from localStorage
  const token = localStorage.getItem('token');

  // Make API call with Axios
  axios.post('https://note-app-kawsar19.vercel.app/api/add-donor', {
    // Include data in the request body
    name,
    phone,
    address,
    bloodGroup,
    lastDonationDate,
    totalDonation
  }, {
    // Include token in the request headers
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    // Handle API response
    console.log('API call success:', response.data);
    // Further processing or update state as needed
setIsModalOpen(false)
setOperationFlag(true)
  })
  .catch(error => {
    // Handle API error
    console.error('API call error:', error);
    // Further error handling or show error to user
  });
};


  return (
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
);
};

export default DonorForm;
        
