import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import nkImage from "../assets/nk1.png";

const experienceData = [
  {
    value: "20+",
    label: "Years of Experience",
  },
  {
    value: "500+",
    label: "Happy Clients Served",
  },
  {
    value: "99%",
    label: "Filing Success Rate",
  },
];

const qualificationsData = [
  "Chartered Accountant (CA)",
  "Bachelor of Commerce (B.Com, Honours)",
  "Certified Financial Planner (CFP)",
];

const AboutPage = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-t from-dark-primary to-dark-secondary overflow-hidden min-h-screen flex items-center">
      <motion.div
        className="max-w-5xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- NEW LAYOUT: Top section for headline, image, and description --- */}
        <div className="flex flex-col items-center text-center">
          {/* Main Heading */}
          <motion.h1
            className="font-poppins text-4xl md:text-5xl font-bold leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-t from-gray-400 to-white text-transparent bg-clip-text">
              CA. Nirmal Kr. Mandal
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-2 font-inter text-lg md:text-xl text-accent-blue font-medium"
            variants={itemVariants}
          >
            The Expert Behind Your Financial Success
          </motion.p>

          {/* Image */}
          <motion.div
            className="relative w-full max-w-xs sm:max-w-sm mt-10"
            variants={itemVariants}
          >
            <div className="absolute -inset-3 bg-gradient-to-br from-dark-secondary via-dark-primary to-dark-secondary rounded-full opacity-70 blur-xl"></div>
            <img
              src={nkImage}
              alt="CA. Nirmal Kumar Mandal"
              className="relative w-full h-auto object-cover rounded-full aspect-square border-4 border-white/10 shadow-2xl"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            className="font-inter text-light-secondary mt-10 max-w-3xl leading-relaxed"
            variants={itemVariants}
          >
            At the heart of NK is our founder, Nirmal Kumar Mandal, a seasoned
            Chartered Accountant with over 25 years of unwavering dedication to
            the craft. For Nirmal, accountancy has never been just about
            numbers; it's about providing the clarity and strategic guidance
            that empowers businesses to grow and individuals to achieve
            financial peace of mind.
            <br /> <br />
            His journey in the world of finance is fueled by a genuine passion
            for problem-solving. He finds immense satisfaction not in the
            complexity of tax codes, but in the simplicity and success they can
            bring to his clients—be it a startup navigating its first compliance
            audit, a freelancer optimizing their tax savings, or a family
            planning for a secure future. Every balanced sheet and successful
            filing represents a client's dream protected and nurtured. <br />
            <br />
            Nirmal’s philosophy is built on a foundation of integrity and
            partnership. He believes in proactive guidance, not just reactive
            compliance. This commitment to making expert advice more accessible
            and transparent is the driving force behind this platform. By
            blending decades of hands-on experience with modern technology, he
            aims to deliver a service that is not only professional and precise
            but also incredibly convenient and user-centric.
          </motion.p>
        </div>

        {/* --- NEW LAYOUT: Bottom section for qualifications and experience --- */}
        <motion.div
          className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          variants={itemVariants}
        >
          {/* Left Column: Qualifications */}
          <div className="text-center lg:text-left">
            <h3 className="font-poppins font-semibold text-2xl text-light-primary mb-6">
              Core Qualifications
            </h3>
            <ul className="space-y-4">
              {qualificationsData.map((qual, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center lg:justify-start"
                >
                  <FaCheckCircle className="h-5 w-5 text-accent-blue mr-4 flex-shrink-0" />
                  <span className="font-inter text-light-secondary">
                    {qual}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Experience Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {experienceData.map((item, index) => (
              <div key={index}>
                <p className="text-4xl md:text-5xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-light-primary to-light-secondary">
                  {item.value}
                </p>
                <p className="text-sm font-inter text-light-secondary mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutPage;


















// import { motion } from "framer-motion";
// // CORRECTED: Using a more general and stable import path for the icon
// import { FaCheckCircle } from "react-icons/fa";
// // CORRECTED: Using an absolute path from the project root for the image, which is more reliable
// import nkImage from "/src/assets/nk2.png";

// const experienceData = [
//   {
//     value: "20+",
//     label: "Years of Experience",
//   },
//   {
//     value: "500+",
//     label: "Happy Clients Served",
//   },
//   {
//     value: "99%",
//     label: "Filing Success Rate",
//   },
// ];

// const qualificationsData = [
//   "Chartered Accountant (CA)",
//   "Bachelor of Commerce (B.Com, Honours)",
//   "Certified Financial Planner (CFP)",
// ];

// const AboutPage = () => {
//   // Animation variants for Framer Motion
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2, delayChildren: 0.2 },
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
//     <section className="py-20 md:py-28 bg-gradient-to-t from-dark-primary to-dark-secondary overflow-hidden min-h-screen flex items-center">
//       <motion.div
//         className="max-w-6xl mx-auto px-4"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//           {/* Left Column: Image */}
//           <motion.div className="flex justify-center" variants={itemVariants}>
//             <div className="relative w-full max-w-sm">
//               <div className="absolute -inset-3 bg-gradient-to-br from-dark-secondary via-dark-primary to-dark-secondary rounded-full opacity-70 blur-xl"></div>
//               <img
//                 src={nkImage} // Using the imported image
//                 alt="CA. Nirmal Kumar Mandal"
//                 className="relative w-full h-auto object-cover rounded-full aspect-square border-4 border-white/10 shadow-2xl"
//               />
//             </div>
//           </motion.div>

//           {/* Right Column: Text Content */}
//           <motion.div
//             className="text-center lg:text-left"
//             variants={itemVariants}
//           >
//             <h1 className="font-poppins text-4xl md:text-5xl font-bold leading-tight">
//               <span className="bg-gradient-to-t from-gray-400 to-white text-transparent bg-clip-text">
//                 CA. Nirmal Kr. Mandal
//               </span>
//             </h1>
//             <p className="mt-2 font-inter text-lg md:text-xl text-accent-blue font-medium">
//               The Expert Behind Your Financial Success
//             </p>
//             <p className="font-inter text-light-secondary mt-6 leading-relaxed">
//               At the heart of NK is our founder, Nirmal Kumar Mandal, a seasoned
//               Chartered Accountant with over 25 years of unwavering dedication
//               to the craft. For Nirmal, accountancy has never been just about
//               numbers; it's about providing the clarity and strategic guidance
//               that empowers businesses to grow and individuals to achieve
//               financial peace of mind.<br/> His journey in the world of finance is
//               fueled by a genuine passion for problem-solving. He finds immense
//               satisfaction not in the complexity of tax codes, but in the
//               simplicity and success they can bring to his clients—be it a
//               startup navigating its first compliance audit, a freelancer
//               optimizing their tax savings, or a family planning for a secure
//               future. Every balanced sheet and successful filing represents a
//               client's dream protected and nurtured. <br/>Nirmal’s philosophy is
//               built on a foundation of integrity and partnership. He believes in
//               proactive guidance, not just reactive compliance. This commitment
//               to making expert advice more accessible and transparent is the
//               driving force behind this platform. By blending decades of
//               hands-on experience with modern technology, he aims to deliver a
//               service that is not only professional and precise but also
//               incredibly convenient and user-centric.
//             </p>

//             {/* Qualifications Section */}
//             <div className="mt-8 text-left">
//               <h3 className="font-poppins font-semibold text-xl text-light-primary mb-4">
//                 Core Qualifications
//               </h3>
//               <ul className="space-y-3">
//                 {qualificationsData.map((qual, index) => (
//                   <motion.li
//                     key={index}
//                     className="flex items-center"
//                     custom={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.5 + index * 0.1 }}
//                   >
//                     <FaCheckCircle className="h-5 w-5 text-accent-blue mr-3 flex-shrink-0" />
//                     <span className="font-inter text-light-secondary">
//                       {qual}
//                     </span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </div>

//             {/* Experience Stats */}
//             <div className="mt-10 grid grid-cols-3 gap-4 text-center lg:text-left">
//               {experienceData.map((item, index) => (
//                 <div key={index}>
//                   <p className="text-4xl md:text-5xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-light-primary to-light-secondary">
//                     {item.value}
//                   </p>
//                   <p className="text-sm font-inter text-light-secondary mt-1">
//                     {item.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default AboutPage;
