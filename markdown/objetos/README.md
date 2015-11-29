#Arrays

Un **[array](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array)** es una lista de valores.
Para asignar valores a un array encerramos los elementos entre corchetes ( _array literal notation_ )  
Los elementos de un array _son indexados con números consecutivos a partir de 0_  
Para acceder a un elemento del array especificamos el _índice entre corchetes_

```javascript
var a = [1,2,3];
>>> a[0]
1
>>> a[1]
2
```

Podemos declarar un array vacio asi: `var a = [];`

Para _añadir/actualizar_ un elemento del array:

```javascript
>>> a[2] = 'three';
"three"
>>> a
[1, 2, "three"]
>>> a[3] = 'four';
"four"
>>> a
[1, 2, "three", "four"]
```

Para _eliminar_ un elemento del array podemos utilizar el operador `delete`:

```javascript
>>> var a = [1, 2, 3];
>>> delete a[1];
true
>>> a
[1, undefined, 3]
```

Un array puede contener otros arrays.

```javascript
>>> var a = [1, "two", false, null, undefined];
>>> a
[1, "two", false, null, undefined]
>>> a[5] = [1,2,3]
[1, 2, 3]
>>> a
[1, "two", false, null, undefined, [1, 2, 3]]
```

```javascript
>>> var a = [[1,2,3],[4,5,6]];
>>> a
[[1, 2, 3], [4, 5, 6]]
>>> a[0]
[1, 2, 3]
>>> a[0][0]
1
>>> a[1][2]
6
```

<sub>[http://bonsaiden.github.com/JavaScript-­‐Garden/#array.general](http://bonsaiden.github.com/JavaScript-­‐Garden/#array.general)</sub>

#Objetos

```javascript
var hero = {
  breed: 'Turtle',
  occupation: 'Ninja'
};
```

Un **objeto** es como un array pero donde los índices los definimos nosotros  
Para definir un objeto utilizamos las llaves `{}` ( _object literal notation_ )  
Los elementos de un objeto ( _propiedades_ ) los separamos por comas  
El par _clave/valor_ (key/value) lo dividimos con 2 puntos

Las claves (_keys_, nombres de las propiedades) pueden ir entre comillas, pero _no se recomienda_ definirlas asi

```javascript
var o = {prop: 1};
var o = {"prop": 1};
var o = {'prop': 1};
```

Cuando una propiedad contiene una función, decimos que esta propiedad es un _método del objeto_

```javascript
var dog = {
  name: 'Benji',
  talk: function(){
    alert('Woof, woof!');
  } 
};
```

Hay 2 maneras de acceder a la propiedad de un objeto:

- Con la notación de corchetes: `hero['occupation']`  
- Con la notación de puntos: `hero.occupation`  

Los objetos pueden contener otros objetos

```javascript
var book = {
  name: 'Catch-22',
  published: 1961,
  author: {
    firstname: 'Joseph',
    lastname: 'Heller'
  }
};
>>> book.author.firstname
"Joseph"
>>> book['author']['lastname']
"Heller"
>>> book.author['lastname']
"Heller"
>>> book['author'].lastname
"Heller"
```

Podemos definir un objeto vacio y luego añadirle (y quitarle) propiedades y métodos

```javascript
>>> var hero = {};
>>> typeof hero.breed
"undefined"
>>> hero.breed = 'turtle';
>>> hero.name = 'Leonardo';
>>> hero.sayName = function() {return hero.name;};
>>> hero.sayName();
"Leonardo"
>>> delete hero.name;
true
>>> hero.sayName();
reference to undefined property hero.name
```

Cuando estamos dentro de un método, con `this` hacemos referencia al objeto al que
pertenece ( _“this object”_ )

```javascript
var hero = {
  name: 'Rafaelo',
  sayName: function() {
    return this.name;
  }
}
>>> hero.sayName();
"Rafaelo"
```

<br/>

##Funciones Constructoras

Otra manera de crear objetos es mediante **[funciones constructoras](http://hubpages.com/hub/Creating-­‐JavaScript-­‐Objects-­‐by-­‐Constructor-­‐Function)**
Para crear objetos con estas funciones hay que usar el operador `new`
La ventaja que tiene utilizar estas funciones constructoras es que _aceptan parámetros
al crear objetos_

```javascript
function Hero(name) {
  this.name = name;
  this.occupation = 'Ninja';
  this.whoAreYou = function() {
    return "I'm " + this.name + " and I'm a " + this.occupation;
  }
}

>>> var h1 = new Hero('Michelangelo');
>>> var h2 = new Hero('Donatello');
>>> h1.whoAreYou();
"I'm Michelangelo and I'm a Ninja"
>>> h2.whoAreYou();
"I'm Donatello and I'm a Ninja"
```

Todos los entornos cliente tienen un **objeto global** y todas las variables globales son
propiedades de este objeto global
En el navegador este objeto global se llama `window`

Por lo tanto, podemos acceder a una variable global `a`:

- Como una variable `a`
- Como una propiedad del objeto global: `window[‘a’]` o `window.a`

Si declaramos una función constructora y la llamamos sin `new`

- Devolverá `undefined`
- Todas las propiedades declaradas con `this` se convertirán en propiedades de `window`

```javascript
>>> function Hero(name) {this.name = name;}
>>> var h = Hero('Leonardo');
>>> typeof h
"undefined"
>>> typeof h.name
h has no properties

>>> name
"Leonardo"
>>> window.name
"Leonardo"

>>> var h2 = new Hero('Michelangelo');
>>> typeof h2
"object"
>>> h2.name
"Michelangelo"
```

Hay maneras de [evitar estos "accidentes"](http://www.2ality.com/2013/07/defending-constructors.html) (llamar a un constructor sin `new`) como por ejemplo activar `strict mode`(lanzaria una excepcion en este caso).

Cuando creamos un objeto, se le asigna siempre la propiedad `constructor` que contiene una referencia a la función constructora utilizada para crear el objeto

```javascript
>>> h2.constructor
Hero(name)

>>> var h3 = new h2.constructor('Rafaello');
>>> h3.name;
"Rafaello"

>>> var o = {};
>>> o.constructor;
Object()
>>> typeof o.constructor;
"function"
```

Con el operador `instanceof` podemos chequear si un objeto fue creado con una determinada función constructora

```javascript
>>> function Hero(){}
>>> var h = new Hero();
>>> var o = {};
>>> h instanceof Hero;
true
>>> h instanceof Object;
false
>>> o instanceof Object;
true
```

##Trabajando con Objetos

Otra forma de crear un objeto, es a través de una función que nos devuelva un objeto.

```javascript
function factory(name) {
  return {
    name: name
  };
}
>>> var o = factory('one');
>>> o.name
"one"
>>> o.constructor
Object()
```

Podemos utilizar funciones constructoras y devolver objetos distintos de `this`

```javascript
>>> function C() { this.a = 1; }
>>> var c = new C();
>>> c.a
1
>>> function C2() { this.a = 1; return {b: 2}; }
>>> var c2 = new C2();
>>> typeof c2.a
"undefined"
>>> c2.b
2
```

`new` siempre devolverá un objeto, por lo que si la función constructora devuelve algo diferente a un objeto, la llamada a esa función con `new` seguirá devolviendo el `this` correspondiente

### Copiando Objetos 

Cuando _copiamos_ un objeto o _lo pasamos como parámetro_ a una función, realmente estamos pasando una referencia al objeto.
Si hacemos un cambio a esta referencia, modicaremos también el objeto original

```javascript
>>> var original = { howmany: 1 };
>>> var copy = original;
>>> copy.howmany
1
>>> copy.howmany = 100;
100
>>> original.howmany
100

>>> var nullify = function(o) { o.howmany = 0; }
>>> nullify(copy);
>>> original.howmany
0
```

### Comparando Objetos 

Cuando _comparamos_ un objeto sólo obtendremos `true` si comparamos 2 referencias al mismo objeto

```javascript
>>> var fido = { breed: 'dog' };
>>> var benji = { breed: 'dog' };
>>> benji === fido
false
>>> benji == fido
false
>>> var mydog = benji;
>>> mydog === benji
true
>>> mydog === fido
false
```