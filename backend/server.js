// This is the server-side code for the authentication app. It provides two API endpoints: /api/login and /api/signup. The /api/login endpoint is used to authenticate users, and the /api/signup endpoint is used to create new user accounts.
const express = require("express");
const cors = require("cors");
const path = require("path");
const { check, validationResult } = require("express-validator");

// Create Express server
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Mock database for demonstration purposes

const users = [
  {
    username: "admin",
    name: "Admin",
    email: "admin@admin.com",
    password: "password",
  },
];

// Validation rules for signup
const signupValidationRules = [
  check("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  check("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .matches(/^\w+$/)
    .withMessage("Username must contain only letters, numbers, and underscores")
    .trim()
    .escape(),
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .trim()
    .escape(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must include at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must include at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must include at least one numeric character")
    .matches(/[~!@#$%&^*\-=_]/)
    .withMessage(
      "Password must include at least one special character (~!@#$%&^*-=_)"
    ),
];

// Validation rules for login
const loginValidationRules = [
  check("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username is required"),
  check("password").notEmpty().withMessage("Password is required"),
];

// Middleware to validate requests
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));
  return res.status(400).json({ errors: extractedErrors });
};

// API endpoint for login
app.post(
  "/api/login",
  loginValidationRules,
  validateRequest,
  async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  }
);

// API endpoint for signup
app.post(
  "/api/signup",
  signupValidationRules,
  validateRequest,
  async (req, res) => {
    const { email, name, username, password } = req.body;

    if (users.some((u) => u.username === username)) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (users.some((u) => u.email === email)) {
      return res.status(400).json({ message: "Email already exists" });
    }

    users.push({ email, name, username, password }); // need to hash the password before storing
    res.status(201).json({ message: "Signup successful" });
  }
);

// Serve static files from React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
