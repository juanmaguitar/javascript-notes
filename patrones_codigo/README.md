# Patrones de Código

Estos patrones ayudan a organizar el código, a mejorar su performance, a la creación de objetos y a aplicar características perdidas en JS como _“propiedades privadas”_

## Separación de capas

- Las 3 capas de una página web son 
    - Content (HTML)
    - Presentation (CSS)
    - Behavior (JavaScript)

- Estas capas deben estar lo más separadas posibles, es decir no debemos tocar directamente desde una capa elementos pertenecientes a otra capa.

    Esto, en la capa de comportamiento (Javascript) significa:
    - Evitar los tags `<script>` dentro del marcado (o usar los menos posibles)
    - Evitar attributos inline en las etiquetas como `onclick`, `onmouseover` etc.. (mejor capturar el evento desde un archivo externo utilizando los métodos `addEventListener` o `attachEvent)
    - No alterar directamente propiedades del CSS (en todo caso, añadir o quitar clases)
    - Añadir dinámicamente el marcado que no tenga sentido con el Javascript desactivado
    - Que el código JS quede en archivos *.js separados que incluyamos en la página

## Namespaces
_[creación de objetos]_

- Debemos evitar el uso de variables globales para minimizar las posibles colisiones de nombres de variable.

- Una manera de hacer esto es utilizando un **Namespace**, es decir, creando un único objeto global y haciendo que todas las variables y funciones que necesitemos sean propiedades de este objeto

```javascript
// global namespace
var MYAPP = MYAPP || {};
// sub-object
 MYAPP.event = {};
// object together with the method declarations
MYAPP.event = {
    addListener: function(el, type, fn) {
        // .. do the thing
    },
    removeListener: function(el, type, fn) {
        // ...
    },
    getEvent: function(e) {
        // ...
    }
    // ... other methods or properties
};
MYAPP.dom = {};
MYAPP.dom.style = {};
```

- Podemos crear un método que nos ayude con la creación de elementos en el Namespace

```javascript
var MYAPP = MYAPP || {};
MYAPP.namespace = function(name){
    var parts = name.split('.');
    var current = MYAPP;
    for (var i in parts) {
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
}
>>> typeof (MYAPP.dom.style) === "object"
TypeError: MYAPP.dom is undefined
>>> MYAPP.namespace('dom.style')
>>> typeof (MYAPP.dom.style) === "object"
true
```

## Init-time branching
_[performance]_

- Cuando sabemos que cierta condición no va a cambiar durante la ejecución del programa, podemos hacer que nuestro código evalué esa condición una sola vez (durante la carga del programa) y que devuelva funciones “customizadas” según estas condiciones (ej.- _Feature Detection_)

```javascript
var MYAPP = {};
MYAPP.event = {
    addListener: null,
    removeListener: null
};

if (typeof window.addEventListener === 'function') {
    MYAPP.event.addListener = function(el, type, fn) {
        el.addEventListener(type, fn, false);
    };
    MYAPP.event.removeListener = function(el, type, fn) {
        el.removeEventListener(type, fn, false);
    };
} else if (typeof document.attachEvent === 'function'){ // IE
    MYAPP.event.addListener = function(el, type, fn) {
        el.attachEvent('on' + type, fn);
    };
    MYAPP.event.removeListener = function(el, type, fn) {
        el.detachEvent('on' + type, fn);
    };
} else { // older browsers
    MYAPP.event.addListener = function(el, type, fn) {
        el['on' + type] = fn;
    };
    MYAPP.event.removeListener = function(el, type, fn) {
        el['on' + type] = null;
    };
};
```

## Lazy Definition 
_[performance]_

- La Lazy Definition es muy parecida al Init-time branching, con la diferencia es que aquí la “customización” se realiza solo cuando se llama a la función por primera vez

```javascript
var MYAPP = {};
MYAPP.myevent = {
    addListener: function(el, type, fn){
        if (typeof el.addEventListener === 'function') {
            MYAPP.myevent.addListener = function(el, type, fn) {
                el.addEventListener(type, fn, false);
            };
        } else if (typeof el.attachEvent === 'function'){
            MYAPP.myevent.addListener = function(el, type, fn) {
                el.attachEvent('on' + type, fn);
            };
        } else {
            MYAPP.myevent.addListener = function(el, type, fn) {
                el['on' + type] = fn;
            };
        }
        MYAPP.myevent.addListener(el, type, fn);
    } 
};
```

## Objeto de Configuración
_[creación de objetos]_

- Cuando una función necesita muchos parámetros (más de 3 por ejemplo) es una buena idea agruparlos en un objeto de configuración y utilizar éste como único parámetro (las propiedades del objeto serán los parámetros).  

- Algunas ventajas de utlizar un objeto de configuracion son:  
    - El orden no importa  
    - Puedes setear sólo los parámetros que necesites  
    - La función queda más escalable  
    - El código queda más legible (los nombres de las propiedades están presentes en la llamada)  


```javascript
// a constructor that creates buttons
var MYAPP = {};
MYAPP.dom = {};
MYAPP.dom.Button = function(text, conf) {
    var type = conf.type || 'submit';
    var font = conf.font || 'Courier';
    var color = conf.color || 'white';
    var b = document.createElement('input');

    b.type = type;
    b.font = font;
    b.color = color;
    b.value = text;
    return b; 
}

document.body.appendChild(new MYAPP.dom.Button('puuush'));
var config = {
    font: 'Arial, Verdana, sans-serif',
    color: 'white'
};

var oMyButton = new MYAPP.dom.Button('puuush', config);
document.body.appendChild(oMyButton);
var oMyButton2 = new MYAPP.dom.Button('puuush', {color: 'red'});
document.body.appendChild(oMyButton2);
```

## Propiedades y Métodos Privados 
_[creación de objetos]_

- Podemos definir propiedades/metodos privados en un objeto (aunque Javascript no tenga una sintaxis especial para ello) usando variables locales en la función constructora

```javascript
var MYAPP = {};
MYAPP.dom = {};
MYAPP.dom.Button = function(text, conf) {
    // private property
    var _styles = {
        font: 'Verdana',
        border: '1px solid black',
        color: 'black',
    };
    // private method
    function _setStyles() {
        for (var i in _styles) {
            b.style[i] = conf[i] || _styles[i];
        }
    }
    conf = conf || {};
    var b = document.createElement('input');
    b.type = conf['type'] || 'submit';
    b.value = text;
    _setStyles();
    return b; 
};

var oMyButton = new MYAPP.dom.Button('puuush', {color: 'blue'});
document.body.appendChild(oMyButton);
```

Para mejorar la legibilidad las variables/métodos privados se marcan con “_” delante del nombre 

## Métodos Privilegiados 
_[creación de objetos]_

<sup>[http://www.crockford.com/javascript/private.html](http://www.crockford.com/javascript/private.html)</sup>

- Metodos Privilegiados (según Douglas Crockford) son métodos públicos que pueden acceder a métodos o propiedades privadas
Actuan de filtro para hacer accesible alguna funcionalidad privada pero de una manera controlada
Son los metodos que definimos en la función constructora como parte del this, a diferencia de los metodos definidos en el prototipo.

```javascript
var Person = function(options){
    //private properties
    var _name = options.name
    var _birthYear = options.birthYear;
    //private method
    var _calculateAge = function(){
        var today = new Date();
        return today.getFullYear() - _birthYear;
    }
    //Privileged methods
    this.getAge = function(){
        return _calculateAge(); //calling private method
    }
    this.getName = function(){
        return _name.toUpperCase(); //return private variable filtered
    }
}
    
//new Person instance
var myPerson = new Person( {name:'Peter', birthYear:1983} );
>>> myPerson.getAge() === 29
true
>>> myPerson.name === 'Peter'
false
>>> myPerson.name === undefined
true
>>> myPerson.getName() === 'PETER'
true
```

## Funciones Privadas como Métodos Públicos (Revealing Module Pattern )

_[creación de objetos]_

<sup>[http://www.crockford.com/javascript/private.html](http://www.crockford.com/javascript/private.html)  </sup>
<sup>[http://blog.alexanderdickson.com/javascript-revealing-module-pattern](http://blog.alexanderdickson.com/javascript-revealing-module-pattern)</sup>  
<sup>[http://blog.davidlitmark.com/post/6009004931/an-introduction-to-the-revealing-module-pattern](http://blog.davidlitmark.com/post/6009004931/an-introduction-to-the-revealing-module-pattern)</sup>  

- Si queremos mantener intacta una función para nuestro “código interno”, pero también queremos dar visibilidad externa a esa función, podemos asignar esa función a una propiedad pública.
A este patrón tambien se le conoce como **Revealing Module Pattern** 

```javascript
    var MYAPP = {};
    MYAPP.dom = (function(){
      var _setStyle = function(el, prop, value) {
        return 'setStyle';
};
      var _getStyle = function(el, prop) {
        return 'getStyle';
};
      return {
        setStyle: _setStyle,
        getStyle: _getStyle,
        yetAnother: _setStyle
}; })()
    MYAPP.dom.setStyle = function(){ return ‘Hey, Ho, Let’s Go!!’ };
    >>> MYAPP.dom.setStyle() === 'Hey, Ho, Let’s Go!!'
    true
    >>> MYAPP.dom.yetAnother() === 'setStyle'
    true
```


## Funciones Inmediatas 
_[creación de objetos]_

- Otro patrón útil para crear objetos es utilizar una función anónima que devuelva un objeto y ejecutarla inmediatamente
De esta manera las variables dentro de la función son locales (declaradas con var) y son destruidas cuando la función termina (siempre que no formen parte de un closure)

```javascript
var MYAPP = {};
MYAPP.dom = (function() {
    // initialization code...
    function _private() { console.log('_private'); }
    // ... body }
    return {
        getStyle: function(el, prop) {
            console.log('getStyle');
            _private();
        },
        setStyle: function(el, prop, value) {
            console.log('setStyle');
        }
    };
})();
```

Otra manera de crear objetos es ejecutar directamente la función anónima y desde dentro hacer las asignaciones que correspondan.
Podemos pasarle parámetros a esta función inmediata (normalmente relacionadas con el entorno) y hacer nuestro código más rápido y robusto 

<sup>[http://markdalgleish.com/2011/03/self-executing-anonymous-functions/](http://markdalgleish.com/2011/03/self-executing-anonymous-functions/)</sup>

```javascript
var MYAPP = {};
(function(global, doc, ns, $, _undefined_){
  console.log ( window === global);
  console.log ( document === doc );
  console.log ( ns === MYAPP );
  console.log ( $ === jQuery );
  ns.existClass = (function () {
    if (doc.getElementsByClassName) {
      return function(sClassName) {
        return doc.getElementsByClassName(sClassName).length > 0;
      } 
    }
    else {
      return function(sClassName) {
        return $("*").hasClass(sClassName);
      }
    } 
  })();
})(window, document, MYAPP, jQuery);

MYAPP.existClass('hidden');
MYAPP.existClass('___hidden____');
```


... si te estas preguntando para qué se define el parámetro _undefined_ prueba esto en Safari:

<sup>[http://javascriptweblog.wordpress.com/2010/08/16/understanding-undefined-and-preventing-referenceerrors/](http://javascriptweblog.wordpress.com/2010/08/16/understanding-undefined-and-preventing-referenceerrors/)</sup>  
<sup>[http://docs.jquery.com/JQuery_Core_Style_Guidelines#Type_Checks](http://docs.jquery.com/JQuery_Core_Style_Guidelines#Type_Checks)</sup>  

```javascript
undefined = 5;
(function( _undefined_ ){
  console.log ( undefined === _undefined_ );
  console.log ( typeof(undefined) === "undefined" );
  console.log ( typeof(_undefined_) === "undefined" );
  console.log ( myVar === undefined );
  console.log ( myVar === _undefined_ ); // this is faster
  console.log ( typeof(myVar) === "undefined" );
})();
```

## Memoization 
_[performance]_

<sup>[http://addyosmani.com/blog/faster-javascript-memoization/](http://addyosmani.com/blog/faster-javascript-memoization/)</sup>  
<sup>[http://philogb.github.com/blog/2008/09/05/memoization-in-javascript/](http://philogb.github.com/blog/2008/09/05/memoization-in-javascript/)</sup>  

- Esta técnica se utiliza para cachear resultados de operaciones costosas.
- Si no se ha realizado aun la operación, se realiza y se guarda en caché (objeto o array) con un identificador único
- Si ya se ha realizado, se devuelve el resultado directamente de la caché 

```javascript
var hasClassName = (function(){
  var cache = { };
  return function(element, className) {
    var re = (cache[className] ||
    (cache[className] = new RegExp('(?:^|\\s)' + className + '(?:\\s|$)') ));
    return re.test(element.className);
  }; 
})();
```


## Patrón Modulo 
_[creación de objetos]_

<sup>[http://www.yuiblog.com/blog/2007/06/12/module-pattern/](http://www.yuiblog.com/blog/2007/06/12/module-pattern/)</sup>

- La idea del patrón modulo es la de encapsular la lógica privada y exponer solamente de terminados métodos “público”.
Se aplica utilizando funciones autoejecutables que devuelven objetos

```javascript
var functionUtils = (function(){
  /* private `slice` method */
  function slice(arrayLike, index) {
    return Array.prototype.slice.call(arrayLike, index || 0);
  }
  return {
    /* exposed, public `bind` method */
    bind: function(fn, thisArg) {
      var args = slice(arguments, 2);
      return function() {
        return fn.apply(thisArg, args.concat(slice(arguments)));
      };
    } 
  };
})();
```

## Patrón Sandbox 
_[creación de objetos]_

<sup>[https://github.com/shichuan/javascript-patterns/blob/master/object-creation-patterns/sandbox.html](https://github.com/shichuan/javascript-patterns/blob/master/object-creation-patterns/sandbox.html)</sup>

- El patrón Sandbox soluciona dos problemas que hay con el patrón Namespce :
  - No se pueden crear 2 versiones de la misma aplicación en la misma página ya que todo cuelga del mismo objeto global (`MYAPP`)
  - Largas rutas a resolver (y que escribir) para acceder a los metodos
(`MYAPP.utilities.array)

- El patrón Sandbox utiliza una función constructora global, en vez de un objeto “estático” global.
- Al pasarle una función `fpCallback` a este constructor, se creará un objeto (box) donde esta función `fpCallback` tendrá disponible los metodos que necesita.

```javascript
function Sandbox() {
  // turning arguments into an array
  var args = Array.prototype.slice.call(arguments),
       // the last argument is the callback
       callback = args.pop(),
       // modules can be passed as an array or as individual parameters
       modules = (args[0] && typeof args[0] === "string") ? args : args[0], i;

  // make sure the function is called
  // as a constructor
  if (!(this instanceof Sandbox)) {
    return new Sandbox(modules, callback);
  }

  // add properties to `this` as needed:
  this.a = 1;
  this.b = 2;

  // now add modules to the core `this` object
  // no modules or "*" both mean "use all modules"
  if (!modules || modules == '*') {
    modules = [];
    for (i in Sandbox.modules) {
      if (Sandbox.modules.hasOwnProperty(i)) {
        modules.push(i);
      }  
    }
  }

  // initialize the required modules
  for (i = 0; i < modules.length; i += 1) {
    Sandbox.modules[modules[i]](this);
  }
  // call the callback
  callback(this);
}

// any prototype properties as needed
Sandbox.prototype = {
  name:"My Application",
  version:"1.0",
  getName:function () {
    return this.name;
  }
};
Sandbox.modules = {};
Sandbox.modules.dom = function (box) {
  box.getElement = function () {};
  box.getStyle = function () {};
  box.foo = "bar";
};
Sandbox.modules.event = function (box) {
  // access to the Sandbox prototype if needed:
  // box.constructor.prototype.m = "mmm";
  box.attachEvent = function () {};
  box.detachEvent = function () {};
};
Sandbox.modules.ajax = function (box) {
  box.makeRequest = function () {};
  box.getResponse = function () {};
};
// how to use
Sandbox(['ajax', 'event'], function (box) {
  console.log(box);
});
Sandbox('ajax', 'dom', function (box) {
  console.log(box);
});
Sandbox('*', function (box) {
  console.log(box);
});
```
