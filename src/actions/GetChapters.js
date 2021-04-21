// @flow

import { GET_CHAPTERS, LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: GET_CHAPTERS.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_CHAPTERS.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_CHAPTERS.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}