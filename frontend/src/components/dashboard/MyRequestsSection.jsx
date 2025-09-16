import { useState, useEffect, useMemo } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";

const FileUpload = ({ requestId, onUploadSuccess }) => {
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
        `https://ca-consultancy.onrender.com/api/requests/${requestId}/upload`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      if (!response.ok) throw new Error("File upload failed.");
      const updatedRequest = await response.json();
      onUploadSuccess(updatedRequest);
      setFile(null);
      const fileInput = document.getElementById(`file-input-${requestId}`);
      if (fileInput) fileInput.value = null;
      alert("File uploaded successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <label className="block text-sm font-medium text-light-secondary mb-2">
        Upload an additional document:
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="file"
          id={`file-input-${requestId}`}
          onChange={handleFileChange}
          className="block w-full text-sm text-light-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-dark-primary file:text-light-primary hover:file:bg-opacity-80"
        />
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="px-4 py-2 bg-accent-blue text-white text-sm rounded-full hover:bg-opacity-90 disabled:bg-opacity-50 transition"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

const PaymentButton = ({ request, onPaymentSuccess }) => {
  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      const token = await getToken();
      const orderResponse = await fetch(
        "https://ca-consultancy.onrender.com/api/payments/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: request.invoice.amount,
            requestId: request._id,
          }),
        }
      );

      if (!orderResponse.ok) throw new Error("Failed to create payment order.");
      const order = await orderResponse.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "CA Consultancy Services",
        description: `Payment for ${request.serviceId?.title || "Service"}`,
        order_id: order.id,
        handler: async (response) => {
          const verifyResponse = await fetch(
            "https://ca-consultancy.onrender.com/api/payments/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ ...response, requestId: request._id }),
            }
          );
          if (!verifyResponse.ok)
            throw new Error("Payment verification failed.");
          const result = await verifyResponse.json();
          if (result.success) {
            alert("Payment Successful!");
            onPaymentSuccess(request._id);
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
        },
        theme: { color: "#2c5364" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full mt-4 font-poppins font-semibold text-sm bg-accent-blue text-white py-2.5 rounded-lg hover:bg-opacity-90 transition-all"
    >
      Pay ₹{request.invoice.amount} Now
    </button>
  );
};

function Dashboard({ requests, loading, error, setRequests }) {
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filteredRequests = useMemo(() => {
    if (filter === "All") return requests;
    const statusMap = {
      "In Progress": "Under Process",
      "Payment Due": "Payment Due",
      Completed: "Completed",
    };
    return requests.filter((r) => r.status === statusMap[filter]);
  }, [requests, filter]);

  const FilterButton = ({ label }) => (
    <button
      onClick={() => setFilter(label)}
      className={`font-inter text-sm py-2 px-4 rounded-full transition-colors duration-200 ${
        filter === label
          ? "bg-accent-blue text-white"
          : "text-light-secondary hover:bg-dark-secondary/80"
      }`}
    >
      {label}
    </button>
  );

  const handleUploadSuccess = (updatedRequest) => {
    setRequests((prev) =>
      prev.map((req) => (req._id === updatedRequest._id ? updatedRequest : req))
    );
  };

  const handlePaymentSuccess = (paidRequestId) => {
    setRequests((prev) =>
      prev.map((req) =>
        req._id === paidRequestId
          ? {
              ...req,
              invoice: { ...req.invoice, paymentStatus: "Paid" },
              status: "Under Process",
            }
          : req
      )
    );
  };

  if (loading)
    return (
      <p className="text-center text-light-secondary">
        Loading your requests...
      </p>
    );
  if (error)
    return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="bg-dark-secondary p-6 rounded-xl border border-white/10">
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/10 pb-4">
        <span className="text-sm font-semibold text-light-secondary mr-2">
          Filter by status:
        </span>
        <FilterButton label="All" />
        <FilterButton label="In Progress" />
        <FilterButton label="Payment Due" />
        <FilterButton label="Completed" />
      </div>

      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <div
              key={req._id}
              className="bg-dark-primary/50 rounded-lg border border-white/5 overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === req._id ? null : req._id)
                }
                className="w-full flex flex-col md:flex-row justify-between items-start md:items-center p-4 text-left transition-colors hover:bg-white/5"
              >
                <div>
                  <h3 className="font-poppins font-semibold text-light-primary">
                    {req.serviceId?.title || "Archived Service"}
                  </h3>
                  <p className="text-xs text-light-secondary/60 font-inter mt-1">
                    Requested on: {new Date(req.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-3 md:mt-0 flex items-center gap-4">
                  <span
                    className={`px-3 py-2 text-sm font-medium rounded-full ${
                      req.status === "Completed"
                        ? "bg-green-500/20 text-green-300"
                        : req.status === "Payment Due"
                        ? "bg-red-500/20 text-red-300"
                        : req.status === "Under Process"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {req.status}
                  </span>
                  <span className="text-xs text-accent-blue hover:underline">
                    {expandedId === req._id ? "Hide Details" : "View Details"}
                  </span>
                </div>
              </button>
              <AnimatePresence>
                {expandedId === req._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-4 pb-4"
                  >
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="font-semibold text-light-primary">
                        Your Documents:
                      </h4>
                      {req.clientDocuments?.length > 0 ? (
                        <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                          {req.clientDocuments.map((doc, index) => (
                            <li key={index}>
                              <a
                                href={doc.filePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent-blue hover:underline"
                              >
                                {doc.fileName}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-light-secondary/60 mt-1">
                          No documents uploaded.
                        </p>
                      )}

                      <h4 className="font-semibold text-light-primary mt-4">
                        Received Documents:
                      </h4>
                      {req.adminDocuments?.length > 0 ? (
                        <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                          {req.adminDocuments.map((doc, index) => (
                            <li key={index}>
                              <a
                                href={doc.filePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent-blue hover:underline"
                              >
                                {doc.fileName}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-light-secondary/60 mt-1">
                          No documents from admin yet.
                        </p>
                      )}

                      <FileUpload
                        requestId={req._id}
                        onUploadSuccess={handleUploadSuccess}
                      />

                      {req.status === "Payment Due" && req.invoice?.amount && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <h4 className="font-semibold text-light-primary">
                            Invoice Ready
                          </h4>
                          <p className="text-sm text-light-secondary/70 mt-1">
                            An invoice has been generated. Please complete the
                            payment to proceed.
                          </p>
                          <PaymentButton
                            request={req}
                            onPaymentSuccess={handlePaymentSuccess}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-light-secondary/70">
            No requests match this filter.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
