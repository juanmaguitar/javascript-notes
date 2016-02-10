# Variables

- Variables are used to store data

- Variables are only visible (scope) inside of the functions where they are declared

- Before using a variable we have to:
    - Declare the variable (with the sentence `var`)
    - Initialize the variable (at the time of the declaration or after)

```javascript
var a = 1;
var b;
b = 2;
```

- Variables are _Case Sensitive_

```javascript
var case_matters = 'lower';
var CASE_MATTERS = 'upper';
case_matters
CASE_MATTERS
```

### How to check the existance of a variable?

- Bad way

    ```javascript
    >>> var result = '';
    >>> if (somevar){result = 'yes';}
    somevar is not defined
    >>> result;
    ""
    ```

_It generates a warning and that ‘somevar’ returns FALSE it doesn't mean that the variable is not defined_

- [Right way](http://bonsaiden.github.io/JavaScript-Garden/#types.typeof)
    
    ```javascript
    >>> var somevar;
    >>> if (typeof somevar !== "undefined"){result = 'yes';}
    >>> result;
    ""
    ```

    ```javascript
    >>> somevar = 123;
    >>> if (typeof somevar !== "undefined"){result = 'yes';}
    >>> result;
    "yes"
    ```

_If the variable is defined and it has some value, its data type will always be different from `undefined`_

# Primitives and Data Types

- Any value used in Javascript is of a certain type. In Javascript the following primitive data types exist:

    - **Number**: They can contain integer, float), hexadecimals, octals, exponentials and the special `NaN` and `Infinity` numbers
    - **String**: Any number of characters between quotes
    - **Boolean**: It can be `true` or `false` 
    - **Undefined**: It's a data type with only one value: [`undefined`](http://bonsaiden.github.com/JavaScript-Garden/#core.undefined)
    Javascript returns this value when a variable doesn't exist or is not initialized.
    - **Null**: Another data type with only one value: [`null`](http://bonsaiden.github.com/JavaScript-Garden/#core.undefined)
    We can use it to initialize a variable wirh an _empty_ value.

- Any value that doesn't belong to any of these 5 primitive type of data _is an object_

- So, data types in Javascript can be:
    - Primitives (These 5 types)
    - No primitives (Objects)

- Although there is the operator [`typeof`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/typeof) that returns the data type, it's better to use [`Object.prototype.toString`](http://bonsaiden.github.io/JavaScript-Garden/#types.typeof)

```javascript
>>> typeof([1,2,3])
"object"
>>> Object.prototype.toString.call([1,2,3])
"[object Array]"
>>> typeof(function(){})
"function"
>>> Object.prototype.toString.call(function(){})
"[object Function]"
>>> typeof(new Date())
"object"
>>> Object.prototype.toString.call(new Date())
"[object Date]"
>>> typeof(27)
"number"
>>> Object.prototype.toString.call(27)
"[object Number]"
```

- There's the special value `NaN` (Not a Number) that we obtain when we try to perform an operation that expects numbers but something fails.

```javascript
>>> var a = 10 * f;
>>> a
NaN
```

# Operators (Arithmetical, Logical and Comparison)

- Operators can take one or two values (or variables), then they perform an operation, and then they return a value

- The assign values to variables we use the _assignment operator_ `=` 

```javascript
var a = 1;
```

## Arithmetical Operators

- The basic arithmetical operators are:

    #### `+` Addition

    ```javascript
    >>> 1 + 2;
    3
    ```

    ####  `-` Substraction

    ```javascript
    >>> 99.99 - 11;
    88.99
    ```

    ####  `*` Multiplication

    ```javascript
    >>> 2 * 3;
    6
    ```

    ####  `/` Division

    ```javascript
    >>> 6 / 4;
    1.5
    ```

    ####  `%` Modulo

    The remainder of a division

    ```javascript
    >>> 6 % 3;
    0
    >>> 5 % 3;
    2
    ```

    We can use the remainder operator to determine, for example, if a number is _odd_ (`% = 1`) or _even_ (`% = 0`) by dividing it by 2.

    ```javascript
    >>> 4 % 2;
    0  // even
    >>> 5 % 2;
    1  // odd
    ```

    ####  `++` Increment by 1

    _Post-increment_ returns the original value (_return_) and then increases the value by 1.

    ```javascript
    >>> var a = 123; var b = a++;
    >>> b;
    123
    >>> a;
    124
    ```

    _Pre-increment_ increases the value by 1 and then returns (_return_) the value (already increased).

    ```javascript
    >>> var a = 123; var b = ++a;
    >>> b;
    124
    >>> a;
    124
    ```

    ####  `--` Decrement by 1

    _Post-decrement_ returns the original value (_return_) and then decreases the value by 1.

    ```javascript
    >>> var a = 123; var b = a--;
    >>> b;
    123
    >>> a;
    122
    ```

    _Pre-incremento_ decreases the value by 1 and then returns (_return_) the new value (already decreased).

    ```javascript
    >>> var a = 123; var b = --a;
    >>> b;
    122
    >>> a;
    122
    ```

- There are also combined operators

```javascript
>>> var a = 5;
>>> a += 3;
8
```

## Logical Operators

- Logical Operators are:

    - `!`   → logical NOT (negation) 

    - `&&`  → logical AND 

    - `||`  → logical OR

```javascript
>>> var b = !true;
>>> b; 
false
```

- Double negation returns the original value

```javascript
>>> var b = !!true;
>>> b; 
true
```

- The possible operations and their results are:


| Operation         | Result
|-----------------  |----------
| `true && true`    | `true`
| `true && false`   | `false`
| `false && true`   | `false`
| `false && false`  | `false`
| `true || true`    | `true`
| `true || false`   | `true`
| `false || true`   | `true`
| `false || false`  | `false`

## Comparison Operators

- Comparison Operators are:

    #### `==` Equality

    Returns `true` when both operands are the same. The operands are converted to the same type of data before comparing them

    ```javascript
    >>> 1 == 1;
    true
    >>> 1 == 2;
    false
    >>> 1 == '1';
    true
    ```

    #### `===` Equality and Type

    Returns `true` when both operands are equal AND when they have the same data type. It's usually better and safer using this equality comparison (there are no uncontrolled conversions behind the curtains)

    ```javascript
    >>> 1 === '1';
    false
    >>> 1 === 1;
    true
    ```

    #### `!=` Non-equality
        
    Returns `true` when both operands are NOT equal (after a type conversion)

    ```javascript
    >>> 1 != 1;
    false
    >>> 1 != '1';
    false
    >>> 1 != 2;
    true
    ```

    #### `!==` Non-equality without type conversion
        
    Returns `true` when bot operands are not equal AND when they have different data type

    ```javascript
    >>> 1 !== 1;
    false
    >>> 1 !== '1';
    true
    ```

    #### `>` Greater than
        
    Returns `true` if the operand in the left is greater than the operand in the right

    ```javascript
    >>> 1 > 1;
    false
    >>> 33 > 22;
    true
    ```

    #### `>=` Greater or equal than
        
    Returns `true` if the operand in the left is greater or equal than the operand in the right

    ```javascript
    >>> 1 >= 1;
    true
    ```

    #### `<` Less than
        
     Returns `true` if the operand in the left is less than the operand in the right

    ```javascript
    >>> 1 < 1;
    false
    >>> 1 < 2;
    true
    ```

    #### `<=` Less or equal than
        
    Returns `true` if the operand in the left is less or equal than the operand in the right

    ```javascript
    >>> 1 <= 1;
    true
    >>> 1 <= 2;
    true
    ```

# Conversions

- If we use a number between quotes (string) in an arithmetical operation, Javascript converts it in a _number_

```javascript
>>> var s = "100"; typeof s; 
"string" 
>>> s = s * 1; 
100 
>>> typeof s; 
"number"
```

- ¡Warning! `undefined` and `null` return different things when converted to _number_

```javascript
>>> 1*undefined 
NaN
>>> 1*null 
0
```

- If we use `true` or `false` between quotes Javascript converts them to _string_

```javascript
>>> var b = "true"; typeof b; 
"string"
```

- Double negation `!!` is a quick way to convert any value to its correspondent boolean. 


    ```javascript
    >>> !!0
    false
    >>> !!1
    true
    >>> !!""
    false
    >>> !!"hola"
    true
    >>> !!undefined
    false
    >>> !!null
    false
    ```

    Applying this techniqe we could check how any value converted to boolean is `true` but:

    - `""`
    - `null`
    - `undefined` 
    - `0`
    - `NaN`
    - `false`

    Because of this, these values are also called **Falsy Values**


