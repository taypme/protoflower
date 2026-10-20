# Protoflower

Protoflower is a small JavaScript HTTP-client experiment that turns a short API
configuration into convenient string-based GET and POST calls. It supports
both a named API style and a shorter single-default-API style.

## Install and test

```sh
npm install
npm test
```

The test command runs `node test.js`. The package uses ES modules and exports
its API from `index.js`.

## Named APIs

```js
import { makeApi } from './index.js'

makeApi('swapi', { host: 'swapi.dev' })
const person = await 'people/1'.api('swapi').get()
```

Requests always use HTTPS on port 443. The endpoint, host, and path remain
configurable; protocol and port options are ignored.

## Short API

```js
import { makeShortApi } from './index.js'

makeShortApi({ host: 'api.example.com', endpoint: 'api2' })
const people = await 'users'.get(2)
```

This prototype has intentionally small abstractions and limited error
handling. Treat it as a learning/reference project before using it as a
general-purpose HTTP client.
