const alert        = require(`./alert`)
	, load_configs = require(`./../config-loader`)

module.exports = (start_time, vpn_win, alert_win) => {

	setTimeout(() => {

		alert(vpn_win, alert_win, `Обновление серверов`)

		vpn_win.webContents.send(`visual-load`, 1)

		setTimeout(() => {

			load_configs(length => {

				alert(vpn_win, alert_win, `Доступно: ${ length } серверов`)
				vpn_win.webContents.send(`visual-load`, 0)

			}, () => {

				alert(vpn_win, alert_win, `Какая-то ошибка`)
				vpn_win.webContents.send(`visual-load`, 0)

			})

		}, 5000)

	}, start_time)

}