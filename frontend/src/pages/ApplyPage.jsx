import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth, SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";

// CORRECTED: Using an absolute path from the `src` directory for robustness
import DynamicServiceForm from "/src/components/forms/DynamicServiceForm.jsx";

const ApplyPage = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch service data if Clerk has loaded and the user is logged in.
    if (isLoaded && isSignedIn) {
      const fetchService = async () => {
        try {
          const response = await fetch(
            `https://ca-consultancy.onrender.com/api/services/${id}`
          );
          if (!response.ok)
            throw new Error("Service data could not be fetched.");
          const data = await response.json();
          setService(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchService();
    } else if (isLoaded) {
      setLoading(false); // If not signed in, we can stop loading.
    }
  }, [id, isSignedIn, isLoaded]);

  // This function will be called by the form on successful submission.
  const handleSubmissionSuccess = () => {
    // A great UX is to navigate the user to their dashboard after applying.
    navigate("/dashboard");
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary text-light-primary">
        Loading...
      </div>
    );
  }

  // --- RENDER LOGIC ---

  // If the user IS signed in and we have the service data, render the form.
  if (isSignedIn && service) {
    return (
      <div className="py-4 md:py-12 bg-gradient-to-t from-dark-primary to-dark-secondary">
        <DynamicServiceForm
          service={service}
          onSubmissionSuccess={handleSubmissionSuccess}
        />
      </div>
    );
  }

  // If the user IS NOT signed in, render the sign-in prompt.
  if (!isSignedIn) {
    return (
      <div className="min-h-[60dvh] flex flex-col items-center justify-center text-center bg-gradient-to-t from-dark-primary to-dark-secondary p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-poppins text-3xl font-bold text-light-primary">
            Almost there!
          </h2>
          <p className="mt-4 max-w-md text-light-secondary">
            Please sign in or create an account to apply for this service.
          </p>
          <div className="mt-8">
            {/* This is the magic: afterSignInUrl redirects the user right back here! */}
            <SignInButton mode="modal" afterSignInUrl={`/apply/${id}`}>
              <button className="font-poppins font-semibold text-dark-primary bg-light-primary hover:bg-light-secondary transition-colors duration-300 py-3 px-8 rounded-full shadow-lg">
                Sign In to Continue
              </button>
            </SignInButton>
          </div>
        </motion.div>
      </div>
    );
  }

  // Fallback for any other state (e.g., service not found after login).
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-primary text-light-primary">
      Could not load the requested service.
    </div>
  );
};

export default ApplyPage;
