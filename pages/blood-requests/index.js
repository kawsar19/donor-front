import Botyombar from '../../src/components/Botyombar';
import { useState, useEffect } from 'react';

const BloodRequest = () => {
  // Set initial state
  const [showForm, setShowForm] = useState(false);
  const [tableData, setTableData] = useState([]);

  // Fetch data from API and update state
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://note-app-kawsar19.vercel.app/api/all-requests');
      const data = await response.json();
      setTableData(data);
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    bloodAmount: '',
    donationDate: '',
    donationTime: '',
    donationLocation: '',
    contactInfo: '',
    managed: false,
    note: ''
    
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setTableData([...tableData, formData]);
    console.log(formData)
    setShowForm(false);
    setFormData({ name: '', bloodType: '', contact: '' });
  };
  const handleCancel = (event) => {
    setShowForm(false);
    setFormData({ name: '', bloodType: '', contact: '' });
  };

  return (
    <div className="">
      <h1 className="text-2xl text-center mt-10 font-bold text-gray-800">
        {' '}
        এই পেজের কাজ চলছে
      </h1>

      {showForm ? (
        // Show form
<form onSubmit={handleSubmit} class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="patientName">
        রোগীর নাম
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
             id="patientName" 
             name="patientName" 
             type="text" 
             value={formData.patientName}
             onChange={(event) =>
               setFormData({ ...formData, patientName: event.target.value })
             }
             placeholder="রোগীর নাম লিখুন" />
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="bloodGroup">
        Blood Type
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
             id="bloodGroup" 
             name="bloodGroup" 
             type="text" 
             value={formData.bloodGroup}
             onChange={(event) =>
               setFormData({ ...formData, bloodGroup: event.target.value })
             }
             placeholder="রক্তের গ্রুপ লিখুন" />
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="bloodAmount">
        রক্তের পরিমাণ
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
             id="bloodAmount" 
             name="bloodAmount" 
             type="text" 
             value={formData.bloodAmount}
             onChange={(event) =>
               setFormData({ ...formData, bloodAmount: event.target.value })
             }
             placeholder="রক্তের পরিমাণ" />
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="donationDate">
        রক্ত কবে লাগবে
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
             id="donationDate" 
             name="donationDate" 
             type="text" 
             value={formData.donationDate}
             onChange={(event) =>
               setFormData({ ...formData, donationDate: event.target.value })
             }
             placeholder="তারিখ" />
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="donationTime">
        কখন লাগবে
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
             id="donationTime" 
             name="donationTime" 
             type="text" 
             value={formData.donationTime}
             onChange={(event) =>
               setFormData({ ...formData, donationTime: event.target.value })
             }
             placeholder="সময়" />
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="contact">
        যোগাযোগ
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
             id="contact" 
             name="contact" 
             type="text" 
             value={formData.contactInfo}
             onChange={(event) =>
               setFormData({ ...formData, contactInfo: event.target.value })
             }
             placeholder="রোগীর সাথে যোগাযোগের নাম্বার" />
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
    <button type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </div>
  </div>
</form>

      ) : (
        // Show table
        <div class="request-table">
          <button onClick={() => setShowForm(true)}>Add</button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood Type</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index}>
                  <td>{data.patientName}</td>
                  <td>{data.bloodGroup}</td>
                  <td>{data.bloodAmount}</td>
                  <td>{data.donationDate}</td>
                  <td>{data.donationTime}</td>
                  <td>{data.donationLocation}</td>
                  <td>{data.contactInfo}</td>
                  <td>{data.note}</td>
                  <td>{data.addedBy}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Botyombar />
    </div>
  );
};

export default BloodRequest;


