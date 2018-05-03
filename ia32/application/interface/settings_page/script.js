
const Select          = document.getElementsByClassName('select')
	, Reconnect       = document.getElementById('auto-reconnect')
	, btn             = document.getElementsByClassName('btn')
	, { ipcRenderer } = require('electron')



const generatorOption = (obj) => {

	let option_list = ''

	obj.map(elem => {

		const From    = elem.from
			, To      = elem.to
			, Step    = elem.step
			, Context = elem.context


		for (let i = From; i < To; i += Step) {

			let ni = i

			if ( i < 1 && i != 0) {

				ni = i.toFixed(2)

			}

			option_list += '<option value=' + (ni + Context) + '>' + ni +' '+ Context + '</option>'

		}

	})


	return option_list

}


Select[0].innerHTML += generatorOption([{ from: 1, to: 100, step: 1, context: '' },
										{ from: 100, to: 1000, step: 100, context: ''}])

Select[1].innerHTML += generatorOption([{ from: 1, to: 100, step: 1, context: 'ms' },
										{ from: 100, to: 501, step: 3, context: 'ms'}])


Select[2].innerHTML += generatorOption([{ from: 1, to: 100, step: 1, context: '' },
										{ from: 100, to: 1000, step: 100, context: ''},
										{ from: 1000, to: 10000, step: 1000, context: ''},
										{ from: 10000, to: 100000, step: 10000, context: ''}])


Select[3].innerHTML += [ 'Japan', 'Korea Republic of', 'United States', 'Thailand','Germany',
						 'New Zealand', 'Argentina', 'Poland', 'United Kingdom', 'Hong Kong',
						 'Viet Nam', 'Russian Federation', 'France', 'China', 'Singapore',
						 'Trinidad and Tobago', 'Moldova Republic of', 'Canada', 'Romania',
						 'Algeria', 'Venezuela', 'Indonesia', 'Brazil', 'Mexico', 'Cyprus',
						 'Iceland', 'Bangladesh', 'Morocco', 'Iraq', 'Ukraine', 'Iran (ISLAMIC Republic Of)',
						 'Turkey', 'Angola', 'El Salvador', 'Chile', 'Egypt', 'Spain',
						 'Netherlands', 'Colombia' ].map(e => {

	return '<option value=' + e.replace(/ /gi, '_') + '>' + e + '</option>'

}).join('')


Select[4].innerHTML += generatorOption([{ from: 0, to: 60, step: 1, context: 'min' },
										{ from: 1, to: 24, step: 1, context: 'hours'},
										{ from: 1, to: 131, step: 1, context: 'day'}])

Select[5].innerHTML += generatorOption([{ from: 0, to: 1, step: 0.03, context: 'Mbsp' },
										{ from: 1, to: 300, step: 1, context: 'Mbsp'}])

Select[6].innerHTML += generatorOption([{ from: 0, to: 1, step: 0.03, context: 'GB' },
										{ from: 1, to: 100, step: 1, context: 'GB'},
										{ from: 100, to: 1000, step: 50, context: 'GB'},
										{ from: 1000, to: 10000, step: 500, context: 'GB'}])


Select[7].innerHTML += generatorOption([{ from: 100, to: 1000, step: 100, context: ''},
										{ from: 1000, to: 10000, step: 1000, context: ''},
										{ from: 10000, to: 100000, step: 10000, context: ''},
										{ from: 100000, to: 1000000, step: 100000, context: ''}])



const parseUptmeFormat = (value) => {

	const num = parseInt(value)

	if (value.match(/min/ig)) {

		return num * 60 * 1000

	} 

	if (value.match(/hours/ig)) {

		return num * 60 * 60 * 1000

	} 

	if (value.match(/day/gi)) {

		return num * 24 * 60 * 60 * 1000

	} 

	return '-'

} 


const goUptimeFormat = (ms) => {
	
	const min = ms / 1000 / 60
	const hours = min / 60
	const day = hours / 24

	if ( day > 1 ) {

		return day + 'day'

	}

	if ( hours > 1 ) {

		return hours + 'hours'

	}

	if ( min > 1 ) {
		
		return min + 'min'
	
	}

}





ipcRenderer.on('send-config', (e, data) => {

	Select[0].value = data.NumVpnSessions == '-' ? '-' : data.NumVpnSessions
	Select[1].value = data.Ping == '-' ? '-' : data.Ping + 'ms'
	Select[2].value = data.TotalUsers == '-' ? '-' : data.TotalUsers
	Select[3].value = data.CountryLong.replace(/ /gi, '_')
	Select[4].value = data.Uptime == '-' ? '-' : goUptimeFormat(data.Uptime)
	Select[5].value = data.Speed == '-' ? '-' : (parseFloat(data.Speed) / 1048576) + 'Mbsp'
	Select[6].value = data.TotalTraffic == '-' ? '-' : parseFloat(data.TotalTraffic) / 1073741824 + 'GB'
	Select[7].value = data.Score || '-'
	Reconnect.checked = data.Reconnect
})



btn[0].addEventListener('click', () => {

	ipcRenderer.send('save-setting', {

		  NumVpnSessions: Select[0].value || '-'

		, Ping: parseInt(Select[1].value) || '-'

		, TotalUsers: Select[2].value || '-'

		, CountryLong: Select[3].value.replace(/_/gi, ' ')

		, Uptime: parseUptmeFormat(Select[4].value)

		, Speed: parseFloat(Select[5].value) * 1048576 || '-'

		, TotalTraffic: parseFloat(Select[6].value) * 1073741824 || '-'

		, Score: Select[7].value || '-'

		, Reconnect: Reconnect.checked ? 1 : 0  

	})

})


btn[1].addEventListener('click', () => {

	ipcRenderer.send('close-setting', true)

})



