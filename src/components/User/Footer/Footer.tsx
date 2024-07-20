// import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../../assets/Logo workzpro.png";

const Footer = () => {
  return (
    <footer className="bg-white-800 py-4 border-t-2 border-lightBlue  text-navyBlue">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left lg:flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-16 mx-auto md:mx-0 " />
          <p className="text-xs mt-2 md:text-md ">
            <strong>"Your trusted handyman finder"</strong>{" "}
          </p>
        </div>
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-sm font-bold mb-2">Contact Us</h3>
          <p className="text-xs">
            Contact Email: support@yourcompany.com
            <br />
            Contact Phone: (123) 456-7891 <br />Location: calicut <br />Pincode: 676301
          </p>
        </div>
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-sm font-bold mb-2">Company</h3>
          <ul className="text-xs">
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex justify-center md:justify-end mb-4 md:mb-0">
          <a href="https://facebook.com" className="text-blue-900 mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="text-blue-900 mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="text-blue-900 mx-2">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" className="text-blue-900 mx-2">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
      <div className="border-t border-lightBlue mt-2 pt-4 text-center">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} WorkzPro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
