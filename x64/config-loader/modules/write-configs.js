
const fs     = require(`fs`)
	, Base64 = require(`js-base64`).Base64

module.exports = (path, configs) => {

	configs.map(vpn => {

		const vpn_name = vpn.HostName.replace(/(\*|\%|\$|\^|\#|\^|\"|\`|\:|\;|\,|\@|\№|\!|\?|\>|\<|\\|\)|\(|\{|\})/gi) 

		if (vpn_name == `undefined`) { return }


		try {

			const metadata = `# ${vpn.HostName}
# ${vpn.IP} 
# ${vpn.Score}
# ${vpn.Ping} 
# ${vpn.Speed} 
# ${vpn.CountryLong} 
# ${vpn.CountryShort}
# ${vpn.NumVpnSessions} 
# ${vpn.Uptime} 
# ${vpn.TotalUsers} 
# ${vpn.TotalTraffic}
# ${vpn.LogType}
# ${vpn.Operator}
# ${vpn.Message} `

			const config = metadata + Base64.decode(vpn.OpenVPN_ConfigData_Base64).replace(/dev tun/g, `dev tap`)

			fs.writeFileSync(path + vpn_name + `.ovpn`, config)

		} catch (e) {}


	})

}