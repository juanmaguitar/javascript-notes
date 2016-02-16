# DOM
<sub>[http://www.ibm.com/developerworks/xml/tutorials/x-udom/](http://www.ibm.com/developerworks/xml/tutorials/x-udom/)</sub>  

- The **[DOM (Document Object Model)](http://www.w3.org/DOM/)** is a way of representing a HTML document (or XML) like a tree of nodes.  
By using DOM methods and properties we can access the page elements, modify them, remove them or adding new ones

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

- In the _[DOM Level 1](http://www.w3.org/TR/DOM-Level-1/)_ there's a difference between: 
    - The **Core DOM** is the common especification that is applied in all the documents (XML, HTML,…)
    - The **Core HTML** is the especification that is applied only in the HTML documents

## [Accesing the nodes](http://www.elated.com/articles/looking-inside-dom-page-elements/)

```html
<body>
    <p class="opener">first paragraph</p>
    <p><em>second</em> paragraph</p>
    <p id="closer">final</p>
    <!-- and that's about it -->
</body>
```

- The [`document`](https://developer.mozilla.org/en/DOM/document) node gives us access to the document (the starting point)

- All nodes have the following properties:
    - [`nodeType`](https://developer.mozilla.org/en/nodeType): There are 12 types of nodes represented by numbers(1=element, 2=attribute, 3=text, ...)
    - [`nodeName`](https://developer.mozilla.org/en/nodename): For HTML tags is the name of the tag and for text nodes is #text
    - [`nodeValue`](https://developer.mozilla.org/en/nodevalue): For text nodes will be the text

- The node `documentElement` is the root node. For HTML documents is the `<html>` tag

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

- Every node can have children-nodes:
    - [`hasChildNodes()`](https://developer.mozilla.org/en/DOM/element.hasChildNodes) : This methos will return _true_ if the node has children-nodes
    - [`childNodes`](https://developer.mozilla.org/En/DOM/Node.childNodes): Return an array of all the children-nodes of an element.  
    Because of being an array we can figure out the number of children-nodes with `childNodes.length`
    - [`parentNode`](https://developer.mozilla.org/En/DOM/Node.parentNode): Return us the father-node of a children-node

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

- We can check the existance of attributes and accesing to their [attributes](https://developer.mozilla.org/En/DOM/Node.attributes):
    - [`hasAttributes()`](https://developer.mozilla.org/En/DOM/Node.hasAttributes): Return true if the element has attributes
    - [`getAttribute()`](https://developer.mozilla.org/en/DOM/element.getAttribute): Return the content of an attribute  

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

- We can access the content of a tag:
    - [`textContent`](https://developer.mozilla.org/En/DOM/Node.textContent): This property give us the plain text inside of a tag
    In IE this property doesn't exists (we have to use _innerText_)  
    - [`innerHTML`](https://developer.mozilla.org/en/DOM/element.innerHTML): This property gives us the content (in HTML) inside of a tag

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

- We can [directly access to some elements](http://www.elated.com/articles/javascript-retrieving-page-elements-via-the-dom/) without the need of going over all the tre:
    - [`getElementsByTagName()`](https://developer.mozilla.org/en/DOM/element.getElementsByTagName): Return an array with all the elements with the _tag_ passed as a parameter
    - [`getElementsByName()`](https://developer.mozilla.org/en/DOM/document.getElementsByName): Return an array with all the elements with the name passed as a parameter
    - [`getElementById()`](getElementById()): Return an element with the ID passed as a parameter

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

- From a node we can access its brothers and the first and last of its children
    - [`nextSibling`](https://developer.mozilla.org/En/DOM/Node.nextSibling): Return the next brother
    - [`previousSibling`](https://developer.mozilla.org/En/DOM/Node.previousSibling): Return the previous brother
    - [`firstChild`](https://developer.mozilla.org/En/DOM/Node.firstChild): Return the first child
    - [`lastChild`](https://developer.mozilla.org/En/DOM/Node.lastChild): Return the last child

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

## [Modifying los nodos](http://www.elated.com/articles/changing-page-elements-with-the-dom/)

- To change the content of a tag we can change the content of innerHTML

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

- The elements has the property [`style`](https://developer.mozilla.org/en/DOM/element.style) that we can use to modify its styles

<sub>[http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-ElementCSSInlineStyle](http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-ElementCSSInlineStyle)</sub>

```javascript
>>> my.style.border = "1px solid red";
"1px solid red"
```

- We can also modify attributes wether they exist or not
Example:

```javascript
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


## Creating and modifying nodes

- To create new elements we can use the methods [`createElement`](https://developer.mozilla.org/en/DOM/document.createElement) and
[`createTextNode`](https://developer.mozilla.org/en/DOM/document.createTextNode).  
    Once they're created we can add them to the DOM with [`appendChild`](https://developer.mozilla.org/En/DOM/Node.appendChild)

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

- We can also copy existent elements with [`cloneNode()`](https://developer.mozilla.org/En/DOM/Node.cloneNode)
    `cloneNode` accept a boolean parameter (_true_ copy the node with all its children and _false_ only copy the node)

```javascript
>>> var el = document.getElementsByTagName('p')[1];
<p><em>second</em> paragraph</p>
>>> document.body.appendChild(el.cloneNode(false))
>>> document.body.appendChild(document.createElement('p'));
>>> document.body.appendChild(el.cloneNode(true))
```

- With [`insertBefore()`](https://developer.mozilla.org/en-US/docs/Web/API/Node.insertBefore) we can especify the element after which we want to instert ours

```javascript
document.body.insertBefore(
    document.createTextNode('boo!'), 
    document.body.firstChild
);
```

- To remove DOM nodes we can use [`removeChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node.removeChild) o [`replaceChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node.replaceChild)  
    `removeChild()` removes the elements and `replaceChild()` replace it by another one passed as parameter
    `replaceChild()` and `removeChild()` return the removed node

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

## DOM objects only for HTML

- In the DOM we have available a set of direct selectors and colections only for (not XML):
    - [`document.body`](https://developer.mozilla.org/en/DOM/document.body): `document.getElementsByTagName(‘body’)[0]`
    - [`document.images`](https://developer.mozilla.org/en/DOM/document.images): `document.getElementsByTagName(‘img’)`
    - [`document.applets`](https://developer.mozilla.org/en/DOM/document.applets):  `document.getElementsByTagName(‘applet’)`
    - [`document.links`](https://developer.mozilla.org/en/DOM/document.links): Return an array of all the links with aatribute `href`
    - [`document.anchors`](https://developer.mozilla.org/en/DOM/document.anchors): Return an array with all the links with attribute name
    - [`document.forms`](https://developer.mozilla.org/en/DOM/document.forms): `document.getElementsByTagName(‘form’)`  
    We can access the elements in the form (inputs, buttons) with `elements`

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

- We also have available the method [`document.write()`](https://developer.mozilla.org/en/document.write)   
    Its use is not recommended ;-)

- Some properties of the _document_ object are:
    - `document.cookies`: Contain a text string with the cookies associated to the document
    - [`document.title`](https://developer.mozilla.org/en/DOM/document.title): Allow us to change the title of the page that appears on the browser  
    This doesn't change the content of the `title` tag
    - [`document.referrer`](https://developer.mozilla.org/en/DOM/document.referrer): Contain the URL from where we came to the page
    - [`document.domain`](https://developer.mozilla.org/en/document.domain): Contain the domain of the page

## Advanced selection of elements

<sub>[http://mootools.net/slickspeed/](http://mootools.net/slickspeed/)</sub>  
<sub>[http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier](http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier)</sub>  
<sub>[http://www.quirksmode.org/css/contents.html](http://www.quirksmode.org/css/contents.html)</sub>  

- [`document.images`](https://developer.mozilla.org/en/DOM/document.images) : `document.getElementsByTagName(‘img’)` 

- [`rows`](https://developer.mozilla.org/en/DOM/table.rows) y [`cells`](https://developer.mozilla.org/en/DOM/HTMLTableRowElement) : Once we have a `table`element we can access its rows, and from  the rows we can access their cells with this selectors  

```javascript
 >>> oTable = document.getElementsByTagName(‘table’)[0];
 >>> aRows = oTable.rows;ñ
 >>> oFirstRow = aRows[0];
 >>> oLastRow = aRows[oRows.length-1];
 >>> aCells = oFirstRow.cells;
 >>> oFirstCell = aCells[0];
 >>> oLastCell = aCells[aCells.length-1];
```

- [`options`](https://developer.mozilla.org/en/DOM/HTMLSelectElement): From a [`select`](https://developer.mozilla.org/en/HTML/Element/select ) we can access the array of its  `options` 

```javascript
 >>> document.getElementsByTagName('select')[0].options;
 [option.windows, option.movil, option.aplicaciones-web, option.mac,
 option.linux, option.palm, option.pocketpc, option.blog]
```

- [`querySelector`](https://developer.mozilla.org/En/DOM/Element.querySelector) y [`querySelectorAll`](https://developer.mozilla.org/En/DOM/Element.querySelectorAll): Return DOM elments from a CSS selection  
    `querySelector()` return the first element found   
    `querySelectorAll()` return an array of elements   

    <sub>[http://javascript.nwbox.com/NWMatcher/release/test/css3-compat/](http://javascript.nwbox.com/NWMatcher/release/test/css3-compat/)</sub>

```javascript
 >>> oMyElem = document.querySelector("#myid");
 >>> aMyHiddenElems = document.body.querySelectorAll(".hidden");
```

- `$()` or [`jQuery()`](http://api.jquery.com/jQuery/): with jQuery we have a [powerful tool for selecting elements](http://sizzlejs.com/)
 
    <sub>[http://www.neeraj.name/2010/02/15/how-jquery-selects-elements-using-sizzle.html](http://www.neeraj.name/2010/02/15/how-jquery-selects-elements-using-sizzle.html)</sub>  
    <sub>[http://refcardz.dzone.com/refcardz/jquery-selectors](http://refcardz.dzone.com/refcardz/jquery-selectors)</sub>

    To obtain the elements we use `$()` o `jQuery()` by passing to it our [CSS selection](http://api.jquery.com/category/selectors/) between quotes

    `$()` return a [jQuery object](http://api.jquery.com/Types/#jQuery) (that is not a DOM element and it has access to its own jQuery methods)

    We can convert a jQuery object to DOM selection: 
    - For an element: `$('#container') -> $('#container')[0]`
    - For a group of elements: `$('.hidden') -> $('.hidden').toArray()` 

    We can also convert a DOM selection to jQuery object:
    - For an element: `document.getElementById('container') -> $(document.getElementById('container'))`
    - For a group of elements: `document.links -> $(document.links);`

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