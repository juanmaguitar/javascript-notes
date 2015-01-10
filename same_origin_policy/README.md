# Same-origin policy

<sub>[https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)</sub>

- La **"Same-Origin policy"** (politica del mismo origen) controla que sólo que los scripts que provengan del _mismo origen_ (mismo [esquema](http://en.wikipedia.org/wiki/URI_scheme), [hostname](http://en.wikipedia.org/wiki/Hostname) y [puerto](http://en.wikipedia.org/wiki/Port_(computer_networking))) y que son _ejecutados en diferentes paginas_ (ventanas, tabs) puedan acceder sin restricciones a sus respectivos DOM

    _Mismo Origen:_

    ```javascript
    http://site.com
    http://site.com/
    http://site.com/my/page.html
    ```

    _Diferente Origen:_

    ```javascript
    http://www.site.com (another domain)
    http://site.org (another domain)
    https://site.com (another protocol)
    http://site.com:8080 (another port)
    ```

- Esta politica [se aplica tambien](https://code.google.com/p/browsersec/wiki/Part2#Same-origin_policy_for_XMLHttpRequest) a las peticiones AJAX ([XMLHttpRequest](http://en.wikipedia.org/wiki/XMLHttpRequest)) lo que significa que sólo podremos hacer peticiones AJAX al host que sirve la pagina web donde se ejecuta el código

- Los [WebSockets](http://www.html5rocks.com/es/tutorials/websockets/basics/) no estan sujeto a esta politica (con ellos podras comunicar partes en diferentes dominios)

- Esta politica viene implementada en TODOS los navegadores (antiguos y modernos)

- De forma nativa, _sólo podremos incluir recursos de otros dominios_ con los siguientes elementos:

    - Archivos Javascript con [`<script src="..."></script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
    - Archivos CSS con [`<link rel="stylesheet" href="...">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)
    - Imágenes con [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
    - Archivos Multimedia con [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) y [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
    - Plug-ins con [`<object>`](https://developer.mozilla.org/en-US/docs/HTML/Element/object), [`<embed>`](https://developer.mozilla.org/en-US/docs/HTML/Element/embed) y [`<applet>`](https://developer.mozilla.org/en-US/docs/HTML/Element/applet)
    - Fuentes con [`@font-face`](https://developer.mozilla.org/en-US/docs/CSS/@font-face) 
    - Cualquier otra pagina con [`<frame>`](https://developer.mozilla.org/en-US/docs/HTML/Element/frame) and [`<iframe>`](https://developer.mozilla.org/en-US/docs/HTML/Element/iframe)

Sin embargo existen maneras de "saltarse" esta politica: [JSONP](https://github.com/juanmaguitar/training-frontend-docs/tree/master/same_origin_policy/JSONP) y [CORS](https://github.com/juanmaguitar/training-frontend-docs/tree/master/same_origin_policy/CORS)

## JSONP vs CORS

<sub>[http://www.formandome.es/javascript/cors-vs-jsonp-solicitudes-ajax-entre-dominios/](http://www.formandome.es/javascript/cors-vs-jsonp-solicitudes-ajax-entre-dominios/)</sub>
<sub>[http://blog.koalite.com/2012/03/sopa-de-siglas-ajax-json-jsonp-y-cors/](http://blog.koalite.com/2012/03/sopa-de-siglas-ajax-json-jsonp-y-cors/)</sub>
<sub>[http://stackoverflow.com/questions/12296910/so-jsonp-or-cors](http://stackoverflow.com/questions/12296910/so-jsonp-or-cors)</sub>

La recomendación general es usar CORS siempre que se pueda, pero hay que tener en cuenta lo siguiente:

- **CORS** soporta _mas metodos HTTP_ (`GET`, `PUT`, `POST`, `DELETE`) que JSONP (sólo `GET`)
- Puedes utilizar **JSONP** en _cualquier navegador_ (antiguo y moderno). Sin embargo CORS solo funcionará en algunos navegadores (los que soporten [xhr2](http://caniuse.com/#feat=xhr2))
- Hay _mas API's publicas_ que ofrecen acceso a datos via [**JSONP**](http://www.programmableweb.com/category/all/apis?data_format=21174) que via [CORS](http://enable-cors.org/resources.html#apis)
- **CORS** (el servidor decide a quien da acceso y cómo) _es mas seguro_ que JSONP (cross-origin via `script` injection)
- Con **CORS** hay un _mejor manejo de errores_ que con JSONP

