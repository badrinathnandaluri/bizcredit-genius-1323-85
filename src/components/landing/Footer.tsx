
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bizblue-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">BizCreditGenius</h3>
            <p className="text-gray-400">AI-powered lending for modern businesses</p>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Term Loans</a></li>
              <li><a href="#" className="hover:text-white">Lines of Credit</a></li>
              <li><a href="#" className="hover:text-white">Invoice Financing</a></li>
              <li><a href="#" className="hover:text-white">Equipment Financing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} BizCreditGenius. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
