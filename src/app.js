
const express = require("express");
const app = express();

const vehiclesDb = require("./collections/vehicles")
const promocodesDb = require("./collections/promocodes")

app.use(express.json())

app.post('/vehicles', (req, res, next) => {

	vehiclesDb.storeVehicles(req.body, (statusCode) => {
		res.sendStatus(statusCode)
	})
})

app.post('/promocodes', (req, res, next) => {

	promocodesDb.storePromocodes(req.body, (statusCode) => {
		res.sendStatus(statusCode)
	})

})

const calculator = require("./calculator")
///calculator/{{id}}?code={{code}}
app.get('/calculator/:id', (req, res, next) => {

	if (req.params.id && req.params.code) {

		res.sendStatus(202)
	}

	res.sendStatus(400)
})

module.exports = app
