#Funciones

```javascript
function sum(a, b) {
  var c = a + b;
  return c;
}
```

Las **funciones** nos permiten agrupar varias líneas de código bajo un nombre.
De esta forma podemos reutilizar este código, invocando el nombre de la función.

Las partes de una función:

- La _sentencia `function`_
- El _nombre_ de la función (_sum_)
- _Parámetros_ (argumentos) que espera la función (_a_ y _b_)
Una función puede aceptar cero o más argumentos separados por comas
- Un bloque de código, también llamado el _cuerpo de la funcion_
- La sentencia _`return`_  
Una función siempre devuelve un valor.  
Si no devuelve explícitamente un valor, implícitamente devuelve el valor
`undefined`  

Una función _solo puede devolver un valor._  
Si se necesita devolver mas de un valor, se puede devolver un array o un objeto con esos valores

Para llamar a una función tan solo tenemos que usar su nombre seguido de algunos parámetros (o ninguno) entre paréntesis

```javascript
>>> var result = sum(1, 2);
>>> result;
3
```

<sub>[https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope](https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope)</sub>  
<sub>[https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Objetos_globales/Function](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Objetos_globales/Function)</sub>  
<sub>[https://bonsaiden.github.io/JavaScript-Garden/#function](https://bonsaiden.github.io/JavaScript-Garden/#function)</sub>  

##Parametros

Una función puede no requerir parámetros, pero si los requiere y no se les pasa a la función, Javascript les asignará el valor `undefined`

Si la función recibe mas parámetros de los esperados, simplemente los ignorará

Dentro de cada función tenemos disponible el objeto (pseudo-array) [`arguments`](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Obsolete_Pages/Gu%C3%ADa_JavaScript_1.5/Usando_el_objeto_arguments) que contiene los argumentos pasados a la función

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

##Funciones pre-definidas

Hay una serie de funciones que están directamente definidas dentro del motor de Javascript. 
Estas funciones pre-definidas son:

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

`parseInt()` toma un valor e intenta transformarlo en número entero.
Si falla devuelve NaN.  
`parseInt()` admite un segundo parámetro opcional que indica la base del numero que se le está pasando (decimal, hexadecimal, binario, etc…)

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

Se recomienda especificar siempre la base (10 normalmente) para [evitar problemas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#Octal_interpretations_with_no_radix) de interpretaciones

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

###[parseFloat()](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Funciones_globales/parseFloat)

`parseFloat()` toma un valor e intenta transformarlo en número de coma flotante (con decimales).

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

###[isNan()](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Funciones_globales/isNaN)

`isNan()` comprueba si el valor que se le pasa es un numero válido (devuelve true en caso de que no lo sea)

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

###[isFinite()](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Funciones_globales/isFinite)

`isFinite()` comprueba si el valor que se le pasa no es ni Infinity ni NaN

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

###[encodeURI()](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Funciones_globales/encodeURI)

`encodeURI()` Nos permite ‘escapar’ (codificar) una URL reemplazando algunos caracteres por su correspondiente secuencia de escape UTF-­‐8.
_encodeURI()_ nos devuelve una URL usable (solo codifica algunos caracteres)

```javascript
>>> var url = 'http://www.packtpub.com/scr ipt.php?q=this and that';
>>> encodeURI(url);
http://www.packtpub.com/scr%20ipt.php?q=this%20and%20that
```
###[decodeURI()](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Funciones_globales/decodeURI)

`decodeURI()` Nos permite ‘decodificar’ un string codificado por `encodeURI()`

###[encodeURIComponent()](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Funciones_globales/encodeURIComponent) y [decodeURIComponent()](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Funciones_globales/decodeURIComponent)

`encodeURIComponent()` y `decodeURIComponent()` Lo mismo que
encodeURI()` pero esta función codifica (decodifica) TODOS los caracteres transformables

```javascript
>>> encodeURIComponent(url);
"http%3A%2F%2Fwww.packtpub.com%2Fscr%20ipt.php%3Fq%3Dthis%20and%20that"
```
###[eval()](https://developer.mozilla.org/es/Referencia_de_JavaScript_1.5/Funciones_globales/eval)

`eval()` toma una cadena de texto y la ejecuta como código Javascript

`eval()` no debe utilizarse básicamente por 2 motivos:  

- Rendimiento: Es mucho más lento evaluar código “en vivo” que tenerlo
directamente en el script  
- Seguridad: Teniendo en cuenta que ejecuta todo lo que se le pase puede ser un agujero de seguridad.  

```javascript
>>> eval('var ii = 2;')
>>> ii
2
```

<sub>[http://bonsaiden.github.com/JavaScript-­‐Garden/#core.eval](http://bonsaiden.github.com/JavaScript-­‐Garden/#core.eval)</sub>

###alert()

`alert()` Nos muestra una ventana con un string  
`alert()` no es parte del core JS pero está disponible en todos los navegadores  

¡OJO! `alert()` para el código hasta que se acepte el mensaje  


<br/>

##Ámbito (Scope) de las Funciones

En javascript las variables se definen en el ámbito de una función (y no en el ámbito de un bloque como ocurre en otros lenguajes)  

- Las **variables globales** son aquellas que se definen fuera de cualquier función
- Las **variables locales** son aquellas que se definen dentro de una función


<br/>

##Funciones Callback

_Las funciones en Javascript son datos_, lo que significa que podemos asignarlas a variables igual que cualquier otro valor (y manejarlas como variables)

```javascript
function f(){ return 1; }
var f = function(){ return 1; }
```

Las funciones son datos, pero un tipo especial de datos (`typeof ‘function’`) ya
que:

- Contienen código
- Podemos ejecutarlas

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

Las **funciones anónimas** son aquellas que no tienen nombre y se pueden utilizar para:

- Pasar esa función como argumento de una función
- Definir una función y ejecutarla inmediatamente

```javascript
>>> function(a){ return a; }
```

Cuando pasamos una función A como argumento de otra función B y B ejecuta A, decimos que A es una **[función callback](http://stackoverflow.com/questions/483073/getting-­‐a-­‐better-­‐understanding-­‐of-­‐callback-­‐functions-­‐in-­‐javascript)**

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

##Closures

Si definimos una función `n()` dentro de `f()` , `n()` tendrá acceso tanto a las variables de su scope (ámbito) como las del scope de su padre. Esto es lo que se llama **scope chain** (encadenamiento de ámbitos)

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

Las funciones tienen lo que se llama **lexical scope** (ámbito léxico) lo que significa que crean su entorno (scope, a qué variables tienen acceso) cuando son definidas no cuando son ejecutadas

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

Un **closure** se crea cuando una funcion mantiene un enlace con el ámbito (scope) de la función padre incluso después de que la función padre haya terminado.

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

<sub>[http://mark-­‐story.com/posts/view/picking-­‐up-­‐javascript-­‐closures-­‐and-­‐lexical-­‐scoping](http://mark-­‐story.com/posts/view/picking-­‐up-­‐javascript-­‐closures-­‐and-­‐lexical-­‐scoping)</sub>  
<sub>[http://blog.morrisjohns.com/javascript_closures_for_dummies.html](http://blog.morrisjohns.com/javascript_closures_for_dummies.html)</sub>  
<sub>[http://stackoverflow.com/questions/111102/how-­‐do-­‐javascript-­‐closures-­‐work](http://stackoverflow.com/questions/111102/how-­‐do-­‐javascript-­‐closures-­‐work)</sub>  
<sub>[http://www.kryogenix.org/code/browser/secrets-­‐of-­‐javascript-­‐closures/](http://www.kryogenix.org/code/browser/secrets-­‐of-­‐javascript-­‐closures/)</sub>  
<sub>[http://www.hunlock.com/blogs/Closing_The_Book_On_Javascript_Closures](http://www.hunlock.com/blogs/Closing_The_Book_On_Javascript_Closures)</sub>  
<sub>[http://jibbering.com/faq/notes/closures/](http://jibbering.com/faq/notes/closures/)</sub>  
<sub>[http://www.bennadel.com/blog/1482-­‐A-­‐Graphical-­‐Explanation-­‐Of-‐Javascript-­‐Closures-­‐In-­‐A-­‐jQuery-­‐Context.htm](http://www.bennadel.com/blog/1482-­‐A-­‐Graphical-­‐Explanation-­‐Of-‐Javascript-­‐Closures-­‐In-­‐A-­‐jQuery-­‐Context.htm)</sub>  
