

const request = require("supertest");
const app = require("../src/app.js")


describe("Testing ok codes from api", () => {
	
	describe("Endpoint POST /vehicles", () => {
		test("Should return 202 code", done => {
			return request(app).post('/vehicles').then(response => {
				expect(response.statusCode).toBe(202)
				done()
			})
		})
	})

	describe("Endpoint POST /promocodes", () => {
		test("Should return 202 code", done => {
			return request(app).post('/promocodes').then(response => {
				expect(response.statusCode).toBe(202)
				done()
			})
		})
	})
})
