import {take, put, call, fork} from 'redux-saga/effects';

import ApiSauce from '../services/apiSauce';
import {get_books_API} from '../config/WebServices';
import * as types from '../actions/ActionTypes';

import {success, failure} from '../actions/GetBooks';

import {ErrorHelper} from '../helpers';

function callRequest(data) {
  let formdata = new FormData();
  formdata.append("name", data.bookName);
  formdata.append("class_id", data.classId);
  
  let url = `${get_books_API}`;
  return ApiSauce.post(url, formdata);
}
function* watchRequest() {
  while (true) {
    const {payload} = yield take(types.GET_BOOKS.REQUEST);
    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response));
      //   setTimeout(() => {
      //     Actions.verify({
      //       phoneNumber: JSON.stringify(payload.phoneNumber).replace(/\"/g, ""),
      //       targetView: targetView,

      //       title: strings("navtitles.otp")
      //     });
      //   }, 800);
    } catch (err) {
      yield put(failure(err));
      ErrorHelper.handleErrors(err, true);
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
