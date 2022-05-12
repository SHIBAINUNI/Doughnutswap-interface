(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('use-sync-external-store/shim/with-selector')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'use-sync-external-store/shim/with-selector'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.zustand = {}, global.React, global.withSelector));
})(this, (function (exports, react, withSelector) { 'use strict';

  function createStore(createState) {
    var state;
    var listeners = new Set();

    var setState = function setState(partial, replace) {
      var nextState = typeof partial === 'function' ? partial(state) : partial;

      if (nextState !== state) {
        var _previousState = state;
        state = replace ? nextState : Object.assign({}, state, nextState);
        listeners.forEach(function (listener) {
          return listener(state, _previousState);
        });
      }
    };

    var getState = function getState() {
      return state;
    };

    var subscribe = function subscribe(listener) {
      listeners.add(listener);
      return function () {
        return listeners.delete(listener);
      };
    };

    var destroy = function destroy() {
      return listeners.clear();
    };

    var api = {
      setState: setState,
      getState: getState,
      subscribe: subscribe,
      destroy: destroy
    };
    state = createState(setState, getState, api);
    return api;
  }

  function useStore(api, selector, equalityFn) {
    if (selector === void 0) {
      selector = api.getState;
    }

    var slice = withSelector.useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getState, selector, equalityFn);
    react.useDebugValue(slice);
    return slice;
  }

  function create(createState) {
    var api = typeof createState === 'function' ? createStore(createState) : createState;

    var useBoundStore = function useBoundStore(selector, equalityFn) {
      return useStore(api, selector, equalityFn);
    };

    Object.assign(useBoundStore, api);
    return useBoundStore;
  }

  exports["default"] = create;
  exports.useStore = useStore;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
