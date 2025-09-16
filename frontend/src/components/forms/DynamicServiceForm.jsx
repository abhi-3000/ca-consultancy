import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DynamicServiceForm = ({ service }) => {
  const [textData, setTextData] = useState({});
  const [fileData, setFileData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFileData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setTextData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = await getToken();

      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceId: service._id, formData: textData }),
      });

      if (!response.ok)
        throw new Error("Failed to create the service request.");

      const newRequest = await response.json();
      const requestId = newRequest.request._id;

      const filesToUpload = Object.values(fileData).filter(Boolean);
      if (filesToUpload.length > 0) {
        const uploadPromises = filesToUpload.map((file) => {
          const formData = new FormData();
          formData.append("document", file);
          return fetch(
            `http://localhost:5000/api/requests/${requestId}/upload`,
            {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            }
          );
        });
        await Promise.all(uploadPromises);
      }

      const submittedFileNames = Object.values(fileData)
        .filter(Boolean)
        .map((file) => file.name);

      navigate("/request-confirmation", {
        state: {
          serviceTitle: service.title,
          submittedTextData: textData,
          submittedFiles: submittedFileNames,
          formFields: service.formFields,
        },
      });

      // CORRECTED: The 'catch' block does not use an arrow function (=>).
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-dark-secondary p-8 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold font-poppins text-light-primary mb-2">
          {service.title}
        </h2>
        <p className="text-light-secondary mb-6">
          Please fill out the details below to start your request.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {service.formFields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-light-secondary mb-1"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {field.fieldType === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-dark-primary border border-white/10 rounded-md px-4 py-3 text-light-primary placeholder-light-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                />
              ) : (
                <input
                  type={field.fieldType}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  onChange={handleChange}
                  className="w-full bg-dark-primary border border-white/10 rounded-md px-4 py-3 text-light-primary placeholder-light-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 font-poppins font-semibold text-dark-primary bg-light-primary hover:bg-light-secondary transition-colors duration-300 py-3 px-8 rounded-full shadow-lg disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default DynamicServiceForm;
