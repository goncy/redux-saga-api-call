# Redux Saga api call (`redux-saga-api-call`)
[![Build Status](https://travis-ci.org/goncy/redux-saga-api-call.svg?branch=master)](https://travis-ci.org/goncy/redux-saga-api-call)

Simple api call for Redux Saga


## What
Redux Saga api call is a simple method to simplify api calls, instead of calling the api and catch the response and error to dispatch the success and failure action, this call do that for you.


## How
```js
import apiCall from 'redux-saga-api-call'

// Simplest case
function* fetchJokeWatcher () {
  yield takeEvery(fetchJoke.type, apiSaga(fetchJokeApi))
}
```

### Options
Call the method like this:
`apiCall(apiMethod, options)`
~`apiMethod` should be a thenable object~

* `transformPayload`: A function that receives the Redux state, then the `apiMethod` will receive a merged object between this selectors and the action payload
* `transformResponse`: Once the `apiMethod` resolved, the response will be piped through this function and the result will be dispatched as `{ACTION_NAME}_SUCCESS` (If this is not present, the raw result will be dispatched instead)
* `transformError`: Once the `apiMethod` rejected, the error will be piped through this function and the result will be dispatched as `{ACTION_NAME}_FAILURE` (If this is not present, the raw error will be dispatched instead)

## Why
To reduce the boilerplate in most basic api calls


## Installation
```sh
yarn add redux-saga-api-call
// or
npm install --save redux-saga-api-call
```


## Contributors
Simply create a pull request :)
* Code style: **Standard**


## Thanks
This project is based on an idea of [@pablen](https://github.com/pablen) about reducing boilerplate in Redux Saga.


## License
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
