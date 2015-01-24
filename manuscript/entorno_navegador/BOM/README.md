# BOM

- El **BOM (Browser Object Model)** lo conforman todos los objetos que están fuera del documento cargado (document) y forman parte del objeto window

![BOM](https://raw.github.com/juanmaguitar/training-frontend-docs/master/entorno_navegador/img/bom.png)

- El objeto `window` ademas de servir de contenedor de las variables globales y de ofrecer los metodos nativos de JS (`window.parseInt`), contiene informacion sobre el entorno del navegador (frame, iframe, popup, ventana o pestaña)

## Propiedades de `window`

Algunos de los _objetos_ que tenemos disponibles en window son:

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

## Métodos de `window`

Algunos de los _métodos_ que tenemos disponibles en `window` son:

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

## El objeto 'document'

[`window.document`](https://developer.mozilla.org/en/DOM/window.document) es un objeto del BOM con info sobre el documento actual
Todos los métodos y propiedades que estan dentro de window.document pertenecen a la categoría de objetos DOM
