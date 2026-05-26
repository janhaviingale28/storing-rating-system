const jwt = require("jsonwebtoken");

// ================= VERIFY TOKEN =================
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

// ================= ADMIN ONLY =================
const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access denied. Admin only."
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    verifyToken,
    isAdmin
};