if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let l={};const o=e=>i(e,a),t={module:{uri:a},exports:l,require:o};s[a]=Promise.all(n.map((e=>t[e]||o(e)))).then((e=>(r(...e),l)))}}define(["./workbox-655f735c"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"f999cc03debeec98391c0180717b8ef7"},{url:"assets/browser-D00UBUF3.js",revision:null},{url:"assets/DepositBinance-BL6gkYKF.js",revision:null},{url:"assets/DepositBitget-BQgtWQ_t.js",revision:null},{url:"assets/DepositBybit-BYbFdq99.js",revision:null},{url:"assets/FooterBinance-VLtpTDVe.js",revision:null},{url:"assets/FooterBitget-CMGxNav1.js",revision:null},{url:"assets/index-BEtxkeFx.css",revision:null},{url:"assets/index-Cv8oVwkU.js",revision:null},{url:"assets/MarginBinance-eNjSIHeR.js",revision:null},{url:"assets/MarginBinanceRes-BQ9vaY29.js",revision:null},{url:"assets/MarginBitget-DcVvHnyn.js",revision:null},{url:"assets/MarginBitgetRes-BFRx2vpL.js",revision:null},{url:"assets/MarginBybitRes-B3rQRCTD.js",revision:null},{url:"assets/SpotBinance-CCGX3kEJ.js",revision:null},{url:"assets/SpotBinanceRes-y_IchOjb.js",revision:null},{url:"assets/SpotBitget-BAexDHQx.js",revision:null},{url:"assets/SpotBitgetRes-BTZitSt2.js",revision:null},{url:"assets/SpotBybit-Cavf2dyo.js",revision:null},{url:"assets/SpotBybitRes-CEKrTk6X.js",revision:null},{url:"assets/supabase-COZUoQdu.js",revision:null},{url:"assets/workbox-window.prod.es5-B9K5rw8f.js",revision:null},{url:"favicon.png",revision:"7e00fb71ffd88247af979ffa0bf8a5af"},{url:"index.html",revision:"f74da8d1c33d0f3308b34b10ac015354"},{url:"mask-icon.png",revision:"74da054d12b7896ade6a3b36d3878e5b"},{url:"pwa-1024x1024.png",revision:"22e7027f1d9ae12acb8137d8d037a6a8"},{url:"pwa-192x192.png",revision:"e0d025069de044c094e52c51425f521e"},{url:"pwa-512x512.png",revision:"0b69e75499409457263ff8779bdf6aaf"},{url:"pwa-64x64.png",revision:"1160960eeae74b1f2c3ed4d921513a9a"},{url:"apple-touch-icon.png",revision:"f999cc03debeec98391c0180717b8ef7"},{url:"favicon.png",revision:"7e00fb71ffd88247af979ffa0bf8a5af"},{url:"mask-icon.png",revision:"74da054d12b7896ade6a3b36d3878e5b"},{url:"pwa-1024x1024.png",revision:"22e7027f1d9ae12acb8137d8d037a6a8"},{url:"pwa-192x192.png",revision:"e0d025069de044c094e52c51425f521e"},{url:"pwa-512x512.png",revision:"0b69e75499409457263ff8779bdf6aaf"},{url:"pwa-64x64.png",revision:"1160960eeae74b1f2c3ed4d921513a9a"},{url:"robots.txt",revision:"cd9cd94aaa699e0a16e692b6bb16f672"},{url:"manifest.webmanifest",revision:"48f1f69b74d03783e3adad4ae9219fc6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/mm-pwa/index.html"))),e.registerRoute(/^https:\/\/my-api-domain\.com\/.*$/,new e.CacheFirst({cacheName:"api-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:86400}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/\/.*/,new e.CacheFirst({cacheName:"app-assets-cache",plugins:[new e.ExpirationPlugin({maxEntries:1e3,maxAgeSeconds:2592e3})]}),"GET"),e.initialize({})}));
