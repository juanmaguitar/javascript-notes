# El entorno del Navegador

<sub>[http://www.saregune.net/ikasi/hezigune/curso.php?curso=javascript&leccion=js_intro_dom](http://www.saregune.net/ikasi/hezigune/curso.php?curso=javascript&leccion=js_intro_dom)</sub>  
<sub>[http://vkanakaraj.wordpress.com/2009/12/18/javascript-vs-dom-vs-bom-relationship-explained/](http://vkanakaraj.wordpress.com/2009/12/18/javascript-vs-dom-vs-bom-relationship-explained/)</sub>  
<sub>[http://javascript.about.com/od/byexample/a/Javascript-By-Example_2.htm](http://javascript.about.com/od/byexample/a/Javascript-By-Example_2.htm)</sub>  
<sub>[http://stackoverflow.com/questions/4416317/what-is-the-dom-and-bom-in-javascript](http://stackoverflow.com/questions/4416317/what-is-the-dom-and-bom-in-javascript)</sub>  

- Javascript puede ser utilizado en [diferentes entornos](http://en.wikipedia.org/wiki/JavaScript#Uses_outside_web_pages), pero [su entorno más habitual es el navegador](https://developer.mozilla.org/en/JavaScript_technologies_overview)  

- El código Javascript de una pagina tiene acceso a unos cuantos objetos. Estos objetos los podemos agrupar en:
    - Objetos que tienen relación con la pagina cargada (el document). Estos objetos conforman el **[Document Object Model (DOM)](https://github.com/juanmaguitar/training-frontend-docs/tree/master/entorno_navegador/DOM)**
    - Objetos que tienen que ver con cosas que están fuera de la pagina (la ventana del navegador y la pantalla). Estos objetos conforman el **[Browser Object Model (BOM)](https://github.com/juanmaguitar/training-frontend-docs/tree/master/entorno_navegador/BOM)**

- El DOM es un standard y tiene varias versiones (llamadas levels). La mayoria de los navegadores implementan casi por completo el DOM Level 1.  
<sub>[http://www.quirksmode.org/compatibility.html](http://www.quirksmode.org/compatibility.html)</sub>  
<sub>[http://www.webdevout.net/browser-subport-dom](http://www.webdevout.net/browser-subport-dom)</sub>

- El BOM no es un standard, asi que algunos objetos están soportados por la mayoría de navegadores y otros solo por algunos.


## [Deteccion de Funcionalidades](https://developer.mozilla.org/en/Browser_Detection_and_Cross_Browser_Support)

<sub>[http://stackoverflow.com/questions/1173165/how-to-guess-browser-compatibility-based-upon-dom-level](http://stackoverflow.com/questions/1173165/how-to-guess-browser-compatibility-based-upon-dom-level)</sub>  

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

- La mejor solucion para detectar funcionalidades de nuestro navegador es hacer [**Feature Sniffing**](http://www.quirksmode.org/js/subport.html), es decir chequear la existencia del objeto (método, array o propiedad) que queremos utilizar  

```javascript
if (typeof window.addEventListener === 'function') {
    // feature is subported, let's use it
} else {
    // hmm, this feature is not subported, will have to
    // think of another way
}
```


