const Wishlist = require('../models/wishlist')

function newWishlist(req, res) {
	const wishlistItem = new Wishlist();
	const { title } = req.body;

	wishlistItem.title = title;
	wishlistItem.completed = false;
	wishlistItem.createdAt = new Date();
	wishlistItem.updatedAt = new Date();

	wishlistItem.save()
		.then(wishlistStored => {
			if (!wishlistStored) {
				res.status(400).send({ status: 400, message: 'No se ha podido crear' });
				return;
			}
			res.status(200).send({
				status: 200,
				message: 'Añadido correctamente',
				wishlistItem: wishlistStored,
			});
		})
		.catch(err => {
			if (err?.errors?.title.kind === 'required') {
				res.status(500).send({ status: 406, message: err.errors.title.message });
				return;
			}
			if (err?.code === 11000) {
				res.status(500).send({ status: 406, message: 'Ya existe' });
				return;
			}
		})
}

function getWishlist(req, res) {
	Wishlist.find()
		.then(wishlistItems => {
			if (!wishlistItems) {
				res.status(400).send({ status: 400, message: 'No se ha encontrado nada' });
				return;
			}
			res.status(200).send({
				status: 200,
				wishlistItems: wishlistItems,
			});
		})
		.catch(err => {
			if (err) {
				res.status(500).send({ status: 406, message: 'Error del servidor' });
				return;
			}
		})
}

module.exports = {
	newWishlist,
	getWishlist
}