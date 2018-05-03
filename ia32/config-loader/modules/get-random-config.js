const fs = require(`fs`)

module.exports = (path) => {

	const config_list = fs.readdirSync(path)
		
		, length = config_list.length

		, random_file_index = parseInt(Math.random() * length-1)


	return path + config_list[ random_file_index ]

}