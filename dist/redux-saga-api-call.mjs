import _regeneratorRuntime from 'babel-runtime/regenerator';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import { call, put, select } from 'redux-saga/effects';

/**
 * Retrieves data from a passed selector and dispatch an START action with that information, then calls the api with the information merged with the payload, if the api call succedded, dispatches a SUCCESS action with the response on the payload, otherwise, dispatches a FAILURE action with the error
 * @param {function} apiMethod
 * @param {function} selector
 * @return {function} generator function that receives the action from the saga
 */
function apiSaga(apiMethod, options) {
  var transformPayload = options.transformPayload,
      transformResponse = options.transformResponse,
      transformError = options.transformError;

  return _regeneratorRuntime.mark(function apiSagaResponse(action) {
    var selectedData, result;
    return _regeneratorRuntime.wrap(function apiSagaResponse$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (action) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return');

          case 2:
            if (!transformPayload) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return select(transformPayload);

          case 5:
            _context.t0 = _context.sent;
            _context.next = 9;
            break;

          case 8:
            _context.t0 = {};

          case 9:
            selectedData = _context.t0;
            _context.next = 12;
            return put({
              type: action.type + '_START',
              payload: action.payload,
              selectedData: selectedData
            });

          case 12:
            _context.prev = 12;
            _context.next = 15;
            return call(apiMethod, _Object$assign({}, selectedData, action.payload));

          case 15:
            result = _context.sent;
            _context.next = 18;
            return put({
              type: action.type + '_SUCCESS',
              payload: transformResponse ? transformResponse(result) : result
            });

          case 18:
            return _context.abrupt('return', _context.sent);

          case 21:
            _context.prev = 21;
            _context.t1 = _context['catch'](12);
            _context.next = 25;
            return put({
              type: action.type + '_FAILURE',
              payload: transformError ? transformError(_context.t1) : _context.t1
            });

          case 25:
            return _context.abrupt('return', _context.sent);

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, apiSagaResponse, this, [[12, 21]]);
  });
}

export default apiSaga;
//# sourceMappingURL=redux-saga-api-call.mjs.map
