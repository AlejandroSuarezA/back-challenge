const vehiclesDb = require("./collections/vehicles")
const promocodesDb = require("./collections/promocodes")

const errorCodesEnum = require('./enums/errorCodes.enum.js');
const promocodeTypeEnum = require("./enums/promocodeType.enum");

async function calculateDiscount(vehicleId, promocode, callback) {

	try {

		if (typeof vehicleId != "string" || typeof promocode != "string") {

			callback(errorCodesEnum.missingField, undefined)
		} else {

			let foundVehicle = await vehiclesDb.getVehicle(vehicleId)

			let foundPromocode = await promocodesDb.getPromocode(promocode)

			foundVehicle ?
				isElegible(foundVehicle, foundPromocode, callback) :
				callback(errorCodesEnum.carNotFound, undefined)
		}
	} catch (error) {

		callback(errorCodesEnum.unexpectedError, undefined)
	}
}

function isElegible(vehicle, promocode, callback) {

	if (promocode.vehicles.length === 0 || promocode.vehicles.includes(vehicle._id)) {

		callback(undefined, isOnOffer(vehicle, promocode))
	} else {

		callback(errorCodesEnum.carNotElegible, undefined)
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

	let amountDiscounted = 0

	if (promocode.type === promocodeTypeEnum.percentage) {

		amountDiscounted = (promocode.discount / 100) * discountResponse.price
	} else {

		amountDiscounted = promocode.discount
	}

	discountResponse.discountByCode = amountDiscounted
	discountResponse.price -= amountDiscounted

	Object.keys(discountResponse).forEach((key) => {

		discountResponse[key] = parseFloat(discountResponse[key].toFixed(2))
	})

	return discountResponse
}

module.exports = calculateDiscount