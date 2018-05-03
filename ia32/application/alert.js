const fs          = require(`fs`)
	, { ipcMain } = require(`electron`)

let intervalHedden = 0 

module.exports = (vpn_win, alert_win, message) => {

	if (vpn_win.getPosition == undefined) { return }

	const pos = vpn_win.getPosition()

	const X = pos[0] + 116 / 2 - 200 / 2,
		  Y = pos[1] - 145

	alert_win.setPosition(X, Y)


	if (!vpn_win.isMinimized()) {

		alert_win.webContents.send(`callback-alert`, message)

	}


	ipcMain.on(`callback-alert`, () => {

		alert_win.show()

	})


	alert_win.on(`blur`, () => {

		try{
		
			alert_win.hide()
			clearInterval(intervalHedden)

		} catch (e) {}
		
	})

	clearTimeout(intervalHedden)

	intervalHedden = setTimeout(() => {

		try{
		
			alert_win.hide()
		
		} catch (e) {}

	}, 15000)

}