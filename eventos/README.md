# Eventos
<sub>[http://www.quirksmode.org/js/introevents.html](http://www.quirksmode.org/js/introevents.html)</sub>  
<sub>[http://www.sprymedia.co.uk/article/Visual+Event](http://www.sprymedia.co.uk/article/Visual+Event)</sub>  

- Cada acción (_click_, _change_, …) que ocurre en el navegador es comunicada (a quien quiera escuchar) en forma de **evento**
    Desde Javascript podemos _escuchar_ estos eventos y engancharle una función (_event handler_) que se ejecutará cuando ocurra este evento

![Events](https://raw.github.com/juanmaguitar/training-frontend-docs/master/eventos/img/events.png)

- Cuando hacemos click en un link (`a`), tambien hacemos click en su contenedor (`li`,`ul`), en el `body` y en ultima instancia en el `document`. Esto es lo que se llama la **propagación del evento**

    La [especificación de eventos DOM Level 2](http://www.w3.org/TR/DOM-Level-2-Events/events.html) define que el evento se propaga en 3 fases: _Capturing_, _Target_ y _Bubbling_

    - **Capturing**: El click ocurre en el document y va pasando por todos los elementos
    hasta llegar al link (a)
    - **Bubbling**: El click ocurre en el link (a) y va emergiendo hasta el document.

    Firefox, Opera y Safari implementan las 3 fases pero IE sólo el Bubbling


## Capturando eventos

<sub>[http://ejohn.org/projects/flexible-javascript-events/](http://ejohn.org/projects/flexible-javascript-events/)</sub>  
<sub>[http://www.webmonkey.com/2010/02/javascript_events/](http://www.webmonkey.com/2010/02/javascript_events/)</sub>  
<sub>[http://www.elated.com/articles/events-and-event-handlers/](http://www.elated.com/articles/events-and-event-handlers/)</sub>  
<sub>[http://www.anieto2k.com/2006/10/16/gestion-de-eventos-en-javascript/](http://www.anieto2k.com/2006/10/16/gestion-de-eventos-en-javascript/)</sub>  


function callback(evt) {
// prep work
evt = evt || window.event;
var target = (typeof evt.target !== 'undefined') ? evt.target :
evt.srcElement;
// actual callback work
console.log(target.nodeName);
}
// start listening for click events
if (document.addEventListener){ // FF
document.addEventListener('click', callback, false);
} else if (document.attachEvent){ // IE
document.attachEvent('onclick', callback);
} else {
document.onclick = callback;
}
· Podemos capturar eventos con el modelo tradicional
http://www.quirksmode.org/js/events_tradmod.html
Este modelo consiste en asignar una función a la propiedad onclick, onchange,… del
elemento del DOM
Con este metodo sólo podemos asignar UNA funcion a cada evento
Este metodo funciona igual en TODOS los navegadores
· Tambien podemos capturar eventos con el modelo avanzado
http://www.quirksmode.org/js/events_advanced.html
Con este metodo podemos asignar varias funciones a un mismo evento
Este modelo se aplica distinto según el navegador
Para enganchar/desenganchar una funcion a un evento con este modelo se utiliza:
o addEventListener y removeEventListener en Firefox, Opera y Safari (W3C
way)
https://developer.mozilla.org/en/DOM/element.addEventListener
http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-addEventListener
Le pasamos 3 parametros:
1. Tipo de Evento  click, change,…
2. Funcion a ejecutar (handler, callback)  Recibe un objeto e con info sobre
el evento
En e.target tenemos el elemento que lanzó el evento
http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event
3. ¿Utilizo Capturing?  Poniendolo a false utilizariamos sólo Bubbling
CURSO JAVASCRIPT (Nivel Basico/Intermedio) – SOFTONIC 2011 | JuanMa Garrido – [DIA 5]
12
o attachEvent y detachEvent en IE (Microsoft way)
http://msdn.microsoft.com/en-us/library/ms536343(v=vs.85).aspx
Le pasamos 2 parametros:
1. Tipo de Evento  onclick, onchange,…
2. Funcion a ejecutar (handler, callback)  Para acceder a la info del evento
hay que mirar el objeto global window.event
http://msdn.microsoft.com/en-us/library/ms535863(v=VS.85).aspx
En event.srcElement tenemos el elemento que lanzó el evento
http://msdn.microsoft.com/en-us/library/ms534638%28VS.85%29.aspx
Deteniendo el flujo de los eventos
· Algunos elementos tienen un comportamiento por defecto (por ejemplo al hacer click
sobre un link nos lleva a su URL).
Esta acción por defecto se ejecuta al final (si tenemos otras funciones asignadas al evento)
Para desactivar la acción por defecto utilizamos el metodo e.preventDefault()
https://developer.mozilla.org/en/DOM/event.preventDefault
En IE pondriamos a false la propiedad returnValue de window.event
http://msdn.microsoft.com/en-us/library/ms534372(VS.85).aspx
· Podemos detener la propagacion del evento con el metodo e.stopPropagation()
https://developer.mozilla.org/en/DOM/event.stopPropagation
https://developer.mozilla.org/en/Gecko_DOM_Reference/Examples#Example_5:_Event_Propagation
En IE pondriamos a true la propiedad cancelBubble de window.event
http://msdn.microsoft.com/en-us/library/ms533545(VS.85).aspx
· Cuando la función asignada al evento devuelve false se aplica e.preventDefault() y
e.stopPropagation()
http://stackoverflow.com/questions/1357118/javascript-event-preventdefault-vs-return-false
Delegación de eventos
http://www.anieto2k.com/2009/11/19/gestion-de-eventos-vs-delegacion-de-eventos/
http://blogs.sitepoint.com/javascript-event-delegation-is-easier-than-you-think/
http://lab.distilldesign.com/event-delegation/
· Aprovechando el bubbling y la deteccion del target podemos optimizar (en algunos casos)
nuestra gestión de eventos con la delegación de eventos
· Para el caso en que tengamos que capturar los eventos de muchos elementos (por ejemplo
los clicks en celdas de una tabla), podemos capturar el evento de su contenedor (la tabla)
y detectar luego cual de sus hijos (qué celda) provocó el evento,
CURSO JAVASCRIPT (Nivel Basico/Intermedio) – SOFTONIC 2011 | JuanMa Garrido – [DIA 5]
13
· Las principales ventajas de este sistema son:
o Hay muchas menos definiciones de eventos  menos espacio en memoria y mayor
performance
o No hay que re-capturar los eventos de los elementos añadidos dinamicamente
Eventos con jQuery
http://api.jquery.com/category/events/
http://jqfundamentals.com/book/index.html#chapter-5
· Con jQuery podemos realizar nuestra gestion de eventos sin tener que preocuparnos de
las diferencias entre navegadores:
o $().bind() y $().unbind() El addEventListener/removeEventListener
cross-browsing
http://api.jquery.com/bind/
http://api.jquery.com/unbind/
.bind( eventType, [ eventData ], handler(eventObject) )
.unbind( [ eventType ], [ handler(eventObject) ] )
El handler recibe un objeto event propio de jQuery
http://api.jquery.com/category/events/event-object/
Los tipos de eventos que podemos capturar son blur, focus, focusin,
focusout, load, resize, scroll, unload, click, dblclick,mousedown,
mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave,
change,select, submit, keydown, keypress, keyup, error
Tambien podemos crearnos nuestros propios tipos de eventos
http://api.jquery.com/category/events/event-object/
o $().trigger() Nos permite ejecutar todos los handlers asociados a un evento
http://api.jquery.com/trigger
.trigger( eventType, extraParameters )
o $().toggle() Adjunta varias funciones a un elemento que seran ejecutadas en
sucesivos clicks
http://api.jquery.com/toggle-event/
.toggle( handler(eventObject), handler(eventObject), [ handler(eventObject) ]
)
o $().live() y $().die() Asigna (y elimina) handlers a elementos actuales y
futuros (que se ajusten al selector)
http://api.jquery.com/live/
http://api.jquery.com/die/
CURSO JAVASCRIPT (Nivel Basico/Intermedio) – SOFTONIC 2011 | JuanMa Garrido – [DIA 5]
14
.live( eventType, handler )
.die( eventType, [ handler ] )
¡OJO con la performance al utilizar este metodo!
http://www.ravelrumba.com/blog/event-delegation-jquery-performance/
http://stackoverflow.com/questions/4163949/jquery-performance-selector-live-vs-manually-bindwhen-
working-with-aja
o event.preventDefault()  El e.preventDefault cross-browsing
http://api.jquery.com/event.preventDefault/
o event.stopPropagation()  El e.stopPropagation cross-browsing
http://api.jquery.com/event.stopPropagation/
o event.stopImmediatePropagation()  Además de hacer e.stopPropagation
cross-browsing, detiene el resto de handlers asociados al mismo evento
http://api.jquery.com/event.stopImmediatePropagation/
o event.target  El e.target (elemento que provocó el evento) cross-browsing
http://api.jquery.com/event.target/
o event.type  El tipo de evento lanzado
http://api.jquery.com/event.type/