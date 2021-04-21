import { take, put, call, fork } from "redux-saga/effects";

import ApiSauce from "../services/apiSauce";
import { login_API } from "../config/WebServices";
import * as types from "../actions/ActionTypes";

import { success, failure } from "../actions/Login";

import { ErrorHelper } from "../helpers";
import qs from 'qs';
function callRequest(data) {
  // let payload = qs.stringify({
  //   email: data.email,
  //   password: data.password
  // })
  let formdata = new FormData();
  formdata.append("user", data.email)
formdata.append("password",  data.password)

  // email: userId,
  //     password: password
  return ApiSauce.post(login_API, formdata);
}
function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.LOGIN.REQUEST);
    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);
      if( response.code == 0 ){
        
        yield put(failure(response.msg));
        let msg = response && response.msg ? response.msg : "Wrong credentials"
        ErrorHelper.handleErrors(msg, true);
        }
        else{
          yield put(success(response));
        }
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