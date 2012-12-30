# Contexto de Ejecución #

Hay 3 Tipos de Código Ejecutable en ECMAScript:

- **Código Global**: El código que está a nivel de Programa. No incluye el código que está dentro de las funciones
- **Código de Función**: El código dentro de una función
- **Código de Eval**: El código dentro de una expresión `eval`

Cuando alguno de estos tipos de código se ejecuta, lo hace dentro de un **Contexto de Ejecución**

Los contextos de ejecución forman una pila.  
_Es decir, primero se ejecutará código global en su propio contexto de ejecución, este código puede llamar a una función que se ejecutará en su propio contexto de ejecución, y así sucesivamente_  
Con cada nueva invocación a una función se entra en un nuevo contexto de ejecución  

More info

- [Activation Object & Variable Object](http://perfectionkills.com/understanding-delete/#activation_object_variable_object)
- [Execution Contexts](http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/)
- [Functions and Execution Contexts](http://blog.tuenti.com/dev/functions-and-execution-contexts-in-javascript-2/)

<br/>

## Objeto Variable (Variable Object) ##

```
AbstractVO (generic behavior of the variable instantiation process)
║
╠══> GlobalContextVO
║ (VO === this === global)
║
╚══> FunctionContextVO
(VO === AO, <arguments> object and <formal parameters> are added)
```

Cada contexto de ejecución tiene lo que se llama un **Objeto Variable**.

Las variables ( `var`, VariableDeclaration), _funciones_ (FunctionDeclaration, FD) y _parámetros_ formales de la función declaradas en el contexto son añadidas como propiedades de este _Objeto Variable_

### En un código global ###

_Cuando se entra en el contexto de ejecución de un Código Global_, se utiliza un _Objeto Global_ como Objeto Variable.

```
VO(globalContext) === global;
```

El **Objeto Global** es el objeto que se crea antes de entrar en ningún contexto de ejecución. Sus propiedades son accesibles desde cualquier parte del código, y existe durante la ejecución del programa.

```
/* remember that `this` refers to global object when in global scope */
var GLOBAL_OBJECT = this;
var foo = 1;
GLOBAL_OBJECT.foo; // 1
foo === GLOBAL_OBJECT.foo; // true
function bar(){}
typeof GLOBAL_OBJECT.bar; // "function"
GLOBAL_OBJECT.bar === bar; // true
```

```
>>> var a = 'test'
>>> a === 'test' // directly, is found in VO(globalContext): "test"
true
>>> window === this
true
>>> window['a'] === 'test' // indirectly via global===VO(globalContext):
true
>>> a === this.a
true
>>> var aKey = 'a';
>>> window[aKey] === 'test' // indirectly, with dynamic property name: "test"
true
```

### En un código de función ###

_Cuando se entra en el contexto de ejecución de un Código de Función_, se utiliza un _Objeto de Activación (AO)_ como Objeto Variable.

```
VO(functionContext) === AO;
```
Un **Objeto de Activación** es creado al entrar en el contexto de una función e inicializado con la propiedad `arguments` (objeto `arguments` con las propiedades `callee` y `length`)

More info:

- [Objeto de Activación](http://interglacial.com/javascript_spec/a-10.html#a-10.1.6)

```javascript
function foo(x, y, z) {
  
  // quantity of defined function arguments (x, y, z)
  console.log(foo.length == 3); // true
 
  // quantity of really passed arguments (only x, y)
  console.log(arguments.length === 2); // true
 
  // reference of a function to itself
  console.log(arguments.callee === foo); // true
  
  // parameters sharing
  console.log(x === arguments[0]); // true
  console.log(x === 10); // true
  
  arguments[0] = 20;
  console.log(x === 20); // true
  
  var x = 30;
  console.log(arguments[0] === 30); // true
  
  // however, if we don’t pass and argument z
  // related index-property of the arguments
  // is not ‘linked’ with z 
  
  var z = 40;
  console.log(arguments[2] === undefined); // true
  console.log(z === 40); // true
  
  arguments[2] = 50;
  console.log(arguments[2] === 50); // true
  
  console.log(arguments); 
  console.log(arguments[2]);
  
}

foo(10, 20);
```

More info:

- [Variable Object](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object)
- [Execution context within JavaScript (Variable/Activation Object)](https://gist.github.com/1525419)

<br/>

## Fases de Procesamiento del Código ##

El procesamiento del código (al llamar a una función) se divide principalmente en 2 fases:

1. La entrada en el Contexto de Ejecución (preparamos el terreno)
2. La ejecución del Código

### 1. Al entrar en el Contexto de Ejecución ###

_Al entrar en el Contexto de Ejecución_ (pero antes de la ejecución del código), el _Objeto Variable_ se rellena con las siguientes propiedades (y en este orden):

1. Para cada **Parámetro Formal** de la función (si estamos en el contexto de ejecución de una función)

    - Se crea una propiedad en el _Objeto Variable_ con el mismo nombre y valor que el parámetro formal
    - Si no se le pasa el parámetro a la función, se crea una propiedad en el _Objeto Variable_ con el mismo nombre y con valor _undefined_

2. Para cada **Declaración de Función** (FunctionDeclaration, FD)

    - Se crea una propiedad en el _Objeto Variable_ con el mismo nombre y con su correspondiente objeto-función como valor
    - Si el _Objeto Variable_ ya contiene una propiedad con el mismo nombre, se reemplaza su valor y atributos
    
3. Para cada Declaración de Variable (var, VariableDeclaration)

    - Se crea una propiedad en el _Objeto Variable_ con el nombre de la variable y con el valor _undefined_
    - Si el _Objeto Variable_ ya contiene una propiedad con el mismo nombre, esta declaración de variable _NO reemplaza su valor_
    
Ejemplo:

```javascript
function test(a, b) {
  var c = 10;
  function d() {}
  var e = function _e() {};
 (function x() {});
}
test(10); // call
```

… al entrar en el contexto de la function `test` con el parámetro pasado 10, el _Objeto de Activación_ queda asi:

```
AO(test) = {
  a: 10,
  b: undefined,
  c: undefined,
  d: <reference to FunctionDeclaration "d">
  e: undefined
};
```

### 2. Al empezar la Ejecución del Código ###

_Al empezar la Ejecución del Código_ el Objeto de Activación (Objeto Variable) ya está relleno con sus propiedades (aunque no todas ellas tienen los valores reales pasados, la mayoría tienen el valor inicial `undefined` ):

_… en el ejemplo anterior el Objeto de Activación (AO/VO) se modificaría asi durante la interpretación del código_

```
AO['c'] = 10;
AO['e'] = <reference to FunctionExpression "_e">;
```

Otro Ejemplo:

```javascript
(function () {
  
  console.log (typeof(x) === 'function'); // true 
  
  var x = 10; 
  console.log (x === 10); // true 
  
  x = 20; 
  function x() {} 
  
  console.log (x === 20); // true
  
}())
```

_… al entrar en el Contexto de Ejecución_

```
VO = {};
VO['x'] = <reference to FunctionDeclaration "x">
// found var x = 10;
// if function "x" would not be already defined
// then "x" be undefined, but in our case
// variable declaration does not disturb
// the value of the function with the same name
VO['x'] = <the value is not disturbed, still function>
```

_… y al ejecutar el código_

```
VO['x'] = 10;
VO['x'] = 20;
```

<br/>

## Tipos de Funciones ##

Una **Function Declaration (FD)** es una función que:

- Tiene un nombre obligatorio
- En el código puede aparecer a nivel raíz o en el _cuerpo de otra función_
- Se guardan en el _Objeto Variable_ del _Contexto de Ejecución_   (es decir, en tiempo de ejecución ya están disponibles)

```javascript
foo();

function foo() {
  alert('foo');
}
```

Una **Function Expression (FE)** es una función que:

- Puede tener un nombre opcional
- En el código sólo puede aparecer en la _posición de una expresión_
- Su definición no afecta al _Objeto Variable_ del _Contexto de Ejecución_
- Se crea en tiempo de ejecución

```javascript
var foo = function () {
  alert('foo');
};

foo();
```

```javascript
// in parentheses (grouping operator) can be only an expression
(function foo() {});
// in the array initialiser – also only expressions
[function bar() {}];
// comma also operates with expressions
1, function baz() {};
```

_… pese a que una FE puede tener nombre, las distinguimos de una FD en que las FE sólo puede estar en la posición de una expresión_

```javascript
// FE is not available neither before the definition
// (because it is created at code execution phase),
alert(foo); // "foo" is not defined
(function foo() {});
// nor after, because it is not in the VO
alert(foo); // "foo" is not defined
```

_… las FE son creadas en tiempo de ejecución_

```javascript
var foo = {};

(function initialize() {
  var x = 10;
  foo.bar = function () {
    alert(x);
  };
})();

foo.bar(); // 10;
alert(x); // "x" is not defined
```

Si queremos llamar a una función directamente desde su definición y la función no está en una _expression position_, tendremos que [encerrarla entre paréntesis](http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/#question-about-surrounding-parentheses)

Con esto, lo que hacemos en transformar manualmente la función en una _Function Expression (FE)_

```javascript
(function foo(x) {
  alert(x);
})(1); // OK, it's a call, not a grouping operator, 1
```

```javascript
1, function () {
  alert('anonymous function is called');
}();

// or this one
!function () {
  alert('ECMAScript');
}();

// and any other manual
// transformation
```

_… en el caso en que la función ya esté en una expression position, no hacen falta los paréntesis_

More info:

- [Functions](http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/)
- [Understanding Delete](http://perfectionkills.com/understanding-delete/#activation_object_variable_object)
- [Functions and Scope](https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope)

<br/>

## Hoisting ##

Se le llama **Hoisting** al efecto particular que tiene el intérprete interno de separar la definición de una variable en _declaración e inicializacion_, y de “mover” las declaraciones al principio de la función (aplicandoles el valor `undefined`)

```javascript
var joe = “plumber”
// var joe <- declaración
// joe = “plumber” <- inicializacion
```

Este efecto es particular de javascript y puede producir efectos “inesperados”

```javascript
var myvar = 'my value';
(function() {
  alert(myvar);
  var myvar = 'local value';
})();
// que valor devolverá el alert??
```

Es por esto, que se considera una buena practica en Javascript declarar todas las variables al principio de la función

More info:

- [Hoisting Explained](http://net.tutsplus.com/tutorials/javascript-ajax/quick-tip-javascript-hoisting-explained/)
- [Hoisting en Javascript](http://www.etnassoft.com/2010/12/26/hoisting-en-javascript/)
