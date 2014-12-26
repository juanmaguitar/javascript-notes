# Expresiones Regulares

<sub>[http://regexpal.com/](http://regexpal.com/)</sub>  
<sub>[http://www.regular-expressions.info/](http://www.regular-expressions.info/)</sub>   
<sub>[http://mundogeek.net/archivos/2004/07/29/javascript-expresiones-regulares/](http://mundogeek.net/archivos/2004/07/29/javascript-expresiones-regulares/)</sub>   
<sub>[http://javascript.espaciolatino.com/lengjs/jsgram/expregulares.htm](http://javascript.espaciolatino.com/lengjs/jsgram/expregulares.htm)</sub>   
<sub>[http://www.javascriptkit.com/javatutors/redev.shtml](http://www.javascriptkit.com/javatutors/redev.shtml)</sub>  

Las expresiones regulares nos permiten buscar y manipular texto de una forma muy potente.  
Un expresión regular consiste en:
- Un **patron** (_pattern_) que se usa para localizar textos que se ajusten a él
- **Modificadores** (opcionales) que nos indican como aplicar el patron

En Javascript tenemos disponibles **objetos de expresiones regulares** que podemos crear:
- Con la función constructora [`RegExp`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp) : `new RegExp("j.*t")` 
- Con la notacion literal: `/j.*t/`;

## Propiedades de los Objetos RegExp

Los objetos de expresiones regulares tienen las siguientes propiedades:

- [`global`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/global
): Con `false` (por defecto) devuelve solo el primer elemento encontrado. Con `true` devuelve todos los elementos encontrados

- [`ignoreCase`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/ignoreCase): Si está a `true` haremos el matching sensible a mayusculas (por defecto a `false`)

- [`multiline`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/multiline
): Si está a `true` realizará la busqueda entre varias lineas (por defecto a `false`)

- [`lastIndex`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/lastIndex): La posición por la que empezar la busqueda (por defecto a 0) 

- [`source`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/source): Contiene la expresion regular 

Estas propiedades (excepto `lastIndex`) no pueden ser modificadas despues de creado el objeto

Las 3 primeras propiedades representan a los _modificadores_ de la expresion regular:
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

## Métodos de los Objetos RegExp

Los objetos de expresiones regulares tienen los siguientes metodos:

- [`test()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/test):Devuelve `true` si encuentra algo y `false` en caso contrario

- [`exec()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp/exec): Devuelve un array de cadenas que cumplan el patron 

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

## Métodos de String que aceptan Expresiones Regulares

<sub>[http://www.javascriptkit.com/javatutors/re3.shtml](http://www.javascriptkit.com/javatutors/re3.shtml)</sub>  

Tenemos disponibles los siguientes métodos del objeto `String` para buscar dentro de un texto mediante expresiones regulares:

- [`match()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/match): Devuelve un array de ocurrencias 

- [`search()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/search): Devuelve la posición de la primera ocurrencia 

- [`replace()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace): Nos permite sustituir la cadena encontrada por otra cadena   

- [`split()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/split): Acepta una expresión regular para dividir una cadena de texto en elementos de un array

### [`replace()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace)

- Si omitimos el modificador **g** solo reemplazamos la primera ocurrencia  
- Podemos incluir en la sustitución la cadena encontrada con **$&**   
- Cuando la expresión regular contiene grupos podemos acceder a la ocurrencia de cada grupo con **$1, $2**, etc...  
- Al especificar la sustitución podemos pasar una función donde:  
      1. El _primer parametro_ es la cadena encontrada  
      2. El _último parametro_ es la cadena donde se está buscando  
      3. El _antepenultimo parametro_ es la posición de la ocurrencia  
      4. El _resto de parametros_ son las ocurrencias de cada grupo del patron  

     
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

## Sintaxis de las Expresiones Regulares

<sub>[http://es.wikipedia.org/wiki/Expresi%C3%B3n_regular](http://es.wikipedia.org/wiki/Expresi%C3%B3n_regular)</sub>  
<sub>[http://www.addedbytes.com/cheat-sheets/regular-expressions-cheat-sheet/](http://www.addedbytes.com/cheat-sheets/regular-expressions-cheat-sheet/)</sub>  
<sub>[http://www.visibone.com/regular-expressions/](http://www.visibone.com/regular-expressions/)</sub>  

### `[abc]`

Busca coincidencias en los caracteres del patron

```javascript
>>> "some text".match(/[otx]/g)
["o", "t", "x", "t"]
```
### `[a-z]`

Busca coincidencias en el rango de caractares  
`[a-d]` es lo mismo que `[abcd]`  
`[a-z]` busca todas los caracteres en minuscula  
`[a-zA-Z0-9_]` busca todo los caracteres, numeros y el guión bajo  

```javascript
>>> "Some Text".match(/[a-z]/g)
["o", "m", "e", "e", "x", "t"]
>>> "Some Text".match(/[a-zA-Z]/g)
["S", "o", "m", "e", "T", "e", "x", "t"]
```
###￼￼`[^abc]`

Devuelve lo que NO coincida con el patron

```javascript
>>> "Some Text".match(/[^a-z]/g)
["S", " ", "T"]
```

### `a|b`

Devuelve _a_ o _b_ (la barra indica OR)

```javascript
>>> "Some Text".match(/t|T/g);
["T", "t"]
>>> "Some Text".match(/t|T|Some/g);
["Some", "T", "t"]
```

### `a(?=b)`

Devuelve _a_ solamente si está seguida de _b_

```javascript
>>> "Some Text".match(/Some(?=Tex)/g);
null
>>> "Some Text".match(/Some(?= Tex)/g);
["Some"]
```

### `a(?!b)`

Devuelve _a_ solamente si NO está seguida de _b_

```javascript
>>> "Some Text".match(/Some(?! Tex)/g);
null
>>> "Some Text".match(/Some(?!Tex)/g);
["Some"]
```

### `\`

Carácter de escape utilizado para localizar caracteres especiales utilizados en el patron como literales

```javascript
>>> "R2-D2".match(/[2-3]/g)
["2", "2"]
>>> "R2-D2".match(/[2\-3]/g)
["2", "-", "2"]
```

### `\n`  
￼￼￼￼￼￼￼
Nueva linea

### `\r` 

Retorno de carro (Para comenzar una nueva linea se usa `\r\n` en Windows, `\n` en Unix y `\r` en Mac)

### `\f` 

Salto de pagina

### `\t`

Tabulación

### `\v` 

Tabulación Vertical

### `\s`

Espacio en blanco o cualquiera de las 5 secuencias de escape de arriba

```javascript
>>> "R2\n D2".match(/\s/g)
["\n", " "]
```

### `\S`

Lo contrario de lo de arriba. Devuelve todo excepto espacios en blanco y las 5 secuencias de escape de antes. Lo mismo que `[^\s]`

```javascript
>>> "R2\n D2".match(/\S/g)
["R", "2", "D", "2"]
```

### `\w`

Cualquier letra, numero o guión bajo. Lo mismo que `[A-Za-z0-9_]`

```javascript
>>> "Some text!".match(/\w/g)
["S", "o", "m", "e", "t", "e", "x", "t"]
```

### `\W`

Lo contrario de `\w`

```javascript
>>> "Some text!".match(/\W/g)
[" ", "!"]
```

### `\d`

Localiza un numero. Lo mismo que `[0-9]` 

```javascript
>>> "R2-D2 and C-3PO".match(/\d/g)
["2", "2", "3"]
```

### `\D`

Lo contrario de `\d`. Localiza caracteres no-numericos. Lo mismo que `[^0-9]`  o `[^\d]`

```javascript
>>> "R2-D2 and C-3PO".match(/\D/g)
["R", "-", "D", " ", "a", "n", "d", " ", "C", "-", "P", "O"]
```

### `\b`

Coincide con un limite de palabra (espacio, puntuación, guión...)

```javascript
>>> "R2D2 and C-3PO".match(/[RD]2/g)
["R2", "D2"]
>>> "R2D2 and C-3PO".match(/[RD]2\b/g)
["D2"]
>>> "R2-D2 and C-3PO".match(/[RD]2\b/g)
["R2", "D2"]
```

### `\B`

Lo contrario de `\b` 

```javascript
>>> "R2-D2 and C-3PO".match(/[RD]2\B/g)
null
>>> "R2D2 and C-3PO".match(/[RD]2\B/g)
["R2"]
```

### `^`

Representa el principio de la cadena donde se está buscando.
Si tenemos el modificador `m` representa el principio de cada linea.

```javascript
>>> "regular\nregular\nexpression".match(/r/g);
["r", "r", "r", "r", "r"]
>>> "regular\nregular\nexpression".match(/^r/g);
["r"]
>>> "regular\nregular\nexpression".match(/^r/mg);
["r", "r"]
```

### `$` 

Representa el final de la cadena donde se está buscando.
Si tenemos el modificador `m` representa el final de cada linea.

```javascript
>>> "regular\nregular\nexpression".match(/r$/g);
null
>>> "regular\nregular\nexpression".match(/r$/mg);
["r", "r"]
```

### `.`

Representa a cualquier carácter excepto la nueva linea y el retorno de carro

```javascript
>>> "regular".match(/r./g);
["re"]
>>> "regular".match(/r.../g);
["regu"]
```

### `*`

Hace matching si el patron precedente ocurre 0 o más veces.  
`/.*/` devolverá todo incluido nada (cadena vacia)

```javascript
>>> "".match(/.*/)
[""]
>>> "anything".match(/.*/)
["anything"]
>>> "anything".match(/n.*h/)
["nyth"]
```

### `?` 

Hace matching si el patron precedente ocurre 0 o 1 vez.

```javascript
>>> "anything".match(/ny?/g)
["ny", "n"]
```

### `+`

Hace matching si el patron precedente ocurre 1 o más veces (al menos una vez).

```javascript
>>> "anything".match(/ny+/g)
["ny"]
>>> "R2-D2 and C-3PO".match(/[a-z]/gi)
["R", "D", "a", "n", "d", "C", "P", "O"]
>>> "R2-D2 and C-3PO".match(/[a-z]+/gi)
["R", "D", "and", "C", "PO"]
```

### `{n}`

Hace matching si el patron precedente ocurre exactamente n veces.

```javascript
>>> "regular expression".match(/s/g)
["s", "s"]
>>> "regular expression".match(/s{2}/g)
["ss"]
>>> "regular expression".match(/\b\w{3}/g)
["reg", "exp"]
```

### `{min,max}`

Hace matching si el patron precedente ocurre entre min y max veces.  
Se puede omitir max (solo tendrá minimo) No se puede omitir min  

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

Cuando el patrón está en parentesis, se captura y se guarda para poder utilizarlo en sustituciones (captura de patrones).  
Estas capturas estan disponibles en `$1`, `$2`,... `$9`

```javascript
>>> "regular expression".replace(/(r)/g, '$1$1')
"rregularr exprression"
>>> "regular expression".replace(/(r)(e)/g, '$2$1')
"ergular experssion"
```

### `{?:pattern}` 

Patrón no capturable (no disponible en `$1`, `$2`, ...)

```javascript
>>> "regular expression".replace(/(?:r)(e)/g, '$1$1')
"eegular expeession"
```