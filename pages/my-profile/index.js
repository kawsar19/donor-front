import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import Botyombar from '../../src/components/Botyombar';

const MyProfile = () => {
  const [email, setEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // If the token is present, decode it to get the user information
    if (token) {
      const decodedToken = jwt.decode(token);
      setEmail(decodedToken.email);
    } else {
      // Redirect the user to the login page if token is not present
      router.push('/login');
    }
  }, []);

  // Function to log out the user
  const handleLogout = () => {
    localStorage.removeItem('token');
    setEmail(null);
    router.push('/login');
  };

  return (
    <div className="">
      <h1 className="text-2xl text-center mt-10 font-bold text-gray-800 ">এই পেজের কাজ চলছে</h1>

      {/* Display the user information */}
      {email && (
        <div>
          <p>Email: {email}</p>
        </div>
      )}

      {/* Add a logout button */}
      {email && (
        <button onClick={handleLogout}>Logout</button>
      )}

      <Botyombar />
    </div>
  );
};

export default MyProfile;
