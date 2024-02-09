import React, { useState } from 'react';
import Link from 'next/link';
import WelcomePage from '../app/components/welcome';
import SignupPage from '../app/components/signup';
import LoginPage from '../app/components/login';

const HomePage: React.FC = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignupClick = () => {
    setShowLogin(false); // Close the login page
    setShowSignup(true); // Open the signup page
  };

  const handleLoginClick = () => {
    setShowSignup(false); // Close the signup page
    setShowLogin(true); // Open the login page
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">ResumeSandbox</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        {!showSignup && !showLogin && (
          <WelcomePage onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
        )}

        {showSignup && (
          <SignupPage onLoginClick={handleLoginClick} />
        )}

        {showLogin && (
          <LoginPage onSignupClick={handleSignupClick} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
