const jwt = require("jsonwebtoken");

// ================= VERIFY TOKEN =================
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // format: Bearer token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secretkey"
        );

        req.user = decoded; // user info attach
        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
};

// ================= ROLE CHECK =================
const checkRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied" });
        }

        next();
    };
};

module.exports = { verifyToken, checkRole };