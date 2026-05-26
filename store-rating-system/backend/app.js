require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

// models sync
require("./models");

// routes

const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("API Running ");
});

// routes

app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);

// DB connection
sequelize
    .authenticate()
    .then(() => console.log("DB Connected "))
    .catch((err) => console.log("DB Error :", err));

// sync tables
sequelize.sync({ force: true }) 
    .then(() => console.log("Tables synced "))
    .catch((err) => console.log("Sync error :", err));

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});