#ECMAScript

##EcmaScript 5

**[ECMAScript5.1](http://www.ecma-international.org/ecma-262/5.1/)** fue lanzado en 2011 y podemos decir que [es el actual standard de Javascript](http://blog.oio.de/2013/04/16/ecmascript-5-the-current-javascript-standard/) (2014).  
Esta version **amplia** el anterior standard (ES3) [con algunas mejoras](http://www.jayway.com/2011/04/05/what-is-new-in-ecmascript-5/):

- [`strict mode`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

  ```javascript
  function() {
    "use strict";
  }
  ```

- [`Object` new methods](http://ejohn.org/blog/ecmascript-5-objects-and-properties/)

  ```javascript
  // Creates an object with parent as prototype and properties from donor
  Object.create(parent, donor);

  // Meta properties of an object
  var descriptor = {
    value: "test",
    writable: true,    // Can the value be changed?
    enumerable: true,  // Will it appear in for-in and Object.keys(object)?
    configurable: true, // Can the property be removed?
    set: function(value) { test = value}, // Getter
    get: function() { return test }       // Setter
  }

  // Methods for manipulation the descriptors
  Object.defineProperty(object, property, descriptor)
  Object.defineProperties(object, descriptors)
  Object.getOwnPropertyDescriptor(object, property)
  Object.getPrototypeOf(object)

  // Returns an array of enumerable properties
  Object.keys(object)
  // Returns an array of all properties
  Object.getOwnPropertyNames(object)

  // Prevents anyone from adding properties to the object, cannot be undone.
  Object.preventExtensions(object)
  Object.isExtensible(object)

  // Prevents anyone from changing, properties or descriptors of the object.
  // The values can still be changed
  Object.seal(object)
  Objcect.isSealed(object)

  // Prevents any changes to the object.
  Object.freeze(object)
  Object.isFrozen(object)
  ```

- [`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

  ```javascript
  var tapir = {
    method: function(name){
      this.name = name;
    }
  };
  setTimeout( tapir.method.bind(tapir, "Malayan"), 100 );
  ```

- [`String.prototype.trim()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)

  ```javascript
  >>> var orig = '   foo  ';
  >>> console.log(orig.trim());
  'foo'
  ```

- [`Array` new methods](http://www.jimmycuadra.com/posts/ecmascript-5-array-methods)

  ```javascript
  // Do all elements satisfy predicate?
  Array.prototype.every(predicate)

  // Return a new array with the elements that satisfy predicate?
  Array.prototype.filter(predicate)

  // Call action(element) for each element.
  Array.prototype.forEach(action)

  // What is the index of the first element that equals value?
  Array.prototype.indexOf(value, fromIndex)

  // What is the index of the last element that equal value?
  Array.prototype.lastIndexOf(value, fromIndex)

  // Create a new array by applying unaryFunc to each element
  Array.prototype.map(unaryFunc)

  // Reduces the elements of the array, by applying binaryFunc
  // between the elements
  // [a0, a1].reduce(+ , seed)  == seed + a0 + a1
  Array.prototype.reduce(binaryFunc, seed)

  // Is at least one element satisfied by the predicate?
  Array.prototype.some(predicate)
  ```

- Native [JSON support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_native_JSON) with [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) and [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 

Si miramos las [estadisticas de uso de navegadores](http://clicky.com/marketshare/global/web-browsers/versions/) junto con la [compatibilidad de estos con ES5](http://kangax.github.io/compat-table/es5/) podemos concluir que: _basandonos en ES5 nuestro codigo funcionará bien en la mayoria de los navegadores utilizados actualmente (2014)_. 

_Si queremos, podemos dar soporte de algunas features de ES5 en navegadores antiguos que no la soporten, utilizando el correspondiente [shim](https://github.com/es-shims/es5-shim) _

## EcmaScript 3

[ECMAScript 3](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf) fue lanzado en 2001 y todos los navegadores ([antiguos](http://www.webdevout.net/browser-support-ecmascript) y modernos) siguen este standard.

## EcmaScript 6

[ECMAScript 6](https://people.mozilla.org/~jorendorff/es6-draft.html) será el proximo standard de Javascript pero [aun no está lo suficientemente implantado](http://kangax.github.io/compat-table/es6/) en los navegadores mas utilizados.

<sub>[https://github.com/ericdouglas/ES6-Learning](https://github.com/ericdouglas/ES6-Learning)</sub>  
<sub>[http://es6rocks.com/](http://es6rocks.com/)</sub>  
<sub>[http://code.tutsplus.com/articles/use-ecmascript-6-today--net-31582](http://code.tutsplus.com/articles/use-ecmascript-6-today--net-31582)</sub>  

Aunque podemos dar soporte de estas features de ES6 en navegadores que no las soporten utilizando el correspondiente [shim](https://github.com/paulmillr/es6-shim/)









