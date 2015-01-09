# JSONP

<sub>[http://bob.ippoli.to/archives/2005/12/05/remote-json-jsonp/](http://bob.ippoli.to/archives/2005/12/05/remote-json-jsonp/)</sub>  
<sub>[http://www.json-p.org/](http://www.json-p.org/)</sub>  
<sub>[http://johnnywey.com/2012/05/20/jsonp-how-does-it-work/](http://johnnywey.com/2012/05/20/jsonp-how-does-it-work/)</sub>

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

- La solucion para poder _tratar_ este JSON es preparar el servidor para que devuelva el JSON envuelto en la llamada a una función  

    ```javascript
    handleMyJSONResponse ({
        "api_key": "224Wrf2asfSDfcea23reSDfqW",
        "status": "good",
        "name": "wikipedia",
        "date": "27-09-1995"
    });
    ```

    Asi, si definimos una funcion global  `handleMyJSONResponse` preparada para recibir un JSON como parametro, ya podriamos recibir y _tratar_ estos datos desde JS.

    ```javascript
    window.handleMyJSONResponse = function (datosJSON) {
        console.log (datosJSON);
    };
    ```

- Por convención, el nombre de la función callback se especifica en un parámetro (_jsonp_, _callback_ o cualquier otro) de la URL que hace la peticion al servidor.

    ```javascript
    <script type="text/javascript" src="http://www.ANOTHERsite.com/datos.json?callback=handleMyJSONResponse"></script>
    ```

## Peticiones JSONP

- Con **código nativo**

    <sub>[jsFiddle: Ejemplos JSONP con JS nativo](http://jsfiddle.net/juanma/uf31ps5e/)</sub>  

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

    loadScript ("my_script_tag_id", "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=casas+alquiler", "do_things");
    ```

- Con **jQuery**

    [JQuery](http://learn.jquery.com/ajax/working-with-jsonp/) se encarga (de forma transparente al developer) de darle un [nombre a la funcion callback](https://github.com/jquery/jquery/blob/master/src/ajax/jsonp.js#L15), [pasarla en la peticion](https://github.com/jquery/jquery/blob/master/src/ajax/jsonp.js#L44), [crearla globalmente en el cliente](https://github.com/jquery/jquery/blob/master/src/ajax/jsonp.js#L60) y se encarga también de [eliminar el tag script](https://github.com/jquery/jquery/blob/master/src/ajax/script.js#L18) utilizado internamente

    <sub>[jsFiddle: Ejemplos JSONP jQuery](http://jsfiddle.net/juanma/az6rvze2/)</sub>  
    <sub>[jsFiddle: Ejemplo JSONP jQuery (Google Search Form)](http://jsfiddle.net/juanma/24o9jm8c/)</sub>  

      ```javascript
     $.getJSON(
        'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=casas+alquiler&callback=?', 
        function( googleResults) {
            console.log ( "$.getJSON : %o", googleResults.responseData.results );
        }
    );

    $.ajax({
        url: "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=casas+alquiler",
        dataType: "jsonp",
        success: function( response ) {
            console.log ( "$.ajax minimal : %o", response.responseData.results );
        }
    });
    ```

#### API's publicas

Muchas [API's publicas](http://www.programmableweb.com/category/all/apis?data_format=21173) vienen ya preparadas para devolver JSON con JSONP, para que pueda ser obtenido y tratado directamente desde el cliente (Javascript).

```javascript
http://www.flickr.com/services/feeds/photos_public.gne?format=json
http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=ofertas+coches&callback=treatMyJSONResponse
```
