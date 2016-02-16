# JSONP

<sub>[http://bob.ippoli.to/archives/2005/12/05/remote-json-jsonp/](http://bob.ippoli.to/archives/2005/12/05/remote-json-jsonp/)</sub>  
<sub>[http://www.json-p.org/](http://www.json-p.org/)</sub>  
<sub>[http://johnnywey.com/2012/05/20/jsonp-how-does-it-work/](http://johnnywey.com/2012/05/20/jsonp-how-does-it-work/)</sub>

[JSONP](http://es.wikipedia.org/wiki/JSONP) (_JSON with Padding_) is a  _technique_ which we can use to obtain **and manage** JSON data from other domains (from javascript). 

With this technique/hack we obtain the JSON passed as a parameter in a function executed in the client

#### The problem

- If from the page `MYsite.com` i execute 

    ```javascript
    $.ajax({
        url: 'http://www.ANOTHERsite.com/datos.json',
        success: function(data) {
            console.log(data) 
        }
    });
    ```

    the browser (Chrome) returns something like this:

        Refused to connect to 'http://www.anothersite.com/datos.json' because it violates the following Content Security Policy directive...

    because of the ["Same-origin policy"](https://github.com/juanmaguitar/training-frontend-docs/tree/master/same_origin_policy)_ in the object `XMLHttpRequest` 

- However, if we do this

```html
<script type=text/javascript src="http://www.ANOTHERsite.com/datos.json"></script>
```
</br>
    we could obtain the JSON 

```javascript
{
    "api_key": "224Wrf2asfSDfcea23reSDfqW",
    "status": "good",
    "name": "wikipedia",
    "date": "27-09-1995"
}
```
</br>
    but we won't be able of working with this JSON because isn't being stored nowhere

#### The solution

- The solution to being able of _treating_ this JSON is preparing the server to return the JSON wrapped in a function's call

    ```javascript
    handleMyJSONResponse ({
        "api_key": "224Wrf2asfSDfcea23reSDfqW",
        "status": "good",
        "name": "wikipedia",
        "date": "27-09-1995"
    });
    ```

    In this way, if we define in the client a global function `handleMyJSONResponse` ready to receive a JSON as a parameter, we would be able od receive and _manage_ this data from JS.

    ```javascript
    window.handleMyJSONResponse = function (datosJSON) {
        console.log (datosJSON);
    };
    ```

- The convention says that the name of the function callback should be specified in a parameter (_jsonp_, _callback_ or any other) of the URL that does the request to the server.

```javascript
<script type="text/javascript" src="http://www.ANOTHERsite.com/datos.json?callback=handleMyJSONResponse"></script>
```

</br>

## JSONP requests

- With **native code**

    <sub>[jsFiddle: Examples JSONP w/ raw JS](http://jsfiddle.net/juanma/uf31ps5e/)</sub>  

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

- With **jQuery**

    [JQuery](http://learn.jquery.com/ajax/working-with-jsonp/) se encarga (de forma transparente al developer) de darle un [nombre a la funcion callback](https://github.com/jquery/jquery/blob/master/src/ajax/jsonp.js#L15), [pasarla en la peticion](https://github.com/jquery/jquery/blob/master/src/ajax/jsonp.js#L44), [crearla globalmente en el cliente](https://github.com/jquery/jquery/blob/master/src/ajax/jsonp.js#L60) y se encarga también de [añadir y eliminar el tag script](https://github.com/jquery/jquery/blob/master/src/core.js#L262) utilizado internamente

    <sub>[jsFiddle: Examples JSONP jQuery](http://jsfiddle.net/juanma/az6rvze2/)</sub>  
    <sub>[jsFiddle: Examples JSONP jQuery (Google Search Form)](http://jsfiddle.net/juanma/24o9jm8c/)</sub>  

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

#### Public API's

Most of the [public API's](http://www.programmableweb.com/category/all/apis?data_format=21174) are ready to return JSONP:  

<sub>[https://api-notebook.anypoint.mulesoft.com/](https://api-notebook.anypoint.mulesoft.com/)</sub>  

- [Instagram](http://instagram.com/developer/endpoints/#jsonp)

    ```javascript
    https://api.instagram.com/v1/tags/coffee/media/recent?access_token=fb2e77d.47a0479900504cb3ab4a1f626d174d2d&callback=callbackFunction
    ```

- [Github](https://developer.github.com/v3/#json-p-callbacks)
    
    ```javascript
    https://api.github.com/?callback=foo
    ```

- [Flickr](https://www.flickr.com/services/api/response.json.html)

    ```javascript
    https://www.flickr.com/services/rest/?method=flickr.test.echo&format=json&api_key=929033444e3a0d9a3859195d56d36552
    ```

- [LinkedIn](https://developer.linkedin.com/documents/api-requests-json)

    ```javascript
    https://api.linkedin.com/v1/people/~:(id)?callback=firstNameResponse&error-callback=firstNameError
    ```

- [SoundCloud](https://developers.soundcloud.com/docs/api/guide#crossdomain)
    
    ```javascript
    https://api.soundcloud.com/tracks.json?client_id=YOUR_CLIENT_ID&callback=processTracks
    ```
