const { Schema, model } = require("mongoose");

const UserSchema = Schema({
	userId: {
		type: String,
		required: true,
		unique: [true, 'Ya existe']
	}, // Auth0 id
	wishlistsInfo: {
		currentWishlist: String
	},
	language: String,
}, {
  timestamps: true
});

module.exports = model("User", UserSchema);