
module.exports = class Context {

	constructor (vpn_win, ctx_menu_win, ipcMain) {

		this.vpn_win = vpn_win
		this.ctx_menu_win = ctx_menu_win
		this.ipcMain = ipcMain

	}

	on (e) {

		this.vpn_win.webContents.on(`context-menu`, (err, data) => {

			e(`open-context`, data)

		})


		this.ctx_menu_win.on(`blur`, () => {

			e(`close-context`)

		})

		this.ipcMain.on(`ip`, () => {

			e(`ip`)

		})

		this.ipcMain.on(`update-configs`, () => {

			e(`update-configs`)

		})

		this.ipcMain.on(`settings`, () => {

			e(`settings`)

		})	

		this.ipcMain.on(`about`, () => {

			e(`about`)

		})

		this.ipcMain.on(`hidden`, () => {

			e(`hidden`)

		})

		this.ipcMain.on(`exit`, () => {

			e(`exit`)

		})

	}

}