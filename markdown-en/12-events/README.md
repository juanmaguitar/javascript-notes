# Events

<sub>[http://www.quirksmode.org/js/introevents.html](http://www.quirksmode.org/js/introevents.html)</sub>  
<sub>[http://www.sprymedia.co.uk/article/Visual+Event](http://www.sprymedia.co.uk/article/Visual+Event)</sub>  

- Every action (_click_, _change_, …) happening in the browser is comunicated (to whom wants to listend) in the form of an **event**
    From Javascript we can _escuchar_ these events and associate a function (_event handler_) that will be executed when the event occurs

![Events](https://raw.githubusercontent.com/juanmaguitar/javascript-notes/master/markdown-en/12-events/img/events.png)

- When we click in a link (`a`), we also do click in its container (`li`,`ul`), in the `body` and finally in the `document`. This is what is called **event propagation**

## Capturing events

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

- We can capture events with the [_traditional model_](http://www.quirksmode.org/js/events_tradmod.html)

    This model consist on assign a function to the property `onclick`, `onchange`,... of the DOM element  
    With this method we can assign only ONE function to each event
    This method works the same in ALL the browsers  

- We can also capture events with the [_advanced model_](http://www.quirksmode.org/js/events_advanced.html)

    With this method we can assign several functions to the same event  
    To link/unlink a function to an event with this model we can use:  

###[`addEventListener`](https://developer.mozilla.org/en/DOM/element.addEventListener) y [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.removeEventListener)

We pass 2 parameters:

1. _Event type_ : `click`, `change`,...
2. _Function to execute_ (_handler_, _callback_) : Receive an object `e` with info about the event  
    - In `e.target` we have the [element that triggered the event](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event)

The [support of addEventListener](http://caniuse.com/#feat=addeventlistener) is pretty extended among the the most popular browsers so its direct use is recommended.

## Stopping the flow of the events

- Some elements has a default behaviour (_for example when we click on a link the page loads its URL_).  
    This default action is executed at the end of the queue (if we have other functions assigned to the event)  
    To deactivate the default action we can use the method [`e.preventDefault()`](https://developer.mozilla.org/en/DOM/event.preventDefault)  

- We can stop the [event propagation](https://developer.mozilla.org/en/Gecko_DOM_Reference/Examples#Example_5:_Event_Propagation) with the method [`e.stopPropagation()`](https://developer.mozilla.org/en/DOM/event.stopPropagation)  
- When [the function assigned to the event returns `false`](http://stackoverflow.com/questions/1357118/javascript-event-preventdefault-vs-return-false) the methods `e.preventDefault()` & `e.stopPropagation()` are automatically applied

## Events delegation

<sub>[http://blogs.sitepoint.com/javascript-event-delegation-is-easier-than-you-think/](http://blogs.sitepoint.com/javascript-event-delegation-is-easier-than-you-think/)</sub>  
<sub>[http://lab.distilldesign.com/event-delegation/](http://lab.distilldesign.com/event-delegation/)</sub>  

- By taking advantage of the _event propagation_ and the detection of the target_ we can optimize (in some cases) our events management with the **event s delegation**

- For the case we have to capture the events of lots of elements (_for example the clicks of the cells in a table_), we can capture the event of the container (_the table_) and detect which one of its children (_which cell_) triggered the event,

- Main advantages of this system are:
    - Much less events definitions: less memory space and better performance
    - No need of re-capturing events for the elements dinamically added

## jQuery events

<sub>[http://api.jquery.com/category/events/](http://api.jquery.com/category/events/)</sub>  
<sub>[http://jqfundamentals.com/book/index.html#chapter-5](http://jqfundamentals.com/book/index.html#chapter-5)</sub>  

- With _jQuery_ we can do our events management without being worried about the differences between browsers:

    - [`$().on()`](http://api.jquery.com/on) y [`$().off()`](http://api.jquery.com/off/): The cross-browsing `addEventListener`/`removeEventListener`

            .on( events [, selector ] [, data ], handler )
            .off( events [, selector ] [, handler ] )

        - The `handler` receives an object [`event`](http://api.jquery.com/category/events/event-object/) exclusive of jQuery  
        - The event types we can capture are `blur`, `focus`, `focusin`, `focusout`, `load`, `resize`, `scroll`, `unload`, `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`, `mouseenter`, `mouseleave`, `change`, `select`, `submit`, `keydown`, `keypress`, `keyup`, `error`  
        - We can also create [our own event type](http://api.jquery.com/category/events/event-object/)

    - [`$().trigger()`](http://api.jquery.com/trigger):  Allow us to execute all handlers associated to an event

            .trigger( eventType, extraParameters )

    - [`$().toggle()`](http://api.jquery.com/toggle-event/): Attach several functions to an element that will be executed in several clicks

            .toggle( handler(eventObject), handler(eventObject), [ handler(eventObject) ] )

    - [`event.preventDefault()`](http://api.jquery.com/event.preventDefault/): The cross-browsing `e.preventDefault`
    - [`event.stopPropagation()`](http://api.jquery.com/event.stopPropagation/): The cross-browsing `e.stopPropagation`
    - [`event.stopImmediatePropagation()`](http://api.jquery.com/event.stopImmediatePropagation/): Besides doing cross-browsing `e.stopPropagation`, it stops the rest of handlers associated to the same event
    - [`event.target`](http://api.jquery.com/event.target/):  The cross-browsing `e.target` (element that triggered the event) 
    - [`event.type`](http://api.jquery.com/event.type/):  The type of event launched
