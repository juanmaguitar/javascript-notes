# El entorno del Navegador

<sup>[http://www.saregune.net/ikasi/hezigune/curso.php?curso=javascript&leccion=js_intro_dom](http://www.saregune.net/ikasi/hezigune/curso.php?curso=javascript&leccion=js_intro_dom)</sup>  
<sup>[http://vkanakaraj.wordpress.com/2009/12/18/javascript-vs-dom-vs-bom-relationship-explained/](http://vkanakaraj.wordpress.com/2009/12/18/javascript-vs-dom-vs-bom-relationship-explained/)</sup>  
<sup>[http://javascript.about.com/od/byexample/a/Javascript-By-Example_2.htm](http://javascript.about.com/od/byexample/a/Javascript-By-Example_2.htm)</sup>  
<sup>[http://stackoverflow.com/questions/4416317/what-is-the-dom-and-bom-in-javascript](http://stackoverflow.com/questions/4416317/what-is-the-dom-and-bom-in-javascript)</sup>  

- Javascript puede ser utilizado en [diferentes entornos](http://en.wikipedia.org/wiki/JavaScript#Uses_outside_web_pages), pero [su entorno más habitual es el navegador](https://developer.mozilla.org/en/JavaScript_technologies_overview)  

- El código Javascript de una pagina tiene acceso a unos cuantos objetos. Estos objetos los podemos agrupar en:
    - Objetos que tienen relación con la pagina cargada (el document). Estos objetos conforman el **Document Object Model (DOM)**
    - Objetos que tienen que ver con cosas que están fuera de la pagina (la ventana del navegador y la pantalla). Estos objetos conforman el **Browser Object Model (BOM)**

- El DOM es un standard y tiene varias versiones (llamadas levels). La mayoria de los navegadores implementan casi por completo el DOM Level 1.  
<sup>[http://www.quirksmode.org/compatibility.html](http://www.quirksmode.org/compatibility.html)</sup>
<sup>[http://www.webdevout.net/browser-support-dom](http://www.webdevout.net/browser-support-dom)</sup>

- El BOM no es un standard, asi que algunos objetos están soportados por la mayoría de navegadores y otros solo por algunos.


## [Deteccion de Funcionalidades](https://developer.mozilla.org/en/Browser_Detection_and_Cross_Browser_Support)

<sup>[http://stackoverflow.com/questions/1173165/how-to-guess-browser-compatibility-based-upon-dom-level](http://stackoverflow.com/questions/1173165/how-to-guess-browser-compatibility-based-upon-dom-level)</sup>  

- Debido a estas diferencia entre navegadores surge la necesidad de averiguar (desde código JS) que caracteristicas soporta nuestro navegador (DOM y BOM)

- Una solución seria la llamada [**Browser Sniffing**](http://en.wikipedia.org/wiki/Browser_sniffing) que consiste en [detectar el navegador que estamos utilizando](http://www.quirksmode.org/js/detect.html)  

    Esta técnica [no se recomienda](http://blogs.sitepoint.com/why-browser-sniffing-stinks/) por:
    - Hay demasiados navegadores para controlar
    - [Dificil de mantener](http://www.jibbering.com/faq/notes/detect-browser/) (surgen nuevas versiones y nuevos navegadores)
    - El [parseo de cadenas puede ser complicado](http://www.howtocreate.co.uk/tutorials/jsexamples/sniffer.html) y no es fiable del todo

```javascript
if (navigator.userAgent.indexOf('MSIE') !== -1) {
    // this is IE
} else {
    // not IE
}
```

- La mejor solucion para detectar funcionalidades de nuestro navegador es hacer [**Feature Sniffing**](http://www.quirksmode.org/js/support.html), es decir chequear la existencia del objeto (método, array o propiedad) que queremos utilizar  

```javascript
if (typeof window.addEventListener === 'function') {
    // feature is supported, let's use it
} else {
    // hmm, this feature is not supported, will have to
    // think of another way
}
```

## BOM

- El **BOM (Browser Object Model)** lo conforman todos los objetos que están fuera del documento cargado (document) y forman parte del objeto window

![BOM](https://raw.github.com/juanmaguitar/training-frontend-docs/master/entorno_navegador/img/bom.png)

- El objeto `window` ademas de servir de contenedor de las variables globales y de ofrecer los metodos nativos de JS (`window.parseInt`), contiene informacion sobre el entorno del navegador (frame, iframe, popup, ventana o pestaña)

- Algunos de los _objetos_ que tenemos disponibles en window son:

    - [`window.navigator`](https://developer.mozilla.org/en/DOM/window.navigator) es un objeto que contiene información sobre el navegador  

    ```javascript
    >>> window.navigator.userAgent
    "Mozilla/5.0 (Windows; U; Windows NT 5.1; es-ES; rv:1.9.2.12)
    Gecko/20101026 Firefox/3.6.12 ( .NET CLR 3.5.30729)"
    ```

    - [`window.location`](https://developer.mozilla.org/en/DOM/window.location) es un objeto que contiene info (y metodos) sobre la URL
actual

    ```javascript
    >>> window.location.href = 'http://www.packtpub.com'
    >>> location.href = 'http://www.packtpub.com'
    >>> location = 'http://www.packtpub.com'
    >>> location.assign('http://www.packtpub.com')
    >>> location.reload()
    >>> window.location.href = window.location.href
    >>> location = location
    ```

    - [`window.history`](https://developer.mozilla.org/en/DOM/window.history) es un objeto que contiene el historial de paginas visitadas y tiene métodos para movernos en él (sin poder ver las URL’s)

    ```javascript
    >>> window.history.length
    5
    >>> history.forward()
    >>> history.back()
    >>> history.go(-2);
    ```

    - [`window.frames`](https://developer.mozilla.org/en/DOM/window.frames) es una colección de todos los frames que tenemos en la página  
    Cada frame tendrá su propio objeto window  
    Podemos utilizar `parent` para acceder desde el frame hijo al padre  
    Con la propiedad `top` accedemos a la pagina que está por encima de todos los frames  
    Podemos acceder a un frame concreto por su nombre.  

    ```javascript
    <iframe name="myframe" src="about:blank" />
    >>> window.frames[0]
    >>> frames[0].window.location.reload()
    >>> frames[0].parent === window
    true
    >>> window.frames[0].window.top === window
    true
    >>> self === window
    true
    >>> window.frames['myframe'] === window.frames[0]
    true
    ```

    - [`window.screen`](https://developer.mozilla.org/en/DOM/window.screen) ofrece info sobre la pantalla (general, fuera del browser)

    ```javascript
    >>> window.screen.colorDepth
    32
    >>> screen.width
    1440
    >>> screen.availWidth
    1440
    >>> screen.height
    900
    >>> screen.availHeight
    847
    ```

- Algunos de los _métodos_ que tenemos disponibles en `window` son:

    - [`window.open()`](https://developer.mozilla.org/en/DOM/window.open), [`window.close()`](https://developer.mozilla.org/en/DOM/window.close) nos permiten abrir (y cerrar) nuevas ventanas (popups)  
    `window.open()` devuelve una referencia a la ventana creada (si devuelve false es que no la ha podido crear - popups blocked)  
    No se recomienda su uso ;-)


    ```javascript
    >>> var win = window.open('http://www.packtpub.com', 'packt',
    'width=300,height=300,resizable=yes');
    >>> win.close()
    ```

    - [`window.moveTo()`](https://developer.mozilla.org/en/DOM/window.moveTo), [`window.moveBy()`](https://developer.mozilla.org/en/DOM/window.moveBy), [`window.resizeTo()`](https://developer.mozilla.org/en/DOM/window.resizeTo), [`window.resizeBy()`](https://developer.mozilla.org/en/DOM/window.resizeBy) nos permiten mover y redimensionar las ventanas  
    No se recomienda su uso ;-)

    ```javascript
    >>> window.moveTo(100, 100)
    >>> window.moveBy(10, -10)
    >>> window.resizeTo(300, 300)
    >>> window.resizeBy(20, 10)
    ```

    - [`window.alert()`](https://developer.mozilla.org/en/DOM/window.alert), [`window.prompt()`](https://developer.mozilla.org/en/DOM/window.prompt), [`window.confirm()`](https://developer.mozilla.org/en/DOM/window.confirm) nos permiten interactuar con el usuario a traves de mensajes del sistema

    ```javascript
    if (confirm('Are you sure you want to delete this item?')) {
    // delete
    } else {
    // abort
    }
    >>> var answer = prompt('And your name was?');
    console.log(answer);
    ```
    
    - [`window.setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers.setTimeout), [`window.setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers.setInterval) nos permiten ejecutar código después de un intervalo de tiempo (y en su caso, repetirlo)

    ```javascript
    >>> function boo(){alert('Boo!');}
    >>> setTimeout(boo, 2000);
    >>> var id = setTimeout(boo, 2000);
    >>> clearTimeout(id);
    >>> function boo() { console.log('boo') };
    >>> var id = setInterval( boo, 2000 );
    boo
    boo
    boo
    >>> clearInterval(id)
    var id = setInterval( "alert('boo, boo')", 2000 );
    var id = setInterval( function(){ alert('boo, boo')}, 2000 );
    ```

    - [`window.document`](https://developer.mozilla.org/en/DOM/window.document) es un objeto del BOM con info sobre el documento actual
    Todos los métodos y propiedades que estan dentro de window.document pertenecen a la categoría de objetos DOM

## DOM
<sup>[http://www.ibm.com/developerworks/xml/tutorials/x-udom/](http://www.ibm.com/developerworks/xml/tutorials/x-udom/)</sup>  

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

### [Accediendo a los nodos](http://www.elated.com/articles/looking-inside-dom-page-elements/)

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

### [Modificando los nodos](http://www.elated.com/articles/changing-page-elements-with-the-dom/)

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

<sup>[http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-ElementCSSInlineStyle](http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-ElementCSSInlineStyle)</sup>

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

### Creando y Eliminando nodos

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

### Objetos DOM sólo de HTML

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
