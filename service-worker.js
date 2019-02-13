/* global self, caches, Promise */
var cacheName = 'calculadoraPWA-2';


var filesToCache = [
 "/",
 "./assets",
 "./assets/css",
 "./assets/css/style.css",
 "./assets/js",
 "./assets/js/script.js",
 "./index.html",
 "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
];

//Instala o serviceWorker e adiciona todos os meus assets e página html
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("Adicionando os assets ao cache: "+filesToCache);
      return cache.addAll(filesToCache);
    })
  );
});

//Ativa o serviceWorker e remove o cache, caso o cache antigo seja cacheName = calculadoraPWA-2 e o novo seja outro nome
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('Removendo o antigo cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

//Busca primeiro os dados no servidor e atualiza o cache, mas caso não exista, ele tentará buscar
//no cache do navegador
self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
        return fetch(e.request).then(function(response){
            let responseClone = response.clone();
            caches.open(cacheName).then(function(cache){
                cache.put(e.request, responseClone);
            });
            return response;
        }).catch(function(){
            if(response){
                console.log("Dados buscados do cache");
                return response;
            }else{
                console.log("Cache sem dados");
            }
        });
    })
  );
});
