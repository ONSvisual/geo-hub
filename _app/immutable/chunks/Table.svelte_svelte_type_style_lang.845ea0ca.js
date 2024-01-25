import{a as H,S as F,i as j,g as D,t as R,c as V}from"./index.270cd339.js";import{J as q,s as Y,e as T,a as G,K as J,d as C,c as K,C as Q,i as N,M as X,N as Z,r as O,u as L,v as x,w as U,f as $,g as ee,h as te,j as S,E as B}from"./scheduler.aec5e2e2.js";function he(r){return(r==null?void 0:r.length)!==void 0?r:Array.from(r)}function de(r,t){r.d(1),t.delete(r.key)}function ce(r,t,o,i,l,h,_,f,b,p,w,u){let a=r.length,s=h.length,c=a;const g={};for(;c--;)g[r[c].key]=c;const e=[],n=new Map,d=new Map,m=[];for(c=s;c--;){const v=u(l,h,c),I=o(v);let E=_.get(I);E?i&&m.push(()=>E.p(v,t)):(E=p(I,v),E.c()),n.set(I,e[c]=E),I in g&&d.set(I,Math.abs(c-g[I]))}const y=new Set,k=new Set;function M(v){H(v,1),v.m(f,w),_.set(v.key,v),w=v.first,s--}for(;a&&s;){const v=e[s-1],I=r[a-1],E=v.key,P=I.key;v===I?(w=v.first,a--,s--):n.has(P)?!_.has(E)||y.has(E)?M(v):k.has(P)?a--:d.get(E)>d.get(P)?(k.add(E),M(v)):(y.add(P),a--):(b(I,_),a--)}for(;a--;){const v=r[a];n.has(v.key)||b(v,_)}for(;s;)M(e[s-1]);return q(m),e}const W={light:{text:"#222",muted:"#777",hinted:"#e2e2e3",pale:"#f0f0f0",background:"#fff",link:"#206095","link-hover":"#003c57"},dark:{text:"#fff",muted:"#bbb",hinted:"#444",pale:"#333",background:"#222",link:"#f5f5f6","link-hover":"#f5f5f6"},lightblue:{text:"#206095",muted:"#707070",pale:"#f0f0f0",background:"rgb(233, 239, 244)",link:"#206095","link-hover":"#003c57"}};function z(r){let t,o=`<style>${r[3]}</style>`,i;return{c(){t=new X(!1),i=T(),this.h()},l(l){t=Z(l,!1),i=T(),this.h()},h(){t.a=i},m(l,h){t.m(o,l,h),N(l,i,h)},p(l,h){h&8&&o!==(o=`<style>${l[3]}</style>`)&&t.p(o)},d(l){l&&(C(i),t.d())}}}function se(r){let t;const o=r[8].default,i=O(o,r,r[7],null);return{c(){i&&i.c()},l(l){i&&i.l(l)},m(l,h){i&&i.m(l,h),t=!0},p(l,h){i&&i.p&&(!t||h&128)&&L(i,o,l,l[7],t?U(o,l[7],h,null):x(l[7]),null)},i(l){t||(H(i,l),t=!0)},o(l){R(i,l),t=!1},d(l){i&&i.d(l)}}}function ne(r){let t,o,i;const l=r[8].default,h=O(l,r,r[7],null);return{c(){t=$("div"),h&&h.c(),this.h()},l(_){t=ee(_,"DIV",{id:!0,class:!0,style:!0});var f=te(t);h&&h.l(f),f.forEach(C),this.h()},h(){S(t,"id",r[0]),S(t,"class",o=B(r[1]?`theme-wrapper ${r[1]}`:"theme-wrapper")+" svelte-zhquzc"),S(t,"style",r[3])},m(_,f){N(_,t,f),h&&h.m(t,null),i=!0},p(_,f){h&&h.p&&(!i||f&128)&&L(h,l,_,_[7],i?U(l,_[7],f,null):x(_[7]),null),(!i||f&1)&&S(t,"id",_[0]),(!i||f&2&&o!==(o=B(_[1]?`theme-wrapper ${_[1]}`:"theme-wrapper")+" svelte-zhquzc"))&&S(t,"class",o),(!i||f&8)&&S(t,"style",_[3])},i(_){i||(H(h,_),i=!0)},o(_){R(h,_),i=!1},d(_){_&&C(t),h&&h.d(_)}}}function ie(r){let t,o,i,l,h,_,f=r[2]&&z(r);const b=[ne,se],p=[];function w(u,a){return u[3]&&!u[2]?0:1}return i=w(r),l=p[i]=b[i](r),{c(){f&&f.c(),t=T(),o=G(),l.c(),h=T()},l(u){const a=J("svelte-m4a5z6",document.head);f&&f.l(a),t=T(),a.forEach(C),o=K(u),l.l(u),h=T()},m(u,a){f&&f.m(document.head,null),Q(document.head,t),N(u,o,a),p[i].m(u,a),N(u,h,a),_=!0},p(u,[a]){u[2]?f?f.p(u,a):(f=z(u),f.c(),f.m(t.parentNode,t)):f&&(f.d(1),f=null);let s=i;i=w(u),i===s?p[i].p(u,a):(D(),R(p[s],1,1,()=>{p[s]=null}),V(),l=p[i],l?l.p(u,a):(l=p[i]=b[i](u),l.c()),H(l,1),l.m(h.parentNode,h))},i(u){_||(H(l),_=!0)},o(u){R(l),_=!1},d(u){u&&(C(o),C(h)),f&&f.d(u),C(t),p[i].d(u)}}}function le(r,t,o){let i,{$$slots:l={},$$scope:h}=t,{id:_=null}=t,{cls:f=null}=t,{global:b=!1}=t,{theme:p=null}=t,{overrides:w=null}=t,{background:u=null}=t;function a(s,c,g){if(s){const e=W[s]||W.light;return c&&Object.keys(c).forEach(n=>e[n]=c[n]),g&&(e.background=g),Object.keys(e).map(n=>`--${n}: ${e[n]};`).join("")}else if(g)return`--background:${g}`;return null}return r.$$set=s=>{"id"in s&&o(0,_=s.id),"cls"in s&&o(1,f=s.cls),"global"in s&&o(2,b=s.global),"theme"in s&&o(4,p=s.theme),"overrides"in s&&o(5,w=s.overrides),"background"in s&&o(6,u=s.background),"$$scope"in s&&o(7,h=s.$$scope)},r.$$.update=()=>{r.$$.dirty&112&&o(3,i=a(p,w,u))},[_,f,b,i,p,w,u,h,l]}class _e extends F{constructor(t){super(),j(this,t,le,ie,Y,{id:0,cls:1,global:2,theme:4,overrides:5,background:6})}}var ae={exports:{}};/*! pym.js - v1.3.2 - 2018-02-13 */(function(r){(function(t){r.exports?r.exports=t():window.pym=t.call(this)})(function(){var t="xPYMx",o={},i=function(a){var s=document.createEvent("Event");s.initEvent("pym:"+a,!0,!0),document.dispatchEvent(s)},l=function(a){var s=new RegExp("[\\?&]"+a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]")+"=([^&#]*)"),c=s.exec(location.search);return c===null?"":decodeURIComponent(c[1].replace(/\+/g," "))},h=function(a,s){if(!(s.xdomain!=="*"&&!a.origin.match(new RegExp(s.xdomain+"$")))&&typeof a.data=="string")return!0},_=function(a){var s=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/gi;if(a.match(s))return!0},f=function(a,s,c){var g=["pym",a,s,c];return g.join(t)},b=function(a){var s=["pym",a,"(\\S+)","(.*)"];return new RegExp("^"+s.join(t)+"$")},p=Date.now||function(){return new Date().getTime()},w=function(a,s,c){var g,e,n,d=null,m=0;c||(c={});var y=function(){m=c.leading===!1?0:p(),d=null,n=a.apply(g,e),d||(g=e=null)};return function(){var k=p();!m&&c.leading===!1&&(m=k);var M=s-(k-m);return g=this,e=arguments,M<=0||M>s?(d&&(clearTimeout(d),d=null),m=k,n=a.apply(g,e),d||(g=e=null)):!d&&c.trailing!==!1&&(d=setTimeout(y,M)),n}},u=function(){for(var a=o.autoInitInstances.length,s=a-1;s>=0;s--){var c=o.autoInitInstances[s];c.el.getElementsByTagName("iframe").length&&c.el.getElementsByTagName("iframe")[0].contentWindow||o.autoInitInstances.splice(s,1)}};return o.autoInitInstances=[],o.autoInit=function(a){var s=document.querySelectorAll("[data-pym-src]:not([data-pym-auto-initialized])"),c=s.length;u();for(var g=0;g<c;++g){var e=s[g];e.setAttribute("data-pym-auto-initialized",""),e.id===""&&(e.id="pym-"+g+"-"+Math.random().toString(36).substr(2,5));var n=e.getAttribute("data-pym-src"),d={xdomain:"string",title:"string",name:"string",id:"string",sandbox:"string",allowfullscreen:"boolean",parenturlparam:"string",parenturlvalue:"string",optionalparams:"boolean",trackscroll:"boolean",scrollwait:"number"},m={};for(var y in d)if(e.getAttribute("data-pym-"+y)!==null)switch(d[y]){case"boolean":m[y]=e.getAttribute("data-pym-"+y)!=="false";break;case"string":m[y]=e.getAttribute("data-pym-"+y);break;case"number":var k=Number(e.getAttribute("data-pym-"+y));isNaN(k)||(m[y]=k);break;default:console.err("unrecognized attribute type")}var M=new o.Parent(e.id,n,m);o.autoInitInstances.push(M)}return a||i("pym-initialized"),o.autoInitInstances},o.Parent=function(a,s,c){this.id=a,this.url=s,this.el=document.getElementById(a),this.iframe=null,this.settings={xdomain:"*",optionalparams:!0,parenturlparam:"parentUrl",parenturlvalue:window.location.href,trackscroll:!1,scrollwait:100},this.messageRegex=b(this.id),this.messageHandlers={},c=c||{},this._constructIframe=function(){var e=this.el.offsetWidth.toString();this.iframe=document.createElement("iframe");var n="",d=this.url.indexOf("#");for(d>-1&&(n=this.url.substring(d,this.url.length),this.url=this.url.substring(0,d)),this.url.indexOf("?")<0?this.url+="?":this.url+="&",this.iframe.src=this.url+"initialWidth="+e+"&childId="+this.id,this.settings.optionalparams&&(this.iframe.src+="&parentTitle="+encodeURIComponent(document.title),this.iframe.src+="&"+this.settings.parenturlparam+"="+encodeURIComponent(this.settings.parenturlvalue)),this.iframe.src+=n,this.iframe.setAttribute("width","100%"),this.iframe.setAttribute("scrolling","no"),this.iframe.setAttribute("marginheight","0"),this.iframe.setAttribute("frameborder","0"),this.settings.title&&this.iframe.setAttribute("title",this.settings.title),this.settings.allowfullscreen!==void 0&&this.settings.allowfullscreen!==!1&&this.iframe.setAttribute("allowfullscreen",""),this.settings.sandbox!==void 0&&typeof this.settings.sandbox=="string"&&this.iframe.setAttribute("sandbox",this.settings.sandbox),this.settings.id&&(document.getElementById(this.settings.id)||this.iframe.setAttribute("id",this.settings.id)),this.settings.name&&this.iframe.setAttribute("name",this.settings.name);this.el.firstChild;)this.el.removeChild(this.el.firstChild);this.el.appendChild(this.iframe),window.addEventListener("resize",this._onResize),this.settings.trackscroll&&window.addEventListener("scroll",this._throttleOnScroll)},this._onResize=(function(){this.sendWidth(),this.settings.trackscroll&&this.sendViewportAndIFramePosition()}).bind(this),this._onScroll=(function(){this.sendViewportAndIFramePosition()}).bind(this),this._fire=function(e,n){if(e in this.messageHandlers)for(var d=0;d<this.messageHandlers[e].length;d++)this.messageHandlers[e][d].call(this,n)},this.remove=function(){window.removeEventListener("message",this._processMessage),window.removeEventListener("resize",this._onResize),this.el.removeChild(this.iframe),u()},this._processMessage=(function(e){if(h(e,this.settings)&&typeof e.data=="string"){var n=e.data.match(this.messageRegex);if(!n||n.length!==3)return!1;var d=n[1],m=n[2];this._fire(d,m)}}).bind(this),this._onHeightMessage=function(e){var n=parseInt(e);this.iframe.setAttribute("height",n+"px")},this._onNavigateToMessage=function(e){_(e)&&(document.location.href=e)},this._onScrollToChildPosMessage=function(e){var n=document.getElementById(this.id).getBoundingClientRect().top+window.pageYOffset,d=n+parseInt(e);window.scrollTo(0,d)},this.onMessage=function(e,n){e in this.messageHandlers||(this.messageHandlers[e]=[]),this.messageHandlers[e].push(n)},this.sendMessage=function(e,n){this.el.getElementsByTagName("iframe").length&&(this.el.getElementsByTagName("iframe")[0].contentWindow?this.el.getElementsByTagName("iframe")[0].contentWindow.postMessage(f(this.id,e,n),"*"):this.remove())},this.sendWidth=function(){var e=this.el.offsetWidth.toString();this.sendMessage("width",e)},this.sendViewportAndIFramePosition=function(){var e=this.iframe.getBoundingClientRect(),n=window.innerWidth||document.documentElement.clientWidth,d=window.innerHeight||document.documentElement.clientHeight,m=n+" "+d;m+=" "+e.top+" "+e.left,m+=" "+e.bottom+" "+e.right,this.sendMessage("viewport-iframe-position",m)};for(var g in c)this.settings[g]=c[g];return this._throttleOnScroll=w(this._onScroll.bind(this),this.settings.scrollwait),this.onMessage("height",this._onHeightMessage),this.onMessage("navigateTo",this._onNavigateToMessage),this.onMessage("scrollToChildPos",this._onScrollToChildPosMessage),this.onMessage("parentPositionInfo",this.sendViewportAndIFramePosition),window.addEventListener("message",this._processMessage,!1),this._constructIframe(),this},o.Child=function(a){this.parentWidth=null,this.id=null,this.parentTitle=null,this.parentUrl=null,this.settings={renderCallback:null,xdomain:"*",polling:0,parenturlparam:"parentUrl"},this.timerId=null,this.messageRegex=null,this.messageHandlers={},a=a||{},this.onMessage=function(e,n){e in this.messageHandlers||(this.messageHandlers[e]=[]),this.messageHandlers[e].push(n)},this._fire=function(e,n){if(e in this.messageHandlers)for(var d=0;d<this.messageHandlers[e].length;d++)this.messageHandlers[e][d].call(this,n)},this._processMessage=(function(e){if(h(e,this.settings)&&typeof e.data=="string"){var n=e.data.match(this.messageRegex);if(!(!n||n.length!==3)){var d=n[1],m=n[2];this._fire(d,m)}}}).bind(this),this._onWidthMessage=function(e){var n=parseInt(e);n!==this.parentWidth&&(this.parentWidth=n,this.settings.renderCallback&&this.settings.renderCallback(n),this.sendHeight())},this.sendMessage=function(e,n){window.parent.postMessage(f(this.id,e,n),"*")},this.sendHeight=(function(){var e=document.getElementsByTagName("body")[0].offsetHeight.toString();return this.sendMessage("height",e),e}).bind(this),this.getParentPositionInfo=function(){this.sendMessage("parentPositionInfo")},this.scrollParentTo=function(e){this.sendMessage("navigateTo","#"+e)},this.navigateParentTo=function(e){this.sendMessage("navigateTo",e)},this.scrollParentToChildEl=function(e){var n=document.getElementById(e).getBoundingClientRect().top+window.pageYOffset;this.scrollParentToChildPos(n)},this.scrollParentToChildPos=function(e){this.sendMessage("scrollToChildPos",e.toString())};var s=function(e){var n=document.getElementsByTagName("html")[0],d,m=n.className;try{window.self!==window.top?d="embedded":d="not-embedded"}catch{d="embedded"}m.indexOf(d)<0&&(n.className=m?m+" "+d:d,e&&e(d),i("marked-embedded"))};this.remove=function(){window.removeEventListener("message",this._processMessage),this.timerId&&clearInterval(this.timerId)};for(var c in a)this.settings[c]=a[c];this.id=l("childId")||a.id,this.messageRegex=new RegExp("^pym"+t+this.id+t+"(\\S+)"+t+"(.*)$");var g=parseInt(l("initialWidth"));return this.parentUrl=l(this.settings.parenturlparam),this.parentTitle=l("parentTitle"),this.onMessage("width",this._onWidthMessage),window.addEventListener("message",this._processMessage,!1),this.settings.renderCallback&&this.settings.renderCallback(g),this.sendHeight(),this.settings.polling&&(this.timerId=window.setInterval(this.sendHeight,this.settings.polling)),s(a.onMarkedEmbeddedStatus),this},typeof document<"u"&&o.autoInit(!0),o})})(ae);const A=[];if(typeof window<"u"){const r=()=>A.forEach(t=>t());window.addEventListener("scroll",r),window.addEventListener("resize",r)}if(typeof IntersectionObserver<"u"){const r=new Map;new IntersectionObserver((t,o)=>{t.forEach(i=>{const l=r.get(i.target),h=A.indexOf(l);i.isIntersecting?h===-1&&A.push(l):(l(),h!==-1&&A.splice(h,1))})},{rootMargin:"400px 0px"})}export{_e as T,de as d,he as e,ce as u};
