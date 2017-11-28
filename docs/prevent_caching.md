# Configuring your Web server to prevent caching

## Why you want to do this

You should configure your web server to add HTTP headers to prevent caching of critical service worker files.
If you don't do this, [browsers might cache the content for up to 24 hours](https://stackoverflow.com/questions/38843970/service-worker-javascript-update-frequency-every-24-hours/38854905#38854905).

In addition, you should add HTTP headers to prevent the contents of the static folder to be cached unintentionally long.

## Mechanisms at work

### Service worker

When you run the production build and deploy the application to a web server, the browser will call the service worker on the first visit and will download and cache all resources. 
When the browser accesses the site a second time, it will use the cached resources.
To notice changes in your app it is crucial that the browser downloads the latest version `service-worker.js` from your server.
The browser will only do this when the [Cache-Control](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching) header associated with `service-worker.js` indicates that a previous download has expired or [24 hours have passed](https://stackoverflow.com/questions/38843970/service-worker-javascript-update-frequency-every-24-hours/38854905#38854905).
If a new service worker is available, it will download the new contents in the background.
Once the download is complete, the default behavior is that the new content will be shown on the next visit of the site. 
You can change the template's [`service-worker-prod.js`](../template/build/service-worker-prod.js) to display the message to the user to reload the page, or issue a `window.location.reload()` automatically to trigger an update depending on your application's needs.

Depending on your setup, you might want to have a short caching time for your service worker or no caching at all.
At minimum, you should add caching headers to disable or minimize caching for `service-worker.js` and `index.html`.

### The static folder

The folder [`static`](../template/static) contains the manifest and the favicons of your app.

You should limit or disable caching for all files in this folder to ensure users have receive the latest version of these files.

### Additional information

More information about caching headers can be found in the blog post ["Caching best practices & max-age gotchas" by Jake Archibald](https://jakearchibald.com/2016/caching-best-practices/). 

## How to add caching headers for your server

Here are some examples that worked for other users of this template.
See [Issue #70](https://github.com/vuejs-templates/pwa/issues/70) for a discussion.

Apache: Disable all caching for the two essential files

    <Files index.html|service-worker.js>
    FileETag None
    Header unset ETag
    Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires "Wed, 11 Jan 1984 05:00:00 GMT"
    </Files>
    
Apache: Limit caching to five minutes to all files to prevent unlimited caching also for files in static

    Header set Cache-Control "max-age=300, must-revalidate"
    
Nginx: Limit caching for the two essential files

    location ~ (index.html|service-worker.js)$ {
      # ...
      add_header Last-Modified $date_gmt;
      add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
      if_modified_since off;
      expires off;
      etag off;
    }