// import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "/workzpro-high-resolution-logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-white bottom-0 bg-white-800 py-8 border-b-2 border-t-2 border-custom_lightBlue  text-custom_navyBlue">
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
             support@yourcompany.com
            <br />
             (123) 456-7891 <br />
            calicut <br />
             676301
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
        <p className="text-xs">
          &copy; {new Date().getFullYear()} WorkzPro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
