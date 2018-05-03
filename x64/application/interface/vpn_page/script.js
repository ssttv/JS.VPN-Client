class Animation {

	constructor (elem) {

		this.elem = elem
		this.load_on = true

		this.to_1 = false
		this.to_2 = false

	}

	start_center (callback) {

		if (this.to_1) { return }

		this.elem.style.transition = '0s'; 
		this.elem.style.left = '-62px'
		this.elem.style.top  = '78px'

		setTimeout(() => {

			this.to_1 = true

			this.elem.style.transition = '1.5s'; 
			this.elem.style.left = '14px'
			this.elem.style.top  = '18px'

			setTimeout(() => {

				this.to_1 = false
				callback()

			}, 1500)

		}, 20)

	}

	center_end (callback) {

		if (this.to_2) { return }

		this.elem.style.transition = '0s'; 
		this.elem.style.left = '14px'
		this.elem.style.top  = '18px'


		setTimeout(() => {

			this.to_2 = true

			this.elem.style.transition = '1.5s'; 
			this.elem.style.left = '97px'
			this.elem.style.top  = '-50px'

			setTimeout(() => {

				this.to_2 = false
				callback()

			}, 1500)

		}, 20)

	}

	start_end (callback) {

		this.start_center(() => {

			this.center_end(() => {

				callback()

			})

		})

	}

	end_start (callback) {

		this.center_end(() => {

			this.start_center(() => {

				callback()

			})

		})

	}

	start_load_start (callback) {

		if (!this.load_on) {
			this.load_on = true
		}

		this.start_center(() => {

			this.center_end(() => {

				if (this.load_on) {
						
					this.start_load_start(callback)
					
				} else {

					this.start_center(() => {

						callback()

					})

				}

			})

		})

	}

}

const setStatusBackground = (elem, color, border, shadow) => {

	elem.style.background = color
	elem.style.border     = border
	elem.style.boxShadow  = shadow	

}


const Btn                      = document.getElementsByClassName('btn')[0]
	, Plane                    = document.getElementsByClassName('plane')[0]
	, { ipcRenderer, ipcMain } = require('electron')


const animation = new Animation(Plane)

animation.start_center(() => {})


let i = 0

Plane.addEventListener('click', () => {

	i = !i

	if (i) {

		ipcRenderer.send('connect', {})

	} else {

		ipcRenderer.send('disconnect', {})

	}

})


ipcRenderer.on('re-connect', (e, data) => {

	ipcRenderer.send('connect', {})	

})


ipcRenderer.on('visual-load', (e, data) => {

	if (data == 0) {

		animation.load_on = false

	}

	if (data == 1) {

		animation.center_end(() => {
			animation.start_load_start(() => {})
		})

	}

})



ipcRenderer.on('data-connect', (e, data) => {
	
	if (data.code == 0) {

		animation.load_on = false

		setStatusBackground( Btn
						   , '#f06069'
						   , '13px solid #e2333d'
						   , '2px 2px 5px 1px rgba(255, 24, 37, 0.4)')

		animation.center_end(() => {
			animation.start_center(() => {})
		})

	}

	if (data.code == 1) {
			
		setStatusBackground( Btn
						   , '#f08760'
						   , '13px solid #e35f32'
						   , '2px 2px 5px 1px rgba(255, 97, 38, 0.4)')

		animation.center_end(() => {
			animation.start_load_start(() => {})
		})

	}

	if (data.code == 2) {

		setStatusBackground( Btn
						   ,'#f09c60'
						   ,'13px solid #e37a32'
						   ,'2px 2px 5px 1px rgba(255, 127, 35, 0.4)')

		animation.center_end(() => {
			animation.start_load_start(() => {})
		})

	}

	if (data.code == 3) {

		setStatusBackground( Btn
						   , '#f5cc5b'
						   , '13px solid #f1c131'
						   , '2px 2px 5px 1px rgba(255, 197, 37, 0.4)')

		animation.center_end(() => {
			animation.start_load_start(() => {})
		})

	}
	
	if (data.code == 4) {
			
		animation.load_on = false

		setStatusBackground( Btn
						   , '#60a2f0'
						   , '13px solid #3286e3'
						   , '2px 2px 5px 1px rgba(40, 138, 255, 0.4)')
		
	
	}
		
	if (data.code == 5) {

		animation.load_on = false

		setStatusBackground( Btn
						   , '#f0e860'
						   , '13px solid #e3d932'
						   , '2px 2px 5px 1px rgba(255, 243, 34, 0.4)')
		
	}

});


