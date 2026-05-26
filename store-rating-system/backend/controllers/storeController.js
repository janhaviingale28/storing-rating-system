
const Store = require('../models/Store');

exports.getStores = async (req, res) => {
    const stores = await Store.findAll();
    res.json(stores);
};

exports.addStore = async (req, res) => {
    const { name, email, address } = req.body;

    const store = await Store.create({
        name,
        email,
        address
    });

    res.json(store);
};
