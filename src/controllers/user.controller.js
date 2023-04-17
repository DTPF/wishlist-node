const User = require('../models/user.model')

async function initGetUser(req, res) {
	const { userId } = req.body

	try {
		const userStored = await User.findOne({ userId: userId.toString() })

		if (!userStored) {
			const user = new User()
			const userAuth0 = req.auth
			user.userId = userId
			user.email = userAuth0.email
			user.name = userAuth0.given_name || userAuth0.nickname
			user.lastname = userAuth0.family_name || ''
			user.appInfo.language = userAuth0.locale || 'en'
			user.appInfo.appColorPrimary = '#fff'
			user.appInfo.appBgColor = '#232F3E'
			user.wishlistsInfo.currentWishlist = 'list-id-no-selected'
			user.wishlistsInfo.wishlistsOrder = 'name'
			user.wishlistsInfo.wishlistsDirection = 'asc'

			try {
				const userSaved = await user.save()
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
		).lean().exec()

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