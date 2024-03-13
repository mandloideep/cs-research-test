import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import Signup from "./components/signup.tsx";
import Dashboard from "./components/dashboard.tsx";
import ProtectedRoute from "./utils/PrivateRoutes.tsx";
import ErrorPage from "./components/error-page.tsx";

import Login from "./components/login.tsx";
import LayoutPage from "./components/layout-page.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme="system"
      storageKey="ui-theme"
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LayoutPage />}
          >
            <Route
              index
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<ErrorPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
