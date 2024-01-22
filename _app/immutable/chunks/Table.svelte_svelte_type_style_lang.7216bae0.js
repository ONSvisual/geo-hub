import{s as O,e as M,a as L,K as x,d as w,c as U,C as F,i as T,N as j,O as D,r as N,u as B,v as W,w as z,f as V,g as q,h as Y,j as E,E as P}from"./scheduler.0afccbf5.js";import{S as G,i as K,g as J,t as S,c as Q,a as H}from"./index.bcdabb8d.js";function ie(d){return(d==null?void 0:d.length)!==void 0?d:Array.from(d)}const A={light:{text:"#222",muted:"#777",hinted:"#e2e2e3",pale:"#f0f0f0",background:"#fff",link:"#206095","link-hover":"#003c57"},dark:{text:"#fff",muted:"#bbb",hinted:"#444",pale:"#333",background:"#222",link:"#f5f5f6","link-hover":"#f5f5f6"},lightblue:{text:"#206095",muted:"#707070",pale:"#f0f0f0",background:"rgb(233, 239, 244)",link:"#206095","link-hover":"#003c57"}};function R(d){let t,r=`<style>${d[3]}</style>`,s;return{c(){t=new j(!1),s=M(),this.h()},l(n){t=D(n,!1),s=M(),this.h()},h(){t.a=s},m(n,o){t.m(r,n,o),T(n,s,o)},p(n,o){o&8&&r!==(r=`<style>${n[3]}</style>`)&&t.p(r)},d(n){n&&(w(s),t.d())}}}function X(d){let t;const r=d[8].default,s=N(r,d,d[7],null);return{c(){s&&s.c()},l(n){s&&s.l(n)},m(n,o){s&&s.m(n,o),t=!0},p(n,o){s&&s.p&&(!t||o&128)&&B(s,r,n,n[7],t?z(r,n[7],o,null):W(n[7]),null)},i(n){t||(H(s,n),t=!0)},o(n){S(s,n),t=!1},d(n){s&&s.d(n)}}}function Z(d){let t,r,s;const n=d[8].default,o=N(n,d,d[7],null);return{c(){t=V("div"),o&&o.c(),this.h()},l(f){t=q(f,"DIV",{id:!0,class:!0,style:!0});var c=Y(t);o&&o.l(c),c.forEach(w),this.h()},h(){E(t,"id",d[0]),E(t,"class",r=P(d[1]?`theme-wrapper ${d[1]}`:"theme-wrapper")+" svelte-zhquzc"),E(t,"style",d[3])},m(f,c){T(f,t,c),o&&o.m(t,null),s=!0},p(f,c){o&&o.p&&(!s||c&128)&&B(o,n,f,f[7],s?z(n,f[7],c,null):W(f[7]),null),(!s||c&1)&&E(t,"id",f[0]),(!s||c&2&&r!==(r=P(f[1]?`theme-wrapper ${f[1]}`:"theme-wrapper")+" svelte-zhquzc"))&&E(t,"class",r),(!s||c&8)&&E(t,"style",f[3])},i(f){s||(H(o,f),s=!0)},o(f){S(o,f),s=!1},d(f){f&&w(t),o&&o.d(f)}}}function $(d){let t,r,s,n,o,f,c=d[2]&&R(d);const b=[Z,X],v=[];function y(_,a){return _[3]&&!_[2]?0:1}return s=y(d),n=v[s]=b[s](d),{c(){c&&c.c(),t=M(),r=L(),n.c(),o=M()},l(_){const a=x("svelte-m4a5z6",document.head);c&&c.l(a),t=M(),a.forEach(w),r=U(_),n.l(_),o=M()},m(_,a){c&&c.m(document.head,null),F(document.head,t),T(_,r,a),v[s].m(_,a),T(_,o,a),f=!0},p(_,[a]){_[2]?c?c.p(_,a):(c=R(_),c.c(),c.m(t.parentNode,t)):c&&(c.d(1),c=null);let l=s;s=y(_),s===l?v[s].p(_,a):(J(),S(v[l],1,1,()=>{v[l]=null}),Q(),n=v[s],n?n.p(_,a):(n=v[s]=b[s](_),n.c()),H(n,1),n.m(o.parentNode,o))},i(_){f||(H(n),f=!0)},o(_){S(n),f=!1},d(_){_&&(w(r),w(o)),c&&c.d(_),w(t),v[s].d(_)}}}function ee(d,t,r){let s,{$$slots:n={},$$scope:o}=t,{id:f=null}=t,{cls:c=null}=t,{global:b=!1}=t,{theme:v=null}=t,{overrides:y=null}=t,{background:_=null}=t;function a(l,u,g){if(l){const e=A[l]||A.light;return u&&Object.keys(u).forEach(i=>e[i]=u[i]),g&&(e.background=g),Object.keys(e).map(i=>`--${i}: ${e[i]};`).join("")}else if(g)return`--background:${g}`;return null}return d.$$set=l=>{"id"in l&&r(0,f=l.id),"cls"in l&&r(1,c=l.cls),"global"in l&&r(2,b=l.global),"theme"in l&&r(4,v=l.theme),"overrides"in l&&r(5,y=l.overrides),"background"in l&&r(6,_=l.background),"$$scope"in l&&r(7,o=l.$$scope)},d.$$.update=()=>{d.$$.dirty&112&&r(3,s=a(v,y,_))},[f,c,b,s,v,y,_,o,n]}class le extends G{constructor(t){super(),K(this,t,ee,$,O,{id:0,cls:1,global:2,theme:4,overrides:5,background:6})}}var te={exports:{}};/*! pym.js - v1.3.2 - 2018-02-13 */(function(d){(function(t){d.exports?d.exports=t():window.pym=t.call(this)})(function(){var t="xPYMx",r={},s=function(a){var l=document.createEvent("Event");l.initEvent("pym:"+a,!0,!0),document.dispatchEvent(l)},n=function(a){var l=new RegExp("[\\?&]"+a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]")+"=([^&#]*)"),u=l.exec(location.search);return u===null?"":decodeURIComponent(u[1].replace(/\+/g," "))},o=function(a,l){if(!(l.xdomain!=="*"&&!a.origin.match(new RegExp(l.xdomain+"$")))&&typeof a.data=="string")return!0},f=function(a){var l=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/gi;if(a.match(l))return!0},c=function(a,l,u){var g=["pym",a,l,u];return g.join(t)},b=function(a){var l=["pym",a,"(\\S+)","(.*)"];return new RegExp("^"+l.join(t)+"$")},v=Date.now||function(){return new Date().getTime()},y=function(a,l,u){var g,e,i,h=null,m=0;u||(u={});var p=function(){m=u.leading===!1?0:v(),h=null,i=a.apply(g,e),h||(g=e=null)};return function(){var I=v();!m&&u.leading===!1&&(m=I);var k=l-(I-m);return g=this,e=arguments,k<=0||k>l?(h&&(clearTimeout(h),h=null),m=I,i=a.apply(g,e),h||(g=e=null)):!h&&u.trailing!==!1&&(h=setTimeout(p,k)),i}},_=function(){for(var a=r.autoInitInstances.length,l=a-1;l>=0;l--){var u=r.autoInitInstances[l];u.el.getElementsByTagName("iframe").length&&u.el.getElementsByTagName("iframe")[0].contentWindow||r.autoInitInstances.splice(l,1)}};return r.autoInitInstances=[],r.autoInit=function(a){var l=document.querySelectorAll("[data-pym-src]:not([data-pym-auto-initialized])"),u=l.length;_();for(var g=0;g<u;++g){var e=l[g];e.setAttribute("data-pym-auto-initialized",""),e.id===""&&(e.id="pym-"+g+"-"+Math.random().toString(36).substr(2,5));var i=e.getAttribute("data-pym-src"),h={xdomain:"string",title:"string",name:"string",id:"string",sandbox:"string",allowfullscreen:"boolean",parenturlparam:"string",parenturlvalue:"string",optionalparams:"boolean",trackscroll:"boolean",scrollwait:"number"},m={};for(var p in h)if(e.getAttribute("data-pym-"+p)!==null)switch(h[p]){case"boolean":m[p]=e.getAttribute("data-pym-"+p)!=="false";break;case"string":m[p]=e.getAttribute("data-pym-"+p);break;case"number":var I=Number(e.getAttribute("data-pym-"+p));isNaN(I)||(m[p]=I);break;default:console.err("unrecognized attribute type")}var k=new r.Parent(e.id,i,m);r.autoInitInstances.push(k)}return a||s("pym-initialized"),r.autoInitInstances},r.Parent=function(a,l,u){this.id=a,this.url=l,this.el=document.getElementById(a),this.iframe=null,this.settings={xdomain:"*",optionalparams:!0,parenturlparam:"parentUrl",parenturlvalue:window.location.href,trackscroll:!1,scrollwait:100},this.messageRegex=b(this.id),this.messageHandlers={},u=u||{},this._constructIframe=function(){var e=this.el.offsetWidth.toString();this.iframe=document.createElement("iframe");var i="",h=this.url.indexOf("#");for(h>-1&&(i=this.url.substring(h,this.url.length),this.url=this.url.substring(0,h)),this.url.indexOf("?")<0?this.url+="?":this.url+="&",this.iframe.src=this.url+"initialWidth="+e+"&childId="+this.id,this.settings.optionalparams&&(this.iframe.src+="&parentTitle="+encodeURIComponent(document.title),this.iframe.src+="&"+this.settings.parenturlparam+"="+encodeURIComponent(this.settings.parenturlvalue)),this.iframe.src+=i,this.iframe.setAttribute("width","100%"),this.iframe.setAttribute("scrolling","no"),this.iframe.setAttribute("marginheight","0"),this.iframe.setAttribute("frameborder","0"),this.settings.title&&this.iframe.setAttribute("title",this.settings.title),this.settings.allowfullscreen!==void 0&&this.settings.allowfullscreen!==!1&&this.iframe.setAttribute("allowfullscreen",""),this.settings.sandbox!==void 0&&typeof this.settings.sandbox=="string"&&this.iframe.setAttribute("sandbox",this.settings.sandbox),this.settings.id&&(document.getElementById(this.settings.id)||this.iframe.setAttribute("id",this.settings.id)),this.settings.name&&this.iframe.setAttribute("name",this.settings.name);this.el.firstChild;)this.el.removeChild(this.el.firstChild);this.el.appendChild(this.iframe),window.addEventListener("resize",this._onResize),this.settings.trackscroll&&window.addEventListener("scroll",this._throttleOnScroll)},this._onResize=(function(){this.sendWidth(),this.settings.trackscroll&&this.sendViewportAndIFramePosition()}).bind(this),this._onScroll=(function(){this.sendViewportAndIFramePosition()}).bind(this),this._fire=function(e,i){if(e in this.messageHandlers)for(var h=0;h<this.messageHandlers[e].length;h++)this.messageHandlers[e][h].call(this,i)},this.remove=function(){window.removeEventListener("message",this._processMessage),window.removeEventListener("resize",this._onResize),this.el.removeChild(this.iframe),_()},this._processMessage=(function(e){if(o(e,this.settings)&&typeof e.data=="string"){var i=e.data.match(this.messageRegex);if(!i||i.length!==3)return!1;var h=i[1],m=i[2];this._fire(h,m)}}).bind(this),this._onHeightMessage=function(e){var i=parseInt(e);this.iframe.setAttribute("height",i+"px")},this._onNavigateToMessage=function(e){f(e)&&(document.location.href=e)},this._onScrollToChildPosMessage=function(e){var i=document.getElementById(this.id).getBoundingClientRect().top+window.pageYOffset,h=i+parseInt(e);window.scrollTo(0,h)},this.onMessage=function(e,i){e in this.messageHandlers||(this.messageHandlers[e]=[]),this.messageHandlers[e].push(i)},this.sendMessage=function(e,i){this.el.getElementsByTagName("iframe").length&&(this.el.getElementsByTagName("iframe")[0].contentWindow?this.el.getElementsByTagName("iframe")[0].contentWindow.postMessage(c(this.id,e,i),"*"):this.remove())},this.sendWidth=function(){var e=this.el.offsetWidth.toString();this.sendMessage("width",e)},this.sendViewportAndIFramePosition=function(){var e=this.iframe.getBoundingClientRect(),i=window.innerWidth||document.documentElement.clientWidth,h=window.innerHeight||document.documentElement.clientHeight,m=i+" "+h;m+=" "+e.top+" "+e.left,m+=" "+e.bottom+" "+e.right,this.sendMessage("viewport-iframe-position",m)};for(var g in u)this.settings[g]=u[g];return this._throttleOnScroll=y(this._onScroll.bind(this),this.settings.scrollwait),this.onMessage("height",this._onHeightMessage),this.onMessage("navigateTo",this._onNavigateToMessage),this.onMessage("scrollToChildPos",this._onScrollToChildPosMessage),this.onMessage("parentPositionInfo",this.sendViewportAndIFramePosition),window.addEventListener("message",this._processMessage,!1),this._constructIframe(),this},r.Child=function(a){this.parentWidth=null,this.id=null,this.parentTitle=null,this.parentUrl=null,this.settings={renderCallback:null,xdomain:"*",polling:0,parenturlparam:"parentUrl"},this.timerId=null,this.messageRegex=null,this.messageHandlers={},a=a||{},this.onMessage=function(e,i){e in this.messageHandlers||(this.messageHandlers[e]=[]),this.messageHandlers[e].push(i)},this._fire=function(e,i){if(e in this.messageHandlers)for(var h=0;h<this.messageHandlers[e].length;h++)this.messageHandlers[e][h].call(this,i)},this._processMessage=(function(e){if(o(e,this.settings)&&typeof e.data=="string"){var i=e.data.match(this.messageRegex);if(!(!i||i.length!==3)){var h=i[1],m=i[2];this._fire(h,m)}}}).bind(this),this._onWidthMessage=function(e){var i=parseInt(e);i!==this.parentWidth&&(this.parentWidth=i,this.settings.renderCallback&&this.settings.renderCallback(i),this.sendHeight())},this.sendMessage=function(e,i){window.parent.postMessage(c(this.id,e,i),"*")},this.sendHeight=(function(){var e=document.getElementsByTagName("body")[0].offsetHeight.toString();return this.sendMessage("height",e),e}).bind(this),this.getParentPositionInfo=function(){this.sendMessage("parentPositionInfo")},this.scrollParentTo=function(e){this.sendMessage("navigateTo","#"+e)},this.navigateParentTo=function(e){this.sendMessage("navigateTo",e)},this.scrollParentToChildEl=function(e){var i=document.getElementById(e).getBoundingClientRect().top+window.pageYOffset;this.scrollParentToChildPos(i)},this.scrollParentToChildPos=function(e){this.sendMessage("scrollToChildPos",e.toString())};var l=function(e){var i=document.getElementsByTagName("html")[0],h,m=i.className;try{window.self!==window.top?h="embedded":h="not-embedded"}catch{h="embedded"}m.indexOf(h)<0&&(i.className=m?m+" "+h:h,e&&e(h),s("marked-embedded"))};this.remove=function(){window.removeEventListener("message",this._processMessage),this.timerId&&clearInterval(this.timerId)};for(var u in a)this.settings[u]=a[u];this.id=n("childId")||a.id,this.messageRegex=new RegExp("^pym"+t+this.id+t+"(\\S+)"+t+"(.*)$");var g=parseInt(n("initialWidth"));return this.parentUrl=n(this.settings.parenturlparam),this.parentTitle=n("parentTitle"),this.onMessage("width",this._onWidthMessage),window.addEventListener("message",this._processMessage,!1),this.settings.renderCallback&&this.settings.renderCallback(g),this.sendHeight(),this.settings.polling&&(this.timerId=window.setInterval(this.sendHeight,this.settings.polling)),l(a.onMarkedEmbeddedStatus),this},typeof document<"u"&&r.autoInit(!0),r})})(te);const C=[];if(typeof window<"u"){const d=()=>C.forEach(t=>t());window.addEventListener("scroll",d),window.addEventListener("resize",d)}if(typeof IntersectionObserver<"u"){const d=new Map;new IntersectionObserver((t,r)=>{t.forEach(s=>{const n=d.get(s.target),o=C.indexOf(n);s.isIntersecting?o===-1&&C.push(n):(n(),o!==-1&&C.splice(o,1))})},{rootMargin:"400px 0px"})}export{le as T,ie as e};
