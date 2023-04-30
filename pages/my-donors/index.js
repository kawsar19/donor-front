  import React, { useEffect, useState } from 'react';
  import { Oval } from  'react-loader-spinner'
import axios from 'axios';
import Link from 'next/link';
import { FaSearch } from "react-icons/fa";
import Donor from '../../src/components/Donor';
import Botyombar from '../../src/components/Botyombar';
import GeneratePdf from '../../src/components/GeneratePdf';


import { useRouter } from 'next/router'
import FileSaver from 'file-saver';
var XLSX = require("xlsx");

const Index = () => {
  
  const router = useRouter()
  const [data, setData] = useState([]);
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  // Function to handle blood group filter change
  const handleBloodGroupFilterChange = (e) => {
    setBloodGroupFilter(e.target.value);
  }
  
  
  const filteredDonors = data.filter(item => {
  // If bloodGroupFilter is empty and searchFilter is empty, show all donors
  if (!bloodGroupFilter && !searchFilter) return true;

  // Filter donors based on blood group and search query
  const itemBloodGroup = item.bloodGroup.toLowerCase();
  const itemName = item.name.toLowerCase();
  const itemAddress = item.address.toLowerCase();
  const searchFilterLower = searchFilter.toLowerCase();

  // Check if blood group matches and name or address includes search query
  if (bloodGroupFilter && searchFilter) {
    return itemBloodGroup === bloodGroupFilter && (itemName.includes(searchFilterLower) || itemAddress.includes(searchFilterLower));
  } 
  
  // Check if only blood group matches
  else if (bloodGroupFilter) {
    return itemBloodGroup === bloodGroupFilter.toLowerCase();
  } 
  // Check if only search query is present and name or address includes search query
  else if (searchFilter) {
    return itemName.includes(searchFilterLower) || itemAddress.includes(searchFilterLower);
  } 
  // If none of the above conditions match, return false
  else {
    return false;
  }
});


  const handleSearchFilterChange = (e) => {
    setSearchFilter(e.target.value);
  }
  console.log(filteredDonors.length)
  
  const engToBengaliNumbers = (number) => {
  const numMapping = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  }

  return number.toString().replace(/\d/g, match => numMapping[match])
}
  // Use state to store the authentication status and fetched data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [operationFlag, setOperationFlag] = useState(false);
  
  // Use useEffect to check for authentication status and fetch data on the client-side
  useEffect(() => {
    // Check if window is defined (indicating client-side rendering)
    const isClient = typeof window !== 'undefined';

    // Get the user's authentication status from local storage, if available
    const storedIsAuthenticated = isClient && localStorage.getItem('isAuthenticated') === 'true';

    // Update the state with the authentication status
    setIsAuthenticated(storedIsAuthenticated);

    // Get the token from local storage
    const token = isClient && localStorage.getItem('token');

    // Set the default Authorization header with the token
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Fetch data from the API
    axios.get('https://note-app-kawsar19.vercel.app/api/all-donors')
      .then(response => {
        // Handle successful response
        setData(response.data);
              setIsLoading(false); 
        // Update state or do other operations with the fetched data
      })
      .catch(error => {
        // Handle error
        console.error(error);
              setIsLoading(false); 
      })

      ;
  }, [operationFlag]);

  // Render the component content conditionally based on authentication status and fetched data

const handleEdit = (donorId) => {
 
  router.push(`/my-donors/${donorId}`)
  
}
const handleCancel = () => {
    setShowForm(false);
  }
const handleDelete = (donorId) => {
  const token = localStorage.getItem('token');
  if (confirm("Are you sure you want to delete this donor?")) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Make the API call to delete the donor with the donorId parameter
    axios.delete(`https://note-app-kawsar19.vercel.app/api/delete-donor/${donorId}`)
      .then(response => {
        // Handle successful response
        console.log('Donor deleted successfully');
        setOperationFlag(!operationFlag);
      })
      .catch(error => {
        // Handle error response
        console.error('Failed to delete donor', error);
      });
  }
  }
    // Call your API here to delete the row with the given id
const handleFormSubmit = (formValues) => {
    // Handle form submission logic
    console.log("Form values submitted:", formValues);
  };

  // Function to handle cancel button click
  const downloadFile = () => {
  // Create a new Workbook object
  const workbook = XLSX.utils.book_new();

  // Convert the data variable to an array of arrays, where each sub-array represents a row in the Excel sheet
  const rows = data.map((item) => [item.name, item.age, item.email]);

  // Add the data to a new worksheet in the Workbook object
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  // Use the write() function to generate the XLSX file
  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Use the saveAs() function from the FileSaver library to save the buffer as a file named data.xlsx
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  FileSaver.saveAs(blob, 'data.xlsx');
};


const convertToCsv = (data) => {
  // Extract the keys from the first object in the data array
  const keys = Object.keys(data[0]);

  // Create a header row for the CSV file
  const header = keys.join(',');

  // Create an array of data rows for the CSV file
  const rows = data.map((item) => {
    return keys.map((key) => item[key]).join(',');
  });

  // Combine the header row and data rows into a single string
  return [header, ...rows].join('\n');
};



  
  return (
    <div className="">
      {isAuthenticated ? (
        <>
            {isLoading && 
<div className="fixed inset-0 bg-white flex items-center justify-center h-screen">
  <div className="z-50 relative" style={{zIndex: 1000 }}>
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
<button onClick={downloadFile}>Download</button>
<GeneratePdf data={data}/>

          <h1 className="text-2xl font-bold mb-4">রক্তদতাদের তালিকা</h1>
          <p className="text-lg text-gray-600">সর্বমোট {engToBengaliNumbers(filteredDonors.length) } জন রক্তদাতার তথ্য দেখানো হচ্ছে</p>
<div>

      <>
<div className="sticky flex justify-between items-center  top-0 bg-white  p-4 px-0 z-40">
  <label>
    গ্রুপের মাধ্যমে ফিল্টার করুন:
    <select
      value={bloodGroupFilter}
      onChange={handleBloodGroupFilterChange}
      className="ml-2"
    >
      <option value="">All</option>
      <option value="A+">A+</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B-">B-</option>
      <option value="O+">O+</option>
      <option value="O-">O-</option>
      <option value="AB+">AB+</option>
      <option value="AB-">AB-</option>
    </select>
  </label>

  <label className="relative flex items-center px-2">
    <input
      type="text"
      value={searchFilter}
      onChange={handleSearchFilterChange}
      className="w-full py-2 pl-8 pr-3 text-gray-700 bg-white border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
      placeholder="নাম অথবা লোকেশন লিখে সার্চ দিন"
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FaSearch className="w-5 h-5 text-gray-400" />
    </div>
  </label>
</div>

  <table className="styled-table mb-20">
    <thead>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Blood Group</th>
        <th>Last Donation Date</th>
                <th>Days After Donation</th>
        <th>Total Donation</th>

       
      </tr>
    </thead>
    <tbody>
      {filteredDonors.reverse().map(item => (
<Donor
  key={item._id} // Add the "key" prop with a unique identifier, such as "item.id"
  item={item}
  engToBengaliNumbers={engToBengaliNumbers}
  onDelete={handleDelete}
  onEdit={handleEdit}
  
/>

      ))}
    </tbody>
  </table>
  
     {/* Render your home page content */}
      <Botyombar setOperationFlag={setOperationFlag} /> {/* Render the BottomBar component */}
  </>
       
</div>

<div>
   
    </div>


        </>
      ) : (
        <>
          <p className="text-lg text-gray-600 mb-4">Please log in to view the content.</p>
          <Link href="/login">
            <span className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              Go to Login
            </span>
          </Link>
        </>
      )}
    </div>
  );
};

export default Index;
