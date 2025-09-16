import { useMemo } from "react";
import { motion } from "framer-motion";
// Icons for the KPI cards and activity feed
// CORRECTED: Using the specific import path for Font Awesome 6 icons which is more stable
import {
  FaRegClock,
  FaSyncAlt,
  FaFileInvoiceDollar,
  FaPlusCircle,
} from "react-icons/fa";

// --- Main Overview Section Component ---
const OverviewSection = ({ requests = [] }) => {
  // --- DYNAMIC DATA CALCULATION ---
  // We use useMemo for performance, so these values are only recalculated when the requests data changes.
  const kpiData = useMemo(() => {
    const newRequests = requests.filter((r) => r.status === "Pending").length;
    const inProgress = requests.filter(
      (r) => r.status === "Under Process"
    ).length;
    const pendingInvoices = requests.filter(
      (r) => r.status === "Payment Due"
    ).length;

    // Calculate revenue for the current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const revenueThisMonth = requests
      .filter((r) => r.invoice?.paymentStatus === "Paid")
      .filter((r) => {
        // Use updatedAt as a proxy for payment completion date
        const paymentDate = new Date(r.updatedAt);
        return (
          paymentDate.getMonth() === currentMonth &&
          paymentDate.getFullYear() === currentYear
        );
      })
      .reduce((total, r) => total + (r.invoice?.amount || 0), 0);

    return [
      {
        icon: <FaRegClock className="h-6 w-6 text-yellow-400" />,
        value: newRequests.toString().padStart(2, "0"),
        label: "New Requests",
      },
      {
        icon: <FaSyncAlt className="h-6 w-6 text-accent-blue" />,
        value: inProgress.toString().padStart(2, "0"),
        label: "Services in Progress",
      },
      {
        icon: <FaFileInvoiceDollar className="h-6 w-6 text-red-400" />,
        value: pendingInvoices.toString().padStart(2, "0"),
        label: "Pending Invoices",
      },
      {
        // Using a span for the Rupee symbol for better styling control
        icon: <span className="font-bold text-green-400 text-2xl">₹</span>,
        value: revenueThisMonth.toLocaleString("en-IN"), // Formats number with commas (e.g., 1,00,000)
        label: "Revenue This Month",
      },
    ];
  }, [requests]);

  // Get the 5 most recent requests for the activity feed
  const recentActivity = useMemo(() => {
    return requests.slice(0, 5);
  }, [requests]);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Column: KPI Cards */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {kpiData.map((item, index) => (
          <motion.div
            key={index}
            className="bg-dark-secondary p-6 rounded-xl border border-white/10 flex items-center gap-6"
            variants={itemVariants}
          >
            <div className="flex-shrink-0 p-3 bg-dark-primary rounded-full">
              {item.icon}
            </div>
            <div>
              <p className="font-poppins text-3xl font-bold text-light-primary">
                {item.value}
              </p>
              <p className="font-inter text-sm text-light-secondary">
                {item.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Column: Recent Activity */}
      <motion.div
        className="lg:col-span-1 bg-dark-secondary p-6 rounded-xl border border-white/10"
        variants={itemVariants}
      >
        <h3 className="font-poppins font-semibold text-light-primary mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((req) => (
              <div key={req._id} className="flex items-start gap-3">
                <FaPlusCircle className="h-4 w-4 text-light-secondary/50 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-inter text-sm text-light-primary">
                    New request for{" "}
                    <span className="font-semibold">
                      {req.serviceId?.title || "a service"}
                    </span>
                  </p>
                  <p className="text-xs text-light-secondary/60">
                    from client ...
                    {req.clerkUserId.substring(req.clerkUserId.length - 6)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-light-secondary/60 text-center py-8">
              No recent activity.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OverviewSection;
