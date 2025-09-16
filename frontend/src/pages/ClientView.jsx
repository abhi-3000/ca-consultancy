import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

// Import the components we created earlier
import Dashboard from "./Dashboard";
import ServiceList from "../components/ServiceList";
import DynamicServiceForm from "../components/DynamicServiceForm";

// Main component to render the service selection and form flow
function ServiceFlow({ onSubmissionSuccess }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const { isSignedIn } = useAuth();

  useState(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://ca-consultancy.onrender.com/api/services"
        );
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (isSignedIn) fetchServices();
  }, [isSignedIn]);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (selectedService) {
    return (
      <DynamicServiceForm
        service={selectedService}
        onBack={() => setSelectedService(null)}
        onSubmissionSuccess={onSubmissionSuccess}
      />
    );
  }

  return (
    <ServiceList services={services} onSelectService={setSelectedService} />
  );
}

// This component now holds all the logic for a regular client user
export default function ClientView() {
  const [view, setView] = useState("services"); // 'services' or 'dashboard'

  return (
    <>
      <nav className="flex gap-4 mb-8 justify-center">
        <button
          onClick={() => setView("services")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            view === "services"
              ? "text-blue-700 bg-blue-100"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Services
        </button>
        <button
          onClick={() => setView("dashboard")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            view === "dashboard"
              ? "text-blue-700 bg-blue-100"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          My Dashboard
        </button>
      </nav>

      {view === "services" && (
        <ServiceFlow onSubmissionSuccess={() => setView("dashboard")} />
      )}
      {view === "dashboard" && <Dashboard />}
    </>
  );
}
