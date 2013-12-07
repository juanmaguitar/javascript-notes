#Ideas Claras de Javascript

* JavaScript es un lenguaje de programación interpretado por lo que no es necesario compilar los programas para ejecutarlos  

    [WIKI - lenguaje de programación interpretado](http://es.wikipedia.org/wiki/Lenguaje_de_programaci%C3%B3n_interpretado)  

- Según una separacion en 3 capas de la pagina web, con el Javascript controlariamos la capa del comportamiento:  

    * Contenido -- HTML  
    * Presentacion -- CSS  
    * Comportamiento -- Javascript  

    [http://titleandsummary.com/separation-of-layers-content-presentation-and-behavior/](http://titleandsummary.com/separation-of-layers-content-presentation-and-behavior/)  
    [http://jeffcroft.com/blog/2007/sep/26/new-layers-web-development/](http://jeffcroft.com/blog/2007/sep/26/new-layers-web-development/)  

- Javascript está basado en ECMAScript que es una especificación de lenguaje de programacion

    [https://developer.mozilla.org/en/JavaScript_Language_Resources](https://developer.mozilla.org/en/JavaScript_Language_Resources)
    [http://es.wikipedia.org/wiki/ECMAScript](http://es.wikipedia.org/wiki/ECMAScript)

- Con la llegada de AJAX (que no es más que el uso de un objeto javascript con el que podemos interactuar con el servidor sin tener que forzar una recarga de página) se abrió una nueva era en la historia del lenguaje

    [http://www.uberbin.net/archivos/internet/ajax-un-nuevo-acercamiento-a-aplicaciones-web.php](http://www.uberbin.net/archivos/internet/ajax-un-nuevo-acercamiento-a-aplicaciones-web.php)

- El uso tradicional de Javascript es en el lado del cliente (en el browser), aunque ultimamente se está popularizando su uso tambien en el lado del servidor (Node.js)

    [http://net.tutsplus.com/tutorials/javascript-ajax/learning-serverside-javascript-with-node-js/](http://net.tutsplus.com/tutorials/javascript-ajax/learning-serverside-javascript-with-node-js/)  
    [http://www.youtube.com/watch?v=F6k8lTrAE2g](http://www.youtube.com/watch?v=F6k8lTrAE2g)  
    [http://nodejs.org/](http://nodejs.org/)

- Hay diferencias entre los navegadores debido al uso de diferentes motores de Javascript. A dia de hoy son:
    * Chrome --> V8
    * Firefox 4 --> JagerMonkey
    * Opera 10 --> Carakan
    * Safari --> Nitro
    * Internet Explorer 9 --> Chakra

    Aunque la diferencia grande siempre ha estado entre Internet Explorer y el resto (hasta IE9)

    [http://en.wikipedia.org/wiki/JavaScript_engine#JavaScript_engines](http://en.wikipedia.org/wiki/JavaScript_engine#JavaScript_engines)

- Estos interpretes (motores) de JS que hay en cada navegador, realizan optimizaciones de código cada uno a su manera de ahí el diferente rendimiento entre navegadores

    [http://jsperf.com/browse](http://jsperf.com/browse)

#Breve historia de Javascript

- La primera version del Javascript aparece en el navegador Netscape 2.0  
[http://en.wikipedia.org/wiki/Netscape](http://en.wikipedia.org/wiki/Netscape)

- En 1995 SUN Microsystems y Netscape decidieron darle el nombre JavaScript (antes se llamó Mocha y LiveScript).

- En 1997 se propuso este lenguaje como standard y la European Computer Manufacturers Association (ECMA) lo adopta como tal. De ahí que tambien se le llame ECMAScript  
[http://www.ecma-international.org/default.htm](http://www.ecma-international.org/default.htm)  
[http://www.ecma-international.org/publications/standards/Ecma-262.htm](http://www.ecma-international.org/publications/standards/Ecma-262.htm)

- Internet Explorer 3.0 incluye una version propia del ECMAScript que llama JScript  
[http://msdn.microsoft.com/scripting/](http://msdn.microsoft.com/scripting/)

- En 1998 y a raiz de estas diferentencias entre navegadores, la W3C (World Wide Web Consortium) diseñó el standard DOM que es un interfaz (API) para acceder y modificar el contenido estructurado del documento.  
[http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/](http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/)  
[http://es.wikipedia.org/wiki/Document_Object_Model](http://es.wikipedia.org/wiki/Document_Object_Model)  

- Estas diferencias entre navegadores han marcado los desarrollos en Javascript hasta el dia de hoy, y han hecho habitual el uso de frameworks que nos ayuden a lidiar con estas diferencias (jQuery, Prototype, etc…)

- Un Framework (o libreria) es una abstracción de código común que provee funcionalidades genéricas que pueden ser utilizadas para desarrollar aplicaciones de manera rápida,fácil, modular y sencilla, ahorrando tiempo y esfuerzo.  
[http://www.desarrolloweb.com/articulos/listado-distintos-framework-javascript.html](http://www.desarrolloweb.com/articulos/listado-distintos-framework-javascript.html)  
[http://www.maestrosdelweb.com/editorial/comparacion-frameworks-javascript/](http://www.maestrosdelweb.com/editorial/comparacion-frameworks-javascript/)