import { createStore, applyMiddleware } from "redux";

import { compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "../reducers";
import rootSaga from "../sagas";
import { createLogger } from "redux-logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true
});

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, logger))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
