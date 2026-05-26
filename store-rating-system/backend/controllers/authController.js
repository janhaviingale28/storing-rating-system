const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ===================== REGISTER =====================
exports.register = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        // check missing fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        // check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user (DEFAULT ROLE = user)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role: "user"
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ===================== LOGIN =====================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        // find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // generate JWT (ROLE FIXED LOWERCASE)
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role.toLowerCase()
            },
            process.env.JWT_SECRET || "secretkey",
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role.toLowerCase()
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};