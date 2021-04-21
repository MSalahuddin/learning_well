import { take, put, call, fork } from "redux-saga/effects";
// import { Actions } from "react-native-router-flux";
import ApiSauce from "../services/apiSauce";
import * as types from "../actions/ActionTypes";
import { success, failure } from "../actions/RegisterAction";
import { register_API } from "../config/WebServices";
import { ErrorHelper } from "../helpers";
// import { strings } from "../I18n";
import qs from 'qs';

function callRequest(data) {
  // let payload = qs.stringify({
  //   first_name: data.first_name,
  //   last_name: data.last_name,
  //   password: data.password,
  //   mobile_no: data.mobile_no,
  //   email: data.email,
  //   class_id:data.classId
  // })
  let formdata = new FormData();
  formdata.append("firstname", data.first_name);
  formdata.append("fathername",  data.fathername);
  formdata.append("email", data.email);
  formdata.append("contact_no",  data.mobile_no);
  formdata.append("class_id", data.classId);
  formdata.append("password",  data.password);

  return ApiSauce.post(register_API, formdata);
}
function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.REGISTER.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      if( response.code == 0 ){
      yield put(failure(response.msg));
      ErrorHelper.handleErrors(response.msg, true);
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
