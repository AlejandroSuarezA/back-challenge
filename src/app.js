
const express = require("express");
const helmet = require("helmet");
const app = express();

const vehicles = require("./collections/vehicles")
const promocodes = require("./collections/promocodes")

const calculateDiscount = require("./calculator")

const errorCodes = require("../data/errorCodes.json")

app.use(express.json())
app.use(helmet())

app.get('/', (req, res) => {
	res.sendStatus(202)
})

app.post('/vehicles', (req, res) => {

	vehicles.storeVehicles(req.body, (err, data) => {

		if (err) {

			let error = errorCodes[err]

			res.status(error.errorCode).send({ error: error.errorMessage })
		} else {

			res.sendStatus(202)
		}
	})
})

app.post('/promocodes', (req, res) => {

	promocodes.storePromocodes(req.body, (err, data) => {

		if (err) {

			let error = errorCodes[err]

			res.status(error.errorCode).send({ error: error.errorMessage })
		} else {

			res.sendStatus(202)
		}
	})
})

app.get('/calculator/:id', (req, res) => {

	if (req.params.id && req.query.code) {

		calculateDiscount(req.params.id, req.query.code, (err, data) => {

			if (err) {

				let errorResponse = errorCodes[err]

				res.status(errorResponse.errorCode).send({ error: errorResponse.errorMessage })
			} else {

				res.status(200).send(data)
			}
		})
	} else {

		res.send(400).send({error: errorCodes["MISSING-FIELD"]})
	}
})

app.get('*', (req, res) => {
	res.sendStatus(404);
});

module.exports = app
