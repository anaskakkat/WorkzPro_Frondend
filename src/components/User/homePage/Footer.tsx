// import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "/workzpro-high-resolution-logo.jpeg";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-white py-8 border-b-2 border-t-2 border-custom_lightBlue text-custom_navyBlue"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex gap-4 flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left lg:flex lg:flex-col lg:items-center">
          <img src={logo} alt="Logo" className="h-16 mx-auto md:mx-0" />
          <p className="text-xs mt-2 md:text-sm text-center">
            <strong>"Your trusted handyman finder"</strong>
          </p>
        </div>
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-sm font-bold mb-2">Contact Us</h3>
          <p className="text-xs md:text-sm">
            support@yourcompany.com
            <br />
            (123) 456-7891
            <br />
            Calicut
            <br />
            676301
          </p>
        </div>
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-sm font-bold mb-2">Company</h3>
          <ul className="text-xs md:text-sm">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="flex justify-center md:justify-end mb-4 md:mb-0">
          <a href="https://facebook.com" className="text-custom_navyBlue mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://x.com" className="text-custom_navyBlue mx-2">
            <i className="fab fa-x"></i>
          </a>
          <a href="https://instagram.com" className="text-custom_navyBlue mx-2">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" className="text-custom_navyBlue mx-2">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <p className="text-xs md:text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} WorkzPro. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
