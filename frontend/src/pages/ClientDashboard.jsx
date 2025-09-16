import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";

// CORRECTED: Using absolute paths from the `src` directory for robustness.
// This is a more stable way to import and avoids issues with relative paths.
import MyRequestsSection from "/src/components/dashboard/MyRequestsSection.jsx";
import OverviewSection from "/src/components/dashboard/OverviewSection.jsx";
import BillingHistorySection from "/src/components/dashboard/BillingHistorySection.jsx";

const ClientDashboard = () => {
  // This state now controls the entire dashboard's navigation
  const [activeTab, setActiveTab] = useState("overview");

  // We fetch all requests here, in the parent component, just once.
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const response = await fetch(
          "https://ca-consultancy.onrender.com/api/requests/my-requests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch your requests.");
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [getToken]);

  // This function decides which section component to show
  const renderSection = () => {
    switch (activeTab) {
      case "overview":
        // We pass the fetched data down as props
        return <OverviewSection requests={requests} />;
      case "requests":
        // The MyRequestsSection receives all necessary data and functions
        return (
          <MyRequestsSection
            requests={requests}
            loading={loading}
            error={error}
            setRequests={setRequests}
          />
        );
      case "billing":
        // The BillingHistorySection will also receive the requests
        return <BillingHistorySection requests={requests} />;
      default:
        return <OverviewSection requests={requests} />;
    }
  };

  // A helper component for clean, reusable tab buttons
  const TabButton = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`font-poppins font-semibold text-sm py-2 px-5 rounded-full transition-colors duration-300 ${
        activeTab === tabName
          ? "bg-light-primary text-dark-primary"
          : "text-light-secondary hover:bg-dark-secondary hover:text-light-primary"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-dark-secondary to-dark-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <h1 className="font-poppins text-3xl md:text-4xl font-bold text-light-primary">
            Client Dashboard
          </h1>
          <Link
            to="/services"
            className="font-poppins font-semibold text-sm text-dark-primary bg-light-primary hover:bg-light-secondary transition-colors duration-300 py-3 px-6 rounded-full shadow-lg"
          >
            Request a New Service
          </Link>
        </div>

        {/* This is the tab navigation bar */}
        <div className="mb-10 p-2 bg-dark-secondary border border-white/10 rounded-full flex items-center justify-start max-w-max">
          <TabButton tabName="overview" label="Overview" />
          <TabButton tabName="requests" label="My Requests" />
          <TabButton tabName="billing" label="Billing History" />
        </div>

        {/* The active section is rendered here with a smooth animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ClientDashboard;
