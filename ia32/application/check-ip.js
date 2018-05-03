
const request = require(`request`)

module.exports = (callback, callback_error) => {

	request(`http://www.vpngate.net/en/`, (error, response, body) => {

		if (error) { callback_error(); return }

		const IP = (body.match(/Your IP: [^<]+/gi)[0] || ``)
						.replace(/Your IP: /gi, ``)
	
		if (IP == "") {

			callback(`Bad server`)
			return 

		}

		if (IP.length > 18) {

			callback(`IP: ` + IP.split(``).slice(0, 14).join(``) + `...`)
			return

		}

		callback(`IP: ` + IP)

	})


}