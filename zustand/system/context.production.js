System.register(["react","zustand"],function(d){"use strict";var u,c,a,s,i,S;return{setters:[function(t){u=t.createContext,c=t.useRef,a=t.createElement,s=t.useContext,i=t.useMemo},function(t){S=t.useStore}],execute:function(){d("default",t);function t(){const n=u(void 0);return{Provider:({createStore:e,children:o})=>{const r=c();return r.current||(r.current=e()),a(n.Provider,{value:r.current},o)},useStore:(e,o)=>{const r=s(n);if(!r)throw new Error("Seems like you have not used zustand provider as an ancestor.");return S(r,e,o)},useStoreApi:()=>{const e=s(n);if(!e)throw new Error("Seems like you have not used zustand provider as an ancestor.");return i(()=>({getState:e.getState,setState:e.setState,subscribe:e.subscribe,destroy:e.destroy}),[e])}}}}}});