import { Navigate } from "react-router-dom";

// Component to protect routes from unauthenticated users
const ProtectedRoute = ({ children }) => {
  // Check if the user is logged in
  const isLoggedIn = sessionStorage.getItem("username") !== null;

  if (!isLoggedIn) {
    // User is not logged in, redirect them to the login page
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // User is logged in, allow access to the child component
  return children;
};

export default ProtectedRoute;
