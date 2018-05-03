const Ip              = document.getElementById('ip')
	, About           = document.getElementById('about')
	, UpdateConfigs   = document.getElementById('update')
	, Settings        = document.getElementById('setting')
	, Hidden          = document.getElementById('hidden')
	, Exit            = document.getElementById('exit')
	, { ipcRenderer } = require('electron')


Ip.addEventListener('click', () => {

	ipcRenderer.send('ip', true)

})

UpdateConfigs.addEventListener('click', () => {

	ipcRenderer.send('update-configs', true)

})

Settings.addEventListener('click', () => {

	ipcRenderer.send('settings', true)

})

About.addEventListener('click', () => {

	ipcRenderer.send('about', true)

})

Hidden.addEventListener('click', () => {

	ipcRenderer.send('hidden', true)

})

Exit.addEventListener('click', () => {

	ipcRenderer.send('exit', true)

})