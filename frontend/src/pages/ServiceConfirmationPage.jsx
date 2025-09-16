import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
// CORRECTED: Using the specific import path for Font Awesome 6 icons which is more stable
import { FaCheckCircle, FaFileAlt } from "react-icons/fa";

const ServiceConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    serviceTitle,
    submittedTextData = {},
    submittedFiles = [],
    formFields = [],
  } = location.state || {};

  useEffect(() => {
    // If someone lands on this page directly without data, redirect them.
    if (!serviceTitle) {
      navigate("/");
    }
  }, [serviceTitle, navigate]);

  if (!serviceTitle) return null; // Render nothing while redirecting

  // Helper to find the label for a given field name
  const getFieldLabel = (fieldName) => {
    const field = formFields.find((f) => f.name === fieldName);
    return field ? field.label : fieldName;
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-secondary to-dark-primary p-4 overflow-hidden">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={300}
        gravity={0.1}
      />
      <motion.div
        className="relative w-full max-w-2xl bg-dark-secondary border border-white/10 rounded-2xl p-8 md:p-12 text-center shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="h-16 w-16 text-green-400" />
        </div>
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-light-primary">
          Request Submitted!
        </h1>
        <p className="mt-4 text-light-secondary font-inter">
          Your request has been received and you can now track its status in
          your dashboard.
        </p>

        <div className="mt-8 pt-6 border-t border-white/10 text-left">
          <h2 className="font-poppins font-semibold text-lg text-light-primary">
            Request Summary
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-semibold text-light-secondary/70">
                Service Availed:
              </p>
              <p className="font-inter text-light-primary">{serviceTitle}</p>
            </div>
            {/* Display submitted text data */}
            {Object.entries(submittedTextData).map(
              ([key, value]) =>
                value && (
                  <div key={key}>
                    <p className="text-sm font-semibold text-light-secondary/70">
                      {getFieldLabel(key)}:
                    </p>
                    <p className="font-inter text-light-primary whitespace-pre-wrap">
                      {value}
                    </p>
                  </div>
                )
            )}
            {/* Display submitted files */}
            {submittedFiles.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-light-secondary/70">
                  Uploaded Documents:
                </p>
                <ul className="mt-2 space-y-1">
                  {submittedFiles.map((fileName, index) => (
                    <li
                      key={index}
                      className="flex items-center text-light-secondary/90"
                    >
                      <FaFileAlt className="h-4 w-4 mr-3 text-accent-blue flex-shrink-0" />
                      <span className="font-inter">{fileName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="font-poppins font-semibold text-dark-primary bg-light-primary hover:bg-light-secondary transition-colors duration-300 py-3 px-8 rounded-full shadow-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ServiceConfirmationPage;
