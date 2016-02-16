# The Browser Environment

<sub>[http://www.saregune.net/ikasi/hezigune/curso.php?curso=javascript&leccion=js_intro_dom](http://www.saregune.net/ikasi/hezigune/curso.php?curso=javascript&leccion=js_intro_dom)</sub>  
<sub>[http://vkanakaraj.wordpress.com/2009/12/18/javascript-vs-dom-vs-bom-relationship-explained/](http://vkanakaraj.wordpress.com/2009/12/18/javascript-vs-dom-vs-bom-relationship-explained/)</sub>  
<sub>[http://javascript.about.com/od/byexample/a/Javascript-By-Example_2.htm](http://javascript.about.com/od/byexample/a/Javascript-By-Example_2.htm)</sub>  
<sub>[http://stackoverflow.com/questions/4416317/what-is-the-dom-and-bom-in-javascript](http://stackoverflow.com/questions/4416317/what-is-the-dom-and-bom-in-javascript)</sub>  

- Javascript can be used in [different environments](http://en.wikipedia.org/wiki/JavaScript#Uses_outside_web_pages), bit [its most usual environment is the browser](https://developer.mozilla.org/en/JavaScript_technologies_overview)  

- The Javascript code in a webpage has access to a few objects. These ojects can be grouped in:
    - Objects related to the loaded HTML page (the _document_). These objects form the **[Document Object Model (DOM)](https://github.com/juanmaguitar/javascript-notes/tree/master/markdown-en/11-browser-environment/DOM)**
    - Objects that are related with things that happen out of the page (the windows' browser and the screen). These objects form the **[Browser Object Model (BOM)](https://github.com/juanmaguitar/javascript-notes/tree/master/markdown-en/11-browser-environment/BOM)**

- DOM is a standard and it has several version (called _levels_). Most of the browsers implement almost in its majority the DOM Level 1.  
<sub>[http://www.quirksmode.org/compatibility.html](http://www.quirksmode.org/compatibility.html)</sub>  
<sub>[http://www.webdevout.net/browser-subport-dom](http://www.webdevout.net/browser-subport-dom)</sub>

- BOM is not a standard, so some objects are supported by the majority of the browsers and others only by a few ones.


## [Feature Detection](https://developer.mozilla.org/en/Browser_Detection_and_Cross_Browser_Support)

<sub>[http://stackoverflow.com/questions/1173165/how-to-guess-browser-compatibility-based-upon-dom-level](http://stackoverflow.com/questions/1173165/how-to-guess-browser-compatibility-based-upon-dom-level)</sub>  

- Because of these differences between browsers there's a need of finding out (from JS code) which features are available in our browser (DOM & BOM)

- A solution is the called [**Browser Sniffing**](http://en.wikipedia.org/wiki/Browser_sniffing) that consist in [detecting the browser we're using](http://www.quirksmode.org/js/detect.html)  

    This technique [is not recommended](http://blogs.sitepoint.com/why-browser-sniffing-stinks/) por:
    - Too many browsers to detect
    - [Hard to maintain](http://www.jibbering.com/faq/notes/detect-browser/) (new versions and new browser appear)
    - [String parsing can get messy](http://www.howtocreate.co.uk/tutorials/jsexamples/sniffer.html) and is not reliable 100%

```javascript
if (navigator.userAgent.indexOf('MSIE') !== -1) {
    // this is IE
} else {
    // not IE
}
```

- Best solution to detect features in our browser is doing [**Feature Sniffing**](http://www.quirksmode.org/js/subport.html), this is, checking the existance of the object (method, array or property) we want to use  

```javascript
if (typeof window.addEventListener === 'function') {
    // feature is subported, let's use it
} else {
    // hmm, this feature is not subported, will have to
    // think of another way
}
```


