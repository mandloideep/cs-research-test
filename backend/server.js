const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Serve static files from React app in production

app.use(express.static(path.join(__dirname, "../frontend/dist/assets")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.use(express.json());

// Mock database
const users = [
  {
    username: "admin",
    name: "Admin",
    email: "admin@admin.com",
    password: "password",
  },
];

// API endpoint for login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (user && password === user.password) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// API endpoint for signup
app.post("/api/signup", async (req, res) => {
  const { email, name, username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }
  users.push({ email, name, username, password: password });
  console.log(users);
  res.status(201).json({ message: "Signup successful" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
