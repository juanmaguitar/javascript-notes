# Variables

- Las Variables se utilizan para almacenar datos

- Las variables solo tienen visibilidad (ambito) dentro de las funciones donde se declaran

- Antes de poder utilizar una variable hay que:
    - Declarar la variable (con la sentencia `var`)
    - Inicializar la variable (en el momento de la declaración o despues)

```javascript
var a = 1;
var b;
b = 2;
```
- Las variables son Case Sensitive

```javascript
var case_matters = 'lower';
var CASE_MATTERS = 'upper';
case_matters
CASE_MATTERS
```

### ¿Cómo chequear la existencia de una variable?

- Forma Mala

    ```javascript
    >>> var result = '';
    >>> if (somevar){result = 'yes';}
    somevar is not defined
    >>> result;
    ""
    ```

_Genera un warning y que ‘somevar’ devuelva FALSE no quiere decir que no esté definida_

- [Forma Correcta](http://bonsaiden.github.io/JavaScript-Garden/#types.typeof)
    
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

_Si la variable está definida y tiene algún valor, su tipo de datos siempre será distinto de undefined_

# Primitivas y Tipos de Datos
- Cualquier valor que se utilize en JS es de un cierto tipo. En Javascript existen los siguientes tipos de datos primitivos:

    - **Number**: Puede contener numeros enteros (integer), decimales (float), hexadecimales, octales, exponentes y los números especiales `NaN` y `Infinity`
    - **String**: Cualquier numero de caracteres entre comillas
    - **Boolean**: puede ser `true` or `false` 
    - **Undefined**: Es un tipo de datos con un solo valor: [`undefined`](http://bonsaiden.github.com/JavaScript-Garden/#core.undefined)
    Lo devuelve JS cuando no existe una variable o no está inicializada.
    - **Null**: Otro tipo de datos con un solo valor: [`null`](http://bonsaiden.github.com/JavaScript-Garden/#core.undefined)
    Lo podemos asignar nosotros para inicializar a vacio.

- Cualquier valor que no pertenezca a uno de estos 5 tipo de primitivas es un objeto

- Asi que los tipos de datos en javascript pueden ser:
    - Primitivas (Los 5 tipos)
    - No primitivas (Objetos)

- Aunque existe el operador [`typeof`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/typeof) que devuelve el tipo de dato, es mejor utilizar [`Object.prototype.toString`](http://bonsaiden.github.io/JavaScript-Garden/#types.typeof)

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

- Existe el valor especial `NaN` (Not a Number) que obtenemos cuando intentamos hacer una operación que asume numeros pero la operación falla.

```javascript
>>> var a = 10 * f;
>>> a
NaN
```

# Operadores (Aritméticos, Lógicos y de Comparación)

- Los Operadores toman uno o dos valores (o variables), realizan una operación, y devuelven un valor

- El operador simple de asignación es =

```javascript
var a = 1;
```

## Operadores Aritméticos 

- Los operadores aritméticos básicos son:

    #### `+` Suma

    ```javascript
    >>> 1 + 2;
    3
    ```

    ####  `-` Resta

    ```javascript
    >>> 99.99 - 11;
    88.99
    ```

    ####  `*` Multiplicación

    ```javascript
    >>> 2 * 3;
    6
    ```

    ####  `/` División

    ```javascript
    >>> 6 / 4;
    1.5
    ```

    ####  `%` Modulo

    El resto de la división

    ```javascript
    >>> 6 % 3;
    0
    >>> 5 % 3;
    2
    ```

    Podemos utilizar el operador modulo, por ejemplo, para comprobar si un numero es par (`% = 0`) o impar (`% = 1`) .

    ```javascript
    >>> 4 % 2;
    0
    >>> 5 % 2;
    1
    ```

    ####  `++` Incremento en 1

    _Post-incremento_ devuelve el valor original (return) y despues incrementa el valor en 1.

    ```javascript
    >>> var a = 123; var b = a++;
    >>> b;
    123
    >>> a;
    124
    ```

    _Pre-incremento_ incrementa el valor en 1 y despues devuelve (return) el nuevo valor (ya incrementado).

    ```javascript
    >>> var a = 123; var b = ++a;
    >>> b;
    124
    >>> a;
    124
    ```

    ####  `--` Decremento en 1

    _Post-decremento_ devuelve el valor original (return) y despues resta el valor en 1.

    ```javascript
    >>> var a = 123; var b = a--;
    >>> b;
    123
    >>> a;
    122
    ```

    _Pre-incremento_ resta el valor en 1 y despues devuelve (return) el nuevo valor (ya restado).

    ```javascript
    >>> var a = 123; var b = --a;
    >>> b;
    122
    >>> a;
    122
    ```

- Tambien hay operadores compuestos

```javascript
>>> var a = 5;
>>> a += 3;
8
```

## Operadores Lógicos

- Los Operadores Lógicos   son:

    - `!`   → logical NOT (negation) 

    - `&&`  → logical AND 

    - `||`  → logical OR

```javascript
>>> var b = !true;
>>> b; 
false
```

- La doble negación nos devuelve el valor original

```javascript
>>> var b = !!true;
>>> b; 
true
```

- Las posibles operaciones y sus resultados son:


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

## Operadores de Comparación

- Los Operadores de Comparación son:

    #### `==` Igualdad

    Devuelve `true` cuando los dos operandos son iguales. Los operandos son convertidos al mismo tipo de datos antes de la comparacion

    ```javascript
    >>> 1 == 1;
    true
    >>> 1 == 2;
    false
    >>> 1 == '1';
    true
    ```

    #### `===` Igualdad y Tipo

    Devuelve `true` cuando los dos operandos son iguales Y cuando son del mismo tipo de datos. Suele ser mejor y más seguro, utilizar esta comparación de igualdad (no hay transformaciones de tipo no controladas)

    ```javascript
    >>> 1 === '1';
    false
    >>> 1 === 1;
    true
    ```

    #### `!=` No Igualdad
        
    Devuelve `true` cuando los dos operandos NO son iguales (despues de una conversion de tipo)

    ```javascript
    >>> 1 != 1;
    false
    >>> 1 != '1';
    false
    >>> 1 != 2;
    true
    ```

    #### `!==` No Igualdad Sin conversion de tipo
        
    Devuelve `true` cuando los dos operandos NO son iguales o cuando son de tipos diferentes

    ```javascript
    >>> 1 !== 1;
    false
    >>> 1 !== '1';
    true
    ```

    #### `>` Mayor que
        
    Devuelve `true` si el operando de la izquierda es mayor que el de la derecha

    ```javascript
    >>> 1 > 1;
    false
    >>> 33 > 22;
    true
    ```

    #### `>=` Mayor o Igual que
        
    Devuelve `true` si el operando de la izquierda es mayor o igual que el de la derecha

    ```javascript
    >>> 1 >= 1;
    true
    ```

    #### `<` Menor que
        
    Devuelve `true` si el operando de la izquierda es menor que el de la derecha

    ```javascript
    >>> 1 < 1;
    false
    >>> 1 < 2;
    true
    ```

    #### `<=` Menor o Igual que
        
    Devuelve `true` si el operando de la izquierda es menor o igual que el de la derecha

    ```javascript
    >>> 1 <= 1;
    true
    >>> 1 <= 2;
    true
    ```

# Conversiones 

- Si utilizamos un numero entre comillas (string) en una operación aritmética Javascript lo convierte en numero

```javascript
>>> var s = "100"; typeof s; 
"string" 
>>> s = s * 1; 
100 
>>> typeof s; 
"number"
```

- ¡OJO! `undefined` y `null` devuelven cosas diferentes al convertirlas a numero 

```javascript
>>> 1*undefined 
NaN
>>> 1*null 
0
```

- Si utilizamos `true` or `false` entre comillas Javascript lo convierte en string

```javascript
>>> var b = "true"; typeof b; 
"string"
```
- La doble negación `!!` es una forma sencilla de convertir cualquier valor en su Booleano correspondiente. 


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

    Aplicandolo podemos comprobar como cualquier valor covertido a Booleano es `true` excepto:

    - `""`
    - `null`
    - `undefined` 
    - `0`
    - `NaN`
    - `false`


