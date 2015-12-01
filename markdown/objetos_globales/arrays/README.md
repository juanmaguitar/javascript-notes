#[Array](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array)

## Métodos basicos de Array

###[concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

`concat()` crea _otro array_ a partir de uno ya existente añadiendole los elementos que se le pasen 

```javascript
>>> var items = [1,2]
>>> items.concat(3,4,5)
[1, 2, 3, 4, 5]
>>> items.concat(3,4,5,'string',undefined)
[1, 2, 3, 4, 5, "string", undefined]
>>> items.concat([3,4,5],[6,7],[8,9])
[1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> items.concat([3,4,5],[6,7,[8,9,10]])
[1, 2, 3, 4, 5, 6, 7, [8,9,10]]
```

[concat w/ forEach example](https://jsbin.com/kicawe/1/edit?js,console)

###[join()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/join)

`join()` devuelve una cadena (string) con los valores de los elementos del array 

```javascript
>>> var a = ['Wind', 'Rain', 'Fire'];
>>> a.join();
"Wind,Rain,Fire"
>>> a.join(" - ");
"Wind - Rain - Fire"
>>> typeof ( a.join(" - ") )
"string"
```

###[indexOf()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf)

`indexOf()` devuelve el primer indice donde se encuentra un elemento en el array o -1 si no lo encuentra

```javascript
>>> var a = ['Wind', 'Rain', 'Fire'];
>>> a.indexOf('Rain');
1
>>> a.indexOf('Earth');
-1
>>> a.indexOf('rain');
-1
>>> a.indexOf('Rain',2);
1
```

###[push()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/push)

`push()` inserta elementos al final del array  
`a.push('new')` es lo mismo que `a[a.length] = 'new'`  
`push()` devuelve el tamaño del array modificado  

```javascript
>>> var sports = ['soccer', 'baseball'];
>>> sports
["soccer", "baseball"]
>>> sports.length
2
>>> sports.push('football', 'swimming');
4
>>> sports
["soccer", "baseball", "football", "swimming"]
```

###[pop()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/pop)

`pop()` elimina el ultimo elemento   
`a.pop()` es lo mismo que `a.length--`;  
`pop()` devuelve el elemento eliminado  

```javascript
>>> var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
>>> myFish
["angel", "clown", "mandarin", "sturgeon"]
>>> myFish.pop();
"sturgeon"
>>> myFish
["angel", "clown", "mandarin"]
```

###[sort()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/sort)

ordena el array y devuelve el array modificado  
si no se le pasa función como parametro ordena por orden ASCII  
si se le pasa función como parametro
- `compare(a, b)` → -1  → a,b
- `compare(a, b)` → 1   → b,a (switch)
- `compare(a, b)` → 0   → a,b (do nothing)

```javascript
>>> var fruit = ['apples', 'bananas', 'Cherries'];
>>> fruit
["apples", "bananas", "Cherries"]
>>> fruit.sort();
["Cherries", "apples", "bananas"]

>>> var scores = [1, 2, 10, 21];
>>> scores
[1, 2, 10, 21]
>>> scores.sort()
[1, 10, 2, 21]
```

```javascript
>>> var numbers = [4, 2, 42, 36, 5, 1, 12, 3];
>>> numbers
[4, 2, 42, 36, 5, 1, 12, 3]
>>> numbers.sort()
[1, 12, 2, 3, 36, 4, 42, 5]
>>> numbers.sort( function(a, b) { return a - b; } );
[1, 2, 3, 4, 5, 12, 36, 42]
```

```javascript
function compare(a, b) {
  if (a is less than b by some ordering criterion) {
    return -1; // a comes first
  }
  if (a is greater than b by the ordering criterion) {
    return 1; // b comes first
  }
  // a must be equal to b
  return 0; // no changes
}
```

###[slice()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/slice)

`slice()` devuelve un trozo del array  sin modficar el original 

```javascript
>>> var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
>>> var citrus = fruits.slice(1, 3);
>>> fruits
["Banana", "Orange", "Lemon", "Apple", "Mango"]
>>> citrus
["Orange", "Lemon"]
>>> fruits.slice(1)
["Orange", "Lemon", "Apple", "Mango"]
>>> fruits.slice(1).slice(1)
["Lemon", "Apple", "Mango"]
>>> fruits.slice(-1)
["Mango"]
>>> fruits.slice(-2)
["Apple", "Mango"]
>>> fruits.slice(1,-1)
["Orange", "Lemon", "Apple"]
```

###[splice()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice)

`splice()` quita un trozo del array, lo devuelve  y opcionalmente rellena el hueco con nuevos elementos 

```javascript
>>> var myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

>>> myFish
["angel", "clown", "mandarin", "surgeon"]
>>> var removed = myFish.splice(2, 1);

>>> myFish
["angel", "clown", "surgeon"]
>>> removed
["mandarin"]

>>> var removed = myFish.splice(2, 0, 'drum');
>>> myFish
["angel", "clown", "drum", "surgeon"]
>>> removed
[]
```

## Métodos de Array como Higher Order Functions

<sub>[Functional Programming in JavaScript | YouTube Videos](https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)</sub>  
<sub>[Higher Order Function | Medium](https://medium.com/functional-javascript/higher-order-functions-78084829fff4#.ka4840l1e)</sub>  
<sub>[Functional Programming | Book](http://shop.oreilly.com/product/0636920028857.do)</sub>  
<sub>[Higher-Order Functions and Function Binding | Explained exercise](http://clarkfeusier.com/2015/01/11/interview-question-function-bind.html)</sub>

Las [Higher Order Functions](http://eloquentjavascript.net/05_higher_order.html) son aquellas funciones que aceptan otras funciones como parametros o que devuelven funciones ([o las 2 cosas](http://jtfmumm.com/blog/2013/08/31/nested-higher-order-functions-in-javascript/)). Son aquellas funciones que tratan a otras funciones como valores (de entrada o de salida)

#### [Programación Funcional](https://www.safaribooksonline.com/library/view/functional-javascript/9781449360757/ch04.html)

Existe un paradigma de programación llamado [programación funcional](https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4#.iv40wrzzg) que entre otras cosas se basa en:

- El uso/creación de [funciones puras](hhttp://www.nicoespeon.com/en/2015/01/pure-functions-javascript/)
- La [composición de funciones](http://nodegeek.net/2014/06/24/function-composition/)

Este estilo de programación nos deja un código más corto, más facil de leer y de testear

```javascript
function double(x) { return x*2; };

[1,2,3,4,5].map(double); // => [2,4,6,8,10]
```

```javascript

function sum(total, item) { return total + item; };

[15, 30, 20].reduce(reducer, 0); // => 65

```

Aplicados a javascript, unos principios basicos y practicos de esta [programación funcional](http://www.smashingmagazine.com/2014/07/dont-be-scared-of-functional-programming/) podrian ser:

- Todas tus funciones deben aceptar al menos 1 argumento
- Todas tus funciones deben devolver un valor u otra funcion
- No for-loops

#### Higher Order Functions

Los arrays disponen [a traves de su prototipo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods_2) de algunas _higher order functions_  MUY utilizadas. Son entre otras:

###[forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

`forEach()` nos permite ejecutar una función sobre cada elemento del array

```javascript
function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element);
}

// Note elision, there is no member at 2 so it isn't visited
[2, 5, , 9].forEach(logArrayElements);
// logs:
// a[0] = 2
// a[1] = 5
// a[3] = 9
[]
```


### [pluck()](http://underscorejs.org/#pluck), [zip()](http://underscorejs.org/#zip), [reject()](http://underscorejs.org/#reject), [groupBy()](https://lodash.com/docs#groupBy), [sample()](https://lodash.com/docs#sample), [chunk()](https://lodash.com/docs#chunk), [flatten()](https://lodash.com/docs#flatten)...

Utilizando librerias externas (como [underscore](http://underscorejs.org/#collections) o [lodash](https://lodash.com/docs)) tendremos disponibles en nuestro código muchas más _higher order functions_ que nos facilitaran el trabajo

