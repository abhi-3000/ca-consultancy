import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaRupeeSign,
  FaFileAlt,
} from "react-icons/fa";

const ServiceDetailPage = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        // We'll need a new backend endpoint for this: /api/services/:id
        const response = await fetch(
          `https://ca-consultancy.onrender.com/api/services/${id}`
        );
        if (!response.ok) {
          throw new Error("Service not found.");
        }
        const data = await response.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary text-light-primary">
        Loading Service Details...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary text-red-500">
        Error: {error}
      </div>
    );
  if (!service)
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary text-light-primary">
        Service not available.
      </div>
    );

  return (
    <section className="py-20 md:py-28 bg-gradient-to-t from-dark-primary to-dark-secondary">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Main Info */}
          <div className="text-center">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-light-primary to-light-secondary">
              {service.title}
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-light-secondary font-inter text-lg">
              {service.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column: Core Details */}
            <div className="bg-dark-secondary/50 border border-white/10 rounded-xl p-8 space-y-6">
              <DetailItem
                icon={<FaUsers />}
                title="Ideal For"
                content={service.idealClients.join(", ")}
              />
              <DetailItem
                icon={<FaCheckCircle />}
                title="Deliverables"
                content={service.deliverables.join(" • ")}
              />
              <DetailItem
                icon={<FaClock />}
                title="Turnaround Time"
                content={service.turnaroundTime}
              />
              <DetailItem
                icon={<FaRupeeSign />}
                title="Pricing"
                content={service.price.display}
              />
            </div>

            {/* Right Column: Documents & Apply */}
            <div className="bg-dark-secondary/50 border border-white/10 rounded-xl p-8 flex flex-col">
              <h3 className="font-poppins text-xl font-semibold text-light-primary">
                Documents Required
              </h3>
              <ul className="mt-4 space-y-3 text-sm flex-grow">
                {service.formFields.map((doc, index) => (
                  <li
                    key={index}
                    className="flex items-center text-light-secondary/90"
                  >
                    <FaFileAlt className="h-4 w-4 mr-3 text-accent-blue flex-shrink-0" />
                    {doc.label}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  to={`/apply/${service._id}`}
                  className="block w-full text-center font-poppins font-semibold text-dark-primary bg-light-primary hover:bg-light-secondary transition-colors duration-300 py-4 px-6 rounded-full shadow-lg"
                >
                  Apply for this Service
                </Link>
                <p className="text-center text-xs text-light-secondary/60 mt-3">
                  You will be asked to log in or sign up to proceed.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper component for detail items to avoid repetition
const DetailItem = ({ icon, title, content }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 flex-shrink-0 text-accent-blue">{icon}</div>
    <div>
      <h4 className="font-semibold text-light-primary">{title}</h4>
      <p className="text-light-secondary/80 text-sm">{content}</p>
    </div>
  </div>
);

export default ServiceDetailPage;
