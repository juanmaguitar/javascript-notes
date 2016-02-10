#[Array](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array)

## Basic Methods of Array

###[concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

`concat()` creates _another array_ from another that already exists adding to it the elements passed as parameters

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

`join()` returns a string with the values of the elements in the array 

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

`indexOf()` returns the first index where an element is found or returns -1 if is not found

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

`push()` insert elements at the end of the array  
`a.push('new')` is the same than `a[a.length] = 'new'`  
`push()` returns the size of the array updated  

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

`pop()` removes the last element  
`a.pop()` is the same than `a.length--`;  
`pop()` returns the removed element  

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

sort the array and returns the modified array  
  - if a function is not passed as a parameter it will order the array based in the ASCII codes  
  - if a function is passed as a paramter
    * `compare(a, b)` → -1  → a,b
    * `compare(a, b)` → 1   → b,a (switch)
    * `compare(a, b)` → 0   → a,b (do nothing)

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

`slice()` returns a piece of the array without modifying the original

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

`splice()` removes a piece of the array, it returns it and optionally fill in the gap with new elements

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

## Array methods as Higher Order Functions

<sub>[Functional Programming in JavaScript | YouTube Videos](https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)</sub>  
<sub>[Higher Order Function | Medium](https://medium.com/functional-javascript/higher-order-functions-78084829fff4#.ka4840l1e)</sub>  
<sub>[Functional Programming | Book](http://shop.oreilly.com/product/0636920028857.do)</sub>  
<sub>[Higher-Order Functions and Function Binding | Explained exercise](http://clarkfeusier.com/2015/01/11/interview-question-function-bind.html)</sub>

[Higher Order Functions](http://eloquentjavascript.net/05_higher_order.html) are those functions that accept other functions as parameters or those that return functions([or both](http://jtfmumm.com/blog/2013/08/31/nested-higher-order-functions-in-javascript/)). They are the functions that treat other functions as values (enter or exit)

#### [Functional Programming](https://www.safaribooksonline.com/library/view/functional-javascript/9781449360757/ch04.html)

There's a programming paradigm called [functional programming](https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4#.iv40wrzzg) that is based in (among other things):

- The use/creation of [pure functions](http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/)
- The [function composition](http://nodegeek.net/2014/06/24/function-composition/)

<sub>[Compose Yourself: Fun with Functions | Talk Slides](http://scott.sauyet.com/Javascript/Talk/Compose/2013-05-22/)</sub>  
<sub>[Functional Programming | Talk Slides](http://scott.sauyet.com/Javascript/Talk/FunctionalProgramming/)</sub>

This programming style let a code that is cleaner, shorter and more easy to read and test

```javascript
function double(x) { return x*2; };

[1,2,3,4,5].map(double); // => [2,4,6,8,10]
```

```javascript

function sum(total, item) { return total + item; };

[15, 30, 20].reduce(reducer, 0); // => 65

```

Applied to javascript, some basic and practical principles of this [functional programming](http://www.smashingmagazine.com/2014/07/dont-be-scared-of-functional-programming/) could be:

- All your functions should accepts at least 1 argument
- All your functions should return a value or another function
- No for-loops

#### Higher Order Functions

Arrays have available [from their prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods_2) some _higher order functions_  VERY used. They're among others:

###[forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

`forEach()` allow us to execute a function over every elmement of the array

    arr.forEach(callback[, thisArg])

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

###[map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

`map()` returns _a new array_ with the result of calling a function provided as an argument over every element of the array

    arr.map(callback[, thisArg])

```javascript
function double(element /*, index, array*/ ) {
  //console.log('a[' + index + '] = ' + element);
  return element * 2;
}

// Note elision, there is no member at 2 so it isn't visited
>>> [2, 5, 3, 9].map(double);
[4, 10, 6, 18]
```

###[filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

`filter()` returns a new array with those elements that pass the _test_ (return `true` when applying the function on them) in the function passed as a paramenter

    arr.filter(callback[, thisArg])

```javascript
function isMoreThan5(element /*, index, array */) {
  //console.log('a[' + index + '] = ' + element);
  return element >= 5;
}

>>> var groupMoreThan5 = [2, 5, 3, 9].filter(isMoreThan5);
>>> groupMoreThan5
[5, 9]
```

###[every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

`every()` return true if _ALL_ the elements of the array pass the test provided as a parameter (they all return `true` when we apply the function on them)

    arr.every(callback[, thisArg])

```javascript
function isMoreThan5(element /*, index, array */) {
  //console.log('a[' + index + '] = ' + element);
  return element >= 5;
}

>>> console.log ( [2, 5, 3, 9].every(isMoreThan5) )
false
>>> console.log ( [22, 5, 33, 9].every(isMoreThan5) )
true
```

###[some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

`some()` return true if _SOME_ element of the array pass the provided test as a parameter (one or more return `true` when we apply the function on them)

    arr.some(callback[, thisArg])

```javascript
function isMoreThan5(element /*, index, array */) {
  //console.log('a[' + index + '] = ' + element);
  return element >= 5;
}

>>> console.log ( [2, 5, 3, 9].some(isMoreThan5) )
true
>>> console.log ( [1, 2, 3, 4].some(isMoreThan5) )
false
```


###[reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

`reduce()` applies a function recursively over an _accumulator_ and over every item if the array (from left to right) until getting a _unique value_

    arr.reduce(callback[, initialValue])

```javascript
function sumElements(acc, current /*, index, array */) {
  //console.log(acc + ' | ' + current + ' | ' + index + ' | ' + array);
  return acc + current;
};

// Note elision, there is no member at 2 so it isn't visited
>>> [2, 5, 3, 9].reduce(sumElements);
19
```

```javascript
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
  return a.concat(b);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]
```

### [pluck()](http://underscorejs.org/#pluck), [zip()](http://underscorejs.org/#zip), [reject()](http://underscorejs.org/#reject), [groupBy()](https://lodash.com/docs#groupBy), [sample()](https://lodash.com/docs#sample), [chunk()](https://lodash.com/docs#chunk), [flatten()](https://lodash.com/docs#flatten)...

By using external libraries (como [underscore](http://underscorejs.org/#collections), [lodash](https://lodash.com/docs) o [functional.js](http://functionaljs.com/)) we can have available at our code much more _higher order functions_ that will ease our work

