const User = require("./User");
const Store = require("./Store");
const Rating = require("./Rating");

// associations AFTER models load
setTimeout(() => {
    User.hasMany(Rating);
    Rating.belongsTo(User);

    Store.hasMany(Rating);
    Rating.belongsTo(Store);
}, 0);

module.exports = {
    User,
    Store,
    Rating
};