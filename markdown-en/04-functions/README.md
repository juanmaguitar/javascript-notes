# Functions

```javascript
function sum(a, b) {
  var c = a + b;
  return c;
}
```

**funciones** allow us to group several lines of code under one name.
In this way, we can reuse this code, by invoking the name of the funtion.

Function parts are:

- The `function` sentence
- The function _name_ (_sum_)
- _Parameters_ (arguments) expected by the function (_a_ and _b_)
A function can accept zero or more arguments separated by commas
- A code block, also called _body of the function_
- _`return`_ sentence  
A function always returns a value.  
If it doesn't return explicitly a value, implicitly returns the value 
`undefined`  

A function can _only return one value._  
If it need to return more that a value, it can return an array or an object with those values

To call a function we only need to write its name followed by some parameters (or nothing) between parenthesis

```javascript
>>> var result = sum(1, 2);
>>> result;
3
```

<sub>[https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope](https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope)</sub>  
<sub>[https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Objetos_globales/Function](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Objetos_globales/Function)</sub>  
<sub>[https://bonsaiden.github.io/JavaScript-Garden/#function](https://bonsaiden.github.io/JavaScript-Garden/#function)</sub>  

## Parameters

A function can be defined to not require parameters, but if they're required and they're passed in the call of the function, Javascript will assign to them the value `undefined`

If the function receives more parameters than expected, it will simply ignore them

Inside every function we have available the object (pseudo-array) [`arguments`](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Obsolete_Pages/Gu%C3%ADa_JavaScript_1.5/Usando_el_objeto_arguments) that contains the arguments passed to the function

```javascript
function sumOnSteroids() {
  var i, res = 0;
  var number_of_params = arguments.length;
  for (i = 0; i < number_of_params; i++) {
    res += arguments[i];
  }
  return res;
}
```

## Pre-defined functions

There are some functions that are already defined inside the Javascript engine.
These pre-defined functions are (among others):

- `parseInt()`
- `parseFloat()`
- `isNaN()`
- `isFinite()`
- `encodeURI()`
- `decodeURI()`
- `encodeURIComponent()`
- `decodeURIComponent()`
- `eval()`

###[parseInt()](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Funciones_globales/parseInt)

`parseInt()` takes a value and tries to transform it in an integer 
If the transformation fails it returns `NaN`.  
`parseInt()` can take a second optional parameter that sets the numerical base of the number passed as first argument (decimal, hexadecimal, binary, etc…)

```javascript
>>> parseInt('123')
123
>>> parseInt('abc123')
NaN
>>> parseInt('1abc23')
1
>>> parseInt('123abc')
123
```

It's recommended especifying always the base (usually _10_) to [avoid issues](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#Octal_interpretations_with_no_radix) with the interpretation

```javascript
>>> parseInt(" 0xF", 16);
15
>>> parseInt(" F", 16);
15
>>> parseInt("17", 8);
15
>>> parseInt(021, 8);
15
>>> parseInt("015", 10);
15
>>> parseInt(15.99, 10);
15
>>> parseInt("FXX123", 16);
15
>>> parseInt("1111", 2);
15
>>> parseInt("15*3", 10);
15
>>> parseInt("15e2", 10);
15
>>> parseInt("15px", 10);
15
>>> parseInt("12", 13);
15
```

###[parseFloat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)

`parseFloat()` takes a value and tries to transform it in a float number (woth decimals).

```javascript
>>> parseFloat('123')
123
>>> parseFloat('1.23')
1.23
>>> parseFloat('1.23abc.00')
1.23
>>> parseFloat('a.bc1.23')
NaN
```

###[isNan()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN)

`isNan()` checks if the value passed as a parameter is a valid number (returns `true` in case is not)

```javascript
>>> isNaN(NaN)
true
>>> isNaN(123)
false
>>> isNaN(1.23)
false
>>> isNaN(parseInt('abc123'))
true
```

###[isFinite()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite)

`isFinite()` checks if the value passed as a parameter is not `Infinity` or `NaN`

```javascript
>>> isFinite(Infinity)
false
>>> isFinite(-Infinity)
false
>>> isFinite(12)
true
>>> isFinite(1e308)
true
>>> isFinite(1e309)
false
```

###[encodeURI()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)

`encodeURI()` allow us to 'escape' (codify) a URL replacing some characters by its related escape sequence (UTF-­8 ).
_encodeURI()_ returns an usable URL (only codifies some characters)

```javascript
>>> var url = 'http://www.packtpub.com/scr ipt.php?q=this and that';
>>> encodeURI(url);
http://www.packtpub.com/scr%20ipt.php?q=this%20and%20that
```

###[decodeURI()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)

`decodeURI()` Allow us to 'decodify' a string codified by `encodeURI()`

###[encodeURIComponent()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) y [decodeURIComponent()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)

`encodeURIComponent()` (and `decodeURIComponent()`) works the same than
`encodeURI()` but this function codifies (or decodifies) ALL transformable characters

```javascript
>>> encodeURIComponent(url);
"http%3A%2F%2Fwww.packtpub.com%2Fscr%20ipt.php%3Fq%3Dthis%20and%20that"
```

###[eval()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)

`eval()` takes a text and execute it as Javascript code

`eval()` shouldn't be used because of 2 reasons:  

- _Perfomance_: It's much more slower evaluatin "live" code than having it directly in the script
- _Security_: Taking into account that every thing passed as a parameter can be a security hole.  

```javascript
>>> eval('var ii = 2;')
>>> ii
2
```

<sub>[http://bonsaiden.github.com/JavaScript-­‐Garden/#core.eval](http://bonsaiden.github.com/JavaScript-­‐Garden/#core.eval)</sub>

###alert()

`alert()` display a window w/ some stirng
`alert()` is not part of the JS core but is available in all the browsers

¡OJO! `alert()` blocks (stop) the code until the message is accepted


<br/>

## Functions Scope

In Javascript variables are defined in the function scope (and not in the block scope as it happen in other languages)  

- **Global variables** are those defined out of any function
- **Local variables** are those defined inside of a function 


<br/>

## Callback Functions

_Functions in Javascript are data (values)_, which means they can be assigned to variables in the same way we do with other values (and manage them as variables)

```javascript
function f(){ return 1; }
var f = function(){ return 1; }
```

Functions are data, but a special type of data (`typeof ‘function’`) because:

- They contain code
- We can execute them

```javascript
>>> var sum = function(a, b) { return a + b; }
>>> var add = sum;
>>> delete sum
true
>>> typeof sum;
"undefined"
>>> typeof add;
"function"
>>> add(1, 2);
3
```

**Anonimous functions** are those that doesn't have a name and can be used to:

- Pass that function as an argument of a function
- Define a function and execute it inmediately

```javascript
>>> function(a){ return a; }
```

When we pass a function A as an argument of another function B and B executes A, we tell that A is a **[callback function](http://stackoverflow.com/questions/483073/getting-­‐a-­‐better-­‐understanding-­‐of-­‐callback-­‐functions-­‐in-­‐javascript)**

```javascript
>>> function invoke_and_add(a, b){ return a() + b(); }
>>> function one() { return 1; }
>>> function two() { return 2; }
>>> invoke_and_add(one, two);
3
>>> invoke_and_add(one, function(){return 7;})
8
```

<br/>

## Closures

If we define a function `n()` inside of another function `f()` , `n()` will have access to all the variables in its scope and its father's scope. This is what is called **scope chain**

```javascript
var a = 1;
function f(){
  var b = 1;
  function n() {
    var c = 3;
  }
}
```

<sub>[http://stackoverflow.com/questions/1484143/scope-­‐chain-­‐in-­‐javascript](http://stackoverflow.com/questions/1484143/scope-­‐chain-­‐in-­‐javascript)</sub>  
<sub>[http://www.digital-­‐web.com/articles/scope_in_javascript/](http://www.digital-­‐web.com/articles/scope_in_javascript/)</sub>  
<sub>[http://odetocode.com/Blogs/scott/archive/2007/07/10/closure-­‐on-­‐javascript-­‐closures.aspx](http://odetocode.com/Blogs/scott/archive/2007/07/10/closure-­‐on-­‐javascript-­‐closures.aspx)</sub>  
<sub>[http://www.smashingmagazine.com/2009/08/01/what-­‐you-­‐need-­‐to-­‐know-­‐about-­‐javascript-­‐scope/](http://www.smashingmagazine.com/2009/08/01/what-­‐you-­‐need-­‐to-­‐know-­‐about-­‐javascript-­‐scope/)</sub>  

Functions have what is called as **lexical scope** which means they create theis scope (which variables can they access) when they are defined, not when they are executed

```javascript
>>> function f1(){ var a = 1; return f2(); }
>>> function f2(){ return a; }
>>> f1();
a is not defined
>>> var a = 5;
>>> f1();
5
>>> a = 55;
>>> f1();
55
>>> delete a;
true
>>> f1();
a is not defined
```

```javascript
var a = 123;
function f() {
  alert(a);
  var a = 1;
  alert(a);
}
f();
```

<sub>[https://developer.mozilla.org/en/JavaScript/Guide/Closures](https://developer.mozilla.org/en/JavaScript/Guide/Closures)</sub>  
<sub>[http://stackoverflow.com/questions/1047454/what-­‐is-­‐lexical-­‐scope](http://stackoverflow.com/questions/1047454/what-­‐is-­‐lexical-­‐scope)</sub>  
<sub>[http://ayende.com/Blog/archive/2007/12/13/Javascript-­‐lexical-­‐scopes-­‐and-­‐what-­‐your-­‐momma-­‐thought-­‐you-­‐about.aspx](http://ayende.com/Blog/archive/2007/12/13/Javascript-­‐lexical-­‐scopes-­‐and-­‐what-­‐your-­‐momma-­‐thought-­‐you-­‐about.aspx)</sub>  

A **closure** is created when a function maintains a link with the scope of the father, even after the parent function has finished 

```javascript
function f(){
  var b = "b";
  return function(){
    return b;
  }
}
>>> b
b is not defined
>>> var n = f();
>>> n();
"b"
```

```javascript
var n;
function f(){
  var b = "b";
  n = function(){
    return b;
  }
}
>>> f();
>>> n();
```

```javascript
function f(arg) {
  var n = function(){
    return arg;
  };
  arg++;
  return n;
};
>>> var m = f(123);
>>> m();
```

<sub>[http://stackoverflow.com/questions/111102/how-­‐do-­‐javascript-­‐closures-­‐work](http://stackoverflow.com/questions/111102/how-­‐do-­‐javascript-­‐closures-­‐work)</sub>  
<sub>[http://jibbering.com/faq/notes/closures/](http://jibbering.com/faq/notes/closures/)</sub>  
<sub>[http://www.bennadel.com/blog/1482-­‐A-­‐Graphical-­‐Explanation-­‐Of-‐Javascript-­‐Closures-­‐In-­‐A-­‐jQuery-­‐Context.htm](http://www.bennadel.com/blog/1482-­‐A-­‐Graphical-­‐Explanation-­‐Of-‐Javascript-­‐Closures-­‐In-­‐A-­‐jQuery-­‐Context.htm)</sub> 
