import { makeApi } from './index.js'

makeApi('swapi', {
	host: 'swapi.dev',
})

let res
res = await 'people/1'.api('swapi').get()
res = await 'people'.api('swapi').get(1)
console.log(Object.keys(res))