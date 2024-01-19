import{s as te,f as C,l as U,g as T,h as O,B as Be,m as W,d as v,j as g,i as R,C as b,D as x,r as q,a as N,c as A,u as P,v as j,w as F,x as y,y as K,o as Ie,a1 as ee,L as Oe,F as Q,n as se,p as Se,R as $,I as De}from"./scheduler.0afccbf5.js";import{S as ne,i as le,a as B,t as V,b as Ee,d as Le,m as Ce,e as Te,g as Ve,c as Ne}from"./index.bcdabb8d.js";import{s as Ae,C as He}from"./Icon.0b43fb9f.js";import{e as ae}from"./Table.svelte_svelte_type_style_lang.7cd8d823.js";import{w as fe}from"./singletons.47e9b8f3.js";function Me(s){let e,l,t,n,o='<svg class="ons-svg-icon ons-u-mr-xs" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" role="presentation"><path d="M0 8.07275L1.41 9.48275L7 3.90275V16.0728H9V3.90275L14.58 9.49275L16 8.07275L8 0.0727539L0 8.07275Z" fill="currentColor"></path></svg> ',_,f;return{c(){e=C("div"),l=C("div"),t=C("a"),n=C("span"),n.innerHTML=o,_=U("Back to contents"),this.h()},l(i){e=T(i,"DIV",{class:!0});var r=O(e);l=T(r,"DIV",{class:!0});var h=O(l);t=T(h,"A",{href:!0,class:!0});var E=O(t);n=T(E,"SPAN",{class:!0,"data-svelte-h":!0}),Be(n)!=="svelte-19ueiuy"&&(n.innerHTML=o),_=W(E,"Back to contents"),E.forEach(v),h.forEach(v),r.forEach(v),this.h()},h(){g(n,"class","ons-back-to__icon"),g(t,"href",f="#"+s[0]),g(t,"class","ons-back-to__link"),g(l,"class","ons-back-to"),g(e,"class","ons-u-mt-l ons-u-d-no@m")},m(i,r){R(i,e,r),b(e,l),b(l,t),b(t,n),b(t,_)},p(i,[r]){r&1&&f!==(f="#"+i[0])&&g(t,"href",f)},i:x,o:x,d(i){i&&v(e)}}}function pe(s,e,l){let{tocId:t="toc"}=e;return s.$$set=n=>{"tocId"in n&&l(0,t=n.tocId)},[t]}class qe extends ne{constructor(e){super(),le(this,e,pe,Me,te,{tocId:0})}}function re(s){let e,l;return{c(){e=C("h2"),l=U(s[0]),this.h()},l(t){e=T(t,"H2",{class:!0});var n=O(e);l=W(n,s[0]),n.forEach(v),this.h()},h(){g(e,"class","ons-u-mt-xl ons-u-pb-no ons-u-pt-no"),Q(e,"ons-u-vh",s[2])},m(t,n){R(t,e,n),b(e,l)},p(t,n){n&1&&se(l,t[0]),n&4&&Q(e,"ons-u-vh",t[2])},d(t){t&&v(e)}}}function Pe(s){let e,l;return e=new qe({props:{tocId:s[6]}}),{c(){Ee(e.$$.fragment)},l(t){Le(e.$$.fragment,t)},m(t,n){Ce(e,t,n),l=!0},p:x,i(t){l||(B(e.$$.fragment,t),l=!0)},o(t){V(e.$$.fragment,t),l=!1},d(t){Te(e,t)}}}function je(s){let e,l,t,n,o=s[0]&&re(s);const _=s[8].default,f=q(_,s,s[7],null);let i=s[6]&&Pe(s);return{c(){e=C("section"),o&&o.c(),l=N(),f&&f.c(),t=N(),i&&i.c(),this.h()},l(r){e=T(r,"SECTION",{id:!0,"aria-label":!0});var h=O(e);o&&o.l(h),l=A(h),f&&f.l(h),t=A(h),i&&i.l(h),h.forEach(v),this.h()},h(){g(e,"id",s[1]),g(e,"aria-label",s[0])},m(r,h){R(r,e,h),o&&o.m(e,null),b(e,l),f&&f.m(e,null),b(e,t),i&&i.m(e,null),s[9](e),n=!0},p(r,[h]){r[0]?o?o.p(r,h):(o=re(r),o.c(),o.m(e,l)):o&&(o.d(1),o=null),f&&f.p&&(!n||h&128)&&P(f,_,r,r[7],n?F(_,r[7],h,null):j(r[7]),null),r[6]&&i.p(r,h),(!n||h&2)&&g(e,"id",r[1]),(!n||h&1)&&g(e,"aria-label",r[0])},i(r){n||(B(f,r),B(i),n=!0)},o(r){V(f,r),V(i),n=!1},d(r){r&&v(e),o&&o.d(),f&&f.d(r),i&&i.d(),s[9](null)}}}function Fe(s,e,l){let t,n,{$$slots:o={},$$scope:_}=e,{title:f="Section title"}=e,{id:i=Ae(f)}=e,{hideTitle:r=!1}=e;const h=y("sections");K(s,h,u=>l(11,n=u));const E=y("observer");K(s,E,u=>l(10,t=u));const H=y("tocId");let d;Ie(()=>{h&&E&&(ee(h,n=[...n,{title:f,id:i}],n),t.observe(d))}),Oe(()=>{h&&E&&(ee(h,n=n.filter(u=>u.id!==i),n),t.unobserve(d))});function M(u){Se[u?"unshift":"push"](()=>{d=u,l(3,d)})}return s.$$set=u=>{"title"in u&&l(0,f=u.title),"id"in u&&l(1,i=u.id),"hideTitle"in u&&l(2,r=u.hideTitle),"$$scope"in u&&l(7,_=u.$$scope)},[f,i,r,d,h,E,H,_,o,M]}class et extends ne{constructor(e){super(),le(this,e,Fe,je,te,{title:0,id:1,hideTitle:2})}}const Re=s=>({}),_e=s=>({}),Ze=s=>({}),ce=s=>({}),ze=s=>({}),ue=s=>({}),Ge=s=>({}),he=s=>({});function me(s,e,l){const t=s.slice();return t[17]=e[l],t}const Je=s=>({}),de=s=>({}),Ke=s=>({}),ge=s=>({});function be(s){let e,l,t=s[3]&&ve(s),n=ae(s[12]),o=[];for(let _=0;_<n.length;_+=1)o[_]=ke(me(s,n,_));return{c(){t&&t.c(),e=N(),l=C("ol");for(let _=0;_<o.length;_+=1)o[_].c();this.h()},l(_){t&&t.l(_),e=A(_),l=T(_,"OL",{class:!0});var f=O(l);for(let i=0;i<o.length;i+=1)o[i].l(f);f.forEach(v),this.h()},h(){g(l,"class","ons-list ons-u-mb-m ons-list--dashed")},m(_,f){t&&t.m(_,f),R(_,e,f),R(_,l,f);for(let i=0;i<o.length;i+=1)o[i]&&o[i].m(l,null)},p(_,f){if(_[3]?t?t.p(_,f):(t=ve(_),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null),f&5120){n=ae(_[12]);let i;for(i=0;i<n.length;i+=1){const r=me(_,n,i);o[i]?o[i].p(r,f):(o[i]=ke(r),o[i].c(),o[i].m(l,null))}for(;i<o.length;i+=1)o[i].d(1);o.length=n.length}},d(_){_&&(v(e),v(l)),t&&t.d(_),De(o,_)}}}function ve(s){let e,l;return{c(){e=C("h2"),l=U(s[3]),this.h()},l(t){e=T(t,"H2",{class:!0});var n=O(e);l=W(n,s[3]),n.forEach(v),this.h()},h(){g(e,"class","ons-toc__title ons-u-fs-r--b ons-u-mb-s")},m(t,n){R(t,e,n),b(e,l)},p(t,n){n&8&&se(l,t[3])},d(t){t&&v(e)}}}function ke(s){let e,l,t=s[17].title+"",n,o,_;return{c(){e=C("li"),l=C("a"),n=U(t),_=N(),this.h()},l(f){e=T(f,"LI",{class:!0});var i=O(e);l=T(i,"A",{href:!0,class:!0});var r=O(l);n=W(r,t),r.forEach(v),_=A(i),i.forEach(v),this.h()},h(){g(l,"href",o="#"+s[17].id),g(l,"class","ons-list__link"),Q(l,"ons-toc__link-active",s[17].id===s[10]),g(e,"class","ons-list__item")},m(f,i){R(f,e,i),b(e,l),b(l,n),b(e,_)},p(f,i){i&4096&&t!==(t=f[17].title+"")&&se(n,t),i&4096&&o!==(o="#"+f[17].id)&&g(l,"href",o),i&5120&&Q(l,"ons-toc__link-active",f[17].id===f[10])},d(f){f&&v(e)}}}function we(s){let e;const l=s[15].default,t=q(l,s,s[16],null);return{c(){t&&t.c()},l(n){t&&t.l(n)},m(n,o){t&&t.m(n,o),e=!0},p(n,o){t&&t.p&&(!e||o&65536)&&P(t,l,n,n[16],e?F(l,n[16],o,null):j(n[16]),null)},i(n){e||(B(t,n),e=!0)},o(n){V(t,n),e=!1},d(n){t&&t.d(n)}}}function Qe(s){let e,l,t,n,o,_,f,i,r,h,E,H,d;const M=s[15].header,u=q(M,s,s[16],ge),Z=s[15]["before-nav"],L=q(Z,s,s[16],de);let k=!s[4]&&be(s);const p=s[15]["after-nav"],c=q(p,s,s[16],he),J=s[15].before,I=q(J,s,s[16],ue);let w=s[11]&&we(s);const X=s[15].after,S=q(X,s,s[16],ce),Y=s[15].footer,D=q(Y,s,s[16],_e);return{c(){e=C("div"),u&&u.c(),l=N(),t=C("div"),n=C("aside"),o=C("nav"),L&&L.c(),_=N(),k&&k.c(),f=N(),c&&c.c(),i=N(),r=C("div"),I&&I.c(),h=N(),w&&w.c(),E=N(),S&&S.c(),H=N(),D&&D.c(),this.h()},l(a){e=T(a,"DIV",{class:!0});var m=O(e);u&&u.l(m),l=A(m),t=T(m,"DIV",{class:!0,id:!0});var oe=O(t);n=T(oe,"ASIDE",{class:!0,role:!0});var ie=O(n);o=T(ie,"NAV",{class:!0,"aria-label":!0});var z=O(o);L&&L.l(z),_=A(z),k&&k.l(z),f=A(z),c&&c.l(z),z.forEach(v),ie.forEach(v),oe.forEach(v),i=A(m),r=T(m,"DIV",{class:!0});var G=O(r);I&&I.l(G),h=A(G),w&&w.l(G),E=A(G),S&&S.l(G),G.forEach(v),H=A(m),D&&D.l(m),m.forEach(v),this.h()},h(){g(o,"class","ons-toc"),g(o,"aria-label","Pages in this guide"),g(n,"class","ons-toc-container"),g(n,"role","complementary"),g(t,"class","ons-grid__col ons-col-4@m ons-u-pl-no ons-grid__col--sticky@m svelte-qe5vmc"),g(t,"id",s[0]),g(r,"class","ons-grid__col ons-col-8@m ons-u-pl-no svelte-qe5vmc"),g(e,"class","ons-grid ons-js-toc-container ons-u-ml-no")},m(a,m){R(a,e,m),u&&u.m(e,null),b(e,l),b(e,t),b(t,n),b(n,o),L&&L.m(o,null),b(o,_),k&&k.m(o,null),b(o,f),c&&c.m(o,null),b(e,i),b(e,r),I&&I.m(r,null),b(r,h),w&&w.m(r,null),b(r,E),S&&S.m(r,null),b(e,H),D&&D.m(e,null),d=!0},p(a,m){u&&u.p&&(!d||m&65536)&&P(u,M,a,a[16],d?F(M,a[16],m,Ke):j(a[16]),ge),L&&L.p&&(!d||m&65536)&&P(L,Z,a,a[16],d?F(Z,a[16],m,Je):j(a[16]),de),a[4]?k&&(k.d(1),k=null):k?k.p(a,m):(k=be(a),k.c(),k.m(o,f)),c&&c.p&&(!d||m&65536)&&P(c,p,a,a[16],d?F(p,a[16],m,Ge):j(a[16]),he),(!d||m&1)&&g(t,"id",a[0]),I&&I.p&&(!d||m&65536)&&P(I,J,a,a[16],d?F(J,a[16],m,ze):j(a[16]),ue),a[11]?w?(w.p(a,m),m&2048&&B(w,1)):(w=we(a),w.c(),B(w,1),w.m(r,E)):w&&(Ve(),V(w,1,1,()=>{w=null}),Ne()),S&&S.p&&(!d||m&65536)&&P(S,X,a,a[16],d?F(X,a[16],m,Ze):j(a[16]),ce),D&&D.p&&(!d||m&65536)&&P(D,Y,a,a[16],d?F(Y,a[16],m,Re):j(a[16]),_e)},i(a){d||(B(u,a),B(L,a),B(c,a),B(I,a),B(w),B(S,a),B(D,a),d=!0)},o(a){V(u,a),V(L,a),V(c,a),V(I,a),V(w),V(S,a),V(D,a),d=!1},d(a){a&&v(e),u&&u.d(a),L&&L.d(a),k&&k.d(),c&&c.d(a),I&&I.d(a),w&&w.d(),S&&S.d(a),D&&D.d(a)}}}function Ue(s){let e,l;return e=new He({props:{cls:s[1],theme:s[5],themeOverrides:s[6],width:s[2],marginTop:s[8],marginBottom:s[9],background:s[7],$$slots:{default:[Qe]},$$scope:{ctx:s}}}),{c(){Ee(e.$$.fragment)},l(t){Le(e.$$.fragment,t)},m(t,n){Ce(e,t,n),l=!0},p(t,[n]){const o={};n&2&&(o.cls=t[1]),n&32&&(o.theme=t[5]),n&64&&(o.themeOverrides=t[6]),n&4&&(o.width=t[2]),n&256&&(o.marginTop=t[8]),n&512&&(o.marginBottom=t[9]),n&128&&(o.background=t[7]),n&72729&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){l||(B(e.$$.fragment,t),l=!0)},o(t){V(e.$$.fragment,t),l=!1},d(t){Te(e,t)}}}function We(s,e,l){let t,n,{$$slots:o={},$$scope:_}=e,{id:f="toc"}=e,{cls:i=null}=e,{width:r="wide"}=e,{contentsLabel:h="Page contents"}=e,{noContents:E=!1}=e,{theme:H=null}=e,{themeOverrides:d=null}=e,{background:M=null}=e,{marginTop:u=!1}=e,{marginBottom:Z=!0}=e,L;$("tocId",f);const k=fe([]);K(s,k,c=>l(12,n=c)),$("sections",k);const p=fe();return K(s,p,c=>l(11,t=c)),$("observer",p),Ie(()=>{E||ee(p,t=new IntersectionObserver((c,J)=>{for(let I=0;I<c.length;I++)if(c[I].isIntersecting){l(10,L=c[I].target.id);break}},{root:null,rootMargin:"0% 0% -70% 0%",threshold:0}),t)}),s.$$set=c=>{"id"in c&&l(0,f=c.id),"cls"in c&&l(1,i=c.cls),"width"in c&&l(2,r=c.width),"contentsLabel"in c&&l(3,h=c.contentsLabel),"noContents"in c&&l(4,E=c.noContents),"theme"in c&&l(5,H=c.theme),"themeOverrides"in c&&l(6,d=c.themeOverrides),"background"in c&&l(7,M=c.background),"marginTop"in c&&l(8,u=c.marginTop),"marginBottom"in c&&l(9,Z=c.marginBottom),"$$scope"in c&&l(16,_=c.$$scope)},[f,i,r,h,E,H,d,M,u,Z,L,t,n,k,p,o,_]}class tt extends ne{constructor(e){super(),le(this,e,We,Ue,te,{id:0,cls:1,width:2,contentsLabel:3,noContents:4,theme:5,themeOverrides:6,background:7,marginTop:8,marginBottom:9})}}export{tt as N,et as a};
