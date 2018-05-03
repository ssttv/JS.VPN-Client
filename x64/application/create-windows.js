const { BrowserWindow } = require(`electron`)

module.exports = () => {

	const vpn_win = new BrowserWindow({

		  title: `JS.VPN-Client` 
	    , width: 116
		, height: 116
		, minWidth: 116
		, maxWidth: 116
		, minHeight: 116
		, maxHeight: 116
		, maximazable: false
		, resizable: false
		, useContentSize: true
		, fullscreenable: false
		, transparent: true
		, frame: false
		, alwaysOnTop: true
		, center: true
		, acceptFirstMouse: true

	})

	const alert_win = new BrowserWindow({
		
		  frame: false
		, width: 200
		, height: 175
		, minWidth: 200
		, maxWidth: 200
		, minHeight: 175
		, maxHeight: 175
		, maximazable: false
		, resizable: false
		, useContentSize: true
		, fullscreenable: false
		, parent: vpn_win
		, resizable: false
		, show: false
		, transparent: true

	})

	const ctx_menu_win = new BrowserWindow({
		
		  frame: false
		, transparent: true
		, width: 180
		, height: 235
		, minWidth: 180
		, maxWidth: 180
		, minHeight: 235
		, maxHeight: 235
		, maximazable: false
		, resizable: false
		, useContentSize: true
		, fullscreenable: false
		, parent: vpn_win
		, resizable: false
		, show: false

	})

	const settings_win = new BrowserWindow({
		
		  frame: false
		, transparent: true
		, width: 350
		, height: 520
		, minWidth: 350
		, maxWidth: 350
		, minHeight: 520
		, maxHeight: 520
		, maximazable: false
		, resizable: false
		, useContentSize: true
		, fullscreenable: false
		, parent: vpn_win
		, resizable: false
		, center: true
		, show: false

	})

	const about_win = new BrowserWindow({
		
		  frame: false
		, transparent: true
		, width: 175
		, height: 463
		, minWidth: 175
		, maxWidth: 175
		, minHeight: 463
		, maxHeight: 463
		, maximazable: false
		, resizable: false
		, useContentSize: true
		, fullscreenable: false
		, parent: vpn_win
		, resizable: false
		, center: true
		, show: false

	})

	vpn_win.loadURL(`file://${__dirname}/interface/vpn_page/index.html`)

	ctx_menu_win.loadURL(`file://${__dirname}/interface/context_menu_page/index.html`)
	
	alert_win.loadURL(`file://${__dirname}/interface/alert_page/index.html`)

	settings_win.loadURL(`file://${__dirname}/interface/settings_page/index.html`)

	about_win.loadURL(`file://${__dirname}/interface/about_page/index.html`)

	return {

		  vpn_win: vpn_win
		, ctx_menu_win: ctx_menu_win
		, alert_win: alert_win
		, settings_win: settings_win
		, about_win: about_win
	
	}

}