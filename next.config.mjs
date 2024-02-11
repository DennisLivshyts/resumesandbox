/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      SESSION_SECRET: process.env.SESSION_SECRET,
      DATABASE_URL: process.env.DATABASE_URL,
      JWT_SECRET: process.env.JWT_SECRET,
      
      // Add other environment variables here
    },
  };
  
  export default nextConfig;
  