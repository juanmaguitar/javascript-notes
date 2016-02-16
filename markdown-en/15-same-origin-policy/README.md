# Same-origin policy

<sub>[https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)</sub>

- The **"Same-Origin policy"** controls that ONLY the scripts coming from the _same origin_ (same [scheme](http://en.wikipedia.org/wiki/URI_scheme), [hostname](http://en.wikipedia.org/wiki/Hostname) and [port](http://en.wikipedia.org/wiki/Port_(computer_networking))) and that are _executed in different pages_ (windows, tabs) can access without restrictions to their respective DOM

    _Same Origin:_

    ```javascript
    http://site.com
    http://site.com/
    http://site.com/my/page.html
    ```

    _Different Origin:_

    ```javascript
    http://www.site.com (another domain)
    http://site.org (another domain)
    https://site.com (another protocol)
    http://site.com:8080 (another port)
    ```

- This policy [is also applied](https://code.google.com/p/browsersec/wiki/Part2#Same-origin_policy_for_XMLHttpRequest) to the AJAX ([XMLHttpRequest](http://en.wikipedia.org/wiki/XMLHttpRequest)) request which means we could only do AJAX requests to the host that is serving the web page where the code is being executed

- [WebSockets](http://www.html5rocks.com/es/tutorials/websockets/basics/) are not under this policy (with them you will be able of communicating parts in different domains)

- This policy is implemented in ALL browsers (old and modern ones)

- Natively, _we can only include resources from other domains_ with the following elements:

    - Javascript files with [`<script src="..."></script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
    - CSS files with [`<link rel="stylesheet" href="...">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)
    - Images with [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
    - Multimedia files [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) and [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
    - Plug-ins with [`<object>`](https://developer.mozilla.org/en-US/docs/HTML/Element/object), [`<embed>`](https://developer.mozilla.org/en-US/docs/HTML/Element/embed) y [`<applet>`](https://developer.mozilla.org/en-US/docs/HTML/Element/applet)
    - Fonts with [`@font-face`](https://developer.mozilla.org/en-US/docs/CSS/@font-face) 
    - Any other page with [`<frame>`](https://developer.mozilla.org/en-US/docs/HTML/Element/frame) and [`<iframe>`](https://developer.mozilla.org/en-US/docs/HTML/Element/iframe)

However, there are ways of "skipping" this policy: [JSONP](https://github.com/juanmaguitar/training-frontend-docs/tree/master/same_origin_policy/JSONP) and [CORS](https://github.com/juanmaguitar/training-frontend-docs/tree/master/same_origin_policy/CORS)

## JSONP vs CORS

<sub>[http://stackoverflow.com/questions/12296910/so-jsonp-or-cors](http://stackoverflow.com/questions/12296910/so-jsonp-or-cors)</sub>  

The recomendation is always using CORS whenever possible, but the following things should be taken into account:

- **CORS** supports _more methods HTTP_ (`GET`, `PUT`, `POST`, `DELETE`) than JSONP (only `GET`)
- You can use **JSONP** in _any browser_ (old and modern one). However CORS will only work in some browsers (the ones that support [xhr2](http://caniuse.com/#feat=xhr2))
- There are more _public API's_ offering access to their data via [**JSONP**](http://www.programmableweb.com/category/all/apis?data_format=21174) than via [CORS](http://enable-cors.org/resources.html#apis)
- **CORS** (the server decides who gives access to and how) _is safer_ than JSONP (cross-origin via `script` injection)
- With **CORS** there is a _better management of errors_ than with JSONP
- Both CORS and JSONP require the server to be prepared for them

