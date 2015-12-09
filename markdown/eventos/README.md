# Eventos
<sub>[http://www.quirksmode.org/js/introevents.html](http://www.quirksmode.org/js/introevents.html)</sub>  
<sub>[http://www.sprymedia.co.uk/article/Visual+Event](http://www.sprymedia.co.uk/article/Visual+Event)</sub>  

- Cada acción (_click_, _change_, …) que ocurre en el navegador es comunicada (a quien quiera escuchar) en forma de **evento**
    Desde Javascript podemos _escuchar_ estos eventos y engancharle una función (_event handler_) que se ejecutará cuando ocurra este evento

![Events](https://raw.githubusercontent.com/juanmaguitar/apuntes-javascript-intermedio/master/markdown/eventos/img/events.png)

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

```javascript
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
```

- Podemos capturar eventos con el [_modelo tradicional_](http://www.quirksmode.org/js/events_tradmod.html)

    Este modelo consiste en asignar una función a la propiedad `onclick`, `onchange`,... del elemento del DOM  
    Con este metodo sólo podemos asignar UNA funcion a cada evento  
    Este metodo funciona igual en TODOS los navegadores  

- Tambien podemos capturar eventos con el [_modelo avanzado_](http://www.quirksmode.org/js/events_advanced.html)

    Con este metodo podemos asignar varias funciones a un mismo evento  
    Este modelo se aplica distinto según el navegador  
    Para enganchar/desenganchar una funcion a un evento con este modelo se utiliza:  

###[`addEventListener`](https://developer.mozilla.org/en/DOM/element.addEventListener) y [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.removeEventListener)

Para Firefox, Opera y Safari ([W3C way](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-addEventListener))  

Le pasamos 3 parametros:

1. _Tipo de Evento_ : `click`, `change`,...
2. _Funcion a ejecutar_ (_handler_, _callback_) : Recibe un objeto `e` con info sobre el evento  
    - En `e.target` tenemos el [elemento que lanzó el evento](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event)
3. _¿Utilizo Capturing? _: Poniendolo a `false` utilizariamos sólo _Bubbling_

El [soporte de addEventListener](http://caniuse.com/#feat=addeventlistener) está bastante extendido entre los navegadores mas populares por lo que se recomienda su uso directo.

###[`attachEvent`](http://msdn.microsoft.com/en-us/library/ms536343(v=vs.85).aspx) y [`detachEvent`](http://msdn.microsoft.com/en-us/library/ms536411(v=vs.85).aspx) 

IE (Microsoft way). Versiones de IE anteriores a IE 9 (<=8) utilizan de forma nativa este metodo para capturar eventos
    
Le pasamos 2 parametros:

1. _Tipo de Evento_: `onclick`, `onchange`,...
2. _Funcion a ejecutar_ (_handler_, _callback_): Para acceder a la info del evento hay que mirar el objeto global [`window.event`](http://msdn.microsoft.com/en-us/library/ms535863(v=VS.85).aspx)  
    - En [`event.srcElement`](http://msdn.microsoft.com/en-us/library/ms534638%28VS.85%29.aspx) tenemos el elemento que lanzó el evento

## Deteniendo el flujo de los eventos

- Algunos elementos tienen un comportamiento por defecto (_por ejemplo al hacer click sobre un link nos lleva a su URL_).  
    Esta acción por defecto se ejecuta al final (si tenemos otras funciones asignadas al evento)  
    Para desactivar la acción por defecto utilizamos el metodo [`e.preventDefault()`](https://developer.mozilla.org/en/DOM/event.preventDefault)  
    En IE pondriamos a `false` la propiedad [`returnValue`](http://msdn.microsoft.com/en-us/library/ms534372(VS.85).aspx) de `window.event`

- Podemos detener la [propagacion del evento](https://developer.mozilla.org/en/Gecko_DOM_Reference/Examples#Example_5:_Event_Propagation) con el metodo [`e.stopPropagation()`](https://developer.mozilla.org/en/DOM/event.stopPropagation)  
    En IE pondriamos a `true` la propiedad [`cancelBubble`](http://msdn.microsoft.com/en-us/library/ms533545(VS.85).aspx) de `window.event`

- Cuando [la función asignada al evento devuelve `false`](http://stackoverflow.com/questions/1357118/javascript-event-preventdefault-vs-return-false) se aplica automaticamente `e.preventDefault()` y `e.stopPropagation()`

## Delegación de eventos

<sub>[http://www.anieto2k.com/2009/11/19/gestion-de-eventos-vs-delegacion-de-eventos/](http://www.anieto2k.com/2009/11/19/gestion-de-eventos-vs-delegacion-de-eventos/)</sub>  
<sub>[http://blogs.sitepoint.com/javascript-event-delegation-is-easier-than-you-think/](http://blogs.sitepoint.com/javascript-event-delegation-is-easier-than-you-think/)</sub>  
<sub>[http://lab.distilldesign.com/event-delegation/](http://lab.distilldesign.com/event-delegation/)</sub>  

- Aprovechando el _bubbling_ y la deteccion del _target_ podemos optimizar (en algunos casos) nuestra gestión de eventos con la **delegación de eventos**

- Para el caso en que tengamos que capturar los eventos de muchos elementos (_por ejemplo los clicks en celdas de una tabla_), podemos capturar el evento de su contenedor (_la tabla_) y detectar luego cual de sus hijos (_qué celda_) provocó el evento,

- Las principales ventajas de este sistema son:
    - Hay muchas menos definiciones de eventos: menos espacio en memoria y mayor performance
    - No hay que re-capturar los eventos de los elementos añadidos dinamicamente

## Eventos con jQuery

<sub>[http://api.jquery.com/category/events/](http://api.jquery.com/category/events/)</sub>  
<sub>[http://jqfundamentals.com/book/index.html#chapter-5](http://jqfundamentals.com/book/index.html#chapter-5)</sub>  

- Con _jQuery_ podemos realizar nuestra gestion de eventos sin tener que preocuparnos de las diferencias entre navegadores:

    - [`$().on()`](http://api.jquery.com/on) y [`$().off()`](http://api.jquery.com/off/): El `addEventListener`/`removeEventListener`
cross-browsing

            .on( events [, selector ] [, data ], handler )
            .off( events [, selector ] [, handler ] )

        - El `handler` recibe un objeto [`event`](http://api.jquery.com/category/events/event-object/) propio de jQuery  
        - Los tipos de eventos que podemos capturar son `blur`, `focus`, `focusin`, `focusout`, `load`, `resize`, `scroll`, `unload`, `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`, `mouseenter`, `mouseleave`, `change`, `select`, `submit`, `keydown`, `keypress`, `keyup`, `error`  
        - Tambien podemos crearnos [nuestros propios tipos de eventos](http://api.jquery.com/category/events/event-object/)

    - [`$().trigger()`](http://api.jquery.com/trigger):  Nos permite ejecutar todos los handlers asociados a un evento

            .trigger( eventType, extraParameters )

    - [`$().toggle()`](http://api.jquery.com/toggle-event/): Adjunta varias funciones a un elemento que seran ejecutadas en sucesivos clicks

            .toggle( handler(eventObject), handler(eventObject), [ handler(eventObject) ] )

    - [`event.preventDefault()`](http://api.jquery.com/event.preventDefault/): El `e.preventDefault` cross-browsing
    - [`event.stopPropagation()`](http://api.jquery.com/event.stopPropagation/): El `e.stopPropagation` cross-browsing
    - [`event.stopImmediatePropagation()`](http://api.jquery.com/event.stopImmediatePropagation/): Además de hacer `e.stopPropagation`
cross-browsing, detiene el resto de handlers asociados al mismo evento
    - [`event.target`](http://api.jquery.com/event.target/):  El `e.target` (elemento que provocó el evento) cross-browsing
    - [`event.type`](http://api.jquery.com/event.type/):  El tipo de evento lanzado
