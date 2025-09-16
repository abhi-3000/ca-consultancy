import { useMemo } from "react";
import { motion } from "framer-motion";
// We import the necessary components from the 'recharts' library
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// A modern, consistent color palette for our chart segments
const CHART_COLORS = [
  "#38bdf8",
  "#34d399",
  "#facc15",
  "#f87171",
  "#a78bfa",
  "#ec4899",
];

// --- Main Reports & Analytics Component ---
const ReportsAnalyticsSection = ({ requests = [] }) => {
  // --- DYNAMIC DATA CALCULATION ---
  // We use useMemo for performance, so these complex calculations only run when the requests data actually changes.
  const analyticsData = useMemo(() => {
    // 1. Calculate the data for the "Services Breakdown" Pie Chart
    const serviceCounts = requests.reduce((acc, req) => {
      const title = req.serviceId?.title || "Archived Service";
      acc[title] = (acc[title] || 0) + 1;
      return acc;
    }, {});
    const pieChartData = Object.entries(serviceCounts).map(([name, value]) => ({
      name,
      value,
    }));

    // 2. Calculate the data for the "Client Leaderboard"
    const clientRevenue = requests
      .filter(
        (r) => r.invoice?.paymentStatus === "Paid" && r.invoice?.amount > 0
      )
      .reduce((acc, req) => {
        const client = req.clerkUserId;
        const amount = req.invoice.amount;
        acc[client] = (acc[client] || 0) + amount;
        return acc;
      }, {});

    const clientLeaderboard = Object.entries(clientRevenue)
      .sort(([, a], [, b]) => b - a) // Sort clients by highest revenue
      .slice(0, 5); // Get the top 5 clients

    return { pieChartData, clientLeaderboard };
  }, [requests]);

  // Animation variants for the containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Column: Services Breakdown Pie Chart */}
      <motion.div
        className="lg:col-span-2 bg-dark-secondary p-6 rounded-xl border border-white/10"
        variants={itemVariants}
      >
        <h3 className="font-poppins font-semibold text-light-primary mb-4">
          Services Breakdown
        </h3>
        {analyticsData.pieChartData.length > 0 ? (
          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={analyticsData.pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {analyticsData.pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
                  contentStyle={{
                    backgroundColor: "#0f2027",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.75rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center h-full flex items-center justify-center text-light-secondary/60">
            No service data available to generate chart.
          </p>
        )}
      </motion.div>

      {/* Right Column: Client Leaderboard */}
      <motion.div
        className="lg:col-span-1 bg-dark-secondary p-6 rounded-xl border border-white/10"
        variants={itemVariants}
      >
        <h3 className="font-poppins font-semibold text-light-primary mb-4">
          Top Clients by Revenue
        </h3>
        <div className="space-y-4">
          {analyticsData.clientLeaderboard.length > 0 ? (
            analyticsData.clientLeaderboard.map(([client, revenue], index) => (
              <div
                key={client}
                className="flex justify-between items-center bg-dark-primary/50 p-3 rounded-md"
              >
                <span className="font-inter text-sm text-light-secondary">
                  <span className="font-bold">#{index + 1}</span> Client ...
                  {client.substring(client.length - 6)}
                </span>
                <span className="font-poppins font-semibold text-light-primary">
                  ₹{revenue.toLocaleString("en-IN")}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-center text-light-secondary/60 py-8">
              No paid invoices found to rank clients.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReportsAnalyticsSection;
