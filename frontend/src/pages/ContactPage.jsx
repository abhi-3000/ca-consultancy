import React from "react";
import { motion } from "framer-motion";
// CORRECTED: Using the specific import path for Font Awesome 6 icons which is more stable
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const ContactPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-t from-dark-primary to-dark-secondary text-light-primary p-4 sm:p-6 lg:p-8 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Gradient Headline */}
      <motion.h1
        className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8 text-center"
        variants={itemVariants}
        style={{
          background: "linear-gradient(to bottom, #ffffff, #9CA3AF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Connect With NK
      </motion.h1>

      {/* Brief Description */}
      <motion.p
        className="text-base sm:text-lg text-light-secondary text-center max-w-2xl mb-10 leading-relaxed font-inter"
        variants={itemVariants}
      >
        We're here to provide expert guidance for your financial journey. Feel
        free to reach out to Nirmal Kumar Mandal and our team through any of the
        channels below. We look forward to assisting you.
      </motion.p>

      {/* Contact Information Section */}
      <motion.div
        className="w-full max-w-4xl bg-dark-secondary p-6 sm:p-8 rounded-xl border border-white/10 shadow-lg mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 font-poppins"
        variants={itemVariants}
      >
        {/* Phone */}
        <div className="flex flex-col items-center text-center">
          <FaPhoneAlt className="text-accent-blue text-3xl mb-3" />
          <h3 className="text-xl font-semibold text-light-primary mb-1">
            Phone
          </h3>
          <p className="text-light-secondary">+91-9470195174</p>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center text-center">
          <FaEnvelope className="text-accent-blue text-3xl mb-3" />
          <h3 className="text-xl font-semibold text-light-primary mb-1">
            Email
          </h3>
          <p className="text-light-secondary break-words">
            nirmal.fcma@gmail.com
          </p>
        </div>

        {/* Office Address */}
        <div className="flex flex-col items-center text-center">
          <FaMapMarkerAlt className="text-accent-blue text-3xl mb-3" />
          <h3 className="text-xl font-semibold text-light-primary mb-1">
            Office Address
          </h3>
          <p className="text-light-secondary">
            Maa Durga Apartment, <br />
            Parsudih, Jamshedpur, <br />
            Jharkhand, 831002
          </p>
        </div>
      </motion.div>

      {/* Social Media Section */}
      <motion.div
        className="w-full max-w-4xl bg-dark-secondary p-6 sm:p-8 rounded-xl border border-white/10 shadow-lg font-poppins"
        variants={itemVariants}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-light-primary text-center mb-6">
          Connect on Social Media
        </h2>
        <div className="flex justify-center space-x-6 sm:space-x-8">
          <motion.a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-secondary hover:text-accent-blue transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin className="text-4xl sm:text-5xl" />
          </motion.a>
          <motion.a
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-secondary hover:text-accent-blue transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaFacebook className="text-4xl sm:text-5xl" />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/youraccount"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-secondary hover:text-accent-blue transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaInstagram className="text-4xl sm:text-5xl" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactPage;
