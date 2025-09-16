import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// CORRECTED: Using the specific import path for Font Awesome 6 icons
import { FaUsers, FaCheckCircle, FaClock, FaRupeeSign } from "react-icons/fa";

// --- MAIN COMPONENT ---
const ServicesPage = () => {
  // State to hold the services, loading status, and any errors
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://ca-consultancy.onrender.com/api/services"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch services from the server.");
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []); // The empty dependency array ensures this runs only once

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary text-light-primary">
        Loading Services...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-t from-dark-primary to-dark-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-poppins text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-light-primary to-light-secondary">
            Our Professional Services
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-light-secondary font-inter">
            Explore our comprehensive suite of financial and compliance
            solutions, designed to provide clarity and empower your financial
            journey.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div
              key={service._id} //bg-gradient-to-t from-dark-primary to-dark-secondary border border-white/10
              className="group relative h-full flex flex-col bg-gradient-to-t from-dark-primary/40 to-dark-secondary border border-white/10 rounded-xl p-8 overflow-hidden transition-all duration-300 hover:border-accent-blue/50 hover:-translate-y-2"
              variants={cardVariants}
            >
              <div
                className="absolute top-0 left-0 w-full h-full bg-accent-blue opacity-0 transition-opacity duration-500 group-hover:opacity-10"
                style={{ filter: "blur(100px)" }}
              ></div>

              <div className="relative flex flex-col h-full">
                <h3 className="font-poppins font-bold text-2xl text-light-primary">
                  {service.title}
                </h3>
                <p className="font-inter text-md text-light-secondary mt-3">
                  {service.description}
                </p>

                {/* Details Section */}
                <div className="mt-6 pt-4 border-t border-white/10 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <FaUsers className="h-4 w-4 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-lg text-light-primary ">
                        Ideal For
                      </h4>
                      <p className="text-light-secondary/80">
                        {service.idealClients.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="h-4 w-4 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-light-primary text-lg">
                        Deliverables
                      </h4>
                      <p className="text-light-secondary/80">
                        {service.deliverables.join(" • ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaClock className="h-4 w-4 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-light-primary text-lg">
                        Turnaround Time
                      </h4>
                      <p className="text-light-secondary/80">
                        {service.turnaroundTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaRupeeSign className="h-4 w-4 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-light-primary text-lg">
                        Pricing
                      </h4>
                      <p className="text-light-secondary/80">
                        {service.price.display}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex-grow flex items-end">
                  <Link
                    to={`/services/${service._id}`}
                    className="w-full text-center font-poppins font-semibold text-sm text-dark-primary bg-light-primary hover:bg-light-secondary transition-colors duration-300 py-3 px-6 rounded-full shadow-lg"
                  >
                    View Details & Apply
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPage;
