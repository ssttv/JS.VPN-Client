const { spawn } = require(`child_process`)
	, fs 		      = require(`fs`)
	, setup_openVPN   = require(`./setup-open-vpn`) 

///

const middle_1    = new RegExp( `No server certificate verification method has been enabled.`, `gi` )
	, middle_2    = new RegExp( `Attempting to establish TCP connection with`, `gi` )
	, middle_3    = new RegExp( `TCP connection established with`, `gi` )
	, middle_4    = new RegExp( `Restart pause,.+second`, `gi` )
	, connect     = new RegExp( `Initialization Sequence Completed`, `gi` )
	, error_1     = new RegExp( `TCP: connect to.+failed: Unknown error`, `gi` )
	, error_2     = new RegExp( `Cannot resolve host address`, `gi` )
	, error_tap_1 = new RegExp( `All TAP-Windows adapters on this system are currently in use`, `gi` )
	, error_tap_2 = new RegExp( `There are no TAP-Windows adapters on this system.+`, `gi` )
///

const Open_VPN = ( path_config, callback ) => {

	const command = `${__dirname}/OpenVPN/bin/openvpn.exe`

	const cmd_vpn = spawn(command, [ `--config`, path_config ] );


	cmd_vpn.stdout.on(`data`, data => {

		const text = data.toString()

		if ( text.match(error_tap_1) ) {

			callback({code: 12, type: `tap`})
			return

		}

		if ( text.match(error_tap_2) ) {
			
			callback({code: 11, type: `tap start setup`})

			setup_openVPN(() => {

				callback({code: 21, type: `tap good setup`})
				
			}, () => {

				callback({code: 22, type: `tap error setup`})

			})
			return
		
		}

		if ( text.match(middle_1) ) {
			callback({code: 1, type: `middle`})
			return
		}

		if ( text.match(middle_2) ) {	
			callback({code: 2, type: `middle`})
			return
		}

		if ( text.match(middle_3) ) {
			callback({code: 3, type: `middle`})			
			return
		}

		if ( text.match(connect) ) {

			const readConfig = fs.readFileSync(path_config, {encoding: `utf8`})
				, line = readConfig.match(/.+/gi)

				, replmh = new RegExp(`(# | $)`, `gi`)


				, config_vpn = {

					  name:             line[0].replace(replmh, ``)
					, ip:               line[1].replace(replmh, ``)
					, score:            line[2].replace(replmh, ``)
					, ping:             line[3].replace(replmh, ``)
					, speed:            line[4].replace(replmh, ``)
					, country_long:     line[5].replace(replmh, ``)
					, country_short:    line[6].replace(replmh, ``)
					, num_vpn_sessions: line[7].replace(replmh, ``)
					, uptime:           line[8].replace(replmh, ``)
					, total_users:      line[9].replace(replmh, ``)
					, total_traffic:    line[10].replace(replmh, ``)
					, log_type:         line[11].replace(replmh, ``)
					, operator:         line[12].replace(replmh, ``)
					, message:          line[13].replace(/(# | #+)/gi, ``)

				}


			callback({code: 4, type: `connect`, vpn_config: config_vpn })
			return
		}

		if ( text.match(error_1) ) {
			cmd_vpn.kill()
			return
		}
	
		if ( text.match(error_2) ) {
			cmd_vpn.kill()
			return
		}
		
		if ( text.match(middle_4) ) {
			callback({code: 5, type: `middle`})	
			return
		}

	});


	cmd_vpn.stderr.on(`data`, (data) => {

  		callback({code: 0, type: `disconnect`})

	});


	cmd_vpn.on(`close`, (code) => {

		callback({code: 0, type: `disconnect`})
	
	});

	return cmd_vpn

}


module.exports = {

	connect: function (path, callback) {

		this.cmd_vpn = Open_VPN(path, callback)

	},

	disconnect: function () {

		try{

			this.cmd_vpn.kill()

		} catch (e) {} 

	}

}