System.register([],function(u){"use strict";return{execute:function(){u("default",i);function i(a){let t;const s=new Set,c=(e,f)=>{const n=typeof e=="function"?e(t):e;if(n!==t){const S=t;t=f?n:Object.assign({},t,n),s.forEach(d=>d(t,S))}},o=()=>t,r={setState:c,getState:o,subscribe:e=>(s.add(e),()=>s.delete(e)),destroy:()=>s.clear()};return t=a(c,o,r),r}}}});
