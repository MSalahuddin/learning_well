// import register from "./register";
import login from "./login";
import getBooks from "./getBooks";
import getChapters from './getChapters';
import register from './register';
import { fork } from "redux-saga/effects";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  // yield fork(register);
  yield fork(login);
  yield fork(getBooks);
  yield fork(getChapters);
  yield fork(register);
}
