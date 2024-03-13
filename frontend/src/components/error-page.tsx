import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const ErrorPage = () => {
  const location = useLocation(); // Access the current location object
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to navigate to the home page
  const goHome = () => {
    navigate("/");
  };

  // Error page UI showing the non-existent route and providing a way to return home
  return (
    <div>
      <div className="flex items-center justify-center w-full py-16">
        <div className="grid gap-4 text-center">
          <div className="space-y-2">
            {/* Display the non-existent path and inform the user the page doesn't exist */}
            <h1 className="text-4xl font-bold">
              Oops, the page <code>{location.pathname}</code> does not exist!
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Please click the button below to go back to the home page.
            </p>
          </div>
          {/* Button to navigate back to the home page */}
          <Button
            className="text-sm"
            variant="outline"
            onClick={goHome}
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
