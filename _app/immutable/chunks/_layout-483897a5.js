import{b as e}from"./paths-b4419565.js";import{g as r}from"./utils-3249d854.js";const i="",n=i,l="always";async function c({fetch:s}){let a=await r(`${e}/data/csv/links.csv`,s);return a.forEach((t,o)=>{t.image&&!t.image.startsWith("http")&&(a[o].image=e+t.image)}),{links:a}}const p=Object.freeze(Object.defineProperty({__proto__:null,load:c,prerender:n,trailingSlash:l},Symbol.toStringTag,{value:"Module"}));export{p as _,c as l,n as p,l as t};
