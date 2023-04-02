const express = require("express");
const WishlistController = require("../controllers/wishlist.controller");
const api = express.Router();
const md_auth = require("../middlewares/auth.middleware");

api
	.get("/get-wishlists-by-user-id/:userId", [md_auth.checkJwt], WishlistController.getWishlistsByUserId)
	.get("/get-wishlist-by-id/:wishlistId/:userId", [md_auth.checkJwt], WishlistController.getWishlistById)
	.post("/post-new-wishlist", [md_auth.checkJwt], WishlistController.postNewWishlist)
	//Item
	.post("/post-new-wishlist-item/:wishlistId", [md_auth.checkJwt], WishlistController.postNewWishlistItem)
	.delete("/remove-wishlist-item/:wishlistId/:wishlistItemId", [md_auth.checkJwt], WishlistController.removeWishlistItem);

module.exports = api;