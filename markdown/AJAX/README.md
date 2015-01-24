# AJAX

<sub>[http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/](http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/)</sub>  
<sub>[https://developer.mozilla.org/en/ajax](https://developer.mozilla.org/en/ajax)</sub>  
<sub>[http://www.anieto2k.com/2006/05/16/los-mejores-manuales-de-ajax/](http://www.anieto2k.com/2006/05/16/los-mejores-manuales-de-ajax/)</sub>  
<sub>[http://www.fiftyfoureleven.com/resources/programming/xmlhttprequest/examples](http://www.fiftyfoureleven.com/resources/programming/xmlhttprequest/examples)</sub>  

- Agrupa un conjunto de tecnologias cuyo eje central son las peticiones asincronas al servidor a traves del objeto `XMLHttpRequest()` (XHR)  
<sub>[http://www.w3.org/TR/XMLHttpRequest/](http://www.w3.org/TR/XMLHttpRequest/)  </sub>  
<sub>[http://www.xml.com/pub/a/2005/02/09/xml-http-request.html](http://www.xml.com/pub/a/2005/02/09/xml-http-request.html)  </sub>

    La aplicación de esta técnica dio lugar a las llamadas aplicaciones AJAX, donde no es necesario refrescar la pagina para obtener nuevo contenido.

![AJAX](https://raw.github.com/juanmaguitar/training-frontend-docs/master/AJAX/img/ajax.png)

- AJAX son las siglas de **Asynchronous JavaScript + XML**:
    - _Asynchronous_ porque despues de hacer una peticion HTTP no necesita esperar a una respuesta, sino que puede seguir haciendo otras cosas y ser notificado cuando llegue la respuesta
    - _JavaScript_ porque creamos los objetos XHR con Javascript
    - _XML_ porque inicialmente era el formato standard de intercambio de datos. Actualmente una petición HTTP suele devolver JSON (o HTML)

- La mayor limitación de una petición AJAX es que [no puede acceder a datos de un dominio diferente](https://github.com/juanmaguitar/training-frontend-docs/tree/master/same_origin_policy) al que estamos (_cross-domain_)  
    Pero hay maneras de solucionar este problema: [_JSONP_](https://github.com/juanmaguitar/training-frontend-docs/tree/master/same_origin_policy/JSONP) y [_CORS_](https://github.com/juanmaguitar/training-frontend-docs/tree/master/same_origin_policy/CORS)


## Haciendo la petición

<sub>[https://developer.mozilla.org/en/XMLHttpRequest](https://developer.mozilla.org/en/XMLHttpRequest)</sub>  
<sub>[http://jibbering.com/2002/4/httprequest.html](http://jibbering.com/2002/4/httprequest.html)</sub>

```javascript
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = myCallback;
xhr.open('GET', url, true);
xhr.send('');
```

- Las peticiones AJAX las hacemos a traves de objetos XHR.  
<sub>[http://es.wikipedia.org/wiki/XMLHttpRequest](http://es.wikipedia.org/wiki/XMLHttpRequest)</sub>  
<sub>[https://developer.mozilla.org/En/XMLHttpRequest/Using_XMLHttpRequest](https://developer.mozilla.org/En/XMLHttpRequest/Using_XMLHttpRequest)</sub>

    Para crear un objeto XHR utilizamos el objeto `XMLHttpRequest()` que es nativo en IE7+, Safari, Opera y Firefox

        var xhr = new XMLHttpRequest();

- Una vez creado el objeto XHR, capturamos el evento `readystatechange` de este objeto y le enganchamos una función.

        xhr.onreadystatechange = myCallback;

- Despues hay que llamar al metodo `open()` pasandole los parametros de la peticion

        xhr.open('GET', 'somefile.txt', true);

    _El 1er parametro es el tipo de peticion (GET, POST,…)._  
    _El 2º parametro es la URL_  
    _El 3er parametro indica si la petición es asíncrona (true) o síncrona (false)_  

- Despues hay que llamar al metodo `send()` para hacer la petición

        xhr.send('');

## Procesando la respuesta

<sub>[http://www.quirksmode.org/blog/archives/2005/12/the_ajax_respon.html](http://www.quirksmode.org/blog/archives/2005/12/the_ajax_respon.html)</sub>

```javascript
function myCallback() {
    if (xhr.readyState < 4) {
        return; // not ready yet
    }
    if (xhr.status !== 200) {
        alert('Error!'); // the HTTP status code is not OK
        return;
    }
    // all is fine, do the work
    alert(xhr.responseText);
}
```

- El objeto XHR tiene una propiedad llamada `readyState`  y cada vez que cambia esta propiedad se dispara el evento `readystatechange`
    Los posibles valores de readyState son:
    - 0—uninitialized
    - 1—loading
    - 2—loaded
    - 3—interactive
    - **4—complete**  
    
    Cuando `readyState` llega a 4 significa que ya se ha recibido una respuesta

- Una vez hemos recibido la respuesta hay que chequear el estado de la misma en la propiedad `status` del objeto XHR  
    El valor que nos interesa para esta propiedad es 200 (OK)


## AJAX con jQuery

<sub>[http://blogs.sitepoint.com/ajax-jquery/](http://blogs.sitepoint.com/ajax-jquery/)</sub>
<sub>[http://jqfundamentals.com/book/#chapter-7](http://jqfundamentals.com/book/#chapter-7)</sub>

```javascript
$.ajax({
    url: 'ajax/test.html',
    success: function(data) {
        $('.result').html(data);
        alert('Load was performed.');
    }
});
```

- Con jQuery podemos realizar nuestra petición por AJAX con el metodo [`$.ajax()`](http://api.jquery.com/jQuery.ajax/)

- El metodo `$.ajax()` devuelve un objeto [`jqXHR`](http://api.jquery.com/jQuery.ajax/#jqXHR) que viene a ser una version mejorada del objeto nativo `XMLHttpRequest`

- Al metodo `$.ajax()` le pasamos los parametros de nuestra petición AJAX que son, entre otros:
    
    - **url** : La URL donde hacemos la peticion

    - **type**: El tipo de petición, `POST` o  `GET` (por defecto)  
        Las peticiones `GET` las utilizamos normalmente para recibir datos (ya que se pueden cachear)  
        Las peticiones `POST` las utilizamos para mandar datos al servidor  
    
    - **data** : Los datos que enviaremos al servidor
    
    - **dataType**: El tipo de datos que esperamos recibir del servidor (json, html, xml, jsonp, …)

- Al `$.ajax()` le podemos pasar tambien unas cuantas funciones callback que se ejecutaran dependiendo del resultado de la petición
    
    - **success**: La función que queremos ejecutar cuando recibamos la respuesta.  
        Si los datos recibidos estan en formato JSON, la función los recibe directamente transformados en objeto Javascript  
        A esta función le llega, ademas de los datos recibidos, el status de la petición y el objeto `jqXHR` que maneja la petición.

    - **error**: Esta función se ejecutará si falla la petición.  
        A esta función le llega el objeto `jqXHR` que maneja la petición y el error.

    - **complete**: Esta función se ejecutará cuando finalize la petición  
        A esta función le llega el objeto `jqXHR` que maneja la petición y el error o éxito de la operación.
    
    - **beforeSend**: Esta función se ejecuta antes de hacer la petición  
        A esta función le llega el objeto jqXHR que maneja la petición y los parametros de la petición
    
    - **dataFilter**: Esta función se ejecuta inmediatamente despues de la recepción exitosa de los datos  
        A esta función le llega la información recibida y el valor del dataType, y lo que devuelve le llega a success