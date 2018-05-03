
module.exports = class App {

	constructor (vpn_win) {

		this.vpn_win = vpn_win

	}

	on (e) {

		this.vpn_win.on(`close`, () =>{

			e(`close`)

		})

	}

}