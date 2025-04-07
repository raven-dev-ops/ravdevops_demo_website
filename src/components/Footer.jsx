import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-raven-dark text-gray-400 py-8 px-6">
      <div className="max-w-6xl mx-auto text-center md:flex md:justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <p>© {currentYear} Raven Development. All Rights Reserved.</p>
          <p>Kansas City, MO (Serving clients nationwide)</p>
        </div>
        <div className="text-sm font-semibold">
          <p>🇺🇸 Proudly Veteran-Owned Small Business</p>
           {/* Optional: Add social links here */}
           {/* <div className="flex justify-center md:justify-end space-x-4 mt-2">
             <a href="#" className="hover:text-white">LinkedIn</a>
             <a href="#" className="hover:text-white">Twitter</a>
           </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Default export