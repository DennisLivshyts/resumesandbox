import React, { useState } from 'react';
import axios from 'axios';

interface SignUpPageProps {
  onLoginClick: () => void;
}

const SignupPage: React.FC<SignUpPageProps> = ({ onLoginClick }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('/api/signupFunction', formData);
      console.log(response.data.message);
    } catch (error : any) {
      console.error('Error signing up:', error.response?.data.error || error.message);
      setError(error.response?.data.error || 'Failed to sign up');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-lg">First Name</label>
            <input type="text" id="firstName" name="firstName" className="py-2 px-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleInputChange} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-lg">Last Name</label>
            <input type="text" id="lastName" name="lastName" className="py-2 px-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleInputChange} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg">Email</label>
            <input type="email" id="email" name="email" className="py-2 px-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleInputChange} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg">Password</label>
            <input type="password" id="password" name="password" className="py-2 px-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleInputChange} />
          </div>
          <button type="button" onClick={handleSignUp} className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-lg transition duration-300">Sign Up</button>
          {error && <div className="text-red-500">{error}</div>}
        </form>
        <div className="mt-4 text-lg">
          Already have an account?{' '}
          <span className="text-green-500 hover:underline cursor-pointer" onClick={onLoginClick}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
