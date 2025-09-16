import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth, useUser } from "@clerk/clerk-react";

// --- Reusable Payment Button Component ---
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
      const invoiceAmount = parseFloat(request.invoice.amount);
      if (isNaN(invoiceAmount) || invoiceAmount <= 0) {
        alert("Invalid invoice amount. Cannot proceed with payment.");
        return;
      }

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
            amount: invoiceAmount,
            requestId: request._id,
          }),
        }
      );

      if (!orderResponse.ok)
        throw new Error("Failed to create payment order on the backend.");
      const order = await orderResponse.json();

      if (!order || !order.id) {
        alert("Backend did not return a valid Order ID.");
        return;
      }

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        alert("Razorpay Key ID is not configured in the frontend .env file.");
        return;
      }

      const options = {
        key: razorpayKey,
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
      console.error("Payment Error:", error);
      alert(
        `Oops! Something went wrong. Error in opening checkout: ${error.message}`
      );
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="font-poppins font-semibold text-xs bg-accent-blue text-white py-2 px-4 rounded-full hover:bg-opacity-90 transition-all"
    >
      Pay Now
    </button>
  );
};

// --- Reusable Secure Download Button Component ---
const DownloadButton = ({ request }) => {
  const { getToken } = useAuth();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const token = await getToken();
      const response = await fetch(
        `https://ca-consultancy.onrender.com/api/receipts/${request._id}/download`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Could not download the receipt.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `receipt-${request._id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Download error:", error);
      alert(error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="font-poppins font-semibold text-sm text-accent-blue hover:underline transition-all disabled:opacity-50"
    >
      {isDownloading ? "Preparing..." : "Download Bill"}
    </button>
  );
};

// --- Main Billing History Component ---
const BillingHistorySection = ({ requests = [], onPaymentSuccess }) => {
  const invoices = useMemo(() => {
    return requests
      .filter(
        (req) =>
          req.status === "Payment Due" || req.invoice?.paymentStatus === "Paid"
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [requests]);

  if (invoices.length === 0) {
    return (
      <div className="text-center py-16 bg-dark-secondary/50 rounded-lg border border-white/10">
        <p className="text-xl text-light-secondary font-inter">
          No billing history found.
        </p>
        <p className="text-light-secondary/70 mt-2">
          Invoices for your services will appear here.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-dark-secondary p-4 sm:p-6 rounded-xl border border-white/10 overflow-x-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <table className="min-w-full divide-y divide-white/10">
        <thead className="text-left">
          <tr>
            <th className="py-3 px-4 text-xs font-poppins font-semibold text-light-secondary/70 uppercase">
              Service
            </th>
            <th className="py-3 px-4 text-xs font-poppins font-semibold text-light-secondary/70 uppercase">
              Invoice Date
            </th>
            <th className="py-3 px-4 text-xs font-poppins font-semibold text-light-secondary/70 uppercase">
              Amount
            </th>
            <th className="py-3 px-4 text-xs font-poppins font-semibold text-light-secondary/70 uppercase">
              Status
            </th>
            <th className="py-3 px-4 text-xs font-poppins font-semibold text-light-secondary/70 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {invoices.map((req) => (
            <tr key={req._id}>
              <td className="py-4 px-4 font-inter text-sm text-light-primary font-medium">
                {req.serviceId?.title || "Archived Service"}
              </td>
              <td className="py-4 px-4 font-inter text-sm text-light-secondary">
                {new Date(req.updatedAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-4 font-inter text-sm text-light-secondary">
                ₹{req.invoice.amount}
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-5 py-2 text-sm font-medium rounded-full ${
                    req.invoice.paymentStatus === "Paid"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {req.invoice.paymentStatus}
                </span>
              </td>
              <td className="py-4 px-4">
                {req.invoice.paymentStatus === "Paid" ? (
                  <DownloadButton request={req} />
                ) : (
                  <PaymentButton
                    request={req}
                    onPaymentSuccess={onPaymentSuccess}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default BillingHistorySection;
