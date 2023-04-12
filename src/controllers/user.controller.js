const User = require('../models/user.model')

async function initGetUser(req, res) {
	const { userId } = req.body

	try {
		const userStored = await User.findOne({ userId: userId.toString() });

		if (!userStored) {
			const user = new User();
			user.userId = userId;
			user.language = 'en';
			user.wishlistsInfo.currentWishlist = 'list-id-no-selected';
			user.wishlistsInfo.wishlistsOrder = 'updatedAt';
			user.wishlistsInfo.wishlistsDirection = 'desc';

			try {
				const userSaved = await user.save();
				return res.status(201).send({ status: 201, message: 'Usuario creado correctamente', user: userSaved })
			}
			catch (err) {
				return res.status(500).send({ status: 500, message: 'No se ha podido crear', error: err })
			}
		} else {
			return res.status(200).send({ status: 200, message: 'Usuario obtenido correctamente', user: userStored })
		}
	}
	catch (err) {
		return res.status(500).send({ status: 501, message: 'Error del servidor', error: err })
	}
}

async function updateUser(req, res) {
	const { userId } = req.params
	const data = req.body

	try {
		const userStored = await User.findOneAndUpdate(
			{ _id: userId.toString() },
			data,
			{ returnOriginal: false }
		).lean().exec();
		
		if (!userStored) {
			return res.status(400).send({ status: 400, message: 'No se ha encontrado al usuario' })
		}
		return res.status(200).send(
			{ status: 200, message: 'Usuario actualizado correctamente', user: userStored }
		)
	} catch (err) {
		return res.status(500).send(
			{ status: 501, message: 'Error del servidor', error: err }
		)
	}
}

module.exports = {
	initGetUser,
	updateUser
}