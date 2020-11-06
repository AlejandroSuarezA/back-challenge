
const calculator = require("../src/calculator")

describe("applyPromocode fn", () => {
	test("applying percentage discount NON OFFER vehicle", () => {

		let percentageResponseWithFloat = {
			price: 50.49,
			discountByOffer: 41,
			discountByCode: 50.49
		}

		expect(calculator.calculateDiscount('nonOfferFloat', 'test50PercentageAll')).toMatchObject(percentageResponseWithFloat)

		let percentageResponse = {
			price: 50,
			discountByOffer: 50,
			discountByCode: 50
		}
		expect(calculator.calculateDiscount('nonOffer', 'test50PercentageAll')).toMatchObject(percentageResponse)

	})
})

let promocodeWildcardPercentage = 'wildCardDiscountPercentage'
let promocodeWildcardCredit = 'wildCardDiscountCredit'

let promocodeSpecificPercentage = 'specificDiscountPercentage'
let promocodeSpecificCredit = 'specificDiscountCredit'

describe("Vehicle on offer", () => {

	let vehicleOnOffer = 'vehicleOnOffer'

	let percentageDiscountResponse = {
		price: 175,
		discountByOffer: 150,
		discountByCode: 175
	}

	let creditDiscountResponse = {
		price: 300,
		discountByOffer: 150,
		discountByCode: 50
	}

	describe("Promocode applies to all cars", () => {

		test("A percentage discount", () => {

			expect(calculator.calculateDiscount(vehicleOnOffer, promocodeWildcardPercentage)).toMatchObject(percentageDiscountResponse)
		})

		test("A credit discount", () => {

			expect(calculator.calculateDiscount(vehicleOnOffer, promocodeWildcardCredit)).toMatchObject(creditDiscountResponse)
		})

		test.todo("A 100% percentage discount")

		test.todo("A 100% credit discount")

		test.todo("An over 100% percentage discount")

		test.todo("An over 100% credit discount")
	})

	describe("Promocode applies to this car", () => {

		test("A percentage discount", () => {

			expect(calculator.calculateDiscount(vehicleOnOffer, promocodeSpecificPercentage)).toMatchObject(percentageDiscountResponse)
		})

		test("A credit discount", () => {

			expect(calculator.calculateDiscount(vehicleOnOffer, promocodeSpecificCredit)).toMatchObject(creditDiscountResponse)
		})

		test.todo("A 100% percentage discount")

		test.todo("A 100% credit discount")

		test.todo("An over 100% percentage discount")

		test.todo("An over 100% credit discount")
	})

	test("Promocode is not aplicable to this car", () => {
		expect(calculator.calculateDiscount(vehicleOnOffer, 'anyoneIsCompatible')).toBe('This car is not elegible for the discount')
	})
})

describe("Vehicle is NOT on offer", () => {

	let vehicleNotOnOffer = 'vehicleNotOnOffer'

	let percentageDiscountResponse = {
		price: 250,
		discountByOffer: 150,
		discountByCode: 250
	}
	let creditDiscountResponse = {
		price: 450,
		discountByOffer: 150,
		discountByCode: 50
	}

	describe("Promocode applies to all cars", () => {

		test("A percentage discount", () => {

			expect(calculator.calculateDiscount(vehicleNotOnOffer, promocodeWildcardPercentage)).toMatchObject(percentageDiscountResponse)
		})

		test("A credit discount", () => {

			expect(calculator.calculateDiscount(vehicleNotOnOffer, promocodeWildcardCredit)).toMatchObject(creditDiscountResponse)
		})

		test.todo("A 100% percentage discount")

		test.todo("A 100% credit discount")

		test.todo("An over 100% percentage discount")

		test.todo("An over 100% credit discount")
	})

	describe("Promocode applies to this car", () => {

		test("A percentage discount", () => {

			expect(calculator.calculateDiscount(vehicleNotOnOffer, promocodeSpecificPercentage)).toMatchObject(percentageDiscountResponse)
		})

		test("A credit discount", () => {

			expect(calculator.calculateDiscount(vehicleNotOnOffer, promocodeSpecificCredit)).toMatchObject(creditDiscountResponse)
		})

		test.todo("A 100% percentage discount")

		test.todo("A 100% credit discount")

		test.todo("An over 100% percentage discount")

		test.todo("An over 100% credit discount")
	})

	test("Promocode is not aplicable to this car", () => {

		expect(calculator.calculateDiscount(vehicleNotOnOffer, 'anyoneIsCompatible')).toBe('This car is not elegible for the discount')
	})
})