const fs = require('fs');
const promocodesDocPath = "./data/promocodes.json"

function isValidPromocode(promocode) {

	return typeof promocode._id == "string" &&
		typeof promocode.code == "string" &&
		typeof promocode.discount == "number" &&
		(promocode.type == "PERCENTAGE" || promocode.type == "CREDIT") &&
		Array.isArray(promocode.vehicles)
}

async function storePromocodes(promocodes, onComplete) {

	let allValidEntries = promocodes.every(promocode => {

		return isValidPromocode(promocode)
	})

	if (allValidEntries) {

		let addPromocodesOperations = promocodes.map(promocode => {
			addPromocode(promocode)
		})

		await Promise.all(addPromocodesOperations)

		onComplete(202)
	} else {

		onComplete(400)
	}
}

function addPromocode(promocode) {

	return new Promise((resolve, reject) => {

		fs.readFile(promocodesDocPath, (err, data) => {

			if (err) reject(err)

			let promocodesData = JSON.parse(data)

			let foundPromocode = promocodesData.find((storedPromocode) => {

				return storedPromocode.code === promocode.code
			})

			foundPromocode ? Object.assign(foundPromocode, promocode) : promocodesData.push(promocode)

			fs.writeFile(promocodesDocPath, JSON.stringify(promocodesData), (err) => {

				err ? reject(err) : resolve()
			})
		})
	})
}

function getPromocode(promocode) {

	let promocodeData = JSON.parse(fs.readFileSync(promocodesDocPath))

	return promocodeData.find((storedPromocode) => {

		return storedPromocode.code === promocode
	})
}

module.exports = { storePromocodes, getPromocode }