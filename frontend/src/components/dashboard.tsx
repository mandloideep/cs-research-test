import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Dashboard = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Retrieve the current user's username from sessionStorage
  const username = sessionStorage.getItem("username");

  // Function to clear session storage and navigate to the login page
  const logout = () => {
    sessionStorage.clear(); // Clear all stored session data
    navigate("/"); // Navigate back to the home/login page
  };

  // Dashboard UI
  return (
    <div>
      {/* Dashboard greeting and logout button */}
      <div className="flex items-center justify-center w-full py-16">
        <div className="grid gap-4 text-center">
          <div className="space-y-2">
            {/* Greeting message with the user's username */}
            <h1 className="text-4xl font-bold">
              Welcome, {username} to the Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Have a good day!</p>
          </div>
          {/* Logout button */}
          <Button
            className="text-sm"
            variant="outline"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
