import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Dashboard = () => {
  const navigate = useNavigate();

  const username = sessionStorage.getItem("username");

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full py-16">
        <div className="grid gap-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">
              Welcome, {username} to the Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Have a good day!</p>
          </div>
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
