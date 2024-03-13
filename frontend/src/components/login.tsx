import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axios";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;

    // Reset error states
    setUsernameError("");
    setPasswordError("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    try {
      const response = await axiosInstance.post("api/login", {
        username,
        password,
      });
      if (response.status === 400) {
        throw new Error("Custom error message for status 400.");
      }

      // Handle successful signup
      sessionStorage.setItem("username", username);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        // Handle errors sent by the server
        setError(
          error.response.data.errors[0] ||
            "An error occurred with your request."
        );
      } else {
        setError("An unknown error occurred."); // Fallback error message
      }
    }
  };
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
              <Label
                className="float-left mb-2"
                htmlFor="username"
              >
                Username
              </Label>
              <Input
                id="username"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <p className="text-red-500">{usernameError}</p>}
            </div>
            <div className="space-y-4 pt-4">
              <Label
                className="float-left mb-2"
                htmlFor="password"
              >
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              {error && <p className="text-red-500">{error}</p>}
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
