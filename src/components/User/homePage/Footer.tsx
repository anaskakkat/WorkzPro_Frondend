import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: "facebook-f", url: "https://facebook.com", label: "Facebook" },
    { icon: "x", url: "https://x.com", label: "X" },
    { icon: "instagram", url: "https://instagram.com", label: "Instagram" },
    { icon: "linkedin-in", url: "https://linkedin.com", label: "LinkedIn" }
  ];

  return (
    <motion.footer
      className=" text-white py-12 relative overflow-hidden bg-blue-900 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative background overlay */}
      
      <div className="container mx-auto px-6 relative ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white border-b border-white/20 pb-2">
              Contact Us
            </h3>
            <div className="space-y-3">
              <a href="mailto:support@yourcompany.com" 
                className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors group cursor-pointer">
                <i className="fas fa-envelope w-5 text-center group-hover:scale-110 transition-transform"></i>
                <span>support@workzpro.com</span>
              </a>
              <a href="tel:(123)456-7891" 
                className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors group cursor-pointer">
                <i className="fas fa-phone w-5 text-center group-hover:scale-110 transition-transform"></i>
                <span>(123) 456-7891</span>
              </a>
              <div className="flex items-center gap-3 text-blue-200">
                <i className="fas fa-location-dot w-5 text-center"></i>
                <span>Calicut, 676301</span>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white border-b border-white/20 pb-2">
              Company
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a
                    href={`/${item.toLowerCase().replace(' ', '')}`}
                    className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-300 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white border-b border-white/20 pb-2">
              Connect With Us
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors group"
                  aria-label={social.label}
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <i className={`fab fa-${social.icon}`}></i>
                  </div>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-6 border-t border-white/10 text-center text-blue-200"
        >
          <p className="text-sm">
            &copy; {new Date().getFullYear()} WorkzPro. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;