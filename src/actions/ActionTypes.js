// @flow
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}
export const LOGOUT = "LOGOUT";
export const REGISTER = createRequestTypes("REGISTER");
export const LOGIN = createRequestTypes("LOGIN");
export const GET_BOOKS = createRequestTypes("GET_BOOKS");
export const GET_CHAPTERS = createRequestTypes("GET_CHAPTERS");
export const DRAWAR_MENU_SWITCHED = "DRAWAR_MENU_SWITCHED";
export const APP_STATE_CHANGED = "APP_STATE_CHANGED";