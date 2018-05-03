
module.exports = class Setting {

	constructor (ipcMain) {

		this.ipcMain = ipcMain

	}

	on (e) {

		this.ipcMain.on(`save-setting`, (err, data) => {

			e(`save-setting`, data)

		})

		this.ipcMain.on(`close-setting`, () => {

			e(`close-setting`)

		})

	}

}