# Scope #

En la creación de una función se define su propiedad (interna) **Scope** que es la lista jerárquica de _todos los Objetos Variable de sus “padres”_ (que estan por encima de su contexto)

_En la llamada a una función_ se crea el **Scope Chain** (cadena de ámbitos) del contexto de ejecución que es: su Objeto de Activación + la propiedad _Scope_ de esta función

La resolución de identificadores ( **Identifier Resolution** ) es el proceso en el cual se determina a qué Objeto Variable dentro de la cadena de ámbitos pertenece una variable determinada

```javascript
var x = 10;
 
function foo() {
  var y = 20;
  function bar() { alert(x + y); }
  return bar;
}
 
foo()(); // 30
```

_Al llamar a la función su Contexto de Ejecución queda asi…_

```
activeExecutionContext = {
  VO: {...}, // or AO
  this: thisValue,
  Scope: [ // Scope chain
  // list of all variable objects
  // for identifiers lookup
  ]
};
```

_donde su Scope seria…_

```
Scope = AO + [[Scope]]
```

_es decir…_

```
Scope = AO + [VO1, VO2, ..., VOn]
```

_donde…_

```
var VO1 = {__parent__: null, ... other data}; -->
var VO2 = {__parent__: VO1, ... other data}; -->
// etc.
```
More info:

- [Scope Chain](http://dmitrysoshnikov.com/ecmascript/chapter-4-scope-chain)
- [Functions Objects and Scope](http://p2pu.org/en/groups/javascript-101/content/week2/)
- [Javascript Scope and Binding](http://alternateidea.com/blog/articles/2007/7/18/javascript-scope-and-binding)
- [Functions and functions scope](https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope)

<br/>

## Ciclo de vida de una Función ##

```javascript
var x = 10;
  
function foo() {
  var y = 20;

  function bar() {
    var z = 30;
    alert(x +  y + z);
  }

  bar();
}
  
foo(); // 60
```

Partimos del objeto global ya creado, que además es la Variable Objeto del Contexto Global…

```
globalContext.VO === Global = {
  x: 10
  foo: <reference to function>
};
```

_En la creación de “foo”, la propiedad "Scope" de “foo” es…_

```
foo.[[Scope]] = [
  globalContext.VO
];
```

_En la activación de “foo” (al llamar a la función, al entrar en su contexto) , el objeto de activación del contexto “foo” es…_

```
fooContext.AO = {
  y: 20,
  bar: <reference to function>
};
```

_Y el Scope Chain del contexto “foo” queda…_

```
fooContext.Scope = fooContext.AO + foo.[[Scope]] // i.e.:
 
fooContext.Scope = [
  fooContext.AO,
  globalContext.VO
];
```

_En la creación de la función interna “bar” su _Scope_ es…_

```
bar.[[Scope]] = [
  fooContext.AO,
  globalContext.VO
];
```

_En la activación de “bar”, el objeto de activación del contexto “bar” es…_

```
barContext.AO = {
  z: 30
};
```

_Y el Scope Chain de “bar” queda…_

```
barContext.Scope = barContext.AO + bar.[[Scope]] // i.e.:
 
barContext.Scope = [
  barContext.AO,
  fooContext.AO,
  globalContext.VO
];
```

_Asi, la resolución de identificadores para “x”, “y” y “z” se haría asi…_

```
- "x"
-- barContext.AO // not found
-- fooContext.AO // not found
-- globalContext.VO // found - 10
```

```
- "y"
-- barContext.AO // not found
-- fooContext.AO // found - 20
```

```
- "z"
-- barContext.AO // found – 30
```






