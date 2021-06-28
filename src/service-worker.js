  /* eslint-disable no-restricted-globals */

  // This service worker can be customized!
  // See https://developers.google.com/web/tools/workbox/modules
  // for the list of available Workbox modules, or add any other
  // code you'd like.
  // You can also remove this file if you'd prefer not to use a
  // service worker, and the Workbox build step will be skipped.

  import { clientsClaim } from 'workbox-core';
  import { ExpirationPlugin } from 'workbox-expiration';
  import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
  import { registerRoute } from 'workbox-routing';
  import { StaleWhileRevalidate } from 'workbox-strategies';
  import {BackgroundSyncPlugin} from 'workbox-background-sync';
  import {NetworkOnly, NetworkFirst} from 'workbox-strategies';
  import {Queue} from 'workbox-background-sync';
  //import { BroadcastChannel } from 'broadcast-channel';
  
  console.log("Hello Im the service worker, Im the walrus 11");
  clientsClaim();

  // Precache all of the assets generated by your build process.
  // Their URLs are injected into the manifest variable below.
  // This variable must be present somewhere in your service worker file,
  // even if you decide not to use precaching. See https://cra.link/PWA
  precacheAndRoute(self.__WB_MANIFEST);

  // Set up App Shell-style routing, so that all navigation requests
  // are fulfilled with your index.html shell. Learn more at
  // https://developers.google.com/web/fundamentals/architecture/app-shell
  const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
  registerRoute(
    // Return false to exempt requests from being fulfilled by index.html.
    ({ request, url }) => {
      // If this isn't a navigation, skip.
      if (request.mode !== 'navigate') {
        return false;
      } // If this is a URL that starts with /_, skip.

      if (url.pathname.startsWith('/_')) {
        return false;
      } // If this looks like a URL for a resource, because it contains // a file extension, skip.

      if (url.pathname.match(fileExtensionRegexp)) {
        return false;
      } // Return true to signal that we want to use the handler.

      return true;
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
  );

  // An example runtime caching route for requests that aren't handled by the
  // precache, in this case same-origin .png requests like those from in public/
  registerRoute(
    // Add in any other file extensions or routing criteria as needed.
    ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
    new StaleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        // Ensure that once this runtime cache reaches a maximum size the
        // least-recently used images are removed.
        new ExpirationPlugin({ maxEntries: 50 }),
      ],
    })
  );

  // This allows the web app to trigger skipWaiting via
  // registration.waiting.postMessage({type: 'SKIP_WAITING'})
  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
    else if (event.data && event.data.type === 'FORCE_UPDATE') {
      console.log("You force to update");
      console.log("Pending Requests", bgSyncPlugin);
  }
  });

  // Any other custom service worker logic can go here.


  const bgSyncPlugin = new BackgroundSyncPlugin('postRequests', {
      maxRetentionTime: 48 * 60, // Retry for max of 24 Hours (specified in minutes),
      onSync: async ({queue}) => {
        console.log("Callback on SYNC 11!", queue);
        const channel = new BroadcastChannel('sw-messages');
        channel.postMessage({updatingRecords : true});
        let entry;
        let uuidPatients = [];
        
        while ((entry = await queue.shiftRequest())) {
          try {
            console.log(entry.request);
            let urlRequest = entry.request.url;
            const cloneRequest = entry.request.clone();
            let data;
            let response; 

            if(urlRequest.includes("submission") && (entry.request.method === "POST" || entry.request.method === "PUT")){
                const uuidObj = uuidPatients.find(obj => urlRequest.includes(obj.oldUUID));
                if(uuidObj){
                  console.log("uuidObj", uuidObj);
                  urlRequest = urlRequest.replace(uuidObj.oldUUID, uuidObj.newUUID);
                  console.log("urlRequest", urlRequest);
                }
                const body = await cloneRequest.json();
            
                let initFetch = {
                  method: entry.request.method,
                  body: JSON.stringify(body), // data can be `string` or {object}!
                  headers:entry.request.headers
                }
                //initFetch.body = body;
                response = await fetch(urlRequest, initFetch); 
            }
            else{
              response = await fetch(entry.request);   
            }
            data = await response.json();
            
            console.log(data);
            
            console.log(urlRequest);
            
            if(urlRequest.endsWith("/patient") && entry.request.method === "POST"){
                const body = await cloneRequest.json();
                console.log("Body", body);
            
                uuidPatients.push({
                    newUUID : data.patient.uuid,
                    oldUUID : body.uuid
                });
            }
            
            
            console.info("Replay successful for request", entry.request);
          } catch (error) {
            console.error("Replay failed for request", entry.request, error);

            // Put the entry back in the queue and re-throw the error:
            await queue.unshiftRequest(entry);
            throw error;
          }
        }
        channel.postMessage({updatingRecords : false});
        console.log("Replay complete!");
      }
  });

  registerRoute(
    ({ url }) => true,
    new NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
  );
  registerRoute(
    ({ url }) => true,
    new NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    'PUT'
  );

  registerRoute(
    // Add in any other file extensions or routing criteria as needed.
    ({ url }) => { console.log("Rutas GET "+process.env.REACT_APP_API_URL , url.origin); return url.origin === process.env.REACT_APP_API_URL }, // Customize this strategy as needed, e.g., by changing to CacheFirst.
    new NetworkFirst()
  );


  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });