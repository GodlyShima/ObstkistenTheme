(()=>{var e={857:e=>{"use strict";var t=function(e){var t;return!!e&&"object"==typeof e&&"[object RegExp]"!==(t=Object.prototype.toString.call(e))&&"[object Date]"!==t&&e.$$typeof!==s},s="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function r(e,t){return!1!==t.clone&&t.isMergeableObject(e)?a(Array.isArray(e)?[]:{},e,t):e}function i(e,t,s){return e.concat(t).map(function(e){return r(e,s)})}function n(e){return Object.keys(e).concat(Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter(function(t){return Object.propertyIsEnumerable.call(e,t)}):[])}function o(e,t){try{return t in e}catch(e){return!1}}function a(e,s,l){(l=l||{}).arrayMerge=l.arrayMerge||i,l.isMergeableObject=l.isMergeableObject||t,l.cloneUnlessOtherwiseSpecified=r;var c,u,d=Array.isArray(s);return d!==Array.isArray(e)?r(s,l):d?l.arrayMerge(e,s,l):(u={},(c=l).isMergeableObject(e)&&n(e).forEach(function(t){u[t]=r(e[t],c)}),n(s).forEach(function(t){(!o(e,t)||Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))&&(o(e,t)&&c.isMergeableObject(s[t])?u[t]=(function(e,t){if(!t.customMerge)return a;var s=t.customMerge(e);return"function"==typeof s?s:a})(t,c)(e[t],s[t],c):u[t]=r(s[t],c))}),u)}a.all=function(e,t){if(!Array.isArray(e))throw Error("first argument should be an array");return e.reduce(function(e,s){return a(e,s,t)},{})},e.exports=a},99:()=>{document.addEventListener("DOMContentLoaded",function(){let e=document.querySelector(".header-main"),t=document.querySelector(".nav-main");if(e&&t){let s=e.offsetHeight,r=t.offsetHeight;document.documentElement.style.setProperty("--header-height","".concat(s,"px")),document.documentElement.style.setProperty("--navbar-height","".concat(r,"px"))}let s=document.querySelectorAll(".nav-main-item-with-children"),r=document.body,i=document.querySelector(".mega-menu-overlay");i||((i=document.createElement("div")).className="mega-menu-overlay",r.appendChild(i)),s.forEach(e=>{let t=e.querySelector(".nav-main-link"),s=e.querySelector(".mega-menu");if(t&&s&&!t.querySelector(".menu-underline")){let r=document.createElement("span");r.className="menu-underline",t.appendChild(r),s.querySelectorAll(".mega-menu-column").length>0?(t.classList.add("has-mega-menu"),e.classList.add("has-mega-menu")):s.parentNode.removeChild(s)}else t&&!s&&t.classList.remove("has-children")}),document.querySelectorAll(".mega-menu").forEach(e=>{e.querySelectorAll(".mega-menu-column").forEach((e,t)=>{e.style.animationDelay="".concat(.05*t,"s"),e.classList.add("mega-menu-column-animated")})});let n=null,o=null,a=null;function l(e){o&&(clearTimeout(o),o=null),n&&clearTimeout(n),n=setTimeout(()=>{a&&a!==e&&c(a,!0);let t=e.querySelector(".mega-menu");if(t){let s=t.querySelectorAll(".mega-menu-column");s.forEach(e=>{e.style.opacity="0",e.style.transform="translateY(15px)"}),document.body.classList.add("mega-menu-open"),t.style.visibility="visible",t.style.opacity="1",t.style.transform="translateY(0)",setTimeout(()=>{s.forEach((e,t)=>{setTimeout(()=>{e.style.opacity="1",e.style.transform="translateY(0)"},50*t)})},50),e.classList.add("nav-item-active"),i.style.transition="opacity 0.3s ease",i.classList.add("show"),a=e}},50)}function c(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];n&&(clearTimeout(n),n=null),o&&clearTimeout(o);let s=()=>{let t=e.querySelector(".mega-menu");t&&(t.style.opacity="0",t.style.transform="translateY(8px)",setTimeout(()=>{t.style.visibility="hidden"},300)),e.classList.remove("nav-item-active"),a===e&&(a=null,i.classList.remove("show"),setTimeout(()=>{i.classList.contains("show")||document.body.classList.remove("mega-menu-open")},300))};t?s():o=setTimeout(s,300)}function u(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];s.forEach(t=>{c(t,e)})}document.querySelectorAll(".nav-main-item-with-children.has-mega-menu").forEach(e=>{e.addEventListener("mouseenter",()=>{l(e)}),e.addEventListener("mouseleave",()=>{c(e)});let t=e.querySelector(".nav-main-link");t&&t.addEventListener("click",s=>{window.innerWidth>=992&&t.classList.contains("has-mega-menu")&&(s.preventDefault(),e.classList.contains("nav-item-active")?c(e,!0):l(e))})}),document.addEventListener("click",e=>{e.target.closest(".nav-main-item-with-children")||e.target.closest(".mega-menu")||u(!0)}),i.addEventListener("click",()=>{u(!0)}),document.addEventListener("keydown",e=>{"Escape"===e.key&&u(!0)}),window.addEventListener("resize",()=>{window.innerWidth<992&&u(!0)})})}},t={};function s(r){var i=t[r];if(void 0!==i)return i.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,s),n.exports}(()=>{s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t}})(),(()=>{s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}})(),(()=>{s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{"use strict";class e{static ucFirst(e){return e.charAt(0).toUpperCase()+e.slice(1)}static lcFirst(e){return e.charAt(0).toLowerCase()+e.slice(1)}static toDashCase(e){return e.replace(/([A-Z])/g,"-$1").replace(/^-/,"").toLowerCase()}static toLowerCamelCase(t,s){let r=e.toUpperCamelCase(t,s);return e.lcFirst(r)}static toUpperCamelCase(t,s){return s?t.split(s).map(t=>e.ucFirst(t.toLowerCase())).join(""):e.ucFirst(t.toLowerCase())}static parsePrimitive(e){try{return/^\d+(.|,)\d+$/.test(e)&&(e=e.replace(",",".")),JSON.parse(e)}catch(t){return e.toString()}}}class t{static isNode(e){return"object"==typeof e&&null!==e&&(e===document||e===window||e instanceof Node)}static hasAttribute(e,s){if(!t.isNode(e))throw Error("The element must be a valid HTML Node!");return"function"==typeof e.hasAttribute&&e.hasAttribute(s)}static getAttribute(e,s){let r=!(arguments.length>2)||void 0===arguments[2]||arguments[2];if(r&&!1===t.hasAttribute(e,s))throw Error('The required property "'.concat(s,'" does not exist!'));if("function"!=typeof e.getAttribute){if(r)throw Error("This node doesn't support the getAttribute function!");return}return e.getAttribute(s)}static getDataAttribute(s,r){let i=!(arguments.length>2)||void 0===arguments[2]||arguments[2],n=r.replace(/^data(|-)/,""),o=e.toLowerCamelCase(n,"-");if(!t.isNode(s)){if(i)throw Error("The passed node is not a valid HTML Node!");return}if(void 0===s.dataset){if(i)throw Error("This node doesn't support the dataset attribute!");return}let a=s.dataset[o];if(void 0===a){if(i)throw Error('The required data attribute "'.concat(r,'" does not exist on ').concat(s,"!"));return a}return e.parsePrimitive(a)}static querySelector(e,s){let r=!(arguments.length>2)||void 0===arguments[2]||arguments[2];if(r&&!t.isNode(e))throw Error("The parent node is not a valid HTML Node!");let i=e.querySelector(s)||!1;if(r&&!1===i)throw Error('The required element "'.concat(s,'" does not exist in parent node!'));return i}static querySelectorAll(e,s){let r=!(arguments.length>2)||void 0===arguments[2]||arguments[2];if(r&&!t.isNode(e))throw Error("The parent node is not a valid HTML Node!");let i=e.querySelectorAll(s);if(0===i.length&&(i=!1),r&&!1===i)throw Error('At least one item of "'.concat(s,'" must exist in parent node!'));return i}static getFocusableElements(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body;return e.querySelectorAll('\n            input:not([tabindex^="-"]):not([disabled]):not([type="hidden"]),\n            select:not([tabindex^="-"]):not([disabled]),\n            textarea:not([tabindex^="-"]):not([disabled]),\n            button:not([tabindex^="-"]):not([disabled]),\n            a[href]:not([tabindex^="-"]):not([disabled]),\n            [tabindex]:not([tabindex^="-"]):not([disabled])\n        ')}static getFirstFocusableElement(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body;return this.getFocusableElements(e)[0]}static getLastFocusableElement(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,t=this.getFocusableElements(e);return t[t.length-1]}}class r{static debounce(e,t){let s,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function(){for(var i=arguments.length,n=Array(i),o=0;o<i;o++)n[o]=arguments[o];r&&!s&&setTimeout(e.bind(e,...n),0),clearTimeout(s),s=setTimeout(e.bind(e,...n),t)}}}class i{_registerEvents(){window.addEventListener("DOMContentLoaded",this._onDOMContentLoaded.bind(this)),window.addEventListener("resize",r.debounce(this._onResize.bind(this),200),{capture:!0,passive:!0})}_onDOMContentLoaded(){this._dispatchEvents()}_onResize(){this._viewportHasChanged(i.getCurrentViewport())&&(this._dispatchEvents(),this._dispatchViewportEvent("Viewport/hasChanged"))}_dispatchEvents(){i.isXS()?this._dispatchViewportEvent("Viewport/isXS"):i.isSM()?this._dispatchViewportEvent("Viewport/isSM"):i.isMD()?this._dispatchViewportEvent("Viewport/isMD"):i.isLG()?this._dispatchViewportEvent("Viewport/isLG"):i.isXL()?this._dispatchViewportEvent("Viewport/isXL"):i.isXXL()&&this._dispatchViewportEvent("Viewport/isXXL")}_viewportHasChanged(e){let t=e!==this.currentViewport;return t&&(this.previousViewport=this.currentViewport,this.currentViewport=e),t}_dispatchViewportEvent(e){document.$emitter.publish(e,{previousViewport:this.previousViewport})}static isXS(){return"XS"===i.getCurrentViewport()}static isSM(){return"SM"===i.getCurrentViewport()}static isMD(){return"MD"===i.getCurrentViewport()}static isLG(){return"LG"===i.getCurrentViewport()}static isXL(){return"XL"===i.getCurrentViewport()}static isXXL(){return"XXL"===i.getCurrentViewport()}static getCurrentViewport(){return window.getComputedStyle(document.documentElement).getPropertyValue("--sw-current-breakpoint").replace(/['"]+/g,"").toUpperCase()}constructor(){this.previousViewport=null,this.currentViewport=i.getCurrentViewport(),this._registerEvents()}}var n=s(857),o=s.n(n);class a{publish(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=new CustomEvent(e,{detail:t,cancelable:s});return this.el.dispatchEvent(r),r}subscribe(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=this,i=e.split("."),n=s.scope?t.bind(s.scope):t;if(s.once&&!0===s.once){let t=n;n=function(s){r.unsubscribe(e),t(s)}}return this.el.addEventListener(i[0],n),this.listeners.push({splitEventName:i,opts:s,cb:n}),!0}unsubscribe(e){let t=e.split(".");return this.listeners=this.listeners.reduce((e,s)=>([...s.splitEventName].sort().toString()===t.sort().toString()?this.el.removeEventListener(s.splitEventName[0],s.cb):e.push(s),e),[]),!0}reset(){return this.listeners.forEach(e=>{this.el.removeEventListener(e.splitEventName[0],e.cb)}),this.listeners=[],!0}get el(){return this._el}set el(e){this._el=e}get listeners(){return this._listeners}set listeners(e){this._listeners=e}constructor(e=document){this._el=e,e.$emitter=this,this._listeners=[]}}class l{init(){throw Error('The "init" method for the plugin "'.concat(this._pluginName,'" is not defined.'))}update(){}_init(){this._initialized||(this.init(),this._initialized=!0)}_update(){this._initialized&&this.update()}_mergeOptions(s){let r=e.toDashCase(this._pluginName),i=t.getDataAttribute(this.el,"data-".concat(r,"-config"),!1),n=t.getAttribute(this.el,"data-".concat(r,"-options"),!1),a=[this.constructor.options,this.options,s];i&&a.push(window.PluginConfigManager.get(this._pluginName,i));try{n&&a.push(JSON.parse(n))}catch(e){throw console.error(this.el),Error('The data attribute "data-'.concat(r,'-options" could not be parsed to json: ').concat(e.message))}return o().all(a.filter(e=>e instanceof Object&&!(e instanceof Array)).map(e=>e||{}))}_registerInstance(){window.PluginManager.getPluginInstancesFromElement(this.el).set(this._pluginName,this),window.PluginManager.getPlugin(this._pluginName,!1).get("instances").push(this)}_getPluginName(e){return e||(e=this.constructor.name),e}constructor(e,s={},r=!1){if(!t.isNode(e))throw Error("There is no valid element given.");this.el=e,this.$emitter=new a(this.el),this._pluginName=this._getPluginName(r),this.options=this._mergeOptions(s),this._initialized=!1,this._registerInstance(),this._init()}}class c extends l{init(){this.header=t.querySelector(document,this.options.headerSelector),this.navMain=t.querySelector(document,this.options.navMainSelector,!1),this.searchInput=t.querySelector(document,this.options.searchInputSelector,!1),this.searchResults=t.querySelector(document,this.options.searchResultsSelector,!1),this.megaMenuItems=document.querySelectorAll(".nav-main-item-with-children"),this.megaMenuOverlay=t.querySelector(document,this.options.megaMenuOverlaySelector,!1),this._registerEvents(),this.options.stickyHeaderEnabled&&this._initStickyHeader(),this.options.megaMenuEnabled&&this._initMegaMenu()}_registerEvents(){this.searchInput&&this.searchResults&&(this.searchInput.addEventListener("focus",this._onSearchFocus.bind(this)),this.searchInput.addEventListener("input",this._debounce(this._onSearchInput.bind(this),300)),document.addEventListener("click",this._onClickOutside.bind(this))),window.addEventListener("cart-widget-refresh",()=>{this._refreshCartCounter()}),window.addEventListener("resize",this._debounce(this._onResize.bind(this),200))}_onResize(){(i.isXS()||i.isSM()||i.isMD())&&this._closeMegaMenus()}_initStickyHeader(){let e=0;this._handleHeaderSticky(),window.addEventListener("scroll",this._debounce(()=>{this._handleHeaderSticky(e),e=window.pageYOffset||document.documentElement.scrollTop},10))}_handleHeaderSticky(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=window.pageYOffset||document.documentElement.scrollTop,s=this.header.offsetHeight;t>this._getHeaderOffset()?t>e&&t>s?(this.header.classList.remove("header-sticky"),this.header.classList.add("header-hidden")):t<e&&(this.header.classList.remove("header-hidden"),this.header.classList.add("header-sticky")):this.header.classList.remove("header-sticky","header-hidden")}_initMegaMenu(){!(i.isXS()||i.isSM()||i.isMD())&&(this.megaMenuItems.forEach(e=>{let t=e.querySelector(this.options.megaMenuTriggerSelector),s=e.querySelector(this.options.megaMenuSelector);t&&s&&(e.addEventListener("mouseenter",()=>{this._showMegaMenu(e)}),e.addEventListener("mouseleave",()=>{this._closeMegaMenus()}),t.addEventListener("click",t=>{(i.isLG()||i.isXL()||i.isXXL())&&(t.preventDefault(),this._toggleMegaMenu(e))}))}),document.addEventListener("click",e=>{e.target.closest(this.options.megaMenuSelector)||e.target.closest(".nav-main-item-with-children")||this._closeMegaMenus()}),document.addEventListener("keydown",e=>{"Escape"===e.key&&this._closeMegaMenus()}),this.megaMenuOverlay&&this.megaMenuOverlay.addEventListener("click",()=>{this._closeMegaMenus()}))}_showMegaMenu(e){this._closeMegaMenus();let t=e.querySelector(this.options.megaMenuSelector);t&&setTimeout(()=>{t.style.transform="translateY(0)",t.style.visibility="visible",t.style.opacity="1",this.megaMenuOverlay&&this.megaMenuOverlay.classList.add("show")},50)}_toggleMegaMenu(e){let t=e.querySelector(this.options.megaMenuSelector),s=t&&"visible"===t.style.visibility;this._closeMegaMenus(),!s&&t&&this._showMegaMenu(e)}_closeMegaMenus(){document.querySelectorAll(this.options.megaMenuSelector).forEach(e=>{e.style.transform="translateY(10px)",e.style.visibility="hidden",e.style.opacity="0"}),this.megaMenuOverlay&&this.megaMenuOverlay.classList.remove("show")}_onSearchFocus(){this.searchInput.value.length>2&&this._showSearchResults()}_onSearchInput(e){let t=e.target.value;t.length>2?this._fetchSearchResults(t):this._hideSearchResults()}_fetchSearchResults(e){let t="".concat(window.router["frontend.search.suggest"],"?search=").concat(e);fetch(t,{method:"GET",credentials:"same-origin"}).then(e=>e.text()).then(e=>{this.searchResults&&(this.searchResults.innerHTML=e,this._showSearchResults())}).catch(e=>{console.error("Error loading search results:",e)})}_showSearchResults(){this.searchResults&&this.searchResults.classList.add("show")}_hideSearchResults(){this.searchResults&&this.searchResults.classList.remove("show")}_onClickOutside(e){this.searchResults&&this.searchResults.classList.contains("show")&&!this.searchResults.contains(e.target)&&!this.searchInput.contains(e.target)&&this._hideSearchResults()}_refreshCartCounter(){let e=document.querySelectorAll(".cart-badge");if(!e.length)return;let t=document.querySelector('[data-cart-widget="true"]');if(t&&t.dataset.cartCount){let s=parseInt(t.dataset.cartCount,10);e.forEach(e=>{e.textContent=s>0?s:"",e.style.display=s>0?"flex":"none"})}}_getHeaderOffset(){let e=0,s=t.querySelector(document,".top-bar",!1);s&&(e+=s.offsetHeight);let r=t.querySelector(document,".notification-bar",!1);return r&&(e+=r.offsetHeight),e}_debounce(e,t){let s;return function(){for(var r=arguments.length,i=Array(r),n=0;n<r;n++)i[n]=arguments[n];clearTimeout(s),s=setTimeout(()=>{clearTimeout(s),e(...i)},t)}}}c.options={stickyHeaderEnabled:!0,megaMenuEnabled:!0,searchResultsSelector:".search-results",searchInputSelector:"[data-search-input]",headerSelector:".header-main",navMainSelector:".nav-main",megaMenuSelector:".mega-menu",megaMenuTriggerSelector:'[data-bs-toggle="dropdown"]',megaMenuOverlaySelector:".mega-menu-overlay",mobileBreakpoint:"lg"},s(99),document.addEventListener("DOMContentLoaded",()=>{let e=window.PluginManager;if(e){e.register("ModernHeader",c,"[data-modern-header]"),"undefined"!=typeof bootstrap&&([].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(e=>new bootstrap.Tooltip(e)),[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(e=>new bootstrap.Popover(e)));let t=()=>{let e=document.querySelectorAll('[data-cart-widget="true"]');e.length>0&&e.forEach(e=>{let t=e.dataset.cartCount||"0";document.querySelectorAll(".cart-badge").forEach(e=>{parseInt(t)>0?(e.textContent=t,e.style.display="flex"):(e.textContent="",e.style.display="none")})})};t(),window.addEventListener("cart-widget-refresh",t)}})})()})();