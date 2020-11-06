
const request = require("supertest");
const app = require("../../src/app")


describe("Testing /vehicles", () => {

	describe("OK CODE", () => {

		const validData = [
			{
				_id: "32133321223000388585abdhjhqwepio123bj",
				price: 359.99,
				priceOnOffer: 299.99,
				isOnOffer: false
			},
			{
				_id: "5ebd1d03f8f44c7c6b7d4391",
				price: 559.99,
				priceOnOffer: 499.99,
				isOnOffer: true
			}
		]

		test("Should return 202 code", done => {
			return request(app).post('/vehicles').send(validData).then(response => {
				expect(response.status).toBe(202)
				done()
			})
		})

	})

	
	describe("KO CODE", () => {


		const inconsistentTypeData = [
			{
				_id: "5f6223d34a5a8ff0dc639dfa",
				price: "359.99", // This should be a number
				priceOnOffer: 299.99,
				isOnOffer: "false" // This should be a bool
			},
			{
				_id: 123, // This should be a string
				price: 559.99,
				priceOnOffer: false, // This should be a number
				isOnOffer: true
			}
		]

		const missingFieldsData = [
			{
				_id: "5f6223d34a5a8ff0dc639dfa",
				//price: 359.99,
				priceOnOffer: 299.99,
				isOnOffer: false
			},
			{
				_id: "5ebd1d03f8f44c7c6b7d4391",
				price: 559.99,
				priceOnOffer: 499.99,
				//isOnOffer: true
			}
		]

		test("Should return 400 code because of wrong type of data", done => {
			return request(app).post('/vehicles').send(inconsistentTypeData).then(response => {
				expect(response.status).toBe(400)
				done()
			})
		})


		test("Should return 400 code because of missing fields", done => {
			return request(app).post('/vehicles').send(missingFieldsData).then(response => {
				expect(response.status).toBe(400)
				done()
			})
		})
	})


})