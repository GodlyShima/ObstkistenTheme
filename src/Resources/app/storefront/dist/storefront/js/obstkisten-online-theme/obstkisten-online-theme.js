(()=>{var e={99:()=>{document.addEventListener("DOMContentLoaded",function(){let e=document.querySelector(".mega-menu-overlay");e||((e=document.createElement("div")).className="mega-menu-overlay",document.body.appendChild(e)),document.querySelectorAll(".mega-menu").forEach(e=>{e.style.zIndex="1035"});let t=document.querySelectorAll(".nav-main-item-with-children.has-mega-menu"),n=document.getElementById("accountWidget"),s=document.querySelector(".account-menu-dropdown"),i=n?n.closest(".account-menu"):null,l=null,o=null,a=null;function r(t){i&&i.classList.contains("show")&&(i.classList.remove("show"),s&&s.classList.remove("show"),n&&n.setAttribute("aria-expanded","false")),o&&(clearTimeout(o),o=null),l&&clearTimeout(l),a&&a!==t&&d(a,!0);let r=t.querySelector(".mega-menu");r&&(t.classList.add("nav-item-active"),e.style.opacity="1",e.style.visibility="visible",e.style.pointerEvents="auto",e.classList.add("show"),r.style.visibility="visible",r.style.opacity="1",r.style.transform="translateX(-50%) translateY(0)",a=t,document.body.classList.add("mega-menu-open"))}function d(t){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];l&&(clearTimeout(l),l=null),o&&clearTimeout(o);let s=()=>{let n=t.querySelector(".mega-menu");n&&(n.style.opacity="0",n.style.visibility="hidden",n.style.transform="translateX(-50%) translateY(10px)"),t.classList.remove("nav-item-active"),a===t&&(a=null,e.style.opacity="0",e.style.visibility="hidden",e.style.pointerEvents="none",e.classList.remove("show"),setTimeout(()=>{e.classList.contains("show")||document.body.classList.remove("mega-menu-open")},300))};n?s():o=setTimeout(s,300)}function c(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t.forEach(t=>{t.classList.contains("nav-item-active")&&d(t,e)})}t.forEach(e=>{if(!e.querySelector(".menu-underline")){let t=document.createElement("span");t.className="menu-underline",e.querySelector(".nav-main-link").appendChild(t)}e.addEventListener("mouseenter",()=>{r(e)}),e.addEventListener("mouseleave",()=>{d(e)});let t=e.querySelector(".nav-main-link");t&&t.addEventListener("click",t=>{window.innerWidth>=992&&(t.preventDefault(),e.classList.contains("nav-item-active")?d(e,!0):r(e))})}),n&&s&&(s.style.position="absolute",s.style.zIndex="2000",s.style.top="100%",s.style.right="0",s.style.left="auto",n.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),c(!0);let t="true"===n.getAttribute("aria-expanded");n.setAttribute("aria-expanded",!t),s.classList.toggle("show"),i.classList.toggle("show")})),document.addEventListener("click",e=>{e.target.closest(".nav-main-item-with-children")||e.target.closest(".mega-menu")||c(!0),n&&s&&!n.contains(e.target)&&!s.contains(e.target)&&(s.classList.remove("show"),n.setAttribute("aria-expanded","false"),i&&i.classList.remove("show"))}),e.addEventListener("click",()=>{c(!0)}),document.addEventListener("keydown",e=>{"Escape"===e.key&&(c(!0),s&&s.classList.contains("show")&&(s.classList.remove("show"),n&&n.setAttribute("aria-expanded","false"),i&&i.classList.remove("show")))}),window.addEventListener("resize",()=>{window.innerWidth<992&&c(!0)})})}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var l=t[s]={exports:{}};return e[s](l,l.exports,n),l.exports}(()=>{n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t}})(),(()=>{n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}})(),(()=>{n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{"use strict";n(99),document.addEventListener("DOMContentLoaded",()=>{if(window.PluginManager){let e=window.innerWidth<576;e&&document.body.classList.add("is-mobile");let t=document.querySelectorAll(".gallery-slider");t.length&&e&&(t.forEach(e=>{e.classList.add("is-mobile-optimized")}),function(){let e=document.querySelectorAll('[data-gallery-slider-container="true"]'),t=document.querySelectorAll(".mobile-gallery-dots .dot");if(e.length>0&&t.length>0){let e=document.querySelector(".mobile-gallery-dots");e&&(e.style.display="flex");let t=document.querySelector(".gallery-slider-thumbnails-col");t&&(t.style.display="none");let n=document.querySelector(".gallery-slider-row");if(n&&!document.querySelector(".swipe-hint")){let e=document.createElement("div");e.className="swipe-hint",e.textContent="Wischen zum Navigieren",e.style.position="absolute",e.style.bottom="40px",e.style.left="0",e.style.right="0",e.style.textAlign="center",e.style.fontSize="12px",e.style.color="rgba(255, 255, 255, 0.8)",e.style.zIndex="5",e.style.textShadow="0 1px 2px rgba(0, 0, 0, 0.3)",n.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.5s ease"},3e3)}}window.addEventListener("resize",function(){window.innerWidth<576?document.body.classList.add("is-mobile"):document.body.classList.remove("is-mobile")})}());let n=document.getElementById("accountWidget"),s=document.querySelector(".js-account-menu-dropdown");n&&s&&(n.addEventListener("click",function(e){s.classList.toggle("show");let t="true"===this.getAttribute("aria-expanded");this.setAttribute("aria-expanded",!t)}),document.addEventListener("click",function(e){n.contains(e.target)||s.contains(e.target)||(s.classList.remove("show"),n.setAttribute("aria-expanded","false"))}))}})})()})();