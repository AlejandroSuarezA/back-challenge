
const calculateDiscount = require("../src/calculator")
const errorCodesEnum = require("../src/enums/errorCodes.enum")

let promocodeWildcardPercentage = 'wildCardDiscountPercentage'
let promocodeWildcardCredit = 'wildCardDiscountCredit'

let promocodeSpecificPercentage = 'specificDiscountPercentage'
let promocodeSpecificCredit = 'specificDiscountCredit'

let vehicleOnOffer = 'vehicleOnOffer'

let onOfferPercentageDiscountResponse = {
	price: 175,
	discountByOffer: 150,
	discountByCode: 175
}

let onOfferCreditDiscountResponse = {
	price: 300,
	discountByOffer: 150,
	discountByCode: 50
}


let vehicleNotOnOffer = 'vehicleNotOnOffer'

let notOnOfferPercentageDiscountResponse = {
	price: 250,
	discountByOffer: 150,
	discountByCode: 250
}
let notOnOfferCreditDiscountResponse = {
	price: 450,
	discountByOffer: 150,
	discountByCode: 50
}


describe.each`
	vehicle			|			wildcard			|			specific			|			response
${vehicleOnOffer}		${promocodeWildcardPercentage}	${promocodeSpecificPercentage}	${onOfferPercentageDiscountResponse}
${vehicleOnOffer}		${promocodeWildcardCredit}		${promocodeSpecificCredit}		${onOfferCreditDiscountResponse}

${vehicleNotOnOffer}	${promocodeWildcardPercentage}	${promocodeSpecificPercentage}	${notOnOfferPercentageDiscountResponse}
${vehicleNotOnOffer}	${promocodeWildcardCredit}		${promocodeSpecificCredit}		${notOnOfferCreditDiscountResponse}
`('$vehicle', ({ vehicle, wildcard, specific, response }) => {



	test(`using ${wildcard} and ${specific}`, done => {

		function callback(err, data) {

			expect(data).toMatchObject(response)
			done()
		}

		calculateDiscount(vehicle, wildcard, callback)

		calculateDiscount(vehicle, specific, callback)
	})
})

test("Car not found", done => {

	function callback(err, data) {
		expect(err).toMatch(errorCodesEnum.carNotFound)
		done()
	}

	calculateDiscount('nonExistentCar', 'anyPromocode', callback)
})

test("Promocode is not aplicable to this car", done => {

	function callback(err, data) {

		expect(err).toMatch(errorCodesEnum.carNotElegible)
		done()
	}

	calculateDiscount('vehicleOnOffer', 'noOneIsCompatible', callback)
})

test("Wrong data type on vehicleId and promocode", done => {

	debugger;
	function callback(err, data) {

		expect(err).toMatch(errorCodesEnum.missingField)
		done()
	}

	calculateDiscount(44, 'noOneIsCompatible', callback)
	calculateDiscount('vehicleOnOffer', 44, callback)
})

test.todo("A 100% percentage discount")

test.todo("A 100% credit discount")

test.todo("An over 100% percentage discount")

test.todo("An over 100% credit discount")