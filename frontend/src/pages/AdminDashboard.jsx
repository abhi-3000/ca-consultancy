import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";

// CORRECTED: Using absolute paths from the `src` directory for robustness
import OverviewSection from "/src/components/admin/OverviewSection.jsx";
import AllRequestsSection from "/src/components/admin/AllRequestsSection.jsx";
import ReportsAnalyticsSection from "/src/components/admin/ReportsAnalyticsSection.jsx";

const AdminDashboard = () => {
  // State to manage the active tab. 'overview' is the default.
  const [activeTab, setActiveTab] = useState("overview");

  // --- LIFTING STATE UP: Fetch all admin data once in the parent component ---
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchAdminRequests = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const response = await fetch(
          "http://localhost:5000/api/admin/requests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch admin data.");
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminRequests();
  }, [getToken]);

  // This function decides which section component to show based on the active tab
  const renderSection = () => {
    switch (activeTab) {
      case "overview":
        // We pass the fetched requests data down as a prop
        return <OverviewSection requests={requests} />;
      case "requests":
        // We pass down the requests and the function to update them
        return (
          <AllRequestsSection
            initialRequests={requests}
            loading={loading}
            error={error}
            setParentRequests={setRequests}
          />
        );
      case "reports":
        return <ReportsAnalyticsSection requests={requests} />;
      default:
        return <OverviewSection requests={requests} />;
    }
  };

  // A reusable component for clean, stylish tab buttons
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
        {/* Dashboard Header */}
        <div className="mb-12">
          <h1 className="font-poppins text-3xl md:text-4xl font-bold text-light-primary">
            Admin Mission Control
          </h1>
          <p className="mt-2 text-light-secondary/70 font-inter">
            Welcome back, here's an overview of the business.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-10 p-2 bg-dark-secondary border border-white/10 rounded-full flex items-center justify-start max-w-max">
          <TabButton tabName="overview" label="Overview" />
          <TabButton tabName="requests" label="All Requests" />
          <TabButton tabName="reports" label="Reports & Analytics" />
        </div>

        {/* Content Area for the Active Tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AdminDashboard;
