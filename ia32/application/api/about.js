
module.exports = class About {

	constructor (ipcMain) {

		this.ipcMain = ipcMain

	}

	on (e) {

		this.ipcMain.on('close-about', () => {

			e('close-about')		

		})

	}

}
