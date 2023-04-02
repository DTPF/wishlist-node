const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = Schema({
  userId: String,
  wishlistName: String,
  wishlistItems: []
}, {
  timestamps: true
});

module.exports = mongoose.model("Wishlist", WishlistSchema);