# Regular Expressions

<sub>[http://regexpal.com/](http://regexpal.com/)</sub>  
<sub>[http://www.regular-expressions.info/](http://www.regular-expressions.info/)</sub>   
<sub>[http://mundogeek.net/archivos/2004/07/29/javascript-expresiones-regulares/](http://mundogeek.net/archivos/2004/07/29/javascript-expresiones-regulares/)</sub>   
<sub>[http://javascript.espaciolatino.com/lengjs/jsgram/expregulares.htm](http://javascript.espaciolatino.com/lengjs/jsgram/expregulares.htm)</sub>   
<sub>[http://www.javascriptkit.com/javatutors/redev.shtml](http://www.javascriptkit.com/javatutors/redev.shtml)</sub>  

Regular expressions allow us to search and manipulate text in a very powerful way.  
A regular expression consist in:
- A **pattern** used to locate texts that fits it
- **Modificators** (optionals) that indicate how to apply the pattern

In Javascript we have available **regular expressions objects** that we can create:
- With the constructor function [`RegExp`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp) : `new RegExp("j.*t")` 
- With the literal notation: `/j.*t/`;

## Properties of the RegExp objects

The regular expressions objects have the following properties:

- [`global`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/global): With `false` (by default) it returns only the first element that is found. With `true` return all the found elements

- [`ignoreCase`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/ignoreCase): With `true` it does the matching sensitive to uppercase (`false` by default)

- [`multiline`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/multiline): With `true` it does the search in several lines (`false` by default)

- [`lastIndex`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/lastIndex): The position in where to begin the search (por defecto a 0) 

- [`source`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/source): Contains the regular expression

These properties (except `lastIndex`) cannot be modified once the object has been created

The 3 first properties represent the _modificators_ of the regular expression:
- **g**: global
- **i**: ignoreCase
- **m**: multiline


```javascript
>>> var re = new RegExp('j.*t', 'gmi');
undefined
>>> re.global
true
>>> re.global = false;
false
>>> re.global
true
>>> var re = /j.*t/ig;
undefined
>>> re.global
true
>>> re.source
"j.*t"
```

## Methods of the RegExp Objects

The RegExp objects have the following methods:

- [`test()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/test): Returns `true` if it finds something and `false` if it doesn't

- [`exec()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/exec): Return an array of string that match the pattern

```javascript
>>> /j.*t/.test("Javascript")
false
>>> /j.*t/i.test("Javascript")
true
>>> /s(amp)le/i.exec("Sample text")
["Sample", "amp"]
>>> /a(b+)a/g.exec("_abbba_aba_")
["abbba", "bbb"]
```

## String methods that accept regular expressions

<sub>[http://www.javascriptkit.com/javatutors/re3.shtml](http://www.javascriptkit.com/javatutors/re3.shtml)</sub>  

We have available the following methods of the object `String` to look for inside of a text by using regular expressions:

- [`match()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/match): Return an array of occurrences

- [`search()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/search): Return the position of the first occurrence 

- [`replace()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace): Allow us to replace the found string by another string

- [`split()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/split): Accepts a regular expression to split a string in elements of an array

### [`replace()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace)

- If we omit the modificator **g** we only replace the first occurrence
- We can include in the substitution the found string by using **$&**   
- When the regular expression contain groups we can access to the occurrence of every group with **$1, $2**, etc...  
- When specifying the substitution we can pass a function as a parameter where:
    1. The _first parameter_ is the found string
    2. The _last parameter_ is the string where the search is taking place
    3. The _penultimate parameter_ is the position of the occurrence
    4. The _rest of the parameters_ are the occurrences of each group of the pattern  

     
```javascript
>>> var s = "HelloJavaScriptWorld"
undefined
>>> s.match(/a/);
["a"]
>>> s.match(/a/g);
["a", "a"]
>>> s.match(/j.*a/i); ["Java"]
>>> s.search(/j.*a/i); 5
>>> s.replace(/[A-Z]/g, '');
"elloavacriptorld"
>>> s.replace(/[A-Z]/, ''); "elloJavaScriptWorld"
>>> s.replace(/[A-Z]/g, "_$&"); "_Hello_Java_Script_World"
>>> s.replace(/([A-Z])/g, "_$1"); "_Hello_Java_Script_World"
>>> "juanmanuel.garrido@softonic.com".replace(/(.*)@.*/, "$1");
"juanmanuel.garrido"
>>> function replaceCallback(match){return "_" + match.toLowerCase();}
undefined
>>> s.replace(/[A-Z]/g, replaceCallback); "_hello_java_script_world"
>>> var sMail = "juanmanuel.garrido@softonic.com";
undefined
>>> var rRegExp = /(.*)@(.*)\.(.*)/;
undefined
>>> var fCallback = function () { args = arguments; return args[1] + " de " + args[2].toUpperCase(); }
undefined
>>> sMail.replace( rRegExp, fCallback);
"juanmanuel.garrido de SOFTONIC"
>>> args
["juanmanuel.garrido@softonic.com", "juanmanuel.garrido",
"softonic", "com", 0, "juanmanuel.garrido@softonic.com"]
>>> var csv = 'one, two,three ,four'; 
>>> csv.split(',');
["one", " two", "three ", "four"]
>>> csv.split(/\s*,\s*/)
["one", "two", "three", "four"]
>>> "test".replace('t', 'r')
"rest"
>>> "test".replace(new RegExp('t'), 'r')
"rest"
>>> "test".replace(/t/, 'r')
"rest"
```

## Regular Expression Syntax

<sub>https://en.wikipedia.org/wiki/Regular_expression</sub>  
<sub>http://www.addedbytes.com/cheat-sheets/regular-expressions-cheat-sheet/</sub>  
<sub>http://www.visibone.com/regular-expressions/</sub>  

### `[abc]`

Looks for coincidences of the characters in the pattern

```javascript
>>> "some text".match(/[otx]/g)
["o", "t", "x", "t"]
```

### `[a-z]`

Looks for coincidences in that characters range 

`[a-d]` is the same than `[abcd]`  
`[a-z]` looks for all the lowercase characters
`[a-zA-Z0-9_]` looks for all the characters, numbers and the underscore

```javascript
>>> "Some Text".match(/[a-z]/g)
["o", "m", "e", "e", "x", "t"]
>>> "Some Text".match(/[a-zA-Z]/g)
["S", "o", "m", "e", "T", "e", "x", "t"]
```

###￼￼`[^abc]`

Returns everything that does NOT match the pattern

```javascript
>>> "Some Text".match(/[^a-z]/g)
["S", " ", "T"]
```

### `a|b`

Returns _a_ or _b_ (the bar indicates OR)

```javascript
>>> "Some Text".match(/t|T/g);
["T", "t"]
>>> "Some Text".match(/t|T|Some/g);
["Some", "T", "t"]
```

### `a(?=b)`

Returns _a_ only is found followed by _b_

```javascript
>>> "Some Text".match(/Some(?=Tex)/g);
null
>>> "Some Text".match(/Some(?= Tex)/g);
["Some"]
```

### `a(?!b)`

Returns _a_ only is found NOT followed by _b_

```javascript
>>> "Some Text".match(/Some(?! Tex)/g);
null
>>> "Some Text".match(/Some(?!Tex)/g);
["Some"]
```

### `\`

Escape character that are used to find special characters used in the pattern as literals

```javascript
>>> "R2-D2".match(/[2-3]/g)
["2", "2"]
>>> "R2-D2".match(/[2\-3]/g)
["2", "-", "2"]
```

### `\n`  
￼￼￼￼￼￼￼
New line

### `\r` 

Carriage return (To begin a new line `\r\n` is used in Windows, `\n` in Unix and `\r` in Mac)

### `\f` 

New page

### `\t`

Tabulation

### `\v` 

Vertical Tabulation

### `\s`

Blank espace or any of the previous 5 sequences

```javascript
>>> "R2\n D2".match(/\s/g)
["\n", " "]
```

### `\S`

The opposite of the previous sequence. Returns everything but blank spaces and the 5 escape sequences. The same than `[^\s]`

```javascript
>>> "R2\n D2".match(/\S/g)
["R", "2", "D", "2"]
```

### `\w`

Any letter, number, or underscore. The same than `[A-Za-z0-9_]`

```javascript
>>> "Some text!".match(/\w/g)
["S", "o", "m", "e", "t", "e", "x", "t"]
```

### `\W`

The contrary than `\w`

```javascript
>>> "Some text!".match(/\W/g)
[" ", "!"]
```

### `\d`

Locates a number. The same than `[0-9]` 

```javascript
>>> "R2-D2 and C-3PO".match(/\d/g)
["2", "2", "3"]
```

### `\D`

The contrary than `\d`. It locates non-numerical characters. The same than `[^0-9]` or `[^\d]`

```javascript
>>> "R2-D2 and C-3PO".match(/\D/g)
["R", "-", "D", " ", "a", "n", "d", " ", "C", "-", "P", "O"]
```

### `\b`

A word "limit" (space, puntuation, hyphen...)

```javascript
>>> "R2D2 and C-3PO".match(/[RD]2/g)
["R2", "D2"]
>>> "R2D2 and C-3PO".match(/[RD]2\b/g)
["D2"]
>>> "R2-D2 and C-3PO".match(/[RD]2\b/g)
["R2", "D2"]
```

### `\B`

The contrary than `\b` 

```javascript
>>> "R2-D2 and C-3PO".match(/[RD]2\B/g)
null
>>> "R2D2 and C-3PO".match(/[RD]2\B/g)
["R2"]
```

### `^`

Represents the beginning of the string where we're looking for.
If we have the modificator `m` it represents the beginning of every line.

```javascript
>>> "regular\nregular\nexpression".match(/r/g);
["r", "r", "r", "r", "r"]
>>> "regular\nregular\nexpression".match(/^r/g);
["r"]
>>> "regular\nregular\nexpression".match(/^r/mg);
["r", "r"]
```

### `$` 

Represents the final of the string where we're looking for
If we have the modificator `m` it represents the end of every line.

```javascript
>>> "regular\nregular\nexpression".match(/r$/g);
null
>>> "regular\nregular\nexpression".match(/r$/mg);
["r", "r"]
```

### `.`

Represents any character but the new line and the carriage return

```javascript
>>> "regular".match(/r./g);
["re"]
>>> "regular".match(/r.../g);
["regu"]
```

### `*`

It matches if the preceding pattern happen 0 or more times
`/.*/` will return everything, including "nothing" (empty string)

```javascript
>>> "".match(/.*/)
[""]
>>> "anything".match(/.*/)
["anything"]
>>> "anything".match(/n.*h/)
["nyth"]
```

### `?` 

It matches if the preceding pattern happen 0 or once

```javascript
>>> "anything".match(/ny?/g)
["ny", "n"]
```

### `+`

It matches if the preceding pattern happen 1 or more times (at least once)

```javascript
>>> "anything".match(/ny+/g)
["ny"]
>>> "R2-D2 and C-3PO".match(/[a-z]/gi)
["R", "D", "a", "n", "d", "C", "P", "O"]
>>> "R2-D2 and C-3PO".match(/[a-z]+/gi)
["R", "D", "and", "C", "PO"]
```

### `{n}`

It matches if the preceding pattern happen exactly _n_ times

```javascript
>>> "regular expression".match(/s/g)
["s", "s"]
>>> "regular expression".match(/s{2}/g)
["ss"]
>>> "regular expression".match(/\b\w{3}/g)
["reg", "exp"]
```

### `{min,max}`

It matches if the preceding pattern happen between _min_ and _max_ times
_max_ can be omitted (will only have minimum) _min_ cannot be omitted  

```javascript
>>> "doooooooooodle".match(/o/g)
["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"]
>>> "doooooooooodle".match(/o{2}/g)
["oo", "oo", "oo", "oo", "oo"]
>>> "doooooooooodle".match(/o{2,}/g)
["oooooooooo"]
>>> "doooooooooodle".match(/o{2,6}/g)
["oooooo", "oooo"]
```

### `(pattern)`

When the pattern is between parentheses, is being captured and stored so it can be used in substitutions (patterns capture).  
Thse captures are available at `$1`, `$2`,... `$9`

```javascript
>>> "regular expression".replace(/(r)/g, '$1$1')
"rregularr exprression"
>>> "regular expression".replace(/(r)(e)/g, '$2$1')
"ergular experssion"
```

### `{?:pattern}` 

Non capturable pattern (not available at `$1`, `$2`, ...)

```javascript
>>> "regular expression".replace(/(?:r)(e)/g, '$1$1')
"eegular expeession"
```