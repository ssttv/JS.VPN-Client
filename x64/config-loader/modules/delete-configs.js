const fs = require(`fs`);

module.exports = (dir) => {

	const readdir = fs.readdirSync(dir)

    readdir.map(file => {

    	try{

    		fs.unlinkSync(dir + file)

    	} catch (e) {}

    })

}