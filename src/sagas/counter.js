import { UPDATE_COUNTER, UPDATE_COMPLETE } from "../actions/counterAction";
import { delay } from "redux-saga";
import { put, takeEvery, fork } from "redux-saga/effects";

export function* count(action) {
  //yield delay(1000); //Delay the Counter By 1 Second
  yield put({ type: UPDATE_COMPLETE, payload: action.payload }); //Send the Final Payload to the Reducer
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchRequest() {
  yield takeEvery(UPDATE_COUNTER, count);
}

export default function* root() {
  yield fork(watchRequest);
}
