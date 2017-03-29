import {put, select, call} from 'redux-saga/effects'

/**
 * Retrieves data from a passed selector and dispatch an START action with that information, then calls the api with the information merged with the payload, if the api call succedded, dispatches a SUCCESS action with the response on the payload, otherwise, dispatches a FAILURE action with the error
 * @param {function} apiMethod
 * @param {object} options
 * @return {function} generator function that receives the action from the saga
 */
function apiSaga (apiMethod, options = {}) {
  const {selectFromState, transformResponse, transformError} = options
  return function* apiSagaResponse (action) {
    const selectedData = selectFromState
      ? yield select(selectFromState)
      : {}

    yield put({
      type: `${action.type}_START`,
      payload: action.payload,
      selectedData
    })

    const {response, error} = yield call(
      apiMethod,
      Object.assign(
        {},
        {
          selectedData
        },
        {
          payload: action.payload
        }
      )
    )

    if (response) {
      yield put({
        type: `${action.type}_SUCCESS`,
        payload: transformResponse
          ? transformResponse(response)
          : response
      })
    } else {
      yield put({
        type: `${action.type}_FAILURE`,
        payload: transformError
          ? transformError(error)
          : error
      })
    }
  }
}

export default apiSaga
