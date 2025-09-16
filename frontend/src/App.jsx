import { Routes, Route, Navigate } from "react-router-dom";
import { useUser, SignedIn } from "@clerk/clerk-react";

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

import LandingPage from "./components/landingpage/LandingPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ServiceDetailsPage from "./pages/ServiceDetailsPage.jsx";
import ApplyPage from "./pages/ApplyPage.jsx";
import ClientDashboard from "./pages/ClientDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ServiceConfirmationPage from "./pages/ServiceConfirmationPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";
// A reusable component to protect routes that require a user to be logged in
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded)
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        Loading...
      </div>
    );

  // If the user is signed in, show the page. Otherwise, redirect to the home page.
  return children;
};

function App() {
  const { user, isLoaded } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        Loading Application...
      </div>
    );
  }

  return (
    <div className="bg-dark-secondary min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          {/* <Route
            path="/"
            element={
              <SignedIn>
                {isAdmin ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <Navigate to="/dashboard" />
                )}
              </SignedIn>
            }
          >
            <Route index element={<LandingPage />} />
          </Route> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          {/* --- PROTECTED ROUTES (Require Login) --- */}
          <Route
            path="/apply/:id"
            element={
              <ProtectedRoute>
                <ApplyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                {isAdmin ? <AdminDashboard /> : <Navigate to="/dashboard" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/request-confirmation"
            element={
              <ProtectedRoute>
                <ServiceConfirmationPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route for any other URL */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   SignUpButton,
//   UserButton,
//   useUser,
// } from "@clerk/clerk-react";

// // Import the high-level page components you created, with explicit file extensions
// import ClientView from "./pages/ClientView.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";

// function App() {
//   // The useUser hook is the key. It gives us the full user object from Clerk.
//   const { isSignedIn, user, isLoaded } = useUser();

//   // It's important to show a loading state while Clerk initializes.
//   // This prevents flickering or showing the wrong view for a split second.
//   if (!isLoaded) {
//     return (
//       <div className="flex justify-center items-center min-h-screen font-sans text-gray-600">
//         Loading Application...
//       </div>
//     );
//   }

//   // We check the user's publicMetadata for the 'admin' role.
//   // The ?. is optional chaining, which prevents errors if 'user' or 'publicMetadata' doesn't exist.
//   const isAdmin = user?.publicMetadata?.role === "admin";

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center font-sans">
//       <header className="w-full flex justify-between items-center p-6 shadow-sm bg-white sticky top-0 z-10">
//         <div className="text-xl font-bold text-gray-800">CA Consultancy</div>
//         <div>
//           <SignedIn>
//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>
//           <SignedOut>
//             <div className="flex gap-4">
//               <SignInButton mode="modal">
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                   Sign In
//                 </button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </div>
//           </SignedOut>
//         </div>
//       </header>

//       <main className="flex-grow w-full text-center px-4 py-12">
//         <SignedIn>
//           {/* This is the core logic. If the user is an admin, show the AdminDashboard.
//               Otherwise, show the standard ClientView. */}
//           {isAdmin ? <AdminDashboard /> : <ClientView />}
//         </SignedIn>
//         <SignedOut>
//           <div className="pt-20">
//             <h1 className="text-4xl font-bold text-gray-800 mb-4">
//               Welcome to the CA Consultancy Platform
//             </h1>
//             <p className="text-lg text-gray-600">
//               Please sign in to view our services and manage your requests.
//             </p>
//           </div>
//         </SignedOut>
//       </main>
//     </div>
//   );
// }

// export default App;
