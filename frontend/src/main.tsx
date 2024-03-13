import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global styles

// React Router for routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Custom theme provider for styling
import { ThemeProvider } from "@/components/theme-provider";

// Importing page components
import Signup from "./components/signup.tsx";
import Dashboard from "./components/dashboard.tsx";
import ProtectedRoute from "./utils/PrivateRoutes.tsx"; // Utility for protected routes
import ErrorPage from "./components/error-page.tsx"; // Page shown for unmatched routes

import Login from "./components/login.tsx"; // Login page component
import LayoutPage from "./components/layout-page.tsx"; // Layout wrapper component

// Render the application into the 'root' div in index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme="system" // Setting the default theme
      storageKey="ui-theme" // LocalStorage key for saving theme preferences
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LayoutPage />} // Wrap all routes with LayoutPage for consistent layout
          >
            <Route
              index // The default route shown at the application's root
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />} // Signup page route
            />
            <Route
              path="/dashboard"
              // Protected route for the dashboard page
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="*" // Catch-all route for unmatched paths
              element={<ErrorPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
