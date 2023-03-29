const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = Schema({
  title: {
    type: String,
    required: [true, 'Escribe algo'],
		unique: true
  },
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model("Wishlist", WishlistSchema);