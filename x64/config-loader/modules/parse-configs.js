module.exports = (data) => {
	
	const configData = data.replace(/\r\n/gi, `,`).split(`,`)
      , configsArray = [] 


  for (let i = 16; i < configData.length; i += 15) {

    configsArray.push({

        HostName:                  configData[i]
      , IP:                        configData[i+1]
      , Score:                     configData[i+2]
      , Ping:                      configData[i+3]
      , Speed:                     configData[i+4]
      , CountryLong:               configData[i+5]
      , CountryShort:              configData[i+6]
      , NumVpnSessions:            configData[i+7]
      , Uptime:                    configData[i+8] 
      , TotalUsers:                configData[i+9]
      , TotalTraffic:              configData[i+10]
      , LogType:                   configData[i+11]
      , Operator:                  configData[i+12]
      , Message:                   configData[i+13]
      , OpenVPN_ConfigData_Base64: configData[i+14]

    })

  }

  return configsArray

}