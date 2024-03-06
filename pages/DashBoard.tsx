import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DashboardPage: React.FC = () => {
  const [userFirstName, setUserFirstName] = useState('');
  const router = useRouter();

  const handleCreateResume = () => {
    router.push('/CreateResumePage');
  };

  useEffect(() => {
    const fetchUserDataFromDatabase = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        console.log("User ID:", userId);
        if (!userId) {
          throw new Error('User ID not found in session storage');
        }
  
        const fetchFirstName = router.query.userIdOnly !== 'true';
        const response = await axios.get(`/api/getUserData?userId=${userId}`);
        const userData = response.data;
        console.log("User Data:", userData);
  
        if (fetchFirstName) {
          const firstName = userData.firstName;
          console.log("User First Name:", firstName);
          setUserFirstName(firstName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserDataFromDatabase();
  }, [router.query.userIdOnly]);
   // Re-run effect when userIdOnly query parameter changes

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome {userFirstName}</h1>
      
      <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create a New Resume</h2>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-lg transition duration-300 mb-4"
          onClick={handleCreateResume}
        >Create</button>
        
        <h2 className="text-2xl font-bold mb-4">Previously Built Resumes</h2>
        <div className="flex justify-center items-center">
          {/* Placeholder for slider */}
          <p className="text-gray-400 italic">No previously built resumes</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
