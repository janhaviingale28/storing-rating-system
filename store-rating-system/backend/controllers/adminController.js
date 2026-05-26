const { User, Store, Rating } = require("../models");

// dashboard
exports.getDashboard = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalStores = await Store.count();
        const totalRatings = await Rating.count();

        res.json({
            totalUsers,
            totalStores,
            totalRatings
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get stores
exports.getStores = async (req, res) => {
    try {
        const stores = await Store.findAll();

        res.json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// add store
exports.addStore = async (req, res) => {
    try {
        const { name, email, address } = req.body;

        const store = await Store.create({
            name,
            email,
            address
        });

        res.status(201).json({
            message: "Store added successfully",
            store
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// add user
exports.addUser = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            address,
            role
        });

        res.status(201).json({
            message: "User added successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};