import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axios";

// Import UI components for form and validation feedback

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
  // State for form input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // State for form validation errors
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  // State for server error
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;

    // Reset error states
    setUsernameError("");
    setEmailError("");
    setNameError("");

    if (!username) {
      setUsernameError("Username is required.");
      isValid = false;
    }
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    }
    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    }

    return isValid;
  };

  const validatePassword = () => {
    // Password validation checks
    const hasMinLength = password.length >= 8;
    const hasUpperCase = password
      .split("")
      .some(
        (char) => char === char.toUpperCase() && char !== char.toLowerCase()
      );
    const hasLowerCase = password
      .split("")
      .some(
        (char) => char === char.toLowerCase() && char !== char.toUpperCase()
      );
    const hasNumeric = password
      .split("")
      .some((char) => !isNaN(char) && char !== " ");
    const hasSpecial = password
      .split("")
      .some((char) => `~!@#$%&^*-=_`.includes(char));

    // Set password error messages
    if (!hasMinLength) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }
    if (!hasUpperCase) {
      setPasswordError("Password must include at least one uppercase letter.");
      return false;
    }
    if (!hasLowerCase) {
      setPasswordError("Password must include at least one lowercase letter.");
      return false;
    }
    if (!hasNumeric) {
      setPasswordError("Password must include at least one numeric character.");
      return false;
    }
    if (!hasSpecial) {
      setPasswordError(
        "Password must include at least one special character (~!@#$%&^*-=_)."
      );
      return false;
    }

    setPasswordError(""); // Clear any previous error message
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission
    e.preventDefault();

    // validate the form inputs
    if (!validate()) return;
    setPasswordError("");
    // Validate the password
    const isPasswordValid = validatePassword();
    if (!isPasswordValid) return;
    // Send a POST request to the server
    try {
      const response = await axiosInstance.post("/api/signup", {
        username,
        password,
        email,
        name,
      });

      // Check response status and throw custom error if necessary
      if (response.status === 400) {
        throw new Error("Custom error message for status 400.");
      }

      // Handle successful signup
      sessionStorage.setItem("username", username);
      navigate("/dashboard");
    } catch (error) {
      // This will catch any network errors, and any errors thrown in the then block
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
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 pt-4">
              <Label
                className="float-left mb-2"
                htmlFor="name"
              >
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <p className="text-red-500">{nameError}</p>}
            </div>
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
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                id="email"
                placeholder="Email"
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
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
              className="ml-auto mr-auto w-1/2"
              size="lg"
            >
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="flex items-center justify-center w-full py-16">
        <div className="grid gap-4 text-center">
          <div className="space-y-2">
            <p className="text-gray-500 dark:text-gray-400">
              Already have an account
            </p>
          </div>
          <Button
            className="text-sm"
            variant="outline"
            onClick={() => navigate("/")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
