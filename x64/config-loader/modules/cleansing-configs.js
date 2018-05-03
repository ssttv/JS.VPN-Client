
const fs = require(`fs`)

module.exports = (path, configs) => {

	const config = fs.readFileSync(path, { encoding: `utf8` })
	    , param = JSON.parse(config)

	// Score

	let purefied = configs.filter(config => {

		if (param.Score == `-`) { return 1 }

		return parseInt(param.Score) < config.Score

	})


	// Ping

	purefied = purefied.filter(config => {

		if (param.Ping == `-`) { return 1 }

		return parseInt(param.Ping) > config.Ping

	})


	// Speed

	purefied = purefied.filter(config => {

		if (param.Speed == `-`) { return 1 }

		return parseInt(param.Speed) < config.Speed

	})


	// CountryLong

	purefied = purefied.filter(config => {

		if (param.CountryLong == `-`) { return 1 }

		return param.CountryLong == config.CountryLong

	})


	// NumVpnSessions

	purefied = purefied.filter(config => {

		if (param.NumVpnSessions == `-`) { return 1 }

		return parseInt(param.NumVpnSessions) < config.NumVpnSessions

	})


	// Uptime

	purefied = purefied.filter(config => {

		if (param.Uptime == `-`) { return 1 }

		return parseInt(param.Uptime) < config.Uptime

	})


	// TotalUsers

	purefied = purefied.filter(config => {

		if (param.TotalUsers == `-`) { return 1 }

		return parseInt(param.TotalUsers) < config.TotalUsers

	})


	// TotalTraffic

	purefied = purefied.filter(config => {

		if (param.TotalTraffic == `-`) { return 1 }

		return parseInt(param.TotalTraffic) < config.TotalTraffic

	})



	return purefied

}

