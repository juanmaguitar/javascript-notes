#Arrays

An **[array](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array)** is a list of values.
To assign values to an array we close the elements between brackets ( _array literal notation_ )  
Elements of an array _are indexed with consecutive numbers starting from 0_  
To access an element of an array we specify the _index between brackets_

```javascript
var a = [1,2,3];
>>> a[0]
1
>>> a[1]
2
```

We can declare an empty array like this: `var a = [];`

To _add/update_ an element of an array:

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

To _remove_ an element of an array we can use the operator `delete`:

```javascript
>>> var a = [1, 2, 3];
>>> delete a[1];
true
>>> a
[1, undefined, 3]
```

An array can contain other arrays.

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

# Objects

```javascript
var hero = {
  breed: 'Turtle',
  occupation: 'Ninja'
};
```

An **objeto** is like an array but where we define the indexes
To define an object we use the braces `{}` ( _object literal notation_ )  
The elements of an object ( _properties_ ) are separated by commas  
The pair _key/value_ is splitted by 2 dots

The _keys_ (names of the properties) can go between quotes, but _is not recommended_ define them in this way

```javascript
var o = {prop: 1};
var o = {"prop": 1};
var o = {'prop': 1};
```

When a property contains a function, we say this property is a _method of the object_

```javascript
var dog = {
  name: 'Benji',
  talk: function(){
    alert('Woof, woof!');
  } 
};
```

There are 2 ways of accesing the property of an object:

- with the brackets notation: `hero['occupation']`  
- with the dots notation: `hero.occupation`  

Objects can contain other objects

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

We can define an empty object and then add (and remove) its properties and methods

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

When we are inside of a method, the special keyword `this` points to the object that _owns_ the method ( _“this object”_ )

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

## Constructor Functions

Another way of creating objects is by using **[constructor functions](http://hubpages.com/hub/Creating-­‐JavaScript-­‐Objects-­‐by-­‐Constructor-­‐Function)**
To create objects w/ these functions we have to use the operator `new`
The advantage these constructor functions have is that they accept parameters for the creation of the objects

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

All the javascript environments have a **global object** and all the global variables are properties of this global object
In the browser this global object is called `window`

So, we can access a global variable `a`:

- As a variable `a`
- As a property of the global object: `window[‘a’]` or `window.a`

If we declare a constructor function and we call it without `new`

- It will return `undefined`
- All the properties are declared with `this` will become properties of `window`

```javascript
>>> function Hero(name) { this.name = name; }
>>> var h = Hero('Leonardo');
>>> typeof h
"undefined"
>>> typeof h.name
Uncaught TypeError: Cannot read property 'name' of undefined(…)

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

There are ways of [avoiding these "accidents"](http://www.2ality.com/2013/07/defending-constructors.html) (call a constructor function without `new`) like for example activating [`"strict mode"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) (it'll throw an exception in this case).

When we create an object, is always assigned to it the property `constructor` that contains a reference to the constructor function used to create the object

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

With the operator `instanceof` we can check if an object was created by a specific constructor function

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

## Working with Objects

Another way of creating an object is by using a function that returns an object

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

We can use constructor functions and return objects different than `this`

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

`new` will always return an object, that's why if the constructor function returns something different than an object, the call to that function with `new` will continue returnin the proper `this`

### Copying Objects

When we _copy_ an object or _we pass it as a parameter_ of a function, we're really passing a reference to that object.
If we do a change to this reference, we will also modify the original object

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

### Comparing Objects

When we _compare_ objects we will only obtain `true` if we compare 2 references to the same object

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