# Objetos Globales

- Son los objetos que tenemos disponibles en el ámbito global (objetos primitivos)

- Los podemos dividir en 3 grupos
    - _Objetos contenedores de datos_:  Object, Array, Function, Boolean, Number
    - _Objetos de utilidades_: Math, Date, RegExp
    - _Objetos de errores_: Error


##[Object](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object)

-  **Object** es el padre de todos los objetos Javascript, es decir, cualquier objeto hereda de él

- Para crear un objeto vacio podemos usar:
    - La notacion literal :  `var o = {}`
    - La funcion constructora Object():  `var o = new Object();`

- Un objeto contiene las siguientes propiedades y metodos:
    - La propiedad [`o.constructor`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/constructor) con la función constructora
    - El método [`o.toString()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/toString) que devuelve el objeto en formato texto
    - El método [`o.valueOf()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/ValueOf) que devuelve el valor del objeto (normalmente o)

```javascript
>>> var o = new Object();
>>> o.toString()
“[object Object]”

>>> o.valueOf() === o
true
```

##[Array](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array)

- Para crear arrays podemos usar:
    - La notacion literal :  `var a = []`
    - La funcion constructora Array():  `var o = new Array();`

- Podemos pasarle parametros al constructor `Array()`
    - Varios parametros: Seran asignados como elementos al array
    - Un numero: Se considerará el tamaño del array

```javascript
>>> var a = new Array(1,2,3,'four');
>>> a;
[1, 2, 3, "four"]

>>> var a2 = new Array(5);
>>> a2;
[undefined, undefined, undefined, undefined, undefined]
```

- Como los arrays son objetos tenemos disponibles los metodos y propiedades del padre `Object()`

```javascript
>>> typeof a;
"object"

>>> a.toString();
"1,2,3,four"
>>> a.valueOf()
[1, 2, 3, "four"]
>>> a.constructor
Array()
```
- Los arrays disponen de la propiedad [`length`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/length)  

    - Nos devuelve el tamaño del array (numero de elementos)
    - Podemos  modificarlo y cambiar el tamaño del array

```javascript
>>> a[0] = 1; 
>>> a.prop = 2; 

>>> a.length
1
>>> a.length = 5
5
>>> a
[1, undefined, undefined, undefined, undefined]

>>> a.length = 2;
2
>>> a
[1, undefined]
```
  
  
Los arrays disponen de unos cuantos metodos interesantes:

- `push()`
- `pop()`
- `sort()`
- `join()`
- `slice()`
- `splice()`

```javascript
>>> var a = [3, 5, 1, 7, 'test'];

>>> a.push('new') 
6
>>> a 
[3, 5, 1, 7, "test", "new"]

>>> a.pop() 
"new"
>>> a 
[3, 5, 1, 7, "test"]

>>> var b = a.sort();
>>> b
[1, 3, 5, 7, "test"]
>>> a
[1, 3, 5, 7, "test"]

>>> a.join(' is not ');
"1 is not 3 is not 5 is not 7 is not test"

>>> b = a.slice(1, 3);
[3, 5]
>>> a
[1, 3, 5, 7, "test"]

>>> b = a.splice(1, 2, 100, 101, 102);
[3, 5]
>>> a
[1, 100, 101, 102, 7, "test"]
```

[>>> more about arrays methods](https://github.com/juanmaguitar/apuntes-javascript-intermedio/tree/master/markdown/objetos_globales/arrays)

##[Function](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function)

- Las funciones son objetos
- Podemos crear funciones con la función constructora `Function()` (aunque este metodo no se recomienda ya que internamente hace un _eval()_ )

Ejemplo:
```javascript
>>> function sum(a, b) {return a + b;};
>>> sum(1, 2)
3
>>> var sum = function(a, b) {return a + b;};
>>> sum(1, 2)
3
>>> var sum = new Function('a', 'b', 'return a + b;');
>>> sum(1, 2)
3
```

- Las funciones disponen de las siguientes propiedades:
    - La propiedad `constructor` que contiene una referencia a la funcion constructora _Function()_ 
    - La propiedad [`length`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/length) que contiene el numero de parametros que acepta la función 
    - La propiedad [`caller`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/caller) (no standard) que contiene una referencia a la funcion que llamó a esta función 
    - La propiedad [`prototype`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/prototype) que contiene un objeto.  
        - Sólo es util cuando utilizamos una funcion como constructora.  
        - Todos lo objetos creados con una función constructora mantienen una referencia a su propiedad `prototype` y pueden usar sus propiedades como si fueran propias.

```javascript
>>> function myfunc(a){ return a; }
>>> myfunc.constructor
Function()

>>> function myfunc(a, b, c){ return true; }
>>> myfunc.length
3

>>> function A(){ return A.caller; }
>>> function B(){ return A(); }
>>> B()
B()
```

```javascript
var some_obj = { 
  name: 'Ninja', 
  say: function(){ 
    return 'I am a ' + this.name; 
  }
}
>>> function F(){} 
>>> typeof F.prototype 
"object"
>>> F.prototype = some_obj;
>>> var obj = new F();
>>> obj.name 
"Ninja"
>>> obj.say() 
"I am a Ninja"
```

- Las funciones disponen de los siguientes métodos:
    - El método `toString()` que devuelve el código fuente de la función
    - Los métodos [`call()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/call) y [`apply()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/apply) que ejecutan metodos de otros objetos especificando el contexto (especificamos un `this` diferente)
        - Estos dos métodos hacen lo mismo pero el formato en que reciben los argumentos es diferente

```javascript
>>> function myfunc(a, b, c) {return a + b + c;}
>>> myfunc.toString()
"function myfunc(a, b, c) { 
return a + b + c; 
}" 
```

```javascript
var some_obj = { 
  name: 'Ninja', 
  say: function(who){ 
    return 'Haya ' + who + ', I am a ' + this.name; 
  }
}
>>> some_obj.say('Dude'); 
"Haya Dude, I am a Ninja"

>>> my_obj = {name: 'Scripting guru'};
>>> some_obj.say.call(my_obj, 'Dude'); 
"Haya Dude, I am a Scripting guru"

some_obj.someMethod.apply(my_obj, ['a', 'b', 'c']);
some_obj.someMethod.call(my_obj, 'a', 'b', 'c');
```


- Las funciones disponen del objeto `arguments` que (ademas de `length`) tiene la propiedad `callee` que contiene una referencia a la funcion llamada (a si misma)

```javascript
>>> function f(){return arguments.callee;}
>>> f() 
f()
```

```javascript
( 
  function(count){ 
    if (count <= 5) { 
      console.log(count); 
      arguments.callee(++count); 
    } 
  }
)(1)
```

##[Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean)

- El objeto _Boolean_ es un contenedor para un valor de tipo booleano  
  Podemos crear objetos _Boolean_ con la función constructora `Boolean()`

Ejemplo:
```javascript
>>> var b = new Boolean();
>>> typeof b 
"object"
>>> typeof b.valueOf() 
"boolean"
>>> b.valueOf() 
false
```

- La función `Boolean` usada como función normal (sin `new`) nos devuelve el valor pasado como parametro convertido a booleano

Ejemplo:
```javascript
>>> Boolean("test") 
true
>>> Boolean("") 
false
>>> Boolean({}) 
true
```

##[Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number)

- La función `Number()` puede ser usada:
    - Cómo una _función normal_ para convertir valores a número
    - Cómo una _función constructora_ (con `new`) para crear objetos
- Los objetos número disponen de los métodos: [`toFixed()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toFixed), [`toPrecision()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toPrecision) y [`toExponential()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toExponential)

Ejemplo:
```javascript
>>> var n = new Number(123.456)
>>> n.toFixed(1) 
"123.5"

>>> (12345).toExponential() 
"1.2345e+4"
```

- El método [`toString()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toString) de un objeto numero nos permite transformar un numero a una base determinada 

Ejemplo:
```javascript
>>> var n = new Number(255);
>>> n.toString(); 
"255"
>>> n.toString(10); 
"255"
>>> n.toString(16); 
"ff"
>>> (3).toString(2); 
"11"
>>> (3).toString(10); 
"3"
```

##[String](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String)

- Podemos crear objetos String con la función constructora `String()`  
  Un objeto _String_ NO es un dato de tipo primitivo string (`valueOf()`)

Ejemplo:
```javascript
>>> var primitive = 'Hello';
>>> typeof primitive; 
"string"
>>> var obj = new String('world');
>>> typeof obj; 
"object"

>>> Boolean("") 
false
>>> Boolean(new String("")) 
true
```

- Un objeto string es parecido a un array de caracteres:
    - Cada carácter tiene una posición indexada
    - Tiene disponible la propiedad length

Ejemplo:
```javascript
>>> obj[0] 
"w"
>>> obj[4] 
"d"
>>> obj.length 
5
```

- Aunque los métodos pertenezcan al objeto String, podemos utilizarlos también directamente en datos de tipo primitivo string (se crea el objeto internamente)

Ejemplo:
```javascript
>>> "potato".length 
6
>>> "tomato"[0] 
"t"
>>> "potato"["potato".length - 1] 
"o"
```

- Los objetos string disponen de los siguientes métodos:
    - [`toUpperCase()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/toUpperCase)  devuelve el string convertido a mayúsculas
    
    - [`toLowerCase()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/toLowerCase)  devuelve el string convertido a minusculas
    
    - [`charAt()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/charAt)  devuelve el carácter encontrado en la posición indicada
    
    - [`indexOf()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/indexOf) busca una cadena de texto en el string y devuelve la posición donde la encuentra
        - Si no encuentra nada devuelve -1 
    
    - `lastIndexOf()` empieza la búsqueda desde el final de la cadena  
        - Si no encuentra nada devuelve -1 
    
    Por tanto la manera de correcta de chequear si existe una cadena de texto en otra es →  `if ( s.toLowerCase().indexOf('couch') !== -1 ) {...}`

    - [`slice()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/slice) devuelve un trozo de la cadena de texto 

    - [`split()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/split) transforma el string en un array utilizando un string como separador 

    - [`concat()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/concat) une strings

```javascript
>>> var s = new String("Couch potato");
>>> s.toUpperCase() 
"COUCH POTATO"
>>> s.toLowerCase() 
"couch potato"
>>> s.charAt(0); 
"C"
>>> s.indexOf('o') 
1
>>> s.lastIndexOf('o') 
11
>>> s.slice(1, 5) 
"ouch"
>>> s.split(" ") 
["Couch", "potato"]
>>> s.concat("es") 
"Couch potatoes"
```

##[Math](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math)

- _Math_ es un objeto con propiedades y métodos para usos matemáticos
    No es constructor de otros objetos

- Algunos métodos interesantes de Math son:
    - [`random()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/random)  genera números aleatorios entre 0 y 1

    - [`round()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/round), [`floor()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/floor) y [`ceil()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/ceil) para redondear numeros  

    - [`min()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/min) y [`max()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/max)  devuelven el minimo y el máximo de una serie de números pasados como parametros

    - [`pow()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/pow) y [`sqrt()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/sqrt)  devuelve la potencia y la raíz cuadrada respectivamente 

##[Date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date)

- `Date()` es una función constructora que crea objetos Date  
    Podemos crear objetos Date nuevo pasándole:
    - _Nada_ (tomará por defecto la fecha actual) 
    - _Una fecha_ en formato texto
    - _Valores separados_ que representan: Año, Mes (0-11), Dia (1-31), Hora (0-23), Minutes (0-59), Segundos(0-59) y Milisegundos (0-999)
    - Un valor _timestamp_


Ejemplo (Firebug muestra el resultado del metodo toString sobre un objeto date):
```javascript
>>> new Date() 
Tue Jan 08 2008 01:10:42 GMT-0800 (Pacific Standard Time) 
>>> new Date('2009 11 12') 
Thu Nov 12 2009 00:00:00 GMT-0800 (Pacific Standard Time)
>>> new Date(2008, 0, 1, 17, 05, 03, 120) 
Tue Jan 01 2008 17:05:03 GMT-0800 (Pacific Standard Time)
>>> new Date(1199865795109) 
Wed Jan 09 2008 00:03:15 GMT-0800 (Pacific Standard Time)
```

- Algunos métodos para trabajar con objetos Date son:

    - [`setMonth()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/setMonth) y [`getMonth()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/getMonth) escriben y leen el mes en un objeto date respectivamente (lo mismo hay para year, day, hours, minutes, etc…)


    - [`parse()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/parse)  dado un string, devuelve su timestamp

    - [`UTC()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/UTC)  produce un timestamp dados un año, mes, dia, etc..

    - [`toDateString()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/toDateString)  devuelve el contenido de un objeto date en formato americano

Ejemplo:
```javascript
>>> var d = new Date();
>>> d.toString(); 
"Wed Jan 09 2008 00:26:39 GMT-0800 (Pacific Standard Time)"
>>> d.setMonth(2); 
1205051199562
>>> d.toString(); 
"Sun Mar 09 2008 00:26:39 GMT-0800 (Pacific Standard Time)"
>>> d.getMonth(); 
2

>>> Date.parse('Jan 1, 2008') 
1199174400000
>>> Date.UTC(2008, 0, 1) 
1199145600000

>>> var d = new Date(2012, 5, 20);
>>> d.getDay(); 
3
>>> d.toDateString(); 
"Wed Jun 20 2012"
```