const fs = require('fs');

const vehiclesDocPath = "./data/vehicles.json"

function isValidVehicle(vehicle) {

	return typeof vehicle._id == "string" &&
		typeof vehicle.price == "number" &&
		typeof vehicle.priceOnOffer == "number" &&
		typeof vehicle.isOnOffer == "boolean"
}

async function storeVehicles(vehicles, onComplete) {

	let allValidEntries = vehicles.every(vehicle => {

		return isValidVehicle(vehicle)
	})

	if (allValidEntries) {

		let addVehiclesOperations = vehicles.map(vehicle => {
			addVehicle(vehicle)
		})

		await Promise.all(addVehiclesOperations)

		onComplete(202)
	} else {

		onComplete(400)
	}
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

	let vehiclesData = JSON.parse(fs.readFileSync(vehiclesDocPath))

	return vehiclesData.find((storedVehicle) => {

		return storedVehicle._id === vehicleId
	})
}

module.exports = {
	storeVehicles, getVehicle
}
