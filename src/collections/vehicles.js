const fs = require('fs');

const errorCodesEnum = require('../enums/errorCodes.enum.js');

const vehiclesDocPath = "./data/vehicles.json"

async function storeVehicles(vehicles, callback) {

	let allValidEntries = vehicles.every(vehicle => {

		return isValidVehicle(vehicle)
	})

	if (allValidEntries) {

		try {

			let addVehiclesOperations = vehicles.map(vehicle => addVehicle(vehicle))

			await Promise.all(addVehiclesOperations)

			callback(undefined, 'ok')
		} catch (error) {

			callback(errorCodesEnum.unexpectedError, undefined)
		}
	} else {

		callback(errorCodesEnum.missingField, undefined)
	}
}

function isValidVehicle(vehicle) {

	return typeof vehicle._id == "string" &&
		typeof vehicle.price == "number" &&
		typeof vehicle.priceOnOffer == "number" &&
		typeof vehicle.isOnOffer == "boolean"
}

function addVehicle(vehicle) {

	return new Promise((resolve, reject) => {

		fs.readFile(vehiclesDocPath, (err, data) => {

			if (err) reject(err)

			let vehiclesData = JSON.parse(data)

			let foundVehicle = vehiclesData.find((storedVehicle) => {

				return storedVehicle._id === vehicle._id
			})

			foundVehicle ? Object.assign(foundVehicle, vehicle) : vehiclesData.push(vehicle)

			fs.writeFile(vehiclesDocPath, JSON.stringify(vehiclesData), (err) => {

				err ? reject(err) : resolve()
			})
		})
	})
}

function getVehicle(vehicleId) {

	return new Promise((resolve, reject) => {

		fs.readFile(vehiclesDocPath, (err, data) => {

			if (err) reject(err)

			let vehiclesData = JSON.parse(data)

			let foundVehicle = vehiclesData.find((storedVehicle) => {

				return storedVehicle._id === vehicleId
			})

			resolve(foundVehicle)
		})
	})
}

module.exports = {
	storeVehicles, getVehicle
}
