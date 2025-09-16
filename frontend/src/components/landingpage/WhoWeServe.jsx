import { motion } from "framer-motion";
// CORRECTED: Using the specific import path for Font Awesome 6 icons
import { FaRocket, FaLaptopCode, FaBriefcase } from "react-icons/fa6";

const clientTypes = [
  {
    icon: <FaRocket className="h-10 w-10 text-accent-blue" />,
    title: "Startups & Small Businesses",
    description:
      "From company formation to compliance, we provide the financial backbone for your growing venture.",
    isPopular: false,
  },
  {
    icon: <FaBriefcase className="h-10 w-10 text-accent-blue" />,
    title: "Salaried Professionals",
    description:
      "Maximize your tax savings and manage your investments with our expert ITR filing and advisory services.",
    isPopular: true,
  },
  {
    icon: <FaLaptopCode className="h-10 w-10 text-accent-blue" />,
    title: "Freelancers & Consultants",
    description:
      "Navigate the complexities of self-employment with our specialized GST and income tax solutions.",
    isPopular: false,
  },
];

const WhoWeServe = () => {
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
    <section className="py-20 md:py-28 bg-gradient-to-t from-dark-secondary to-dark-primary">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-light-primary to-light-secondary">
            Tailored for Your Success
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-light-secondary font-inter">
            We provide specialized financial services for a diverse range of
            clients.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {clientTypes.map((client, index) => (
            <motion.div
              key={index}
              className="relative bg-gradient-to-t from-dark-primary to-dark-secondary border border-white/10 rounded-xl p-8 text-center transition-all duration-300 hover:border-accent-blue/50 hover:-translate-y-2"
              variants={cardVariants}
            >
              {client.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="font-poppins text-xs font-bold text-dark-primary bg-gradient-to-r from-light-secondary to-accent-blue px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex justify-center mb-6">{client.icon}</div>

              <h3 className="font-poppins font-bold text-xl text-light-primary">
                {client.title}
              </h3>
              <p className="font-inter text-sm text-light-secondary mt-3">
                {client.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeServe;
