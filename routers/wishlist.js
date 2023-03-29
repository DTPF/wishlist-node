const express = require("express");
const WishlistController = require("../controllers/wishlist");
const api = express.Router();

api.get("/get-wishlist", WishlistController.getWishlist)
	 .post("/new-wishlist", WishlistController.newWishlist);

module.exports = api;