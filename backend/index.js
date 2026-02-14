require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/auth.routes.js");
const incomeRoutes = require("./routes/income.routes.js");
const expenseRoutes = require("./routes/expense.routes.js");
const dashboardRoutes = require("./routes/dashboard.routes.js");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Add this in server.js before app.use("/api/v1/auth", authRoutes);
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Server upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}`),
);
