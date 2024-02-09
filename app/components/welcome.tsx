import React from 'react';

interface WelcomePageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onLoginClick, onSignupClick }) => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Welcome to Resume Builder</h1>
      <p className="text-lg mb-12">Create your professional resume in minutes!</p>
      <div className="flex space-x-4">
        <button onClick={onLoginClick} className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-lg transition duration-300">
          Login
        </button>
        <button onClick={onSignupClick} className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-lg transition duration-300">
          Signup
        </button>
      </div>
    </>
  );
};

export default WelcomePage;
