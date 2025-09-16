import { motion } from "framer-motion";
// CORRECTED: Using the specific import path for Font Awesome 6 icons
import { FaCheckCircle } from "react-icons/fa";
import nkImage from "../../assets/nk2.png";

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

const AboutSection = () => {
  // Animation for the container to fade in
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.3 },
    },
  };

  // Animation for child elements to fade and slide in
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-dark-primary to-dark-secondary overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-xs sm:max-w-sm">
              {/* Gradient background element, now a circle */}
              <div className="absolute -inset-2 bg-gradient-to-br from-dark-secondary via-dark-primary to-dark-secondary rounded-full opacity-60 blur-lg"></div>
              <img
                src={nkImage}
                alt="Founder's Profile"
                className="relative w-full h-auto object-cover rounded-full aspect-square border-2 border-white/10 shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            className="lg:col-span-3 text-center lg:text-left"
            variants={itemVariants}
          >
            <h2 className="font-poppins text-3xl md:text-4xl font-bold leading-tight">
              <span className="bg-gradient-to-t from-gray-400 to-white text-transparent bg-clip-text">
                CA. Nirmal Kr. Mandal
                <br />
                <span className="text-xl font-medium text-accent-blue">
                  The Expert Behind Your Financial Success
                </span>
              </span>
            </h2>
            <p className="font-inter text-light-secondary mt-6 leading-relaxed">
              Meet our founder,
              <span className=""> CA. Nirmal Kumar Mandal</span>, a seasoned
              Chartered Accountant with over 20 years of experience. Driven by a
              genuine passion for simplifying complex finances, Nirmal believes
              in being a true partner to his clients, offering proactive
              guidance rooted in integrity. This platform is the realization of
              his vision: to blend decades of professional expertise with modern
              technology, making expert financial services more accessible,
              transparent, and convenient for businesses and individuals alike.
            </p>

            {/* Qualifications Section */}
            <div className="mt-8 text-left">
              <h3 className="font-poppins font-semibold text-lg text-light-primary mb-4">
                Core Qualifications
              </h3>
              <ul className="space-y-3">
                {qualificationsData.map((qual, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="h-5 w-5 text-light-secondary mr-3 flex-shrink-0" />
                    <span className="font-inter text-light-secondary">
                      {qual}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 text-center lg:text-left">
              {experienceData.map((item, index) => (
                <div key={index}>
                  <p className="text-3xl md:text-4xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-light-primary to-light-secondary">
                    {item.value}
                  </p>
                  <p className="text-sm font-inter text-light-secondary mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;

// import { motion } from "framer-motion";

// const experienceData = [
//   {
//     value: "25+",
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

// const AboutSection = () => {
//   // Animation for the container to fade in
//   const sectionVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { duration: 0.6, staggerChildren: 0.3 },
//     },
//   };

//   // Animation for child elements to fade and slide in
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   return (
//     <section className="py-20 md:py-28 bg-gradient-to-b from-dark-primary to-dark-secondary overflow-hidden">
//       <motion.div
//         className="max-w-6xl mx-auto px-4"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
//           {/* Image Column */}
//           <motion.div
//             className="lg:col-span-2 flex justify-center"
//             variants={itemVariants}
//           >
//             <div className="relative w-full max-w-sm">
//               {/* Gradient background element */}
//               <div className="absolute -inset-2 bg-gradient-to-br from-dark-secondary via-dark-primary to-dark-secondary rounded-xl opacity-60 blur-lg"></div>
//               <img
//                 src="https://placehold.co/400x500/2c5364/ffffff?text=Founder's\nImage"
//                 alt="Founder's Profile"
//                 className="relative w-full h-auto object-cover rounded-xl border-2 border-white/10 shadow-2xl"
//               />
//             </div>
//           </motion.div>

//           {/* Text Column */}
//           <motion.div
//             className="lg:col-span-3 text-center lg:text-left"
//             variants={itemVariants}
//           >
//             <h2 className="font-poppins text-3xl md:text-4xl font-bold text-light-primary leading-tight">
//               Meet the Expert Behind Your Financial Success
//             </h2>
//             <p className="font-inter text-light-secondary mt-6 leading-relaxed">
//               This is a demo text block. Here, you can write a compelling
//               biography about your father, highlighting his journey, his passion
//               for chartered accountancy, and his commitment to helping clients
//               navigate the complex world of finance and taxation with clarity
//               and confidence.
//             </p>
//             <p className="font-inter text-light-secondary mt-4 leading-relaxed">
//               Another paragraph for more details. Discuss his core philosophies,
//               his approach to client relationships, and what makes his service
//               unique in the industry.
//             </p>

//             {/* Experience Stats */}
//             <div className="mt-10 grid grid-cols-3 gap-4 text-center">
//               {experienceData.map((item, index) => (
//                 <div key={index}>
//                   <p className="text-3xl md:text-4xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-light-primary to-light-secondary">
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

// export default AboutSection;
