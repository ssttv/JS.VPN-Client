const { exec } = require(`child_process`)

module.exports = (callback, callback_error) => {

	const command =  `${__dirname}/openvpn-install-2.4.6-I601.exe`

	exec(command, (err, stdout, stderr) => {

		if (err) {
    		
    		callback_error()
    		return;
  		}
  		
  		callback()
  				
	});

}