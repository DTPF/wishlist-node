const getColorByBackground = (wishlist) => Boolean(
	wishlist.backgroundColor === '109, 85, 124' ||
	wishlist.backgroundColor === '105, 124, 140' ||
	wishlist.backgroundColor === '116, 104, 140' ||
	wishlist.backgroundColor === '192, 134, 123' ||
	wishlist.backgroundColor === '246, 114, 128' ||
	wishlist.backgroundColor === '192, 108, 132'
)

module.exports = {
	getColorByBackground
}