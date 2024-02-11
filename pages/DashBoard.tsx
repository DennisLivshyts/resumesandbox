import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardPage: React.FC = () => {
  const [userFirstName, setUserFirstName] = useState('');

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserDataFromDatabase = async () => {
      try {
        // Retrieve the user's ID from session storage
        const userId = sessionStorage.getItem('userId');
      
        if (!userId) {
          throw new Error('User ID not found in session storage');
        }
        
        // Fetch user data from the API route
        const response = await axios.get(`/api/getUserData?userId=${userId}`);
        const userData = response.data;
        
        // Extract the user's first name
        const firstName = userData.firstName;
        setUserFirstName(firstName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    
    fetchUserDataFromDatabase();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome {userFirstName}</h1>
      
      <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create a New Resume</h2>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-lg transition duration-300 mb-4">Create</button>
        
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
