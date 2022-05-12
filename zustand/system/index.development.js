System.register(['react', 'use-sync-external-store/shim/with-selector'], (function (exports) {
  'use strict';
  var useDebugValue, useSyncExternalStoreWithSelector;
  return {
    setters: [function (module) {
      useDebugValue = module.useDebugValue;
    }, function (module) {
      useSyncExternalStoreWithSelector = module.useSyncExternalStoreWithSelector;
    }],
    execute: (function () {

      exports({
        default: create,
        useStore: useStore
      });

      function createStore(createState) {
        let state;
        const listeners = /* @__PURE__ */ new Set();
        const setState = (partial, replace) => {
          const nextState = typeof partial === "function" ? partial(state) : partial;
          if (nextState !== state) {
            const previousState = state;
            state = replace ? nextState : Object.assign({}, state, nextState);
            listeners.forEach((listener) => listener(state, previousState));
          }
        };
        const getState = () => state;
        const subscribe = (listener) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        };
        const destroy = () => listeners.clear();
        const api = { setState, getState, subscribe, destroy };
        state = createState(setState, getState, api);
        return api;
      }

      function useStore(api, selector = api.getState, equalityFn) {
        const slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getState, selector, equalityFn);
        useDebugValue(slice);
        return slice;
      }
      function create(createState) {
        const api = typeof createState === "function" ? createStore(createState) : createState;
        const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
        Object.assign(useBoundStore, api);
        return useBoundStore;
      }

    })
  };
}));
