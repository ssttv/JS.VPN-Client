const fs = require(`fs`)

module.exports = (vpn_win) => {

	setTimeout(() => {

		try{

			const pos = JSON.parse( fs.readFileSync(`${__dirname}/_0.json`) )

			if ( pos[0] != 60 &&
			   	 pos[1] != 60 ) {

				vpn_win.setPosition(pos[0], pos[1])
			
			}


		} catch(e) {}
		
	}, 1000)


	vpn_win.on(`blur`, () => {

		const pos = JSON.stringify( vpn_win.getPosition() )

		fs.writeFileSync(`${__dirname}/_0.json`, pos)	

	})

}