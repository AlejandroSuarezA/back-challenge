const fs = require('fs');

const errorCodesEnum = require('../enums/errorCodes.enum.js');
const promocodeTypeEnum = require('../enums/promocodeType.enum.js');

const promocodesDocPath = "./data/promocodes.json"

async function storePromocodes(promocodes, callback) {

	let allValidEntries = promocodes.every(promocode => {

		return isValidPromocode(promocode)
	})

	if (allValidEntries) {

		try {

			for (let promocode of promocodes) {
				await addPromocode(promocode)
			}

			callback(undefined, 'ok')
		} catch (error) {

			callback(errorCodesEnum.unexpectedError, undefined)
		}
	} else {

		callback(errorCodesEnum.missingField, undefined)
	}
}

function isValidPromocode(promocode) {

	return typeof promocode._id == "string" &&
		typeof promocode.code == "string" &&
		typeof promocode.discount == "number" &&
		(promocode.type == promocodeTypeEnum.percentage || promocode.type == promocodeTypeEnum.credit) &&
		Array.isArray(promocode.vehicles)
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

	return new Promise((resolve, reject) => {

		fs.readFile(promocodesDocPath, (err, data) => {

			if (err) reject(err)

			let promocodeData = JSON.parse(data)

			let foundPromocode = promocodeData.find((storedPromocode) => {

				return storedPromocode.code === promocode
			})

			resolve(foundPromocode)
		})
	})
}

module.exports = { storePromocodes, getPromocode }