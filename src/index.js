const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getDiscount(product, promotion_type) {
	const { promotions } = product;
	for (let i = 0; i < promotions.length; i++) {
		const promotion = promotions[i];
		const { looks } = promotion;
		for (let j = 0; j < looks.length; j++) {
			const look = looks[j];
			if (look.includes(promotion_type))
				return promotion.price;
		}
	}
	return product.regularPrice;
}

function getPercentage(value) {
	return value.toFixed(2) + '%';
}

function addDiscount(cart_list, productsList) {
	let promo = [];
	for (productId of cart_list) {
		const product = productsList.filter((product) => product.id === productId);
		const { category } = product[0];
		if (!promo.includes(category))
			promo = promo.concat(category);
	}
	return promotions[promo.length - 1];
}

function getShoppingCart(ids, productsList) {
	let value_with_discount = 0;
	let value_without_discount = 0;
	let products = [];
	let promotion;
	let totalPrice;

	promotion = addDiscount(ids, productsList);

	ids.map(
		(productId) => {
			const product = productsList.filter((product) => product.id === productId)[0];
			const { name, category, regularPrice } = product;
			value_without_discount += regularPrice;
			value_with_discount += getDiscount(product, promotion);
			products = products.concat({ name, category });
		}
	)

	products = products;
	totalPrice = value_with_discount.toFixed(2);
	discountValue = (value_without_discount - value_with_discount).toFixed(2);
	discount = getPercentage(100 * (discountValue / value_without_discount));

	const cart = {
		products,
		promotion,
		totalPrice,
		discountValue,
		discount
	}

	return cart;
}

module.exports = { getShoppingCart };
