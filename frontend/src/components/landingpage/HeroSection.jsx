import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-t from-dark-primary via-dark-primary to-dark-secondary  overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-b from-dark-secondary via-transparent to-dark-primary animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-dark-secondary via-transparent to-dark-primary"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
      </div>

      {/* Floating grid pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.2s ease-out",
          }}
        />
      </div>

      {/* Geometric accents */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 border border-cyan-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 border border-purple-500/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-32 h-32"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full border-2 border-cyan-400/20 transform rotate-45" />
        </motion.div>
      </div> */}

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Neon accent line */}
        <motion.div
          className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
          variants={glowVariants}
          initial="initial"
          animate="animate"
          style={{
            boxShadow:
              "0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)",
          }}
        />

        <motion.h1
          className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight leading-none"
          variants={itemVariants}
        >
          <span className="block relative">
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-200 to-light-primary text-transparent bg-clip-text relative z-10">
              Expert Financial
            </span>
            <motion.span
              className="font-poppins absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-200 to-light-primary text-transparent bg-clip-text blur-2xl opacity-50"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Expert Financial
            </motion.span>
          </span>
          <span className="block mt-2 relative">
            <span className="font-poppins bg-gradient-to-r from-cyan-200 via-light-primary to-cyan-400 text-transparent bg-clip-text relative z-10">
              Services, Simplified.
            </span>
            <motion.span
              className="font-poppins absolute inset-0 bg-gradient-to-r from-cyan-200 via-light-primary to-cyan-400 text-transparent bg-clip-text blur-2xl opacity-50"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              Services, Simplified.
            </motion.span>
          </span>
        </motion.h1>

        <motion.div
          className="mt-8 max-w-3xl mx-auto text-base md:text-lg lg:text-xl font-inter tracking-tight"
          variants={itemVariants}
        >
          <p className="text-base md:text-lg lg:text-xl text-gray-300 font-light leading-relaxed">
            From <span className="text-cyan-400 font-medium">GST filings</span>{" "}
            to <span className="text-cyan-200 font-medium">ITR returns</span>,
            get all your compliance needs handled by professionals through our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text font-medium">
              secure, modern online platform
            </span>
            .
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-0"
          variants={itemVariants}
        >
          <motion.a
            href="/services"
            className="group relative px-8 py-3 overflow-hidden rounded-full font-semibold text-base transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" /> */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
            {/* <div
              className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow:
                  "0 0 30px rgba(34, 211, 238, 0.5), inset 0 0 20px rgba(34, 211, 238, 0.2)",
              }}
            /> */}
            <span className="relative z-10 font-poppins font-semibold text-sm w-full sm:w-auto text-dark-primary bg-white hover:bg-light-secondary transition-colors duration-300 py-3 px-8 rounded-full">
              Explore Services
            </span>
          </motion.a>

          <motion.a
            href="/contact"
            className="group relative px-8 py-3 overflow-hidden rounded-full font-semibold text-base transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full" /> */}
            {/* <div className="absolute inset-0 border border-purple-400/50 rounded-full" /> */}
            {/* <div className="absolute inset-0 border border-purple-400 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300" /> */}
            {/* <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"
              style={{
                boxShadow:
                  "0 0 20px rgba(168, 85, 247, 0.4), inset 0 0 15px rgba(168, 85, 247, 0.1)",
              }}
            /> */}
            <span className="relative z-10 font-poppins font-semibold text-sm w-full sm:w-auto text-white bg-white/5 border border-white/20 hover:bg-white/10 transition-colors duration-300 py-3 px-8 rounded-full">
              Request a Demo
            </span>
          </motion.a>
        </motion.div>

        {/* Bottom accent */}
        {/* <motion.div
          className="mt-16 flex justify-center items-center gap-2"
          variants={itemVariants}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="w-16 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
          <div className="text-xs text-gray-500 tracking-widest uppercase">
            Scroll to explore
          </div>
          <div className="w-16 h-px bg-gradient-to-l from-purple-400/50 to-transparent" />
          <div
            className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </motion.div> */}
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-primary to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;

// import { motion } from "framer-motion";

// const HeroSection = () => {
//   // Animation variants for Framer Motion to animate elements in sequence
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2, delayChildren: 0.3 },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   return (
//     <section className="relative w-full h-auto py-24 md:py-32 lg:py-40 flex items-center justify-center bg-gradient-to-b from-dark-secondary to-dark-primary overflow-hidden">
//       {/* Optional: Add a subtle background pattern for a more techy feel */}
//       <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

//       <motion.div
//         className="relative z-10 max-w-4xl mx-auto px-4 text-center"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.h1
//           className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter"
//           variants={itemVariants}
//         >
//           {/* This is the key to the gradient text effect */}
//           <span className="bg-gradient-to-t from-gray-500 to-white text-transparent bg-clip-text">
//             Expert Financial Services, Simplified.
//           </span>
//         </motion.h1>

//         <motion.p
//           className="mt-6 max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-gray-400 font-inter tracking-tight"
//           variants={itemVariants}
//         >
//           From GST filings to ITR returns, get all your compliance needs handled
//           by professionals through our secure, modern online platform.
//         </motion.p>

//         <motion.div
//           className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
//           variants={itemVariants}
//         >
//           <a
//             href="/services"
//             className="font-poppins font-semibold text-sm w-full sm:w-auto text-dark-primary bg-white hover:bg-light-secondary transition-colors duration-300 py-3 px-8 rounded-full"
//           >
//             Explore Services
//           </a>
//           <a
//             href="#"
//             className="font-poppins font-semibold text-sm w-full sm:w-auto text-white bg-white/5 border border-white/20 hover:bg-white/10 transition-colors duration-300 py-3 px-8 rounded-full"
//           >
//             Request a Demo
//           </a>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;
