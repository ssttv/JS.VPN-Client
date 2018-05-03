
module.exports = class VPN {

	constructor (ipcMain) {

		this.ipcMain = ipcMain

	}

	on (e) {

		this.ipcMain.on(`connect`, () => {

			e(`connect`)

		})

		this.ipcMain.on(`disconnect`, () => {

			e(`disconnect`)

		})

		this.ipcMain.on(`setup`, () => {

			e(`setup`)

		})

	}

}