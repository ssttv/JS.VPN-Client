const { ipcMain }       = require(`electron`)
	, get_random_config = require(`./../config-loader/modules/get-random-config`)
	, VPN               = require(`./../open-vpn`)


module.exports = (vpn_win, callback) => {

	ipcMain.on(`connect-disconnect`, (event, data) => {

		if (data == 1) {

			const rand_config = get_random_config(`${__dirname}/../config-loader/configs/`)

			VPN.connect(rand_config, data_vpn => {

				if( data_vpn.code == 4) { 

					callback(`IP ` + data_vpn.vpn_config.ip) 
				
				}
				
				if( data_vpn.code == 5) { 
				
					callback(`Переподключение...`) 
				
				}

				vpn_win.webContents.send(`disconnect-connect`, data_vpn)

			});

			return 

		} 
		
		VPN.disconnect()
	
	})

}