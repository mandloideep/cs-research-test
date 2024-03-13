import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axios";

// UI components from a design system or component library
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  // States for input values and validation errors
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // Function to validate input fields
  const validate = () => {
    let isValid = true;

    // Reset validation messages
    setUsernameError("");
    setPasswordError("");

    // Check for empty fields and set error messages
    if (!username) {
      setUsernameError("Username is required.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }
    return isValid;
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // Stop submission if validation fails
    try {
      const response = await axiosInstance.post("api/login", {
        username,
        password,
      });
      if (response.status === 400) {
        throw new Error("Custom error message for status 400."); // Custom error for specific status
      }
      sessionStorage.setItem("username", username); // Persist user session
      navigate("/dashboard"); // Navigate to dashboard on success
    } catch (error) {
      // Handle errors from API or thrown custom errors
      setError(
        error.response
          ? error.response.data.errors[0] ||
              "An error occurred with your request."
          : "An unknown error occurred."
      );
    }
  };

  // Login form layout
  return (
    <div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your username below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <p className="text-red-500">{usernameError}</p>}
            </div>
            <div className="space-y-4 pt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              {error && <p className="text-red-500">{error}</p>}{" "}
              {/* General error message */}
            </div>
          </CardContent>
          <CardFooter className="flex row-auto">
            <Button
              className="ml-auto mr-auto pl-2 pr-2 w-1/3"
              size="lg"
            >
              Log In
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="flex items-center justify-center w-full py-16">
        <div className="grid gap-4 text-center">
          <div className="space-y-2">
            <p className="text-gray-500 dark:text-gray-400">
              Don't have an account
            </p>
          </div>
          <Button
            className="text-sm"
            variant="outline"
            onClick={() => navigate("/signup")}
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </div>
  );
}
