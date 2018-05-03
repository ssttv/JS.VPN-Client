const { ipcMain } = require(`electron`)

module.exports = about_win => {

	ipcMain.on(`Close-about`, about_win.hide)

}