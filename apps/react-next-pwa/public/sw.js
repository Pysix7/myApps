if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return c[e]||(a=new Promise(async a=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=a}else importScripts(e),a()})),a.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},a=(a,c)=>{Promise.all(a.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(a)};self.define=(a,s,n)=>{c[a]||(c[a]=Promise.resolve().then(()=>{let c={};const i={uri:location.origin+a.slice(1)};return Promise.all(s.map(a=>{switch(a){case"exports":return c;case"module":return i;default:return e(a)}})).then(e=>{const a=n(...e);return c.default||(c.default=a),c})}))}}define("./sw.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/bU1sw68xGpMw995qBC7Ol/_buildManifest.js",revision:"7a9acc85cc517507bd71ecc6baa40f47"},{url:"/_next/static/bU1sw68xGpMw995qBC7Ol/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/chunks/2be80bfc5b5ac69e4959523aa8c6ccb2ac197929.376c69c92bdf15f37902.js",revision:"d03c7ad16cd4ae3a4e9a4abc3dbb190d"},{url:"/_next/static/chunks/commons.b57244d0d1d953e5a2c1.js",revision:"1193b5d11ab02f67fa825eb858f42e95"},{url:"/_next/static/chunks/f06d52e3a97c5d914bac0b5bab6fa6b5e18c261d.5f91d592193156817c74.js",revision:"b71b7459d5f4d7990be0b0520d44ffeb"},{url:"/_next/static/chunks/f06d52e3a97c5d914bac0b5bab6fa6b5e18c261d_CSS.ff5578978733a40a67a3.js",revision:"b54e11e9a03640be21a29dcee2e7436c"},{url:"/_next/static/chunks/f58acecca7ede228ba4a154ad023f2dfdd97fcc8.01ae0ad9e7ff4a00ed92.js",revision:"45376e6ea884659e6461b010543153b2"},{url:"/_next/static/chunks/framework.9ec1f7868b3e9d138cdd.js",revision:"d0fde0e086852f5cc2882d8830400a6e"},{url:"/_next/static/chunks/main-857ad0f045f282e34a0a.js",revision:"cbc2262d222f6fed8fda0fabe1bdf4c8"},{url:"/_next/static/chunks/pages/_app-575e7ade9dec64f75ab2.js",revision:"da0a8a610a8f1791b224c90feda57962"},{url:"/_next/static/chunks/pages/_error-efa3f285e9fe1c6bef90.js",revision:"eb03156cec8acac41e8fbd0f082050e9"},{url:"/_next/static/chunks/pages/auth/login-fcec5c088ff39fa35a0b.js",revision:"7657daec4814cbf70c28c8bb72aa45a3"},{url:"/_next/static/chunks/pages/auth/signup-24527daa79695fa2e31e.js",revision:"be7502d738721ee81bee7bb146019c32"},{url:"/_next/static/chunks/pages/global-chat-e9d4c3de4243a62c3ee3.js",revision:"4a6d373a378258b92ac19d0b1be32816"},{url:"/_next/static/chunks/pages/index-97ef1e1f1dad48ad403f.js",revision:"c0620a5928b40cca708e031de02fa569"},{url:"/_next/static/chunks/polyfills-e5012cf49fbb0a2642db.js",revision:"03cf8d0f2720a3ed786ea3c4fd75711d"},{url:"/_next/static/chunks/styles.cf337b168d260534f0bf.js",revision:"6f58d6abc944a10f88a6aa8e35e2bd71"},{url:"/_next/static/chunks/webpack-d7b2fb72fb7257504a38.js",revision:"8c19f623e8389f11131a054a7e17ff95"},{url:"/_next/static/css/f06d52e3a97c5d914bac0b5bab6fa6b5e18c261d_CSS.8381cbcb.chunk.css",revision:"c332bee1bf8d15f0ee9c5e92bf8defac"},{url:"/_next/static/css/styles.792167db.chunk.css",revision:"78055e8302cd1216c0678e3ecafcd742"},{url:"/favicon-16x16.png",revision:"f2bf6a6c5cbb1ff2a122f2a5c11d0c9c"},{url:"/favicon-32x32.png",revision:"93b75d8e00b7f2dcceced1afedadcbfc"},{url:"/favicon-96x96.png",revision:"aebd3a7576c000dbc4bae9db9180df89"},{url:"/favicon.ico",revision:"3cc872bf73ef30bea7a8a7367d26199c"},{url:"/fonts/Nunito-Bold.ttf",revision:"c0844c990ecaaeb9f124758d38df4f3f"},{url:"/fonts/Nunito-BoldItalic.ttf",revision:"b21199decd37bf9a096e0f495bb20ffd"},{url:"/fonts/Nunito-SemiBold.ttf",revision:"876701bc4fbf6166f07f152691b15159"},{url:"/fonts/Nunito-SemiBoldItalic.ttf",revision:"59cf0995782240777656a355cf08b234"},{url:"/fonts/nunito-regular.ttf",revision:"d8de52e6c5df1a987ef6b9126a70cfcc"},{url:"/icons/icon-144x144.png",revision:"e405645caecef2ef4e1e3173cb97f860"},{url:"/icons/icon-72x72 .png",revision:"c856ed292aa0c97f6440887d291e9910"},{url:"/icons/icon-96x96.png",revision:"7e707306ba2605029ffac50b3637f4c0"},{url:"/manifest.json",revision:"fde51a732922a69c8e73e24b12418662"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"POST"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
