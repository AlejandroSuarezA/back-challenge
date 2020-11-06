
const express = require("express");
const app = express();

const vehiclesDb = require("./collections/vehicles")
const promocodesDb = require("./collections/promocodes")

const calculator = require("./calculator")

const errorCodes = {
	'CAR-NOT-FOUND': {
		"errorCode": 404,
		"errorMessage": "Car not found"
	},
	'CAR-NOT-ELEGIBLE': {
		"errorCode": 400,
		"errorMessage": "The discount cannot be applied to this car"
	},
	'MISSING-FIELD': {
		"errorCode": 400,
		"errorMessage": "Some fields are missing"
	}
}

app.use(express.json())

app.post('/vehicles', (req, res) => {

	vehiclesDb.storeVehicles(req.body, (err, data) => {

		if (err) {

			let error = errorCodes[err]

			res.status(error.errorCode).send({ error: error.errorMessage })
		} else {

			res.sendStatus(202)
		}
	})
})

app.post('/promocodes', (req, res) => {

	promocodesDb.storePromocodes(req.body, (err, data) => {

		if (err) {

			let error = errorCodes[err]

			res.status(error.errorCode).send({ error: error.errorMessage })
		} else {

			res.sendStatus(202)
		}
	})
})

app.get('/calculator/:id', (req, res) => {

	if (req.params.id && req.params.code) {

		let response = calculator.calculateDiscount(req.params.id, req.params.code)

		if (response.error) {

			let errorResponse = errorCodes[response.error]

			res.status(errorResponse.errorCode).send({ error: errorResponse.errorMessage })
		} else {
			res.status(200).send(response)
		}
	}
})

module.exports = app
