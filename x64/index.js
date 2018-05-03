const { app, ipcMain }   = require(`electron`)
	, create_win         = require(`./application/create-windows`)
	, update_config_list = require(`./application/update-config-list`) 
	, get_random_config  = require(`./config-loader/modules/get-random-config`)
	, position_win       = require(`./application/vpn-win/position`)
	, alert              = require(`./application/alert`)
	, check_ip           = require(`./application/check-ip`)
	, openVPN            = require(`./open-vpn`)
	, fs 				 = require(`fs`)
	, setup_openVPN      = require(`./open-vpn/setup-open-vpn`)

	, Context = require(`./application/api/context`)
	, Setting = require(`./application/api/setting`)
	, About   = require(`./application/api/about`)
	, VPN     = require(`./application/api/vpn`)
	, App     = require(`./application/api/app`)



app.on(`ready`, () => {

	let { vpn_win
		, alert_win
		, ctx_menu_win
		, settings_win
	 	, about_win } = create_win()


	position_win( vpn_win )


	const application = new App(vpn_win)

	application.on(event => {

		if (event == `close`) {

			const interval_id = setInterval(() => {}, 9999)
				  timer_id    = setTimeout(() => {}, 9999); 
			
			for (let i = 0; i < interval_id; i++) {
				
				try{ clearInterval(i) } catch(e) {}

			}

			for (let i = 0; i < timer_id; i++) {
				
				try{ clearTimeout(i) } catch(e) {}

			}


			alert_win.destroy()
			ctx_menu_win.destroy()
			settings_win.destroy()
			about_win.destroy()
			vpn_win.destroy()
			openVPN.disconnect()

			vpn_win = null
			alert_win = null
			ctx_menu_win = null
			settings_win = null
			about_win = null

			app.quit()

		}

	})


	const about = new About(ipcMain)

	about.on(event => {

		if (event == `close-about`) {

			about_win.hide()		

		}

	})


	const vpn = new VPN(ipcMain)

	let reconnect
	  , timer_note_reconnect
	  , timer_bad_reconnect
	  , timer_setup_reconnect;

	vpn.on(event => {

		if (event == `connect`) {

			reconnect = 1

			const rand_config = get_random_config(`${__dirname}/config-loader/configs/`)


			openVPN.connect(rand_config, data_vpn => {

				if (data_vpn.code == 0) {

					clearTimeout(timer_note_reconnect)
					clearTimeout(timer_bad_reconnect)
					clearTimeout(timer_setup_reconnect)

					const config = fs.readFileSync(`${__dirname}/config-loader/config_params.json`)

					const parseConfig = JSON.parse(config)

					if (reconnect == 1 && parseConfig.Reconnect) {

						try{

							vpn_win.webContents.send(`re-connect`, {})

							alert(vpn_win, alert_win, `Переподключение...`)

						} catch (e) {}

					} 

				}

				if(data_vpn.code == 1) { 

					alert(vpn_win, alert_win, `Подключение к серверу`)
					

					const message = `Внимание: Соединение продолжается слишком долго попробуйте переподключиться`
					timer_note_reconnect = setTimeout(alert, 30000, vpn_win, alert_win, message)

					timer_bad_reconnect = setTimeout(() => vpn_win.webContents.send(`re-connect`, {}), 45000)

				}

				if( data_vpn.code == 4) { 

					clearTimeout(timer_note_reconnect)
					clearTimeout(timer_bad_reconnect)
					clearTimeout(timer_setup_reconnect)

					const ip      = data_vpn.vpn_config.ip
						, contry  = data_vpn.vpn_config.country_long
						, ping    = data_vpn.vpn_config.ping
						, session = data_vpn.vpn_config.num_vpn_sessions


					const parse_ip      = ip.length > 15     ? ip.split(``).slice(0, 14).join(``)     + `...` : ip
						, parse_contry  = contry.length > 12 ? contry.split(``).slice(0, 8).join(``)  + `...` : contry
						, parse_ping    = ping.length > 5    ? ping.split(``).slice(0, 3).join(``)    + `...` : ping
						, parse_session = session.length > 5 ? session.split(``).slice(0, 3).join(``) + `...` : session


					alert(vpn_win, alert_win, `IP: `         + parse_ip + `<br>` +
											  `cтрана: `     + parse_contry + `<br>` +
											  `ping: `       + parse_ping + ` ms<br>` +
											  `подключено: ` + parse_session) 

					setTimeout(alert, 214880, vpn_win, alert_win, `Digital Resistance!`)

					setTimeout(alert, 458880, vpn_win, alert_win, `Fuck RKN!`)

				}
				
				if( data_vpn.code == 5) { 
				
					clearTimeout(timer_note_reconnect)
					clearTimeout(timer_bad_reconnect)
					clearTimeout(timer_setup_reconnect)
				
					alert(vpn_win, alert_win, `Переподключение...`) 				
				
				}

				if( data_vpn.code == 11) { 
				
					alert(vpn_win, alert_win, `Сейчас начнется установка необходимых для работы компонентов`) 
					reconnect = 0
					return
				
				}

				if ( data_vpn.code == 12) {

					alert(vpn_win, alert_win, `Все TAP адаптеры заняты, хотите добавить новый ? <input type='button' onclick='ipcRenderer.send("setup", {})' value='Да'>`)
					return

				}

				if( data_vpn.code == 21) { 
				
					alert(vpn_win, alert_win, `Установка завершена!`)

					const message = `Внимание: чтобы изменения вступили в силу может потребоваться перезапуск приложения`
					setTimeout(alert, 5000, vpn_win, alert_win, message)

					timer_setup_reconnect = setTimeout(() => { 
						
						vpn_win.webContents.send(`re-connect`, {})
						reconnect = 1

					}, 12000)
					return
				
				}

				if ( data_vpn.code == 22) {

					alert(vpn_win, alert_win, `Установка не удалась. хотите попробовать еще раз ? <input type='button' onclick='ipcRenderer.send("setup", {})' value='Да'>`) 
					return

				}

				try{
				
					vpn_win.webContents.send(`data-connect`, data_vpn)
				
				} catch (e) {}

			});

		}

		if (event == `disconnect`) {
			
			reconnect = 0

			openVPN.disconnect()

			clearTimeout(timer_note_reconnect)
			clearTimeout(timer_bad_reconnect)
			clearTimeout(timer_setup_reconnect)

		}

		if (event == `setup`) {

			alert(vpn_win, alert_win, `Сейчас начнется установка необходимых для работы компонентов`) 
			reconnect = 0

			setup_openVPN(() => {

				alert(vpn_win, alert_win, `Установка завершена!`)

				const message = `Внимание: чтобы изменения вступили в силу может потребоваться перезагрузка`
				setTimeout(alert, 5000, vpn_win, alert_win, message)

				timer_setup_reconnect = setTimeout(() => { 
						
					vpn_win.webContents.send(`re-connect`, data_vpn)
					reconnect = 1

				}, 12000)

			}, () => {

				alert(vpn_win, alert_win, `Установка не удалась. хотите попробовать еще раз ? <input type='button' onclick='ipcRenderer.send("setup", {})' value='Да'>`) 

			})

		}

	})


	const context = new Context(vpn_win, ctx_menu_win, ipcMain)

	context.on((event, data) => {

		if (event == `open-context`) {

			const position = vpn_win.getPosition()

			const x = position[0] + data.x - 180,
				  y = position[1] + data.y - 235

			ctx_menu_win.setPosition(x, y)
			ctx_menu_win.show()

		}

		if (event == `close-context`) {

			ctx_menu_win.hide()

		}

		if (event == `ip`) {

			ctx_menu_win.hide()		

			vpn_win.webContents.send(`visual-load`, 1)
		
			alert(vpn_win, alert_win, `Определение IP ...`)

			setTimeout(() => {

				check_ip(ip => {

					vpn_win.webContents.send(`visual-load`, 0)
					alert(vpn_win, alert_win, ip)

				}, () => {

					vpn_win.webContents.send(`visual-load`, 0)
					alert(vpn_win, alert_win, `Какая-то ошибка`)

				})

			}, 5000)

		}

		if (event == `update-configs`) {

			ctx_menu_win.hide()
			update_config_list(100, vpn_win, alert_win)

		}

		if (event == `settings`) {

			ctx_menu_win.hide()	
			settings_win.show()	

			const config = fs.readFileSync(`${__dirname}/config-loader/config_params.json`)

			const parseConfig = JSON.parse(config)

			settings_win.webContents.send(`send-config`, parseConfig)

		}

		if (event == `about`) {

			ctx_menu_win.hide()
			about_win.show()

		}

		if (event == `hidden`) {

			alert_win.hide()
			ctx_menu_win.hide()
			settings_win.hide()
			about_win.hide()

			vpn_win.minimize()

		}

		if (event == `exit`) {

			ctx_menu_win.hide()
			vpn_win.close()

		}

	})


	const setting = new Setting(ipcMain)

	setting.on((event, data) => {

		if (event == `save-setting`) {

			settings_win.hide()

			const config = JSON.stringify(data)

			fs.writeFileSync(`${__dirname}/config-loader/config_params.json`, config)

			update_config_list(100, vpn_win, alert_win)

		}

		if (event == `close-setting`) {

			settings_win.hide()		

		}

	})


	update_config_list( 4000, vpn_win, alert_win )


})


