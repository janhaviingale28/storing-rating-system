const Rating = require("../models/Rating");
const Store = require("../models/Store");

exports.submitRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { storeId, rating } = req.body;

        const numericRating = Number(rating);

        const store = await Store.findByPk(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        let userRating = await Rating.findOne({
            where: {
                UserId: userId,
                StoreId: storeId
            }
        });

        if (userRating) {
            userRating.rating = numericRating;
            await userRating.save();
        } else {
            userRating = await Rating.create({
                rating: numericRating,
                UserId: userId,
                StoreId: storeId
            });
        }

        const ratings = await Rating.findAll({
            where: { StoreId: storeId }
        });

        const avg =
            ratings.length > 0
                ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
                : 0;

        store.rating = avg;
        await store.save();

        res.json({
            message: "Rating saved successfully",
            averageRating: avg
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};