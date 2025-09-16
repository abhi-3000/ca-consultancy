import { motion } from "framer-motion";
// CORRECTED: Using the specific import path for Font Awesome 6 icons
import { FaArrowRight } from "react-icons/fa6";

const servicesData = [
  {
    title: "ITR Filing & Returns",
    description:
      "End-to-end ITR filing for individuals and businesses, ensuring maximum returns.",
    details: [
      "For Salaried, Business, & Capital Gains",
      "Tax Planning & Advisory",
      "Revised Return Filing",
    ],
  },
  {
    title: "GST Solutions",
    description:
      "Comprehensive GST services, from registration to monthly and quarterly return filings.",
    details: [
      "New GST Registration",
      "LUT & Letter of Undertaking",
      "Monthly & Quarterly Returns",
    ],
  },
  {
    title: "Projected Report & Balance Sheet",
    description:
      "Obtain meticulously prepared projected financial statements for strategic planning and critical financial decisions.",
    details: [
      "Loan & Funding Proposals",
      "Investment & Business Planning",
      "Compliance & Regulatory Submissions",
    ],
  },
  {
    title: "Licenses & Compliance",
    description:
      "Navigate the complexities of business licensing to get operational, fast.",
    details: [
      "Trade License",
      "Food License (FSSAI)",
      "Import Export Code (IEC)",
    ],
  },
];

const ServicesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-dark-secondary to-dark-primary">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-light-primary to-gray-400">
            {/* <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent"></span> */}
            Our Core Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-light-secondary font-inter">
            A complete suite of financial and compliance services to empower
            your business growth.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-gradient-to-br from-dark-secondary/60 to-dark-secondary/30 border border-white/10 rounded-xl p-6 overflow-hidden transition-all duration-300 hover:border-accent-blue/50 hover:-translate-y-2"
              variants={cardVariants}
            >
              <div
                className="absolute top-0 left-0 w-full h-full bg-accent-blue opacity-0 transition-opacity duration-500 group-hover:opacity-10"
                style={{ filter: "blur(100px)" }}
              ></div>

              <div className="relative flex flex-col h-full">
                <h3 className="font-poppins font-bold text-xl text-light-primary">
                  {service.title}
                </h3>
                <p className="font-inter text-sm text-light-secondary mt-2 flex-grow">
                  {service.description}
                </p>

                <ul className="space-y-2 my-6 text-sm">
                  {service.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-center text-light-secondary/80"
                    >
                      <FaArrowRight className="h-3 w-3 mr-3 text-accent-blue flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>

                <a
                  href="/services"
                  className="font-poppins font-semibold text-sm mt-auto text-accent-blue flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                >
                  Apply Now
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
