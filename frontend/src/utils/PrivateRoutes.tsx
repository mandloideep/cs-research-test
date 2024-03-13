import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
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
