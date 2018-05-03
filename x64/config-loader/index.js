const request           = require(`request`)
    , delete_configs    = require(`./modules/delete-configs`)
    , parse_configs     = require(`./modules/parse-configs`)
    , cleansing_configs = require(`./modules/cleansing-configs`)
    , write_configs     = require(`./modules/write-configs`)


///

const url_api = `http://130.158.6.57/api/iphone/`
    , path_config_floder = `${__dirname}/configs/`
    , path_config_param  = `${__dirname}/config_params.json`

///


module.exports = (callback, callback_error) => {

    request(url_api, (error, response, body) => {

        if (error) { callback_error(); return }

        let configs_arr = parse_configs(body)

        
        if (configs_arr.length > 1) {
            delete_configs(path_config_floder)
        }

        configs_arr = cleansing_configs(path_config_param, configs_arr)

        write_configs(path_config_floder, configs_arr)


        callback(configs_arr.length)


	});

}
