//js
import{i}from"./utils-ee554c84.js";async function u({fetch:o,params:t,parent:a}){const e=await a();let c=e.places,n=e.lookup,p=e.links,l=t.code.replaceAll("/",""),{place:s,type:r}=await i(l,o);return console.log(l),{places:c,lookup:n,place:s,type:r,links:p}}const _=Object.freeze(Object.defineProperty({__proto__:null,load:u},Symbol.toStringTag,{value:"Module"}));export{_,u as l};
