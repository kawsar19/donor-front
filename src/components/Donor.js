import React from 'react';
import { MdDelete ,MdEdit} from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Donor = ({item,engToBengaliNumbers, onDelete, onEdit,copyUserData}) => {
  const router = useRouter();
  
  
  return (
        <tr key={item.id}>
          <td>
            <div>
              {item.name}
            </div>
          </td>
          <td>
            <div>
<a href={`tel:${item.phone}`}>{item.phone}</a>
            </div>
          </td>
          <td>
            <div>
              {item.address}
            </div>
          </td>
          <td>
            <div>
              {item.bloodGroup}
            </div>
          </td>
          <td>
            <div>
              {new Date(item.lastDonationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          </td>

          <td>
            <div>
                       { engToBengaliNumbers(item.daysAfterDonation)} দিন
              
            </div>
          </td>
          
                    <td>
            <div>
           { engToBengaliNumbers(item.totalDonation)} বার
              
            </div>
          </td>
                    <td>
<div className="flex gap-2">
<MdEdit
            onClick={()=>onEdit(item._id)} // Call the handleEdit function when the edit icon is clicked
            style={{ cursor: 'pointer' }} // Add cursor style to indicate it's clickable
            className="text-blue-500 hover:text-blue-600" // Add Tailwind CSS classes for text color and hover effect
          />
          {/* Render the MdDelete icon */}
          <MdDelete
            onClick={() => onDelete(item._id)} // Call the onDelete function with the id when the icon is clicked
            style={{ cursor: 'pointer' }} // Add cursor style to indicate it's clickable
            className="text-red-500 hover:text-red-600" // Add Tailwind CSS classes for text color and hover effect
          />
          
        </div>
          </td>

        </tr>
  );
};

export default Donor;
