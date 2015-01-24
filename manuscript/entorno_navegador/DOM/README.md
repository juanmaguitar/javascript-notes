# DOM
<sub>[http://www.ibm.com/developerworks/xml/tutorials/x-udom/](http://www.ibm.com/developerworks/xml/tutorials/x-udom/)</sub>  

- El **[DOM (Document Object Model)](http://www.w3.org/DOM/)** es una forma de representar un documento HTML (o XML) como un árbol de nodos.  
Utilizando los métodos y propiedades del DOM podremos acceder a los elementos de la página, modificarlo, eliminarlos o añadir nuevos

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/
xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
        <title>Página sencilla</title>
    </head>
    <body>
        <p>Esta página es <strong>muy sencilla</strong></p>
    </body>
</html>
```

![DOM](https://raw.github.com/juanmaguitar/training-frontend-docs/master/entorno_navegador/img/dom.png)

- En el _[DOM Level 1](http://www.w3.org/TR/DOM-Level-1/)_ se diferencia entre: 
    - El **Core DOM** es la especificación común que se aplica a todos los documentos (XML, HTML,…)
    - El **Core HTML** es la especificación que se aplica sólo a documentos HTML

## [Accediendo a los nodos](http://www.elated.com/articles/looking-inside-dom-page-elements/)

```html
<body>
    <p class="opener">first paragraph</p>
    <p><em>second</em> paragraph</p>
    <p id="closer">final</p>
    <!-- and that's about it -->
</body>
```

- El nodo [`document`](https://developer.mozilla.org/en/DOM/document) nos da acceso al documento (es el punto de partida)

- Todos los nodos tienen las propiedades:
    - [`nodeType`](https://developer.mozilla.org/en/nodeType): Hay 12 tipos de nodos representados por números (1=element, 2=attribute, 3=text, ...)
    - [`nodeName`](https://developer.mozilla.org/en/nodename): Para tags HTML es el nombre del tag y para nodos texto es #text
    - [`nodeValue`](https://developer.mozilla.org/en/nodevalue): Para nodos de texto el valor será el texto

- El nodo `documentElement` es el nodo raíz. Para documentos HTML es el tag `<html>`

```javascript
>>> document.documentElement
<html>
>>> document.documentElement.nodeType
1
>>> document.documentElement.nodeName
"HTML"
>>> document.documentElement.tagName
"HTML"
```

- Cada nodo puede tener nodos-hijo:
    - [`hasChildNodes()`](https://developer.mozilla.org/en/DOM/element.hasChildNodes) : Este método devolverá true si el nodo tiene nodos-hijo
    - [`childNodes`](https://developer.mozilla.org/En/DOM/Node.childNodes): Devuelve en un array los nodos-hijo de un elemento.  
    Al ser un array podemos saber el numero de nodos-hijo con `childNodes.length`
    - [`parentNode`](https://developer.mozilla.org/En/DOM/Node.parentNode): Nos da el nodo-padre de un nodo-hijo

```javascript
>>> document.documentElement.hasChildNodes()
True
>>> document.documentElement.childNodes.length
2
>>> document.documentElement.childNodes[0]
<head>
>>> document.documentElement.childNodes[1]
<body>
>>> document.documentElement.childNodes[1].parentNode
<html>
>>> var bd = document.documentElement.childNodes[1];
>>> bd.childNodes.length
9
```

- Podemos chequear la existencia de attributes y acceder a sus [atributos](https://developer.mozilla.org/En/DOM/Node.attributes):
    - [`hasAttributes()`](https://developer.mozilla.org/En/DOM/Node.hasAttributes):Devuelve true si el elemento tiene atributos  
    - [`getAttribute()`](https://developer.mozilla.org/en/DOM/element.getAttribute): Devuelve el contenido de un atributo  

```javascript
>>> bd.childNodes[1]
<p class="opener">
>>> bd.childNodes[1].hasAttributes()
True
>>> bd.childNodes[1].attributes.length
1
>>> bd.childNodes[1].attributes[0].nodeName
"class"
>>> bd.childNodes[1].attributes[0].nodeValue
"opener"
>>> bd.childNodes[1].attributes['class'].nodeValue
"opener"
>>> bd.childNodes[1].getAttribute('class')
"opener"
```

- Podemos acceder al contenido de un tag:
    - [`textContent`](https://developer.mozilla.org/En/DOM/Node.textContent): Esta propiedad nos da el texto plano dentro de una etiqueta  
    En IE no existe esta propiedad (hay que usar innerText)  
    - [`innerHTML`](https://developer.mozilla.org/en/DOM/element.innerHTML): Esta propiedad nos da el contenido (en HTML) de un tag

```javascript
>>> bd.childNodes[1].nodeName
"P"
>>> bg.childNodes[1].textContent
"first paragraph"
>>> bd.childNodes[1].innerHTML
"first paragraph"
>>> bd.childNodes[3].innerHTML
"<em>second</em> paragraph"
>>> bd.childNodes[3].textContent
"second paragraph"
>>> bd.childNodes[1].childNodes.length
1
>>> bd.childNodes[1].childNodes[0].nodeName
"#text"
>>> bd.childNodes[1].childNodes[0].nodeValue
"first paragraph"
```

- Podemos [acceder directamente a algunos elementos](http://www.elated.com/articles/javascript-retrieving-page-elements-via-the-dom/) sin necesidad de recorrer todo elárbol:
    - [`getElementsByTagName()`](https://developer.mozilla.org/en/DOM/element.getElementsByTagName): Nos devuelve un array con todos los elementos
con el tag que se le pasa por parámetro
    - [`getElementsByName()`](https://developer.mozilla.org/en/DOM/document.getElementsByName): Nos devuelve un array con todos los elementos con el
name que se le pasa por parámetro
    - [`getElementById()`](getElementById()): No devuelve el elemento con el id que se le pasa por parámetro

```javascript
>>> document.getElementsByTagName('p').length
3
>>> document.getElementsByTagName('p')[0]
<p class="opener">
>>> document.getElementsByTagName('p')[0].innerHTML
"first paragraph"
>>> document.getElementsByTagName('p')[2]
<p id="closer">
>>> document.getElementsByTagName('p')[2].id
"closer"
>>> document.getElementsByTagName('p')[0].className
"opener"
>>> document.getElementById('closer')
<p id="closer">
```

![Parent & Childs](https://raw.github.com/juanmaguitar/training-frontend-docs/master/entorno_navegador/img/parent-child.png)

- Desde un nodo también podemos acceder a sus hermanos y al primero y último de sus hijos
    - [`nextSibling`](https://developer.mozilla.org/En/DOM/Node.nextSibling): Nos devuelve el siguiente hermano
    - [`previousSibling`](https://developer.mozilla.org/En/DOM/Node.previousSibling): Nos devuelve el anterior hermano
    - [`firstChild`](https://developer.mozilla.org/En/DOM/Node.firstChild): Nos devuelve el primer hijo
    - [`lastChild`](https://developer.mozilla.org/En/DOM/Node.lastChild): Nos devuelve el último hijo

```javascript
>>> var para = document.getElementById('closer')
>>> para.nextSibling
"\n "
>>> para.previousSibling
"\n "
>>> para.previousSibling.previousSibling
<p>
>>> para.previousSibling.previousSibling.previousSibling
"\n "
>>>
para.previousSibling.previousSibling.nextSibling.nextSibling
<p id="closer">
>>> document.body.previousSibling
<head>
>>> document.body.firstChild
"\n "
>>> document.body.lastChild
"\n "
>>> document.body.lastChild.previousSibling
Comment length=21 nodeName=#comment
>>> document.body.lastChild.previousSibling.nodeValue
" and that's about it "
```

## [Modificando los nodos](http://www.elated.com/articles/changing-page-elements-with-the-dom/)

- Para cambiar el contenido de una etiqueta cambiamos el contenido de innerHTML

```javascript
>>> var my = document.getElementById('closer');
>>> my.innerHTML = '<em>my</em> final';
>>> my.firstChild
<em>
>>> my.firstChild.firstChild
"my"
>>> my.firstChild.firstChild.nodeValue = 'your';
"your"
```

- Los elementos tienen la propiedad [`style`](https://developer.mozilla.org/en/DOM/element.style) que podemos utilizar para modificar sus estilos

<sub>[http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-ElementCSSInlineStyle](http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-ElementCSSInlineStyle)</sub>

```javascript
>>> my.style.border = "1px solid red";
"1px solid red"
· Ademas podemos modificar los atributos existan ya o no
Ejemplo:
>>> my.align = "right";
"right"
>>> my.name
>>> my.name = 'myname';
"myname"
>>> my.id
"closer"
>>> my.id = 'further'
"further"
```

## Creando y Eliminando nodos

- Para crear nuevos elementos podemos utilizar los métodos [`createElement`](https://developer.mozilla.org/en/DOM/document.createElement) y
[`createTextNode`](https://developer.mozilla.org/en/DOM/document.createTextNode).  
    Una vez creados los podemos añadir al DOM con [`appendChild`](https://developer.mozilla.org/En/DOM/Node.appendChild)

```javascript
>>> var myp = document.createElement('p');
>>> myp.innerHTML = 'yet another';
"yet another"
>>> myp.style
CSSStyleDeclaration length=0
>>> myp.style.border = '2px dotted blue'
"2px dotted blue"
>>> document.body.appendChild(myp)
<p style="border: 2px dotted blue;">
```

- Tambien podemos copiar elementos existentes con [`cloneNode()`](https://developer.mozilla.org/En/DOM/Node.cloneNode)
    `cloneNode` acepta un parámetro booleano (true copiará el nodo con todos sus hijos y false solo el nodo)

```javascript
>>> var el = document.getElementsByTagName('p')[1];
<p><em>second</em> paragraph</p>
>>> document.body.appendChild(el.cloneNode(false))
>>> document.body.appendChild(document.createElement('p'));
>>> document.body.appendChild(el.cloneNode(true))
```

- Con [`insertBefore()`](https://developer.mozilla.org/en-US/docs/Web/API/Node.insertBefore) podemos especificar el elemento delante del cual queremos insertar el nuestro

```javascript
document.body.insertBefore(
    document.createTextNode('boo!'), 
    document.body.firstChild
);
```

- Para eliminar nodos del DOM podemos utilizar [`removeChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node.removeChild) o [`replaceChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node.replaceChild)  
    `removeChild()` elimina el elemento y replaceChild() lo sustituye por otro que se le pasa como parámetro  
    Tanto `replaceChild()` como `removeChild()` devuelven el nodo eliminado

```javascript
>>> var myp = document.getElementsByTagName('p')[1];
>>> var removed = document.body.removeChild(myp);
>>> removed
<p>
>>> removed.firstChild
<em>
>>> var p = document.getElementsByTagName('p')[1];
>>> p
<p id="closer">
>>> var replaced = document.body.replaceChild(removed, p);
>>> replaced
<p id="closer">
```

## Objetos DOM sólo de HTML

- En el DOM tenemos disponibles una serie de selectores directos y de colecciones exclusivos de HTML (no XML):
    - [`document.body`](https://developer.mozilla.org/en/DOM/document.body): `document.getElementsByTagName(‘body’)[0]`
    - [`document.images`](https://developer.mozilla.org/en/DOM/document.images): `document.getElementsByTagName(‘img’)`
    - [`document.applets`](https://developer.mozilla.org/en/DOM/document.applets):  `document.getElementsByTagName(‘applet’)`
    - [`document.links`](https://developer.mozilla.org/en/DOM/document.links): Nos devuelve un array con todos los links con atributo `href`
    - [`document.anchors`](https://developer.mozilla.org/en/DOM/document.anchors): Nos devuelve un array con todos los links con atributo name
    - [`document.forms`](https://developer.mozilla.org/en/DOM/document.forms): `document.getElementsByTagName(‘form’)`  
    Podemos acceder a los elementos del form (inputs, buttons) con elements

```javascript
>>> document.forms[0]
>>> document.getElementsByTagName('forms')[0]
>>> document.forms[0].elements[0]
>>> document.forms[0].elements[0].value = 'me@example.org'
"me@example.org"
>>> document.forms[0].elements[0].disabled = true;
>>> document.forms[0].elements['search']; // array notation
>>> document.forms[0].elements.search; // object property
```

- Tambien tenemos disponible el método [`document.write()`](https://developer.mozilla.org/en/document.write)   
    No se recomienda su uso ;-)

- Algunas propiedades del objeto document son:
    - `document.cookies`: Contiene una cadena de texto con las cookies asociadas al documento
    - [`document.title`](https://developer.mozilla.org/en/DOM/document.title): Permite cambiar el titulo de la pagina que aparece en el navegador  
    Esto no cambia el contenido del tag title
    - [`document.referrer`](https://developer.mozilla.org/en/DOM/document.referrer): Contiene la URL desde donde hemos llegado a la página
    - [`document.domain`](https://developer.mozilla.org/en/document.domain): Contiene el dominio de la pagina

## Selección Avanzada de Elementos

<sub>[http://mootools.net/slickspeed/](http://mootools.net/slickspeed/)</sub>  
<sub>[http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier](http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier)</sub>  
<sub>[http://www.quirksmode.org/css/contents.html](http://www.quirksmode.org/css/contents.html)</sub>  

- [`document.images`](https://developer.mozilla.org/en/DOM/document.images) : `document.getElementsByTagName(‘img’)` 

- [`rows`](https://developer.mozilla.org/en/DOM/table.rows) y [`cells`](https://developer.mozilla.org/en/DOM/HTMLTableRowElement) : Dado un elemento table podemos acceder a sus filas y dado un row podemos acceder a sus celdas con estos selectores  

```javascript
 >>> oTable = document.getElementsByTagName(‘table’)[0];
 >>> aRows = oTable.rows;ñ
 >>> oFirstRow = aRows[0];
 >>> oLastRow = aRows[oRows.length-1];
 >>> aCells = oFirstRow.cells;
 >>> oFirstCell = aCells[0];
 >>> oLastCell = aCells[aCells.length-1];
```

- [`options`](https://developer.mozilla.org/en/DOM/HTMLSelectElement): Dado un elemento [`select`](https://developer.mozilla.org/en/HTML/Element/select ) podemos acceder al array de sus `options` 

```javascript
 >>> document.getElementsByTagName('select')[0].options;
 [option.windows, option.movil, option.aplicaciones-web, option.mac,
 option.linux, option.palm, option.pocketpc, option.blog]
```

- [`querySelector`](https://developer.mozilla.org/En/DOM/Element.querySelector) y [`querySelectorAll`](https://developer.mozilla.org/En/DOM/Element.querySelectorAll): Devuelve elementos del DOM a partir de una selección CSS  
    `querySelector()` devuelve el primer elemento encontrado   
    `querySelectorAll()` devuelve un array de elementos   
    Funciones nativas disponibles a partir de IE8 y FF3.5  

    <sub>[http://javascript.nwbox.com/NWMatcher/release/test/css3-compat/](http://javascript.nwbox.com/NWMatcher/release/test/css3-compat/)</sub>

```javascript
 >>> oMyElem = document.querySelector("#myid");
 >>> aMyHiddenElems = document.body.querySelectorAll(".hidden");
```

- `$()` o [`jQuery()`](http://api.jquery.com/jQuery/): con jQuery disponemos de una [potente herramienta de selección de elementos](http://sizzlejs.com/)
 
    <sub>[http://www.neeraj.name/2010/02/15/how-jquery-selects-elements-using-sizzle.html](http://www.neeraj.name/2010/02/15/how-jquery-selects-elements-using-sizzle.html)</sub>  
    <sub>[http://refcardz.dzone.com/refcardz/jquery-selectors](http://refcardz.dzone.com/refcardz/jquery-selectors)</sub>

    Para obtener los elementos utilizamos `$()` o `jQuery()` pasándole nuestra [selección CSS](http://api.jquery.com/category/selectors/) entre comillas

    `$()` devuelve un [objeto jQuery](http://api.jquery.com/Types/#jQuery) (que no es un elemento DOM y tiene acceso a métodos propios de jQuery)

    Podemos pasar de objeto jQuery a selección DOM: 
    - Para un elemento: `$('#container') -> $('#container')[0]`
    - Para un grupo de elementos: `$('.hidden') -> $('.hidden').toArray()` 

    Tambien podemos pasar de selección DOM a objeto jQuery:
    - Para un elemento: `document.getElementById('container') -> $(document.getElementById('container'))`
    - Para un grupo de elementos: `document.links -> $(document.links);`

```javascript
>>> $('#container');
jQuery(div#container)
>>> $('#container')[0]

<div id="container">
>>> $('#footer_contents')
jQuery(div#footer_contents.clearfix)
>>> $('#footer_contents')[0]

<div id="footer_contents" class="clearfix">
>>> $('#footer_contents').attr("class");
"clearfix"
>>> $('#footer_contents').className
undefined
>>> $('#footer_contents')[0].className
"clearfix"
>>> $('#footer_contents')[0].attr("class");
 TypeError: $("#footer_contents")[0].attr is not a function

 >>> $('div.hidden')
 jQuery(div#ads_section_textlinks.clearfix, div#top_sales.top_box,
 div#top_valuated.top_box, div.list_container, div.ac_results)

 >>> $('div.hidden').toArray()
 [div#ads_section_textlinks.clearfix, div#top_sales.top_box,
 div#top_valuated.top_box, div.list_container, div.ac_results]

 >>> $('div.hidden').toArray()[0]
 <div id="ads_section_textlinks" class="clearfix
 hidden" style="display: block;">

 >>> document.getElementById('ads_section_textlinks');
 <div id="ads_section_textlinks" class="clearfix
 hidden" style="display: block;">

 >>> $(document.getElementById('ads_section_textlinks'));
 jQuery(div#ads_section_textlinks.clearfix)

 >>> $(document.querySelectorAll('div.hidden')[0]);
 jQuery(div#ads_section_textlinks.clearfix)
```