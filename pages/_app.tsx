// pages/_app.tsx

import { AppProps } from 'next/app'; // Import AppProps type from Next.js
import '../styles/globals.css'; // Import global styles
import '../styles/tailwind.css'; // Import Tailwind CSS for global styling

function MyApp({ Component, pageProps }: AppProps) { // Specify AppProps type for Component and pageProps
    return <Component {...pageProps} />;
  }
  

export default MyApp;
