if(!self.define){let e,i={};const n=(n,a)=>(n=new URL(n+".js",a).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let d={};const c=e=>n(e,s),o={module:{uri:s},exports:d,require:c};i[s]=Promise.all(a.map((e=>o[e]||c(e)))).then((e=>(r(...e),d)))}}define(["./workbox-3e8df8c8"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"359510b76c6bde54ce3ab822ac2c5a90"},{url:"apple-touch-icon.png",revision:"f999cc03debeec98391c0180717b8ef7"},{url:"assets/index-DDL7yW5n.js",revision:null},{url:"assets/index-rZJll3pO.css",revision:null},{url:"assets/OrderPage-N_FBk2Na.js",revision:null},{url:"favicon.ico",revision:"1636deee8a54dedcd76c0b428b608e4e"},{url:"favicon.png",revision:"7e00fb71ffd88247af979ffa0bf8a5af"},{url:"index.html",revision:"1c8fb8bc7e2b80a1d4478436500b2787"},{url:"mask-icon.png",revision:"74da054d12b7896ade6a3b36d3878e5b"},{url:"maskable-icon-512x512.png",revision:"a6d7e9e285eb45b74caf30704b82bee9"},{url:"pwa-1024x1024.png",revision:"22e7027f1d9ae12acb8137d8d037a6a8"},{url:"pwa-192x192.png",revision:"afec3ce2d14faaabf5cebb46b67abbc1"},{url:"pwa-512x512.png",revision:"45e71350549da11e66cef504de41e157"},{url:"pwa-64x64.png",revision:"6e8debdde712150d456af183b3440bef"},{url:"registerSW.js",revision:"c54640d0adbd4321b97e5630acce920d"},{url:"apple-touch-icon.png",revision:"f999cc03debeec98391c0180717b8ef7"},{url:"favicon.png",revision:"7e00fb71ffd88247af979ffa0bf8a5af"},{url:"mask-icon.png",revision:"74da054d12b7896ade6a3b36d3878e5b"},{url:"pwa-1024x1024.png",revision:"22e7027f1d9ae12acb8137d8d037a6a8"},{url:"pwa-192x192.png",revision:"e0d025069de044c094e52c51425f521e"},{url:"pwa-512x512.png",revision:"0b69e75499409457263ff8779bdf6aaf"},{url:"pwa-64x64.png",revision:"1160960eeae74b1f2c3ed4d921513a9a"},{url:"manifest.webmanifest",revision:"48f1f69b74d03783e3adad4ae9219fc6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/mm-pwa/index.html")))}));
