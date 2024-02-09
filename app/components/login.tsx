import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface LoginPageProps {
  onSignupClick: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSignupClick }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/loginFunction', formData);
      const token = response.data.token;
      // Save token to localStorage or cookie for future use if needed
      localStorage.setItem('token', token);
      // Navigate to the dashboard
      router.push('/DashBoard');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error (e.g., display error message)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <div className="w-80">
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="password" className="block">Password</label>
            <input type="password" id="password" name="password" className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4" onChange={handleInputChange} />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-lg transition duration-300">Login</button>
          </div>
        </form>
      </div>
      <p className="mt-4">
        Don't have an account?{' '}
        <span className="cursor-pointer text-green-500 hover:underline" onClick={onSignupClick}>Signup</span>
      </p>
    </div>
  );
};

export default LoginPage;
