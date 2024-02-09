// DashboardPage.tsx
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="w-80">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4" />
          </div>
          <div>
            <label htmlFor="email" className="block">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4" />
          </div>
          <div>
            <label htmlFor="phone" className="block">Phone</label>
            <input type="text" id="phone" name="phone" className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4" />
          </div>
          <div className="text-center"> {/* Centered div */}
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-lg transition duration-300">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
