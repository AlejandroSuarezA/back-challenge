const vehiclesDb = require("./collections/vehicles")
const promocodesDb = require("./collections/promocodes")

function calculateDiscount(vehicleId, promocode) {

	let foundVehicle = vehiclesDb.getVehicle(vehicleId)

	let foundPromocode = promocodesDb.getPromocode(promocode)

	if (foundVehicle && foundPromocode) {

		return isElegible(foundVehicle, foundPromocode)
	}
}

function isElegible(vehicle, promocode) {

	if (promocode.vehicles.length === 0 || promocode.vehicles.includes(vehicle._id)) {

		return isOnOffer(vehicle, promocode)
	} else {

		return "This car is not elegible for the discount"
	}
}

function isOnOffer(vehicle, promocode) {

	let discountResponse = {
		price: vehicle.isOnOffer ? vehicle.priceOnOffer : vehicle.price,
		discountByOffer: vehicle.price - vehicle.priceOnOffer,
		discountByCode: 0
	}


	return applyPromocode(discountResponse, promocode)
}

function applyPromocode(discountResponse, promocode) {

	if (promocode.type === "PERCENTAGE") {

		discountResponse.discountByCode = (promocode.discount / 100) * discountResponse.price
		discountResponse.price -= (discountResponse.discountByCode)
	} else {

		discountResponse.discountByCode = promocode.discount
		discountResponse.price -= promocode.discount
	}

	Object.keys(discountResponse).forEach((key) => {
		discountResponse[key] = parseFloat(discountResponse[key].toFixed(2))

	})

	return discountResponse
}

module.exports = { calculateDiscount, isElegible, isOnOffer, applyPromocode }