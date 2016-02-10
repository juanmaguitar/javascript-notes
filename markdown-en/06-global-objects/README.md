# Global Objects

- Are the objects we have available in the global scope (primitive objects)

- We can divide them in 3 groups
    - _Objects containers of data_:  Object, Array, Function, Boolean, Number
    - _Objects of utilities_: Math, Date, RegExp
    - _Objects of errors_: Error


##[Object](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object)

-  **Object** is the father of all the javascript objects, this is, every object inherites from him

- To create an empty object we can use:
    - The literal notation :  `var o = {}`
    - The constructor function _Object()_:  `var o = new Object();`

- Any object contains the following properties and methods:
    - The property [`o.constructor`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/constructor) containing the constructor function
    - The method [`o.toString()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/toString) that returns the object converted into text
    - The method [`o.valueOf()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/ValueOf) that returns the _value_ of the object (usuarlly `o`)

```javascript
>>> var o = new Object();
>>> o.toString()
“[object Object]”

>>> o.valueOf() === o
true
```

##[Array](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array)

- To create arrays we can use:
    - Literal notation:  `var a = []`
    - Constructor function Array():  `var o = new Array();`

- We can pass parameters to the constructor `Array()`
    - Several parameters: Will be assigned as elements in the array
    - A number: Will be considered as the size of the array

```javascript
>>> var a = new Array(1,2,3,'four');
>>> a;
[1, 2, 3, "four"]

>>> var a2 = new Array(5);
>>> a2;
[undefined, undefined, undefined, undefined, undefined]
```

- Because of the arrays are objects, we also have available all the methods and properties of the father `Object()`

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

- Arrays have the property [`length`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/length)  

    - Returns the size of the array (number of elements)
    - We can modify it and change the size of the array

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
  
  
Arrays have a few interesting methods:

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

- Functions are objects
- We can create functions with the constructor function `Function()` (althiugh this method is not recomended as it internally uses an _eval()_ )

Example:
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

- Functions have the following properties:
    - The property `constructor` that contains a reference to the constructor function _Function()_ 
    - The property [`length`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/length) that contains the number of parameters accepted by the function 
    - The property [`caller`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/caller) (no standard) that contains a reference to the function that called that function
    - The property [`prototype`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/prototype) that contains an object:  
        - It's only useful when we use this function as a constructor
        - All objects created by a constructor function maintain a reference to its property `prototype` and can use its properties as if they're of their own

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

- Functions have the following methods:
    - The method `toString()` that returns the source code of the function
    - The methods [`call()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/call) and [`apply()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/apply) that execute methods of other objects especifying the context (especifying a different `this`)
        - These two methods do the same but accepting the arguments in a different format

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


- Functions have available the object `arguments` that (besides `length`) have the property `callee` that contains a reference to the function called (to itself)

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

- The object _Boolean_ is a container for a boolean type value
  We can create _Boolean_ objects with te constructor function `Boolean()`

Example:
```javascript
>>> var b = new Boolean();
>>> typeof b 
"object"
>>> typeof b.valueOf() 
"boolean"
>>> b.valueOf() 
false
```

- The function `Boolean` used as a normal function (without `new`) returns the value passed as a parameter converted to boolean

Example:
```javascript
>>> Boolean("test") 
true
>>> Boolean("") 
false
>>> Boolean({}) 
true
```

##[Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number)

- The function `Number()` can be used:
    - As a _normal function_ to convert values to numbers
    - As a _constructor function_ (with `new`) to create objects
- The _number_ objects have the following methods available: [`toFixed()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toFixed), [`toPrecision()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toPrecision) y [`toExponential()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toExponential)

Example:
```javascript
>>> var n = new Number(123.456)
>>> n.toFixed(1) 
"123.5"

>>> (12345).toExponential() 
"1.2345e+4"
```

- The method [`toString()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toString) of a number object allow us to convert any number to a specific base

Example:
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

- We can create String objects with the constructor function `String()`  
  A _String_ object is NOT a String primitive type of data (`valueOf()`)

Example:
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

- A string object is similar to an array of characters:
    - Every character has an indexed position
    - It has available the property `length`

Example:
```javascript
>>> obj[0] 
"w"
>>> obj[4] 
"d"
>>> obj.length 
5
```

- Although the methods belong to the `String` object, we can use them directly in the primitive type of data _string_ (the object is created internally)

Example:
```javascript
>>> "potato".length 
6
>>> "tomato"[0] 
"t"
>>> "potato"["potato".length - 1] 
"o"
```

- The String objects have available the following methods:
    - [`toLowerCase()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/toLowerCase)  returns the string converted to lowercase
    
    - [`charAt()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/charAt)  returns the character found at the specified position
    
    - [`indexOf()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/indexOf) looks for a text string inside of another text string and returns the position where it was found
        - If it doesn't find anything it returns -1 
    
    - `lastIndexOf()` starts the search from the end of the string
        - If it doesn't find anything it returns -1 
    
    That's whay the proper way of checking if a string exists inside of another string is →  `if ( s.toLowerCase().indexOf('couch') !== -1 ) {...}`

    - [`slice()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/slice) returns a piece of the text string

    - [`split()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/split) transform the string in an array by using the specified character/s as a separator

    - [`concat()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/concat) joins strings

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

- _Math_ is an object with properties and _methods_ useful for mathematical work
    It is NOT a constructor of other objects

- Some interesting `Math` methods are:
    - [`random()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/random) generates random numbers from 0 to 1

    - [`round()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/round), [`floor()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/floor) y [`ceil()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/ceil) round numbers  

    - [`min()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/min) y [`max()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/max)  return the minimum and the maximum of a serie of numbers passed as parameters

    - [`pow()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/pow) y [`sqrt()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/sqrt)  returns the power and the square each one 

##[Date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date)

- `Date()` is a constructor function that creates _date_ objects
    We can create new Date objects by passing:
    - _nothinga_ (will take the current date as default) 
    - _A date_ in string format
    - _separated values_ that represent: Year, Month (0-11), Day (1-31), Hour (0-23), Minutes (0-59), Seconds (0-59) y Miliseconds (0-999)
    - A _timestamp_ value


Example (Firebug shows the result of the `toString` method over a _date_ object):
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

- Some methods to work with _date_ objects are:

    - [`setMonth()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/setMonth) y [`getMonth()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/getMonth) write and read the month in a date object each one of them (we have available the same kind of methods for _year_, _day_, _hours_, _minutes_, etc…)


    - [`parse()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/parse) given a string, it returns its _timestamp_

    - [`UTC()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/UTC)  produces timestamp given some month, year, day, etc..

    - [`toDateString()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/toDateString) returns the content of a date object in american format

Example:
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