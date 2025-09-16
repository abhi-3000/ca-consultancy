import { motion } from "framer-motion";
// CORRECTED: Using a more general and stable import path for the icons
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-dark-primary border-t border-white/10">
      <motion.div
        className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold font-poppins text-light-primary">
              NK Consultancy
            </h3>
            <p className="mt-4 text-sm text-light-secondary/70 font-inter max-w-xs">
              Providing expert financial and compliance services to empower your
              business growth.
            </p>
            <div className="mt-6 flex items-center space-x-5">
              <a
                href="#"
                className="text-light-secondary hover:text-accent-blue transition-colors"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="#"
                className="text-light-secondary hover:text-accent-blue transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-light-secondary hover:text-accent-blue transition-colors"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-light-primary tracking-wider">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="/services"
                  className="font-inter text-sm text-light-secondary/70 hover:text-light-primary transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works"
                  className="font-inter text-sm text-light-secondary/70 hover:text-light-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="font-inter text-sm text-light-secondary/70 hover:text-light-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="font-inter text-sm text-light-secondary/70 hover:text-light-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-poppins font-semibold text-light-primary tracking-wider">
              Legal
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="#"
                  className="font-inter text-sm text-light-secondary/70 hover:text-light-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-inter text-sm text-light-secondary/70 hover:text-light-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-poppins font-semibold text-light-primary tracking-wider">
              Contact
            </h4>
            <div className="mt-4 space-y-3 font-inter text-sm text-light-secondary/70">
              <p>+91-9470195174</p>
              <p>nirmal.fcma@gmail.com</p>
              <p>
                Parsudih, Jamshedpur,
                <br /> Jharkhand
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-sm font-inter text-light-secondary/50">
            &copy; {new Date().getFullYear()} NK Consultancy. All Rights
            Reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
