import { combineReducers } from "redux";
// import register from "./register";
import login from './login'
import navigation from "./navigation";
import getChapter from './getChapters';
import getBooks from './getBooks';
import register from './register'
export const rootReducer = combineReducers({
  // register,
  login,
  navigation,
  getChapter,
  getBooks,
  register
});
