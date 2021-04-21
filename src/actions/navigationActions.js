import { DRAWAR_MENU_SWITCHED, APP_STATE_CHANGED } from "./ActionTypes";

export function drawerMenuSwitched(oldView: String, newView: String) {
  return {
    oldView,
    newView,
    type: DRAWAR_MENU_SWITCHED
  };
}

export function onAppStateChanged(nextState: String) {
  return {
    nextState,
    type: APP_STATE_CHANGED
  };
}
