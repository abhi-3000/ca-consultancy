import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// CORRECTED: Using the specific import path for Font Awesome 6 icons which is more stable
import { FaBars, FaTimes } from "react-icons/fa";

// Reusable component for navigation links
const NavLinks = ({ isSignedIn, isAdmin }) => (
  <>
    <Link
      to="/services"
      className="font-inter text-base text-gray-200 hover:text-light-primary transition-colors"
    >
      Services
    </Link>
    <Link
      to="/how-it-works"
      className="font-inter text-base text-gray-200 hover:text-light-primary transition-colors"
    >
      How It Works
    </Link>
    <Link
      to="/about"
      className="font-inter text-base text-gray-200 hover:text-light-primary transition-colors"
    >
      About Us
    </Link>
    <Link
      to="/contact"
      className="font-inter text-base text-gray-200 hover:text-light-primary transition-colors"
    >
      Contact
    </Link>
    {isSignedIn && (
      <Link
        to={isAdmin ? "/admin/dashboard" : "/dashboard"}
        className="font-inter text-base text-gray-200 hover:text-light-primary transition-colors"
      >
        Dashboard
      </Link>
    )}
  </>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  return (
    <header className="sticky top-0 z-50 w-full p-4">
      <motion.nav
        className="w-full max-w-7xl mx-auto flex items-center justify-between p-4 bg-dark-secondary/50 backdrop-blur-lg border border-white/10 rounded-full"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-l from-white via-cyan-100 to-cyan-300"
          >
            NK
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <NavLinks isSignedIn={isSignedIn} isAdmin={isAdmin} />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="font-poppins text-sm font-medium text-light-secondary hover:text-light-primary transition-colors">
                Log In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="font-poppins text-sm font-medium bg-light-primary text-dark-primary px-5 py-2.5 rounded-full hover:bg-light-secondary transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-light-secondary hover:text-light-primary"
          >
            {/* UPDATED: Using FaXmark instead of FaTimes */}
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden mt-3 mx-auto max-w-7xl bg-dark-secondary/80 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          >
            <div className="flex flex-col space-y-4 text-center">
              <NavLinks isSignedIn={isSignedIn} isAdmin={isAdmin} />
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex flex-col items-center space-y-4">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <div className="w-full flex flex-col gap-4">
                  <SignInButton mode="modal">
                    <button className="font-poppins text-sm w-full py-2 text-center text-light-secondary border border-white/20 rounded-full">
                      Log In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="font-poppins text-sm w-full py-2 text-center bg-light-primary text-dark-primary rounded-full">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
