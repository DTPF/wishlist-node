const Wishlist = require('../models/wishlist.model')
const User = require('../models/user.model')

async function postNewWishlist(req, res) {
	const { userId, wishlistName } = req.body;
	const wishlist = new Wishlist();
	wishlist.userId = userId;
	wishlist.wishlistName = wishlistName;

	try {
		const authUser = await User.findOne({ userId: req.auth.payload.sub }).lean().exec();

		if (userId !== authUser._id.toString()) {
			return res.status(401).send({ status: 401, message: 'No tienes permisos' });
		} else {
			try {
				const wishlistStored = await wishlist.save();

				return res.status(200).send({
					status: 200,
					message: 'Añadido correctamente',
					wishlist: wishlistStored,
				});
			} catch (err) {
				return res.status(500).send({ status: 500, message: 'Error del servidor', error: err });
			}
		}
	} catch (error) {
		return res.status(500).send({ status: 500, message: 'Error del servidor', error: err });
	}
}

async function getWishlistsByUserId(req, res) {
	const { userId } = req.params;

	try {
		const wishlists = await Wishlist.find({ userId: userId }).sort({ updatedAt: "asc" });

		if (wishlists.length === 0) {
			return res.status(400).send({ status: 400, message: 'No se ha encontrado nada' });
		} else {
			return res.status(200).send({
				status: 200,
				wishlists: wishlists,
			});
		}

	} catch (err) {
		res.status(500).send({ status: 406, message: 'Error del servidor' });
	}
}

async function getWishlistById(req, res) {
	const { wishlistId, userId } = req.params;

	try {
		const wishlist = await Wishlist.findById({ _id: wishlistId })

		try {
			const user = await User.findByIdAndUpdate(
				{ _id: userId },
				{ wishlistsInfo: { currentWishlist: wishlistId } },
				{ returnOriginal: false }
			)

			return res.status(200).send({
				status: 200,
				wishlist,
				user
			});
		} catch (err) {
			return res.status(500).send({ status: 500, message: 'Error del servidor' });
		}
	} catch (err) {
		return res.status(500).send({ status: 501, message: 'Error del servidor' });
	}
}

async function postNewWishlistItem(req, res) {
	const { wishlistId } = req.params;
	const { wishlistItemId, title, description } = req.body;

	try {
		const newObj = {
			id: wishlistItemId,
			title,
			description,
			isCompleted: false
		}
		const wishlistItemStored = await Wishlist.findByIdAndUpdate(
			{ _id: wishlistId },
			{
				$push: {
					wishlistItems: newObj
				}
			},
			{ returnOriginal: false }
		);

		return res.status(200).send({
			status: 200,
			message: 'Añadido correctamente',
			wishlistStored: wishlistItemStored,
			newWishlistItem: newObj
		});
	} catch (err) {
		if (err.name = 'CastError') {
			return res.status(404).send({ status: 404, message: err });
		} else {
			return res.status(500).send({ status: 500, message: err });
		}
	}
}

async function removeWishlistItem(req, res) {
	const { wishlistId, wishlistItemId } = req.params;

	try {
		const wishlistStored = await Wishlist.findByIdAndUpdate(
			{ _id: wishlistId },
			{ $pull: { wishlistItems: { id: wishlistItemId } } },
			{ returnOriginal: false }
		);

		return res.status(200).send({ status: 200, wishlistRemoved: wishlistStored });

	} catch (err) {
		return res.status(500).send({ status: 500, message: err });
	}
}

module.exports = {
	postNewWishlist,
	getWishlistsByUserId,
	getWishlistById,
	postNewWishlistItem,
	removeWishlistItem
}