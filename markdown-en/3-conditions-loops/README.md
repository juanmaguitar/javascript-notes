# Conditional statements

- A *condition* is a a strucuture that does one thing or another depending on the result of evaluating some statement.  We have:

    - The structure **IF… ELSE**
    - The structure **SWITCH**

- A (code) block is the set of expressions that are inside brackets. These blocks can be nested.

<sub>[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block)</sub>

Example:
```javascript
{ 
    var a = 1; 
    var b = 3; 
    var c, d; 
    { 
        c = a + b; 
        { 
        d = a - b; 
    } 
}
```

## `if - else`

<sub>[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)</sub>

```javascript
var result = '';
if (a > 2) { 
result = 'a is greater than 2';
}
```

- Parts in a `if` structure are: 
    - The `if` sentence
    - A condition between parenthesis. 
        This confition will always return a boolean.
        This condition can contain:
        - A logical operation: `!`, `&&` o `||`
        - A comparison such as `===`, `!=`, `>`
        - Any value or variable that can be converted into a Boolean
        - A combination of any of these

    - The code block starts to be executed only if the condition is met

- In the `if` structure there can also be an optional `else` followed by a block code that will be executed if the condition is evaluated to `false`

Example:
```javascript
if (a > 2) { 
    result = 'a is greater than 2';
} else { 
    result = 'a is NOT greater than 2';
}
```

- Between the `if` and the `else`, there can be unlimited number of conditions `else if`

Example:
```javascript
if (a > 2 || a < -2) { 
    result = 'a is not between -2 and 2'; 
} else if (a === 0 && b === 0) { 
    result = 'both a and b are zeros'; 
} else if (a === b) { 
    result = 'a and b are equal'; 
} else { 
    result = 'I give up'; 
}
```

- There also exist what is called the _ternary operator_ `?` that allow us to abbreviate some simple `if` sentences

Example:
```javascript
var result = (a === 1) ? "a is one" : "a is not one";
```

<sub>[https://developer.mozilla.org/en/JavaScript/Reference/Operators/Special/Conditional_Operator](https://developer.mozilla.org/en/JavaScript/Reference/Operators/Special/Conditional_Operator)</sub>  
<sub>[http://blog.stchur.com/2006/07/14/the-javascript-ternary-operator/](https://developer.mozilla.org/en/JavaScript/Reference/Operators/Special/Conditional_Operator)</sub>

## `switch`

<sub>[https://developer.mozilla.org/en/JavaScript/Reference/Statements/switch](https://developer.mozilla.org/en/JavaScript/Reference/Statements/switch)</sub>

```javascript
var a = '1';
var result = '';
switch (a) { 
  case 1: 
    result = 'Number 1'; 
    break; 
  case '1': 
    result = 'String 1'; 
    break; 
  default: 
    result = 'I don\'t know'; 
    break;
}
result;
```

-  Parts in a `switch` structure are:

    - The `switch` sentence  
    - An expression between parenthesis.   
        This expression will usally be a variable, but it can be any expression that returns a value
    - Some `case` blocks between brackets
    - Every `case` sentence is followed by an expression.  
        - The result of this expression (`case`) is compared with the expression that is after the `switch` .   
        - If the equal comparison returns `true`, the block code after that `case` is executed
    - It can (and it should) be a sentence `break` at the end of every `case` block.  
	   - These `break` cause the exit from the `switch` (so we assure only a `case` block is executed)
    - There also can (and should) be a sentence `default` followed by a code block that'll be executed if no `case` is evaluated to `true`


# Loops

- A _loop_ is a structure that allow as to repeat the execution of a code block a lot of times 

    - The number of repetitions will depend on the result of evaluating some condition, before (or after) of every iteration

- There are 4 types of loops in Javascript:

    - `while` loops 
    - `do-while` loops 
    - `for` loops 
    - `for-in` loops

## `while` loop
<sub>[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)</sub>

```javascript
var i = 0;
while (i < 10) { 
  i++;
}
```
<img src="img/bucle_while.png" alt="Bucle While JS" title="Bucle While JS" />

- `while` sentence is followed by a condition between parenthesis and a code block between brackets.
_While_ the condition evaluates to `true`, the code will be executed over and over. 
We need to assure the code inside the while forces the condition to be `false`  at some point, to avoid infinite loops

## `do-while` loop
<sub>[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)</sub>

```javascript
var i = 0;
do { 
  i++;
} while (i < 10)
```

- `do-while` loop is a little variation of `while` loop  
    `do` sentence is followd by a code block and a condition (w/ `while`) after that block.
    This implies the code block is executed at least once before evaluation the condition.


## `for` loop

<sub>[https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Sentencias/for](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Sentencias/for)  </sub>  
<sub>[http://blogs.sun.com/greimer/entry/best_way_to_code_a](http://blogs.sun.com/greimer/entry/best_way_to_code_a)  </sub>  
<sub>[http://blogs.sun.com/greimer/resource/loop-test.html](http://blogs.sun.com/greimer/resource/loop-test.html)  </sub>  

```javascript
var punishment = '';
for (var i = 0; i < 100; i++) { 
  punishment += 'I will never do this again, ';
}
```

<img src="img/bucle_for.png" alt="Bucle For JS" title="Bucle For JS" />

- The structure of the `for` loop has 3 different parts (separated by `;`)

    - **Initialization** _(var i=0)_: Code that is executed before entering into the loop [O]
    - **Evaluation** _(i<100)_: While is evaluated to `true` we continue with the loop [C]
    - **Incremento** _(i++)_:  Code that is executed after every iteration [++]

- `for` loops can be nested

Example:

```javascript
var res = '\n'; 
for(var i = 0; i < 10; i++) { 
  for(var j = 0; j < 10; j++) { 
    res += '* '; 
  } 
  res+= '\n';
}
```

## `for-in` loop

<sub>[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) </sub>

```javascript
var a = ['a', 'b', 'c', 'x', 'y', 'z'];
var result = '\n';
for (var i in a) { 
  result += 'index: ' + i + ', value: ' + a[i] + '\n';
}
```

- `for-in` loop is used to do actions over the elements of an array (or an object) 

Although based on ES5 we can also use [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) and [`forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) and doing 

```javascript
var obj = { first: "John", last: "Doe" };

// Visit non-inherited enumerable keys
Object.keys(obj).forEach(function(key) {
    console.log(key);
});
```

