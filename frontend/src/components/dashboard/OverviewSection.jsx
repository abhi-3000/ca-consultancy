import { motion } from "framer-motion";
// CORRECTED: Using the specific import path for Font Awesome 6 icons which is more stable
import { FaSyncAlt, FaCheckCircle, FaFileInvoiceDollar } from "react-icons/fa";
import { useMemo } from "react";

const OverviewSection = ({ requests = [] }) => {
  // --- DYNAMIC DATA CALCULATION ---
  // We use useMemo to avoid recalculating on every render, which is a performance best practice.
  const summaryData = useMemo(() => {
    const inProgress = requests.filter(
      (r) => r.status === "Under Process"
    ).length;
    const completed = requests.filter((r) => r.status === "Completed").length;
    const pendingInvoices = requests.filter(
      (r) => r.status === "Payment Due"
    ).length;

    return [
      {
        icon: <FaSyncAlt className="h-6 w-6 text-accent-blue" />,
        value: inProgress.toString().padStart(2, "0"),
        label: "Services in Progress",
      },
      {
        icon: <FaCheckCircle className="h-6 w-6 text-green-400" />,
        value: completed.toString().padStart(2, "0"),
        label: "Completed Services",
      },
      {
        icon: <FaFileInvoiceDollar className="h-6 w-6 text-red-400" />,
        value: pendingInvoices.toString().padStart(2, "0"),
        label: "Pending Invoices",
      },
    ];
  }, [requests]);

  // Animation variants for the container and cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {summaryData.map((item, index) => (
        <motion.div
          key={index}
          className="bg-dark-secondary p-6 rounded-xl border border-white/10 flex items-center gap-6"
          variants={cardVariants}
        >
          <div className="flex-shrink-0">{item.icon}</div>
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
    </motion.div>
  );
};

export default OverviewSection;
