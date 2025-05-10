import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-3 px-4 text-center text-gray-500 text-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; {currentYear} PrismCMS. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-primary-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary-500 transition-colors">Terms</a>
          <a href="#" className="hover:text-primary-500 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;