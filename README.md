# protoflower
```javascript
import { makeApi } from 'protoflower'

makeApi('swapi', {
    host: 'swapi.dev',
})
makeApi('core', {
    host: 'domain.com',
    endpoint: 'apiv2'
})

// GET requests
let skywalker = await 'people/1'.api('swapi').get()
let himalsobe = await 'people'.api('swapi').get(1)

// POST requests
let response = await 'entity/add'.api('core').post({
    type: 'blog_post',
    title: 'My Best Summer: 2048',
    body: 'I had a really good time.',
}) 
```
just run `node test.js` or `npm test`

requests made in the above code:
```
GET http://swapi.dev/api/people/1
GET http://swapi.dev/api/people/1
POST http://domain.com/apiv2/entity/add
```
defaults object:
```javascript
let defaults = {
    port: 80,
    host: '/',
    protocol: 'http',
    endpoint: 'api'
}
```

Other shorter prototype:
```javascript
import { makeShortApi }

makeShortApi({
    endpoint: 'api2',
    port: 8000,
    host: 'localhost'
})

let people = 'users'.get(2) // returns await response.json(), so you don't have to. annoying, I know
let newUser = 'user/create'.post({
    name: 'mynameis'
})
```
Requests:
```
GET http://localhost:8000/api2/users/3
POST http://localhost:8000/api2/user/create
```
