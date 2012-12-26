#El valor de _this_

El valor `this` es una propiedad del _Contexto de Ejecución_

```
activeExecutionContext = {
  VO: {...},
  this: thisValue
};
```

El valor de `this` queda determinado al entrar en el contexto de ejecución (al llamar a la
función) y _no se puede cambiar mientras el código está corriendo en el contexto_

El _valor de `this` en el Código Global_ es siempre el _Objeto Global_

```javascript
// explicit property definition of
// the global object
this.a = 10; // global.a = 10
alert(a); // 10

// implicit definition via assigning
// to unqualified identifier
b = 20;
alert(this.b); // 20

// also implicit via variable declaration
// because variable object of the global context
// is the global object itself
var c = 30;
alert(this.c); // 30
```

El valor de `this` en el Código de Función depende de cómo se llame a esta función

<br/>

##En una función global

Cuando se llama a una función que está **a nivel de programa**, el valor de su `this` corresponde al objeto global

```javascript
function f1(){
  return this;
}
>>> f1() === window; // global object
true
```

_Nota: En ECMASCRIPT 5 el valor de `this` no se convierto al global cuando es `null` o `undefined`_

```javascript
function f2(){
  "use strict"; // see strict mode
  return this;
}
>>> f2() === undefined;
true
```

More info:

- [Strict Mode and why you should use it](http://cjihrig.com/blog/javascripts-­‐strict-­‐mode-­‐and-­‐why-­‐you-­‐should-­‐use-­‐it/)
- [ECMAScript 5 support in Mozilla](https://developer.mozilla.org/en/JavaScript/ECMAScript_5_support_in_Mozilla)
- [ECMA 262](http://www.ecma-­‐international.org/publications/files/ECMA-­‐ST/Ecma-­‐262.pdf)

<br/>

##En un método de un objeto

Cuando una función es llamada como **método de un objeto**, su this se corresponde con el objeto sobre el que se la llama

```javascript
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};
>>> o.f() === 37
true
```

```javascript
var o = {prop: 37};
function independent() {
  return this.prop;
}
o.f = independent;
>>> o.f() === 37
true
```

_… la manera en que se define el método no afecta al valor de `this`_

```javascript
o.b = {g: independent, prop: 42};
>>> o.b.g() === 42
true
```

_… a `this se le asigna el objeto más “cercano“ (la referencia más inmediata)_

<br/>

##En un metodo de un prototipo

Si el método pertenece a un objeto que está **en la cadena de prototipos**, su `this` también se corresponderá con el objeto sobre el que se le llama

```javascript
var Class = function (){}
Class.prototype.f = function(){ return this.a + this.b; };

var oInstance = new Class();
oInstance.a = 1;
oInstance.b = 4;

>>> oInstance.f() === 5
true
```

<br/>

##En una función constructora

Si la función se utiliza como constructor (con `new`), su `this` apuntará al nuevo objeto creado

```javascript
function Class(){ this.a = 37; }
var o = new Class ();

>>> o.a === 37
true

function Class2(){ this.a = 37; return {a:38}; }
o = new Class2 ();

>>> o.a === 38
true
```

```javascript
function Hero(name) {
  this.name = name;
  this.occupation = 'Ninja';
  this.whoAreYou = function() {
    return "I'm " + this.name + " and I'm a " + this.occupation;
  }
}

var h1 = new Hero('Michelangelo');
var h2 = new Hero('Donatello');

>>> h1.whoAreYou() === "I'm Michelangelo and I'm a Ninja"
true
>>> h2.whoAreYou() === "I'm Donatello and I'm a Ninja"
true

>>> h1.occupation = "Turtle Ninja Super Hero";
>>> h1.whoAreYou() === "I'm Michelangelo and I'm a Turtle Ninja Super Hero"
true
```

<br/>

##Utilizando _call_ o _apply_

Si en la llamada a la función utilizamos `call` o `apply`, podemos asociar `this` a un objeto determinado (que pasaremos como parámetro)

```javascript
function add(c, d){
  return this.a + this.b + c + d;
}

var o = {a:1, b:3};

// The first parameter is the object to use as 'this', subsequent
// parameters are passed as arguments in the function call
>>> add.call(o, 5, 7) === 16; // 1 + 3 + 5 + 7 = 16
true

// The first parameter is the object to use as 'this', the second is an array whose
// members are used as the arguments in the function call
>>> add.apply(o, [10, 20]) === 34 // 1 + 3 + 10 + 20 = 34
true
```

<br/>

##Utilizando _bind_

Tambien podemos hacer un [`bind`](http://www.robertsosinski.com/2009/04/28/binding-­‐scope-­‐in-­‐javascript/) a una función y asociarle de forma permanente como `this` el objeto que queramos (que utilizará siempre, independientemente de cómo se la llame)

```javascript
Function.prototype.bind = function(scope) {
  var _function = this;
  return function() {
    return _function.apply(scope, arguments);
  }
}

alice = {
  name: "alice"
}

eve = {
  name: "eve",
  talk: function(greeting) {
    return (greeting + ", my name is " + this.name);
  }.bind(alice) // <- bound to "alice"
}

>>> eve.talk("hello") === "hello, my name is alice"
true
>>> eve.talk.call({name:"paco"},"HOLA") === "HOLA, my name is alice"
true
```

<br/>

##En una función asociada a un evento

Cuando una función se utiliza como _event handler_, su `this queda asociado al elemento que provoca el evento

```javascript
// When called as a listener, turns the related element blue
function bluify(e){
  this.style.backgroundColor = '#A5D9F3';
  e.preventDefault();
}

// Get a list of every link in the document
var elements = document.getElementsByTagName('a');

// Add bluify as a click listener so when the element is clicked on,
// it turns blue
for(var i=0 ; i<elements.length ; i++){
  elements[i].addEventListener('click', bluify, false);
}
```

More info:

- [value of this](http://www.quirksmode.org/js/this.html)
