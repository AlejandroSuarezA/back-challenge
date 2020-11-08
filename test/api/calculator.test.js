const request = require("supertest");
const app = require("../../src/app")

describe("GET /calculator", () => {

	let vehicleToFind = {
		"_id": "5f6223d34a5a8ff0dc639dfa",
		"price": 359.99,
		"priceOnOffer": 299.99,
		"isOnOffer": false
	}

	let promocodePercentage = {
		"_id": "wldCrddscntprcntg",
		"code": "wildCardDiscountPercentage",
		"discount": 50,
		"type": "PERCENTAGE",
		"vehicles": []
	}

	test("calculate percentage discount", done => {

		let rsp = {
			price: 180,
			discountByOffer: 60,
			discountByCode: 180
		}

		request(app).get(`/calculator/${vehicleToFind._id}`).query({ code: promocodePercentage.code }).then(response => {
			expect(response.status).toBe(200)
			expect(response.body).toMatchObject(rsp)
			done()
		})
	})

	test("should return a 404", done => {

		request(app).get('/calculator/NONEXISTENTCARID').query({ code: promocodePercentage.code }).then(response => {
			expect(response.status).toBe(404)
			done()
		})
	})

	
	test("should return a 400", done => {

		request(app).get(`/calculator/${vehicleToFind._id}`).then(response => {
			expect(response.status).toBe(400)
			done()
		})
	})

})