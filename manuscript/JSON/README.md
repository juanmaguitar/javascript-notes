# JSON

<sup>[http://json.org/json-es.html](http://json.org/json-es.html)</sup>  
<sup>[http://www.etnassoft.com/2010/12/30/tutorial-json/](http://www.etnassoft.com/2010/12/30/tutorial-json/)</sup>  
<sup>[http://javascriptweblog.wordpress.com/2010/11/29/json-and-jsonp/](http://javascriptweblog.wordpress.com/2010/11/29/json-and-jsonp/)</sup>  
<sup>[http://www.anieto2k.com/2007/08/03/toma-de-contacto-con-json/](http://www.anieto2k.com/2007/08/03/toma-de-contacto-con-json/)</sup>  

```javascript
    {
    "name": "Eric Clapton",
    "occupation": "Guitar Hero",
    "bands": ["Cream", "Blind Faith"]
    }
```

- **JSON (Javascript Object Notation)** es un formato de intercambio de datos basado en la notación literal de Javascript para la representación de objetos, arrays, cadenas, booleanos y números  
<sup>[http://tools.ietf.org/html/rfc4627](http://tools.ietf.org/html/rfc4627)</sup>

- Ventajas de este formato de datos frente a XML:
    - Más ligero (su estructura necesita menos elementos que XML) por lo que es ideal para peticiones AJAX
    - Más fácil de transformar a objeto Javascript (con eval se haria directo)

    <sup>[http://www.anieto2k.com/2007/01/05/json-vs-xml-empieza-el-debate/](http://www.anieto2k.com/2007/01/05/json-vs-xml-empieza-el-debate/)</sup>  
    <sup>[http://ajaxian.com/archives/json-vs-xml-the-debate](http://ajaxian.com/archives/json-vs-xml-the-debate)</sup>  
    <sup>[http://www.etnassoft.com/2010/12/21/la-muerte-de-xml-en-la-web/](http://www.etnassoft.com/2010/12/21/la-muerte-de-xml-en-la-web/)</sup>  

- Particularidades del formato JSON frente a la notación literal de Javascript:
    - Los pares nombre-valor van siempre con comillas dobles
    - JSON puede representar 6 tipos de valores: objetos, arrays, números, cadenas,
    booleanos y null
    - Las fechas no se reconocen como tipo de dato
    - Los números no pueden ir precedidos de 0 (salvo los decimales)

    <sup>[http://www.jsonlint.com/](http://www.jsonlint.com/)</sup>

- Las cadenas JSON deben ser convertidas a objetos Javascript para poder utilizarlas (y viceversa). 
Para ello podemos utilizar:  
    - [`eval()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval): No se recomienda utilizarlo directamente  
    - [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse): Convierte una cadena JSON en un objeto Javascript  
         hace eval pero comprueba el formato antes de hacerlo  
    - [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify): Convierte un objeto Javascript en una cadena JSON
    - [`jQuery.parseJSON`](http://api.jquery.com/jQuery.parseJSON/): con jQuery también podemos hacer el parseo del JSON

    El objeto JSON está disponible de forma nativa en los [navegadores compatibles con ECMAScript 5](http://kangax.github.io/compat-table/es5/)  

    <sup>[http://json.parser.online.fr/](http://json.parser.online.fr/)</sup>  
    <sup>[https://developer.mozilla.org/En/Using_JSON_in_Firefox](https://developer.mozilla.org/En/Using_JSON_in_Firefox)</sup>  

```javascript
>>> JSON.parse('{"bar":"new property","baz":3}')
Object { bar="new property", baz=3}
```

```javascript
>>> JSON.stringify({ breed: 'Turtle', occupation: 'Ninja' });
"{"breed":"Turtle","occupation":"Ninja"}"
```


