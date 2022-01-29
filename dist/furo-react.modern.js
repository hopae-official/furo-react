import e,{createContext as t,useState as r,useReducer as n,useEffect as o,useCallback as i,useContext as a}from"react";function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(this,arguments)}function c(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t.indexOf(r=i[n])>=0||(o[r]=e[r]);return o}var u=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}},l=Object.prototype.toString;function f(e){return"[object Array]"===l.call(e)}function d(e){return void 0===e}function p(e){return null!==e&&"object"==typeof e}function h(e){if("[object Object]"!==l.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function m(e){return"[object Function]"===l.call(e)}function g(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),f(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var y={isArray:f,isArrayBuffer:function(e){return"[object ArrayBuffer]"===l.call(e)},isBuffer:function(e){return null!==e&&!d(e)&&null!==e.constructor&&!d(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:p,isPlainObject:h,isUndefined:d,isDate:function(e){return"[object Date]"===l.call(e)},isFile:function(e){return"[object File]"===l.call(e)},isBlob:function(e){return"[object Blob]"===l.call(e)},isFunction:m,isStream:function(e){return p(e)&&m(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:g,merge:function e(){var t={};function r(r,n){t[n]=h(t[n])&&h(r)?e(t[n],r):h(r)?e({},r):f(r)?r.slice():r}for(var n=0,o=arguments.length;n<o;n++)g(arguments[n],r);return t},extend:function(e,t,r){return g(t,function(t,n){e[n]=r&&"function"==typeof t?u(t,r):t}),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}};function v(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var b=function(e,t,r){if(!t)return e;var n;if(r)n=r(t);else if(y.isURLSearchParams(t))n=t.toString();else{var o=[];y.forEach(t,function(e,t){null!=e&&(y.isArray(e)?t+="[]":e=[e],y.forEach(e,function(e){y.isDate(e)?e=e.toISOString():y.isObject(e)&&(e=JSON.stringify(e)),o.push(v(t)+"="+v(e))}))}),n=o.join("&")}if(n){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+n}return e};function w(){this.handlers=[]}w.prototype.use=function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},w.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},w.prototype.forEach=function(e){y.forEach(this.handlers,function(t){null!==t&&e(t)})};var E=w,x=function(e,t){y.forEach(e,function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])})},S=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e},k=function(e,t,r,n,o){var i=new Error(e);return S(i,t,r,n,o)},j=y.isStandardBrowserEnv()?{write:function(e,t,r,n,o,i){var a=[];a.push(e+"="+encodeURIComponent(t)),y.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),y.isString(n)&&a.push("path="+n),y.isString(o)&&a.push("domain="+o),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},O=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],R=y.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function n(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=n(window.location.href),function(t){var r=y.isString(t)?n(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0},A={"Content-Type":"application/x-www-form-urlencoded"};function C(e,t){!y.isUndefined(e)&&y.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var T,U={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(T=function(e){return new Promise(function(t,r){var n=e.data,o=e.headers,i=e.responseType;y.isFormData(n)&&delete o["Content-Type"];var a=new XMLHttpRequest;if(e.auth){var s=e.auth.username||"",c=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(s+":"+c)}var u,l,f=(l=e.url,(u=e.baseURL)&&!/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(l)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(u,l):l);function d(){if(a){var n,o,s,c,u,l="getAllResponseHeaders"in a?(n=a.getAllResponseHeaders(),u={},n?(y.forEach(n.split("\n"),function(e){if(c=e.indexOf(":"),o=y.trim(e.substr(0,c)).toLowerCase(),s=y.trim(e.substr(c+1)),o){if(u[o]&&O.indexOf(o)>=0)return;u[o]="set-cookie"===o?(u[o]?u[o]:[]).concat([s]):u[o]?u[o]+", "+s:s}}),u):u):null;!function(e,t,r){var n=r.config.validateStatus;r.status&&n&&!n(r.status)?t(k("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}(t,r,{data:i&&"text"!==i&&"json"!==i?a.response:a.responseText,status:a.status,statusText:a.statusText,headers:l,config:e,request:a}),a=null}}if(a.open(e.method.toUpperCase(),b(f,e.params,e.paramsSerializer),!0),a.timeout=e.timeout,"onloadend"in a?a.onloadend=d:a.onreadystatechange=function(){a&&4===a.readyState&&(0!==a.status||a.responseURL&&0===a.responseURL.indexOf("file:"))&&setTimeout(d)},a.onabort=function(){a&&(r(k("Request aborted",e,"ECONNABORTED",a)),a=null)},a.onerror=function(){r(k("Network Error",e,null,a)),a=null},a.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(k(t,e,e.transitional&&e.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",a)),a=null},y.isStandardBrowserEnv()){var p=(e.withCredentials||R(f))&&e.xsrfCookieName?j.read(e.xsrfCookieName):void 0;p&&(o[e.xsrfHeaderName]=p)}"setRequestHeader"in a&&y.forEach(o,function(e,t){void 0===n&&"content-type"===t.toLowerCase()?delete o[t]:a.setRequestHeader(t,e)}),y.isUndefined(e.withCredentials)||(a.withCredentials=!!e.withCredentials),i&&"json"!==i&&(a.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&a.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&a.upload&&a.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){a&&(a.abort(),r(e),a=null)}),n||(n=null),a.send(n)})}),T),transformRequest:[function(e,t){return x(t,"Accept"),x(t,"Content-Type"),y.isFormData(e)||y.isArrayBuffer(e)||y.isBuffer(e)||y.isStream(e)||y.isFile(e)||y.isBlob(e)?e:y.isArrayBufferView(e)?e.buffer:y.isURLSearchParams(e)?(C(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):y.isObject(e)||t&&"application/json"===t["Content-Type"]?(C(t,"application/json"),function(e,t,r){if(y.isString(e))try{return(0,JSON.parse)(e),y.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional,r=!(t&&t.silentJSONParsing)&&"json"===this.responseType;if(r||t&&t.forcedJSONParsing&&y.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(r){if("SyntaxError"===e.name)throw S(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};y.forEach(["delete","get","head"],function(e){U.headers[e]={}}),y.forEach(["post","put","patch"],function(e){U.headers[e]=y.merge(A)});var N=U,P=function(e,t,r){var n=this||N;return y.forEach(r,function(r){e=r.call(n,e,t)}),e},L=function(e){return!(!e||!e.__CANCEL__)};function _(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var I=function(e){return _(e),e.headers=e.headers||{},e.data=P.call(e,e.data,e.headers,e.transformRequest),e.headers=y.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),y.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||N.adapter)(e).then(function(t){return _(e),t.data=P.call(e,t.data,t.headers,e.transformResponse),t},function(t){return L(t)||(_(e),t&&t.response&&(t.response.data=P.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})},B=function(e,t){t=t||{};var r={},n=["url","method","data"],o=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function s(e,t){return y.isPlainObject(e)&&y.isPlainObject(t)?y.merge(e,t):y.isPlainObject(t)?y.merge({},t):y.isArray(t)?t.slice():t}function c(n){y.isUndefined(t[n])?y.isUndefined(e[n])||(r[n]=s(void 0,e[n])):r[n]=s(e[n],t[n])}y.forEach(n,function(e){y.isUndefined(t[e])||(r[e]=s(void 0,t[e]))}),y.forEach(o,c),y.forEach(i,function(n){y.isUndefined(t[n])?y.isUndefined(e[n])||(r[n]=s(void 0,e[n])):r[n]=s(void 0,t[n])}),y.forEach(a,function(n){n in t?r[n]=s(e[n],t[n]):n in e&&(r[n]=s(void 0,e[n]))});var u=n.concat(o).concat(i).concat(a),l=Object.keys(e).concat(Object.keys(t)).filter(function(e){return-1===u.indexOf(e)});return y.forEach(l,c),r},D={_from:"axios@0.21.4",_id:"axios@0.21.4",_inBundle:!1,_integrity:"sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==",_location:"/axios",_phantomChildren:{},_requested:{type:"version",registry:!0,raw:"axios@0.21.4",name:"axios",escapedName:"axios",rawSpec:"0.21.4",saveSpec:null,fetchSpec:"0.21.4"},_requiredBy:["#DEV:/"],_resolved:"https://registry.npmjs.org/axios/-/axios-0.21.4.tgz",_shasum:"c67b90dc0568e5c1cf2b0b858c43ba28e2eda575",_spec:"axios@0.21.4",_where:"/Users/ace/github/furo/furo-react",author:{name:"Matt Zabriskie"},browser:{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},bugs:{url:"https://github.com/axios/axios/issues"},bundleDependencies:!1,bundlesize:[{path:"./dist/axios.min.js",threshold:"5kB"}],dependencies:{"follow-redirects":"^1.14.0"},deprecated:!1,description:"Promise based HTTP client for the browser and node.js",devDependencies:{coveralls:"^3.0.0","es6-promise":"^4.2.4",grunt:"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1",karma:"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2",minimist:"^1.2.0",mocha:"^8.2.1",sinon:"^4.5.0","terser-webpack-plugin":"^4.2.3",typescript:"^4.0.5","url-search-params":"^0.10.0",webpack:"^4.44.2","webpack-dev-server":"^3.11.0"},homepage:"https://axios-http.com",jsdelivr:"dist/axios.min.js",keywords:["xhr","http","ajax","promise","node"],license:"MIT",main:"index.js",name:"axios",repository:{type:"git",url:"git+https://github.com/axios/axios.git"},scripts:{build:"NODE_ENV=production grunt build",coveralls:"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",examples:"node ./examples/server.js",fix:"eslint --fix lib/**/*.js",postversion:"git push && git push --tags",preversion:"npm test",start:"node ./sandbox/server.js",test:"grunt test",version:"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},typings:"./index.d.ts",unpkg:"dist/axios.min.js",version:"0.21.4"},q={};["object","boolean","number","function","string","symbol"].forEach(function(e,t){q[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});var z={},H=D.version.split(".");function M(e,t){for(var r=t?t.split("."):H,n=e.split("."),o=0;o<3;o++){if(r[o]>n[o])return!0;if(r[o]<n[o])return!1}return!1}q.transitional=function(e,t,r){var n=t&&M(t);function o(e,t){return"[Axios v"+D.version+"] Transitional option '"+e+"'"+t+(r?". "+r:"")}return function(r,i,a){if(!1===e)throw new Error(o(i," has been removed in "+t));return n&&!z[i]&&(z[i]=!0,console.warn(o(i," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,i,a)}};var F={isOlderVersion:M,assertOptions:function(e,t,r){if("object"!=typeof e)throw new TypeError("options must be an object");for(var n=Object.keys(e),o=n.length;o-- >0;){var i=n[o],a=t[i];if(a){var s=e[i],c=void 0===s||a(s,i,e);if(!0!==c)throw new TypeError("option "+i+" must be "+c)}else if(!0!==r)throw Error("Unknown option "+i)}},validators:q},J=F.validators;function V(e){this.defaults=e,this.interceptors={request:new E,response:new E}}V.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=B(this.defaults,e)).method=e.method?e.method.toLowerCase():this.defaults.method?this.defaults.method.toLowerCase():"get";var t=e.transitional;void 0!==t&&F.assertOptions(t,{silentJSONParsing:J.transitional(J.boolean,"1.0.0"),forcedJSONParsing:J.transitional(J.boolean,"1.0.0"),clarifyTimeoutError:J.transitional(J.boolean,"1.0.0")},!1);var r=[],n=!0;this.interceptors.request.forEach(function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(n=n&&t.synchronous,r.unshift(t.fulfilled,t.rejected))});var o,i=[];if(this.interceptors.response.forEach(function(e){i.push(e.fulfilled,e.rejected)}),!n){var a=[I,void 0];for(Array.prototype.unshift.apply(a,r),a=a.concat(i),o=Promise.resolve(e);a.length;)o=o.then(a.shift(),a.shift());return o}for(var s=e;r.length;){var c=r.shift(),u=r.shift();try{s=c(s)}catch(e){u(e);break}}try{o=I(s)}catch(e){return Promise.reject(e)}for(;i.length;)o=o.then(i.shift(),i.shift());return o},V.prototype.getUri=function(e){return e=B(this.defaults,e),b(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},y.forEach(["delete","get","head","options"],function(e){V.prototype[e]=function(t,r){return this.request(B(r||{},{method:e,url:t,data:(r||{}).data}))}}),y.forEach(["post","put","patch"],function(e){V.prototype[e]=function(t,r,n){return this.request(B(n||{},{method:e,url:t,data:r}))}});var G=V;function W(e){this.message=e}W.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},W.prototype.__CANCEL__=!0;var $=W;function X(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var r=this;e(function(e){r.reason||(r.reason=new $(e),t(r.reason))})}X.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},X.source=function(){var e;return{token:new X(function(t){e=t}),cancel:e}};var K=X;function Q(e){var t=new G(e),r=u(G.prototype.request,t);return y.extend(r,G.prototype,t),y.extend(r,t),r}var Y=Q(N);Y.Axios=G,Y.create=function(e){return Q(B(Y.defaults,e))},Y.Cancel=$,Y.CancelToken=K,Y.isCancel=L,Y.all=function(e){return Promise.all(e)},Y.spread=function(e){return function(t){return e.apply(null,t)}},Y.isAxiosError=function(e){return"object"==typeof e&&!0===e.isAxiosError};var Z=Y;Z.default=Y;var ee=Z;ee.defaults.baseURL="https://api.furo.one";class te{constructor(e){this.domain=e.domain,this.clientId=e.client_id,this.redirectURI=e.redirect_uri}async buildAuthorizeUrl(e){return`${this.domain}/login/${this.clientId}`}async getUser(e){const t=await localStorage.getItem("furo-token");if(!t)return null;const{data:r}=await ee.get("/users/me",{headers:{Authorization:`Bearer ${t}`}});return r}async loginWithRedirect(){const e=await this.buildAuthorizeUrl();window.location.href=e}async handleRedirectCallback(e=window.location.search){const t=new URLSearchParams(e),r=t.get("code"),n=t.get("uid");console.log(r,n);const o=r;return await localStorage.setItem("furo-token",o),{}}async checkSession(e){}async getTokenSilently(e){}async logout(e){return await localStorage.removeItem("furo-token"),await localStorage.removeItem("furo-user"),{}}}const re={isAuthenticated:!1,isLoading:!0},ne=(e,t)=>{var r,n;switch(t.type){case"LOGIN_POPUP_STARTED":return s({},e,{isLoading:!0});case"LOGIN_POPUP_COMPLETE":case"INITIALISED":return console.log("Furo successfully initialized :)"),s({},e,{isAuthenticated:!!t.user,user:t.user,isLoading:!1,error:void 0});case"HANDLE_REDIRECT_COMPLETE":case"GET_ACCESS_TOKEN_COMPLETE":return(null==(r=e.user)?void 0:r.updated_at)===(null==(n=t.user)?void 0:n.updated_at)?e:s({},e,{isAuthenticated:!!t.user,user:t.user});case"LOGOUT":return console.log("Logged out"),s({},e,{isAuthenticated:!1,user:void 0});case"ERROR":return s({},e,{isLoading:!1,error:t.error})}},oe=()=>{throw new Error("You forgot to wrap your component in <FuroProvider>.")},ie=/*#__PURE__*/t(s({},re,{buildAuthorizeUrl:oe,buildLogoutUrl:oe,getAccessTokenSilently:oe,getAccessTokenWithPopup:oe,getIdTokenClaims:oe,loginWithRedirect:oe,loginWithPopup:oe,logout:oe,handleRedirectCallback:oe})),ae=/[?&]code=[^&]+/,se=/[?&]error=[^&]+/,ce=["clientId","redirectUri","maxAge"],ue=["children","skipRedirectCallback","onRedirectCallback"],le=(e,t)=>{window.history.replaceState({},document.title,(null==e?void 0:e.returnTo)||window.location.pathname),window.location.href=t.redirectUri},fe=t=>{const{children:a,skipRedirectCallback:u,onRedirectCallback:l=le}=t,f=c(t,ue),[d]=r(()=>new te((e=>{const{clientId:t,redirectUri:r,maxAge:n}=e;return s({},c(e,ce),{client_id:t,redirect_uri:r,max_age:n,furoClient:{name:"furo-react"}})})(f))),[p,h]=n(ne,re);o(()=>{(async()=>{try{((e=window.location.search)=>ae.test(e)||se.test(e))()&&!u?(await d.handleRedirectCallback(),l({},t)):console.log("Getting token from storage... Checking Sessions");const e=await d.getUser();h({type:"INITIALISED",user:e})}catch(e){console.error(e),h({type:"ERROR",error:e})}})()},[d,l,u]);const m=i(e=>d.buildAuthorizeUrl(e),[d]),g=i(e=>d.buildLogoutUrl(e),[d]),y=i(e=>d.loginWithRedirect(e),[d]),v=i(e=>{localStorage.removeItem("furo-user"),localStorage.removeItem("furo-token"),h({type:"LOGOUT"})},[d]),b=i(async(e,t)=>await localStorage.getItem("furo-token"),[d]),w=i(async e=>{try{return await d.handleRedirectCallback(e)}catch(e){throw e}finally{h({type:"HANDLE_REDIRECT_COMPLETE",user:await d.getUser()})}},[d]);/*#__PURE__*/return e.createElement(ie.Provider,{value:s({},p,{buildAuthorizeUrl:m,buildLogoutUrl:g,getAccessTokenSilently:b,loginWithRedirect:y,logout:v,handleRedirectCallback:w})},a)},de=()=>a(ie);export{fe as FuroProvider,de as useFuro};
//# sourceMappingURL=furo-react.modern.js.map