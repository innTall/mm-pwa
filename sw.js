if(!self.define){let e,n={};const i=(i,a)=>(i=new URL(i+".js",a).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(n[r])return;let o={};const c=e=>i(e,r),d={module:{uri:r},exports:o,require:c};n[r]=Promise.all(a.map((e=>d[e]||c(e)))).then((e=>(s(...e),o)))}}define(["./workbox-655f735c"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"f999cc03debeec98391c0180717b8ef7"},{url:"assets/FullCode-BpLhR3Cg.js",revision:null},{url:"assets/index-BanJ4bL6.js",revision:null},{url:"assets/index-BK3slivx.css",revision:null},{url:"assets/workbox-window.prod.es5-B9K5rw8f.js",revision:null},{url:"favicon.png",revision:"7e00fb71ffd88247af979ffa0bf8a5af"},{url:"index.html",revision:"60514452e0897bae95cdee622738d5ac"},{url:"mask-icon.png",revision:"74da054d12b7896ade6a3b36d3878e5b"},{url:"pwa-1024x1024.png",revision:"22e7027f1d9ae12acb8137d8d037a6a8"},{url:"pwa-192x192.png",revision:"e0d025069de044c094e52c51425f521e"},{url:"pwa-512x512.png",revision:"0b69e75499409457263ff8779bdf6aaf"},{url:"pwa-64x64.png",revision:"1160960eeae74b1f2c3ed4d921513a9a"},{url:"apple-touch-icon.png",revision:"f999cc03debeec98391c0180717b8ef7"},{url:"favicon.png",revision:"7e00fb71ffd88247af979ffa0bf8a5af"},{url:"mask-icon.png",revision:"74da054d12b7896ade6a3b36d3878e5b"},{url:"pwa-1024x1024.png",revision:"22e7027f1d9ae12acb8137d8d037a6a8"},{url:"pwa-192x192.png",revision:"e0d025069de044c094e52c51425f521e"},{url:"pwa-512x512.png",revision:"0b69e75499409457263ff8779bdf6aaf"},{url:"pwa-64x64.png",revision:"1160960eeae74b1f2c3ed4d921513a9a"},{url:"robots.txt",revision:"cd9cd94aaa699e0a16e692b6bb16f672"},{url:"manifest.webmanifest",revision:"48f1f69b74d03783e3adad4ae9219fc6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/mm-pwa/index.html"))),e.registerRoute(/^https:\/\/my-api-domain\.com\/.*$/,new e.CacheFirst({cacheName:"api-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:86400}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/\/.*/,new e.CacheFirst({cacheName:"app-assets-cache",plugins:[new e.ExpirationPlugin({maxEntries:1e3,maxAgeSeconds:2592e3})]}),"GET"),e.initialize({})}));
