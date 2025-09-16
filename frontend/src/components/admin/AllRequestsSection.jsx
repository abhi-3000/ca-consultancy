import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";
// CORRECTED: Using a more general and stable import path for the icons
import { FaPaperPlane, FaFileUpload, FaAngleDown } from "react-icons/fa";

// --- Reusable Action Sub-Components for the Cards ---

const StatusUpdater = ({ request, onUpdate }) => {
  const [status, setStatus] = useState(request.status);
  const { getToken } = useAuth();

  const handleUpdate = async (newStatus) => {
    try {
      const token = await getToken();
      const response = await fetch(
        `https://ca-consultancy.onrender.com/api/admin/requests/${request._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) throw new Error("Status update failed.");
      const updatedRequest = await response.json();
      onUpdate(updatedRequest);
      setStatus(newStatus);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <select
      value={status}
      onChange={(e) => handleUpdate(e.target.value)}
      className="w-full p-2 text-sm bg-dark-primary border border-white/10 rounded-md text-light-secondary focus:ring-accent-blue focus:border-accent-blue"
    >
      <option>Pending</option>
      <option>Under Process</option>
      <option>Payment Due</option>
      <option>Completed</option>
    </select>
  );
};

const InvoiceForm = ({ request, onUpdate }) => {
  const [amount, setAmount] = useState(request.invoice?.amount || "");
  const { getToken } = useAuth();

  const handleSendInvoice = async () => {
    if (!amount) return alert("Please enter an amount.");
    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("amount", amount);
      const response = await fetch(
        `https://ca-consultancy.onrender.com/api/admin/requests/${request._id}/invoice`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      if (!response.ok) throw new Error("Failed to send invoice.");
      const updatedRequest = await response.json();
      onUpdate(updatedRequest);
      alert("Invoice details sent successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  if (request.invoice?.paymentStatus === "Paid") {
    return (
      <div className="text-center text-xs font-medium text-white p-2 border bg-green-400 border-green-400/20 rounded-md">
        RECEIVED
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        placeholder="Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 text-sm bg-dark-primary border border-white/10 rounded-md text-light-secondary"
      />
      <button
        onClick={handleSendInvoice}
        className="p-2.5 bg-accent-blue rounded-md text-white hover:bg-opacity-80 transition-colors"
      >
        <FaPaperPlane size={12} />
      </button>
    </div>
  );
};

// --- NEW: Admin File Upload Component ---
const AdminFileUpload = ({ request, onUpdate }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { getToken } = useAuth();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("document", file);
      const response = await fetch(
        `https://ca-consultancy.onrender.com/api/admin/requests/${request._id}/upload`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      if (!response.ok) throw new Error("File upload failed.");
      const updatedRequest = await response.json();
      onUpdate(updatedRequest);
      setFile(null);
      alert("File uploaded successfully for the client!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-xs text-light-secondary file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-dark-primary file:text-light-primary hover:file:bg-opacity-80"
      />
      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="p-2.5 bg-accent-blue rounded-md text-white text-xs"
      >
        <FaFileUpload size={12} />
      </button>
    </div>
  );
};

// --- Main "All Requests" Component ---
const AllRequestsSection = ({
  initialRequests,
  loading,
  error,
  setParentRequests,
}) => {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests]);

  const handleRequestUpdate = (updatedRequest) => {
    const newRequests = requests.map((req) =>
      req._id === updatedRequest._id ? updatedRequest : req
    );
    setRequests(newRequests);
    setParentRequests(newRequests);
  };

  const filteredRequests = useMemo(() => {
    let result = requests;
    if (filter !== "All") {
      const statusMap = {
        "In Progress": "Under Process",
        "Payment Due": "Payment Due",
        Completed: "Completed",
        Pending: "Pending",
      };
      result = result.filter((r) => r.status === statusMap[filter]);
    }
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.clerkUserId.toLowerCase().includes(lowercasedTerm) ||
          r.serviceId?.title.toLowerCase().includes(lowercasedTerm)
      );
    }
    return result;
  }, [requests, filter, searchTerm]);

  const FilterButton = ({ label }) => (
    <button
      onClick={() => setFilter(label)}
      className={`font-inter text-sm py-2 px-4 rounded-full transition-colors duration-200 ${
        filter === label
          ? "bg-accent-blue text-white"
          : "text-light-secondary hover:bg-dark-secondary"
      }`}
    >
      {label}
    </button>
  );

  const getClientName = (formData) => {
    return (
      formData?.fullName || formData?.entityName || formData?.firmName || "N/A"
    );
  };

  if (loading)
    return (
      <p className="text-center text-light-secondary p-10">
        Loading Admin Requests...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 p-10 font-semibold">{error}</p>
    );

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-8 p-4 bg-dark-secondary border border-white/10 rounded-xl flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search by Client ID or Service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-auto flex-grow bg-dark-primary border border-white/10 rounded-full px-4 py-2 text-light-primary placeholder-light-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-blue"
        />
        <div className="flex-shrink-0 flex flex-wrap items-center gap-2">
          <FilterButton label="All" />
          <FilterButton label="Pending" />
          <FilterButton label="In Progress" />
          <FilterButton label="Payment Due" />
          <FilterButton label="Completed" />
        </div>
      </div>

      {/* Requests Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredRequests.map((req) => (
          <motion.div
            layout
            key={req._id}
            className="bg-dark-secondary rounded-xl border border-white/10 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="font-poppins font-semibold text-light-primary pr-4">
                  {req.serviceId?.title || "Archived Service"}
                </h3>
                {/* <span className="text-xs font-mono text-light-secondary/50 flex-shrink-0">
                  ...{req.clerkUserId.substring(req.clerkUserId.length - 6)}
                </span> */}
              </div>
              <p className="font-inter text-base text-white mt-1">
                {getClientName(req.formData)}
              </p>
              <p className="text-sm text-light-secondary/100 font-inter mt-1">
                Requested: {new Date(req.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 px-5 pb-5">
              <div>
                <label className="text-sm font-medium text-white mb-1 block">
                  Status
                </label>
                <StatusUpdater request={req} onUpdate={handleRequestUpdate} />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-1 block">
                  Invoice
                </label>
                <InvoiceForm request={req} onUpdate={handleRequestUpdate} />
              </div>
            </div>

            <button
              onClick={() =>
                setExpandedId(expandedId === req._id ? null : req._id)
              }
              className="w-full text-xs text-accent-blue hover:underline p-3 bg-dark-primary/30 border-t border-b border-white/5 flex justify-between items-center"
            >
              <span>
                {expandedId === req._id
                  ? "Hide All Details"
                  : "Show All Details"}
              </span>
              <motion.div
                animate={{ rotate: expandedId === req._id ? 180 : 0 }}
              >
                <FaAngleDown />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedId === req._id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="border-t border-white/10 p-5 bg-dark-primary/30 text-xs space-y-4">
                    <div>
                      <h4 className="font-medium text-light-primary mb-2 text-base">
                        Submitted Details:
                      </h4>
                      <div className="space-y-2">
                        {req.serviceId?.formFields.map((field) => {
                          const value = req.formData[field.name];
                          if (!value || field.fieldType === "file") return null;
                          return (
                            <div key={field.name}>
                              <p className="text-light-secondary/90 font-medium text-sm">
                                {field.label}:
                              </p>
                              <p className="text-white whitespace-pre-wrap text-base">
                                {value}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-base text-light-secondary/90 mb-2">
                        Client Documents:
                      </h4>
                      {req.clientDocuments?.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {req.clientDocuments.map((doc, i) => (
                            <li key={i}>
                              <a
                                href={doc.filePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent-blue hover:underline text-base"
                              >
                                {doc.fileName}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-light-secondary/60 italic text-base">
                          None
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-base text-light-secondary/90 mb-2">
                        Admin Documents:
                      </h4>
                      {req.adminDocuments?.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {req.adminDocuments.map((doc, i) => (
                            <li key={i}>
                              <a
                                href={doc.filePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent-blue hover:underline text-base"
                              >
                                {doc.fileName}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-light-secondary/60 italic text-base mb-6">
                          None
                        </p>
                      )}
                      <AdminFileUpload
                        request={req}
                        onUpdate={handleRequestUpdate}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
      {filteredRequests.length === 0 && (
        <p className="text-center py-10 text-light-secondary/70">
          No requests match your criteria.
        </p>
      )}
    </div>
  );
};

export default AllRequestsSection;
