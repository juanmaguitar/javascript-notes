#Ideas Claras de Javascript

* JavaScript es un [lenguaje de programación interpretado](http://es.wikipedia.org/wiki/Lenguaje_de_programaci%C3%B3n_interpretado) por lo que no es necesario compilar los programas para ejecutarlos  

- Según una [separacion en 3 capas de la pagina web](http://titleandsummary.com/separation-of-layers-content-presentation-and-behavior/), con el Javascript controlariamos la capa del comportamiento:  

    * Contenido → HTML  
    * Presentacion → CSS  
    * Comportamiento → Javascript  

    <sub>[http://jeffcroft.com/blog/2007/sep/26/new-layers-web-development/](http://jeffcroft.com/blog/2007/sep/26/new-layers-web-development/)  
</sub>  

- [Javascript](https://developer.mozilla.org/en/JavaScript_Language_Resources) está basado en [ECMAScript](http://es.wikipedia.org/wiki/ECMAScript) que es una especificación de lenguaje de programacion

- Con [la llegada de AJAX](http://www.uberbin.net/archivos/internet/ajax-un-nuevo-acercamiento-a-aplicaciones-web.php) (que no es más que el uso de un objeto javascript con el que podemos interactuar con el servidor sin tener que forzar una recarga de página) se abrió una nueva era en la historia del lenguaje

- El uso tradicional de Javascript es en el lado del cliente (en el browser), aunque ultimamente se está popularizando [su uso tambien en el lado del servidor](http://net.tutsplus.com/tutorials/javascript-ajax/learning-serverside-javascript-with-node-js/) ([Node.js](http://nodejs.org/))

    <sub>[http://www.youtube.com/watch?v=F6k8lTrAE2g](http://www.youtube.com/watch?v=F6k8lTrAE2g)  

- Hay diferencias entre los navegadores debido al uso de [diferentes motores de Javascript](http://www.etnassoft.com/2011/05/31/comparativa-entre-los-distintos-motores-ecmascript/). Algunos de ellos son:

    * Chrome → V8
    * Firefox 4 → JagerMonkey
    * Opera 10 → Carakan
    * Safari → Nitro
    * Internet Explorer 9 → Chakra

    Aunque la diferencia grande siempre ha estado entre Internet Explorer y el resto (hasta IE9)

- Estos interpretes ([motores](http://en.wikipedia.org/wiki/JavaScript_engine#JavaScript_engines)) de JS que hay en cada navegador, realizan optimizaciones de código cada uno a su manera de ahí el diferente rendimiento entre navegadores

    <sub>[http://jsperf.com/browse](http://jsperf.com/browse)</sub>

# Breve historia de Javascript

- La primera version del Javascript aparece en el navegador [Netscape](http://en.wikipedia.org/wiki/Netscape) 2.0  

- En 1995 SUN Microsystems y Netscape decidieron darle el nombre JavaScript (antes se llamó Mocha y LiveScript).

- En 1997 se propuso este lenguaje como standard y la European Computer Manufacturers Association ([ECMA](http://www.ecma-international.org/default.htm)) lo adopta como tal. De ahí que tambien se le llame [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm)  

- Internet Explorer 3.0 incluye una version propia del ECMAScript que llama [JScript](http://msdn.microsoft.com/scripting/)  

- En [1998](http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/) y a raiz de estas diferentencias entre navegadores, la W3C (World Wide Web Consortium) diseñó el standard [DOM](http://es.wikipedia.org/wiki/Document_Object_Model) que es un interfaz (API) para acceder y modificar el contenido estructurado del documento.  

- Estas diferencias entre navegadores han marcado los desarrollos en Javascript hasta el dia de hoy, y han hecho habitual el uso de [frameworks](http://www.maestrosdelweb.com/editorial/comparacion-frameworks-javascript/) que nos ayuden a lidiar con estas diferencias (jQuery, Prototype, etc…)

- Un [Framework](http://www.desarrolloweb.com/articulos/listado-distintos-framework-javascript.html) (o libreria) es una abstracción de código común que provee funcionalidades genéricas que pueden ser utilizadas para desarrollar aplicaciones de manera rápida, fácil, modular y sencilla, ahorrando tiempo y esfuerzo.  

# ECMAScript5

[ECMAScript5 es el actual standard de Javascript](http://blog.oio.de/2013/04/16/ecmascript-5-the-current-javascript-standard/) (2014).  
Si miramos las [estadisticas de uso de navegadores](http://clicky.com/marketshare/global/web-browsers/versions/) junto con la [compatibilidad de estos con ES5](http://kangax.github.io/compat-table/es5/) podemos concluir que: _basandonos en ES5 nuestro codigo funcionará bien en la mayoria de los navegadores utilizados mundialmente_.







