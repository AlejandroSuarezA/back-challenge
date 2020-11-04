
const express = require("express")
const app = express();

app.use(express.json())

app.post('/vehicles', (req, res, next) => {

	res.sendStatus(202)
})

app.post('/promocodes', (req, res, next) => {

	res.sendStatus(202)
})

app.get('/calculator/:id', (req, res, next) => {

	res.sendStatus(202)
})

module.exports = app
