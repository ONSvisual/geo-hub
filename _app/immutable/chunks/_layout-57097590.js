import{g as t,a as n,c as p}from"./config-ce11cd2b.js";import{g as i,c}from"./utils-4edf0aa6.js";const s=e=>t[e]?t[e].label:n[e].label;async function m({fetch:e}){let l=await i(`${p}/places-list.csv`,e);l.sort((a,o)=>a.areanm.localeCompare(o.areanm));let r={};return l.forEach(a=>r[a.areacd]=a),l.forEach(a=>{let o=a.areacd.slice(0,3);a.group=o==="K04"?"":a.parent?`${c(s(o))} in ${r[a.parent].areanm}`:c(s(o))}),{places:l,lookup:r}}const f=Object.freeze(Object.defineProperty({__proto__:null,load:m},Symbol.toStringTag,{value:"Module"}));export{f as _,m as l};
