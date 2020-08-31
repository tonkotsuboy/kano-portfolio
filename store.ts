import { useMemo } from "react";
import { Action, applyMiddleware, createStore, Reducer, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// next.jsでのStore利用
// 参考：https://github.com/vercel/next.js/blob/canary/examples/with-redux/store.js

export type RootState = {
  /** ナビゲーションが開いているかどうか */
  navigationIsOpened: boolean;
};

let store: Store<RootState> | undefined;

const initialState: RootState = {
  navigationIsOpened: false,
};

const OPEN_NAVIGATION = "OPEN_NAVIGATION" as const;
const CLOSE_NAVIGATION = "CLOSE_NAVIGATION" as const;

/**
 * ナビゲーションを開きます
 */
export const openNavigation = (): Action => ({
  type: OPEN_NAVIGATION,
});

/**
 * ナビゲーションを閉じます
 */
export const closeNavigation = (): Action => ({
  type: CLOSE_NAVIGATION,
});

export type ActionType = ReturnType<
  typeof openNavigation | typeof closeNavigation
>;

const reducer: Reducer<RootState, ActionType> = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case OPEN_NAVIGATION:
      return {
        ...state,
        navigationIsOpened: true,
      };
    case CLOSE_NAVIGATION:
      return {
        ...state,
        navigationIsOpened: false,
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState: RootState) => {
  // eslint-disable-next-line no-underscore-dangle,@typescript-eslint/naming-convention
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(state: RootState) {
  return useMemo(() => initializeStore(state), [initialState]);
}
