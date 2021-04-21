// @flow

import { GET_BOOKS, LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: GET_BOOKS.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_BOOKS.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_BOOKS.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}