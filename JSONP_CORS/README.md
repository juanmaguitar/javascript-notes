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

Sin embargo existen maneras de "saltarse" esta politica: JSONP y CORS

# JSONP

<sub>[http://bob.ippoli.to/archives/2005/12/05/remote-json-jsonp/](http://bob.ippoli.to/archives/2005/12/05/remote-json-jsonp/)</sub>  
<sub>[http://www.json-p.org/](http://www.json-p.org/)</sub>  

[JSONP](http://es.wikipedia.org/wiki/JSONP) (_JSON con Padding_) es una _técnica_ mediante la que podemos obtener **y tratar** JSON desde otros dominios (desde javascript). 

Con esta tecnica/hack obtenemos el JSON pasado como parametro a una funcion que se ejecuta en el cliente 

#### El problema

- Si desde la pagina `MYsite.com` ejecuto 

    ```javascript
    $.ajax({
        url: 'http://www.ANOTHERsite.com/datos.json',
        success: function(data) {
            console.log(data) 
        }
    });
    ```

    el navegador (Chrome) me devuelve algo asi:

        Refused to connect to 'http://www.anothersite.com/datos.json' because it violates the following Content Security Policy directive...

    debido a la _"Same-origin policy"_ del objeto `XMLHttpRequest` 

- Sin embargo si hacemos esto 

    ```javascript
    <script type="text/javascript" src="http://www.ANOTHERsite.com/datos.json"></script>
    ```

    si que podriamos obtener el JSON 

    ```javascript
    {
        "api_key": "224Wrf2asfSDfcea23reSDfqW",
        "status": "good",
        "name": "wikipedia",
        "date": "27-09-1995"
    }
    ```

    pero no podriamos acceder al JSON obtenido ya que no queda almacenado en niguna variable

#### La solución

La solucion para poder _tratar_ este JSON es preparar el servidor para que devuelva el JSON envuelto en la llamada a una función  

```javascript
handleMyJSONResponse ({
    "api_key": "224Wrf2asfSDfcea23reSDfqW",
    "status": "good",
    "name": "wikipedia",
    "date": "27-09-1995"
});
```

Por convención, el nombre de la función callback se especifica en un parámetro (_jsonp_, _callback_ o cualquier otro) de la URL que hace la peticion al servidor.

 ```javascript
<script type="text/javascript" src="http://www.ANOTHERsite.com/datos.json?callback=handleMyJSONResponse"></script>
 ```

## Peticiones JSONP

- Con [jQuery](http://learn.jquery.com/ajax/working-with-jsonp/)

      ```javascript
     $.getJSON('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=casas+alquiler&callback=?', function( googleResults) {
         console.log (  "$.getJSON : %o", googleResults.responseData.results );
    });
      ```
    <sub>[jsFiddle: Ejemplos JSONP jQuery](http://jsfiddle.net/juanma/xncxL63c/)</sub>  
    <sub>[jsFiddle: Ejemplo JSONP jQuery (Google Search Form)](http://jsfiddle.net/juanma/24o9jm8c/)</sub>  

- Con [código nativo](http://jsfiddle.net/juanma/uf31ps5e/)

    ```javascript
    window.do_things = function (data) {
       console.log ( "do_things : %o", data.responseData.results );
    }

    function loadScript (id, src, callback) {

         // Crear elemento
         var script = document.createElement("script");

         // Atributos del script
         script.setAttribute("type", "text/javascript");
         script.setAttribute("src", src + "&callback=" + callback);
         script.setAttribute("id", id);

         // Insertar script en la cabecera
         document.getElementsByTagName("head")[0].appendChild(script);

    }

    loadScript ("my_script_tag", "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=casas+alquiler", "do_things");
    ```

#### API's publicas

Muchas [API's publicas](http://www.programmableweb.com/category/all/apis?data_format=21173) vienen ya preparadas para devolver JSON con JSONP, para que pueda ser obtenido y tratado directamente desde el cliente (Javascript).

```javascript
http://www.flickr.com/services/feeds/photos_public.gne?format=json
http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=ofertas+coches&callback=treatMyJSONResponse
```

## CORS

<sub>[http://www.w3.org/TR/cors/](http://www.w3.org/TR/cors/)</sub>