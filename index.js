import 'isomorphic-fetch'
global.apis = {}

function generateApi(name, options) {
	let defaults = {
		port: 80,
		host: '/',
		protocol: 'http',
		endpoint: 'api'
	}
	
	options = Object.assign(defaults, options, {})
	return async function(endpoint, method, data) {
		options.method = method
		switch(method) {
			case 'POST':
				options.body = JSON.stringify(data)
				options.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
				break;
			case 'GET':
				if(typeof data !== 'undefined') endpoint = endpoint + '/' + data
				break;
		}
		
    let fullEndpoint = `${options.protocol}://${options.host}:${options.port}/${options.endpoint}/${endpoint}?_format=json`

    //console.log('options: ', options)

		return await fetch(fullEndpoint, options)
	}
}

function generateGetApi(options) {

	let defaults = {
		port: 80,
		host: '/',
		protocol: 'http',
		endpoint: 'api',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
	}

  let merged = Object.assign(defaults, options, {})

  String.prototype.get = async function(endpoint) {

    let options = merged
	  let fullEndpoint = `${options.protocol}://${options.host}:${options.port}/${options.endpoint}/${this}/${endpoint}?_format=json`,
        response = await fetch(fullEndpoint, defaults)

    return await response.json()
  }
}

function generatePostApi(options) {
	let defaults = {
		port: 8000,
		host: 'localhost',
		protocol: 'http',
		endpoint: 'api',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
	}

  let merged = Object.assign(defaults, options, {})

  String.prototype.post = async function(obj){

    let options = merged
        options.body = JSON.stringify(obj)

    let fullEndpoint = `${options.protocol}://${options.host}:${options.port}/${options.endpoint}/${this}?_format=json`.replace('undefined', '');

    let response = await fetch(fullEndpoint, options)
    return await response.json()
  }
}

function api(api) {
	var self = this;
	return {
		get: async function(slug) {
			return await global.apis[api](self, 'GET', slug)
		},
		post: async function(body) {
			return await global.apis[api](self, 'POST', body)
		}
	}
}
String.prototype.api = api

export function makeApi(name, options) {
	global.apis[name] = generateApi(name, options)
}

export function makeShortApi(options) {
  generateGetApi(options)
  generatePostApi(options)
}
