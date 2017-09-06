# molgenis-vue-test-utils
Testing utilities for Vue and Vuex Javascript unit tests

Installation
------------

### NPM
```bash
npm install @molgenis/molgenis-vue-test-utils --save
```

### Yarn
```bash
yarn add @molgenis/molgenis-vue-test-utils
```

Usage
-----

__Import in your HTML__
```html
<script src="path/to/molgenis-vue-test-utils.js"></script>
```

__Import as ES6 module__
```js
import utils from '@molgenis/molgenis-vue-test-utils'

utils.testAction(...)
```

__CommonJS import__
```js
const utils = require('@molgenis/molgenis-vue-test-utils/dist/molgenis-vue-test-utils.js')

utils.testAction(...)
```

Examples
--------
```js

// actions.js

import api from 'whatever-you-use-as-api'
export const GET_A_NICE_RESPONSE = '__GET_A_NICE_RESPONSE__'

export default {
  [GET_A_NICE_RESPONSE] ({commit}, id) {
    api.get('/api/response/' + id).then(response => {
      commit(SET_RESPONSE, response)
    }
  }
}
 
// actions.spec.js
 
import td from 'testdouble'
import api from 'whatever-you-use-as-api'
import { testAction } from '@molgenis/molgenis-js-test-utils'
import actions from 'store/actions'
 
it('call an api, and call a mutation with the response', done => {
  const response = 'got a nice response'
  
  const get = td.function('api.get')
  td.when(get('/api/response/my_id')).thenResolve(response)
  td.replace(api, 'get', get)
 
  const options = {
    payload: 'my_id',
    expectedMutations: [
      {type: SET_RESPONSE, payload: response}
    ]
  }
  testAction(actions.__GET_NICE_RESPONSE__, options, done)
})
```

Methods
-------

| Method | Description |
|--------|-------------|
| utils.testAction(action, options, done) | Test a Vuex action |

Options
-------

The options object that can be supplied to the _testAction_ function can contain the following parameters

| Parameter | Description | Default value |
|-----------|-------------|---------------|
| payload | a JS object or string or number to pass to the action being tested | null |
| state | the state used by the action being tested | {} |
| expectedMutations | an array of _object{type:..., payload:...}_ describing all the mutations that are committed by the action being tested | [] |
| expectedActions | an array of _object{type:..., payload:...}_ describing all the actions that are dispatched by the action being tested | [] |

Contributing
------------

This project uses [Yarn](https://yarnpkg.com) for development, uses [Mocha](https://mochajs.org/
) for testing and is compiled with [Rollup](https://rollupjs.org/)

To get started: `yarn install`

To build: `yarn build`

To test: `yarn test`

To test with coverage: `yarn test:cover`

To get coverage: `yarn coveralls`

To lint: `yarn lint`

To debug:
 first add node-inspector: `npm install -g node-inspector`
 then run: `yarn debug`
