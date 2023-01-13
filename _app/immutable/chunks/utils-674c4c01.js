const X="https://www.ons.gov.uk/visualisations/areas",P="https://cdn.ons.gov.uk/maptiles/ap-geos/v1",z={E06:{label:"unitary authority",plural:"unitary authorities"},W06:{label:"unitary authority",plural:"unitary authorities"},E07:{label:"non-metropolitan district",plural:"non-metropolitan districts"},E08:{label:"metropolitan district",plural:"metropolitan districts"},E09:{label:"borough",plural:"boroughs"},E10:{label:"county",plural:"counties"},E11:{label:"metropolitan county",plural:"metropolital counties"}},ee=["E00","W00","E01","W01","E02","W02","E04","W04","E05","W05"],U=[{key:"ew",codes:["K04"],source:{type:"geojson",promoteId:"areacd"}},{key:"ctry",codes:["E92","W92"],pcio:"country",label:"country",plural:"countries",source:{type:"geojson",promoteId:"areacd"}},{key:"rgn",codes:["E12"],pcio:"region",label:"region",plural:"regions",source:{type:"geojson",promoteId:"areacd"}},{key:"cty",codes:["E10","E11","E06","W06","E09"],pcio:"admin_county",label:"county/unitary authority",plural:"counties/unitary authorities",source:{type:"vector",url:"https://cdn.ons.gov.uk/maptiles/administrative/2021/cty/v1/boundaries/{z}/{x}/{y}.pbf",promoteId:"areacd",minzoom:4}},{key:"lad",codes:["E06","E07","E08","E09","W06"],pcio:"admin_district",label:"district",plural:"districts",source:{type:"vector",url:"https://cdn.ons.gov.uk/maptiles/administrative/2021/authorities-ew/v2/boundaries/{z}/{x}/{y}.pbf",promoteId:"areacd",minzoom:4}},{key:"wpc",codes:["E14","W07"],pcio:"parliamentary_constituency",label:"parliamentary constituency",plural:"parliamentary constituencies",source:{type:"vector",url:"https://cdn.ons.gov.uk/maptiles/administrative/2010/wpc/v1/boundaries/{z}/{x}/{y}.pbf",promoteId:"areacd",minzoom:4}},{key:"wd",codes:["E05","W05"],pcio:"admin_ward",label:"ward",plural:"wards",source:{type:"vector",url:"https://cdn.ons.gov.uk/maptiles/administrative/2022/wd/v1/boundaries/{z}/{x}/{y}.pbf",promoteId:"areacd",minzoom:6}},{key:"par",codes:["E04","W04"],pcio:"parish",label:"parish",plural:"parishes",source:{type:"vector",url:"https://cdn.ons.gov.uk/maptiles/administrative/2022/par/v1/boundaries/{z}/{x}/{y}.pbf",promoteId:"areacd",minzoom:6}},{key:"msoa",codes:["E02","W02"],pcio:"msoa",label:"MSOA",plural:"MSOAs",source:{type:"vector",url:"https://cdn.ons.gov.uk/maptiles/administrative/2021/msoa/v2/boundaries/{z}/{x}/{y}.pbf",promoteId:"areacd",minzoom:6}},{key:"lsoa",codes:["E01","W01"],pcio:"lsoa",label:"LSOA",plural:"LSOAs",source:{type:"vector",url:"https://cdn.ons.gov.uk/maptiles/administrative/2021/lsoa/v2/boundaries/{z}/{x}/{y}.pbf",promoteId:"areacd",minzoom:7}},{key:"oa",codes:["E00","W00"],label:"output area",plural:"output areas",source:{type:"vector",url:"https://cdn.ons.gov.uk/maptiles/administrative/2021/oa/v2/boundaries/{z}/{x}/{y}.pbf",promoteId:"areacd",minzoom:8}}],N=(()=>{let e={};return U.forEach(t=>t.codes.forEach(r=>e[r]=t)),e})();(()=>{let e={};return U.forEach(t=>e[t.key]=t),e})();const re={England:"E92000001",Wales:"W92000004","North East":"E12000001","North West":"E12000002","Yorkshire and The Humber":"E12000003","East Midlands":"E12000004","West Midlands":"E12000005","East of England":"E12000006",London:"E12000007","South East":"E12000008","South West":"E12000009"};var O={},W={},j=34,k=10,I=13;function D(e){return new Function("d","return {"+e.map(function(t,r){return JSON.stringify(t)+": d["+r+'] || ""'}).join(",")+"}")}function x(e,t){var r=D(e);return function(o,n){return t(r(o),n,e)}}function L(e){var t=Object.create(null),r=[];return e.forEach(function(o){for(var n in o)n in t||r.push(t[n]=n)}),r}function f(e,t){var r=e+"",o=r.length;return o<t?new Array(t-o+1).join(0)+r:r}function F(e){return e<0?"-"+f(-e,6):e>9999?"+"+f(e,6):f(e,4)}function $(e){var t=e.getUTCHours(),r=e.getUTCMinutes(),o=e.getUTCSeconds(),n=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":F(e.getUTCFullYear())+"-"+f(e.getUTCMonth()+1,2)+"-"+f(e.getUTCDate(),2)+(n?"T"+f(t,2)+":"+f(r,2)+":"+f(o,2)+"."+f(n,3)+"Z":o?"T"+f(t,2)+":"+f(r,2)+":"+f(o,2)+"Z":r||t?"T"+f(t,2)+":"+f(r,2)+"Z":"")}function H(e){var t=new RegExp('["'+e+`
\r]`),r=e.charCodeAt(0);function o(a,s){var p,c,d=n(a,function(g,E){if(p)return p(g,E-1);c=g,p=s?x(g,s):D(g)});return d.columns=c||[],d}function n(a,s){var p=[],c=a.length,d=0,g=0,E,T=c<=0,b=!1;a.charCodeAt(c-1)===k&&--c,a.charCodeAt(c-1)===I&&--c;function S(){if(T)return W;if(b)return b=!1,O;var C,A=d,v;if(a.charCodeAt(A)===j){for(;d++<c&&a.charCodeAt(d)!==j||a.charCodeAt(++d)===j;);return(C=d)>=c?T=!0:(v=a.charCodeAt(d++))===k?b=!0:v===I&&(b=!0,a.charCodeAt(d)===k&&++d),a.slice(A+1,C-1).replace(/""/g,'"')}for(;d<c;){if((v=a.charCodeAt(C=d++))===k)b=!0;else if(v===I)b=!0,a.charCodeAt(d)===k&&++d;else if(v!==r)continue;return a.slice(A,C)}return T=!0,a.slice(A,c)}for(;(E=S())!==W;){for(var w=[];E!==O&&E!==W;)w.push(E),E=S();s&&(w=s(w,g++))==null||p.push(w)}return p}function u(a,s){return a.map(function(p){return s.map(function(c){return l(p[c])}).join(e)})}function i(a,s){return s==null&&(s=L(a)),[s.map(l).join(e)].concat(u(a,s)).join(`
`)}function m(a,s){return s==null&&(s=L(a)),u(a,s).join(`
`)}function y(a){return a.map(h).join(`
`)}function h(a){return a.map(l).join(e)}function l(a){return a==null?"":a instanceof Date?$(a):t.test(a+="")?'"'+a.replace(/"/g,'""')+'"':a}return{parse:o,parseRows:n,format:i,formatBody:m,formatRows:y,formatRow:h,formatValue:l}}var Z=H(","),_=Z.parse;function B(e){for(var t in e){var r=e[t].trim(),o,n;if(!r)r=null;else if(r==="true")r=!0;else if(r==="false")r=!1;else if(r==="NaN")r=NaN;else if(!isNaN(o=+r))r=o;else if(n=r.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/))G&&n[4]&&!n[7]&&(r=r.replace(/-/g,"/").replace(/T/," ")),r=new Date(r);else continue;e[t]=r}return e}const G=new Date("2019-01-01T00:00").getHours()||new Date("2019-07-01T00:00").getHours();function V(e){return e}function Y(e){if(e==null)return V;var t,r,o=e.scale[0],n=e.scale[1],u=e.translate[0],i=e.translate[1];return function(m,y){y||(t=r=0);var h=2,l=m.length,a=new Array(l);for(a[0]=(t+=m[0])*o+u,a[1]=(r+=m[1])*n+i;h<l;)a[h]=m[h],++h;return a}}function J(e,t){for(var r,o=e.length,n=o-t;n<--o;)r=e[n],e[n++]=e[o],e[o]=r}function K(e,t){return typeof t=="string"&&(t=e.objects[t]),t.type==="GeometryCollection"?{type:"FeatureCollection",features:t.geometries.map(function(r){return M(e,r)})}:M(e,t)}function M(e,t){var r=t.id,o=t.bbox,n=t.properties==null?{}:t.properties,u=Q(e,t);return r==null&&o==null?{type:"Feature",properties:n,geometry:u}:o==null?{type:"Feature",id:r,properties:n,geometry:u}:{type:"Feature",id:r,bbox:o,properties:n,geometry:u}}function Q(e,t){var r=Y(e.transform),o=e.arcs;function n(l,a){a.length&&a.pop();for(var s=o[l<0?~l:l],p=0,c=s.length;p<c;++p)a.push(r(s[p],p));l<0&&J(a,c)}function u(l){return r(l)}function i(l){for(var a=[],s=0,p=l.length;s<p;++s)n(l[s],a);return a.length<2&&a.push(a[0]),a}function m(l){for(var a=i(l);a.length<4;)a.push(a[0]);return a}function y(l){return l.map(m)}function h(l){var a=l.type,s;switch(a){case"GeometryCollection":return{type:a,geometries:l.geometries.map(h)};case"Point":s=u(l.coordinates);break;case"MultiPoint":s=l.coordinates.map(u);break;case"LineString":s=i(l.arcs);break;case"MultiLineString":s=l.arcs.map(i);break;case"Polygon":s=y(l.arcs);break;case"MultiPolygon":s=l.arcs.map(y);break;default:return null}return{type:a,coordinates:s}}return h(t)}async function te(e,t=window.fetch){let o=await(await t(e)).text(),n=_(o,B),u=n.columns.filter(i=>n[0][i]&&n[0][i].includes("|"));return n.forEach((i,m)=>{u.forEach(y=>{i[y]=i[y].split("|")})}),n}async function ne(e,t=window.fetch){try{let r=e.slice(0,3),n=await(await t(`${P}/${r}/${e}.json`)).json();n.properties.children=n.properties.children.map(i=>i.hclnm?{areacd:i.areacd,areanm:i.hclnm}:i.areanm?i:{areacd:i.areacd,areanm:i.areacd}).sort((i,m)=>i.areanm.localeCompare(m.areanm)),z[r]&&(n.properties.typenm=z[r].label);let u=n.properties.children[0]?Array.from(new Set(n.properties.children.map(i=>i.areacd.slice(0,3)))).sort((i,m)=>i.localeCompare(m)):null;return n.properties.childTypes=u?Array.from(new Set(u.map(i=>N[i]))):[],r==="E12"&&(n.properties.childTypes=n.properties.childTypes.filter(i=>i.key!=="lad"),e==="E12000007"&&(n.properties.childTypes=[{key:"lad",codes:["E09"],label:"borough",plural:"boroughs"},...n.properties.childTypes])),{place:n.properties,type:N[r]}}catch{return{place:null,type:null}}}function q(e,t=null){let r=e.hclnm?e.hclnm:e.areanm?e.areanm:e.areacd,o=r.startsWith("Isle"),n=["E12000001","E12000002","E12000004","E12000005","E12000006","E12000008","E12000009","E09000001","E07000035"].includes(e.areacd)||r.startsWith("Vale of");return r=r.replace("&","and").replace(", City of","").replace(", County of",""),["in","the"].includes(t)&&(o||n)&&(r="the "+r),t==="in"&&(o?r="on "+r:r="in "+r),r}function R(e,t){for(const r of t){let o=r.areacd.slice(0,3);if(e.includes(o))return r.groupcd=N[o].key,r}return null}function ae(e,t){let r=[],o=[];return e.forEach(n=>{let u=R(n.geocodes,t.parents);n.geocodes.includes(t.typecd)?r.push({...n,place:t}):u&&o.push({...n,place:R(n.geocodes,t.parents)})}),[...r,...o]}function oe(e,t){let r=e,o=e.match(new RegExp(/\{(.*?)\}/g));return Array.isArray(o)&&o.forEach(n=>{if(n.includes("name")){let u=n.slice(1,-1).split(",")[1];r=r.replace(n,q(t,u))}else r=r.replace(n,t[n.slice(1,-1)])}),r}function ie(e){return e==="output area"?e="Output Area":e==="lower layer super output area"?e="Lower layer Super Output Area (LSOA)":e==="middle layer super output area"&&(e="Middle layer Super Output Area (MSOA)"),!e.startsWith("unit")&&["a","e","i","o","u"].includes(e[0].toLowerCase())?"an "+e:"a "+e}function se(e){return["K04","E92","W92","E10","E11","E12","E06","E07","E08","E09","W06"].includes(e.slice(0,3))?e+"/":"area/?code="+e}function le(e,t){return e.children.filter(r=>t.codes.includes(r.areacd.slice(0,3)))}function ue(e,t){return K(e,t)}function ce(e){return e[0].toUpperCase()+e.slice(1)}export{z as a,N as b,ce as c,X as d,U as e,re as f,te as g,q as h,ne as i,ie as j,ae as k,ue as l,se as m,ee as n,le as o,oe as p};
