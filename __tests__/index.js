import {put, call, select} from 'redux-saga/effects'

import apiCall from '../src'

const apiMethod = () => Promise.resolve({response: 'foo'})

const action = {
  type: 'MY_ACTION',
  payload: 'bar'
}

describe('should test redux-saga-api-call flow without options', () => {
  let apiSaga
  let flow
  beforeEach(() => {
    apiSaga = apiCall(apiMethod)
    flow = apiSaga(action)
  })

  test('should return a function', () => {
    const actual = typeof apiSaga
    const expected = 'function'

    expect(actual).toBe(expected)
  })

  test('should dispatch an START action with the raw data', () => {
    const actual = flow.next().value
    const expected = put({
      type: `${action.type}_START`,
      payload: action.payload,
      selectedData: {}
    })

    expect(actual).toEqual(expected)
  })

  test('should call the api with the raw data', function () {
    flow.next()
    const actual = flow.next().value
    const expected = call(
      apiMethod,
      {
        payload: action.payload,
        selectedData: {}
      }
    )

    expect(actual).toEqual(expected)
  })

  test('should dispatch a SUCCESS action with the response data', (done) => {
    flow.next()
    flow.next()
    Promise.resolve({response: 'foo'})
      .then(data => {
        const actual = flow.next(data).value
        const expected = put({
          type: `${action.type}_SUCCESS`,
          payload: data.response
        })

        expect(actual).toEqual(expected)
        done()
      })
  })

  test('should dispatch a FAILURE action with the error data', (done) => {
    flow.next()
    flow.next()
    Promise.reject({error: 'error'})
      .catch(data => {
        const actual = flow.next(data).value
        const expected = put({
          type: `${action.type}_FAILURE`,
          payload: data.error
        })

        expect(actual).toEqual(expected)
        done()
      })
  })
})

describe('should test redux-saga-api-call flow with options', () => {
  let apiSaga
  let flow
  let selectedDataResponse
  let options
  beforeEach(() => {
    selectedDataResponse = {
      foo: 'bar'
    }
    options = {
      selectFromState: () => selectedDataResponse,
      transformResponse: (response) => response + '!',
      transformError: (error) => error + '!'
    },
    apiSaga = apiCall(apiMethod, options)
    flow = apiSaga(action)
  })

  test('should return a function', () => {
    const actual = typeof apiSaga
    const expected = 'function'

    expect(actual).toBe(expected)
  })

  test('should save the transformed selectedData', () => {
    const actual = flow.next().value
    const expected = select(options.selectFromState)

    expect(actual).toEqual(expected)
  })

  test('should dispatch an START action with the selected data', () => {
    flow.next()
    const actual = flow.next(selectedDataResponse).value
    const expected = put({
      type: `${action.type}_START`,
      payload: action.payload,
      selectedData: selectedDataResponse
    })

    expect(actual).toEqual(expected)
  })

  test('should call the api with the selected data', function () {
    flow.next()
    flow.next(selectedDataResponse)
    const actual = flow.next().value
    const expected = call(
      apiMethod,
      Object.assign(
        {},
        {
          selectedData: selectedDataResponse
        },
        {
          payload: action.payload
        }
      )
    )

    expect(actual).toEqual(expected)
  })

  test('should dispatch a SUCCESS action with the response data transformed', (done) => {
    flow.next()
    flow.next()
    flow.next()
    Promise.resolve({response: 'foo'})
      .then(data => {
        const actual = flow.next(data).value
        const expected = put({
          type: `${action.type}_SUCCESS`,
          payload: options.transformResponse(data.response)
        })

        expect(actual).toEqual(expected)
        done()
      })
  })

  test('should dispatch a FAILURE action with the error data transformed', (done) => {
    flow.next()
    flow.next()
    flow.next()
    Promise.reject({error: 'error'})
      .catch(data => {
        const actual = flow.next(data).value
        const expected = put({
          type: `${action.type}_FAILURE`,
          payload: options.transformError(data.error)
        })

        expect(actual).toEqual(expected)
        done()
      })
  })
})