const request = require("supertest");
const app = require("../../src/app")

describe("POST /promocodes", () => {

	const validData = [
		{
			_id: `_${Math.random().toString(36).substr(2, 9)}`,
			code: `_${Math.random().toString(36).substr(2, 9)}`,
			discount: 50,
			type: "PERCENTAGE",
			vehicles: ["5f6223d34a5a8ff0dc639dfa"]
		},
		{
			_id: "5f77173976b9921886a83159",
			code: "MERCEDES100",
			discount: 100,
			type: "CREDIT",
			vehicles: ["5ebd1d03f8f44c7c6b7d4391"]
		},
		{
			_id: "5f77173976b9921886a83159",
			code: "ALL10",
			discount: 10,
			type: "PERCENTAGE",
			vehicles: []
		}
	]
	test("Should return 202 code", done => {
		return request(app).post('/promocodes').send(validData).then(response => {
			expect(response.status).toBe(202)
			done()
		})
	})

	const invalidData = [
		{
			_id: "5f77173b76b9921886a8315a",
			code: 50, // This should be a string
			discount: 50,
			type: "PERCENTAGE",
			vehicles: ["5f6223d34a5a8ff0dc639dfa"]
		},
		{
			_id: "5f77173976b9921886a83159",
			code: "MERCEDES100",
			discount: 100,
			//type: "CREDIT",
			vehicles: ["5ebd1d03f8f44c7c6b7d4391"]
		},
		{
			_id: "5f77173976b9921886a83159",
			code: "ALL10",
			discount: "10", // This should be a number
			type: "PERCENTAGE",
			vehicles: []
		}
	]
	test("Should return 400 code", done => {
		return request(app).post('/promocodes').send(invalidData).then(response => {
			expect(response.status).toBe(400)
			done()
		})
	})
})

