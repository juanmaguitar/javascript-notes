# AJAX

<sub>[http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/](http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/)</sub>  
<sub>[https://developer.mozilla.org/en/ajax](https://developer.mozilla.org/en/ajax)</sub>  
<sub>[http://www.fiftyfoureleven.com/resources/programming/xmlhttprequest/examples](http://www.fiftyfoureleven.com/resources/programming/xmlhttprequest/examples)</sub>  

- It groups a set of technologies which main focus are the asynchronous requests to the server through the object `XMLHttpRequest()` (XHR)  
<sub>[http://www.w3.org/TR/XMLHttpRequest/](http://www.w3.org/TR/XMLHttpRequest/)  </sub>  
<sub>[http://www.xml.com/pub/a/2005/02/09/xml-http-request.html](http://www.xml.com/pub/a/2005/02/09/xml-http-request.html)  </sub>

    The application of this technology started the so called AJAX apps, where you don't need to refresh the page to get new content.

![AJAX](https://raw.githubusercontent.com/juanmaguitar/javascript-notes/master/markdown-en/14-AJAX/img/ajax.png)

- AJAX stands for **Asynchronous JavaScript + XML**:
    - _Asynchronous_ because after doing the HTTP request it doesn't need to wait for an answer, but can continue doing things and be notified when the answer comes
    - _JavaScript_ because we create XHR objects with Javascript
    - _XML_ because initially it was the standard format for data exchange. Actually a HTTP request usually returns JSON (or HTML)

- The greatest limitation of an AJAX request is that [it cannot access data from a different domain](https://github.com/juanmaguitar/training-frontend-docs/tree/master/same_origin_policy) al que estamos (_cross-domain_)  
    Pero hay maneras de solucionar este problema: [_JSONP_](https://github.com/juanmaguitar/javascript-notes/tree/master/markdown-en/15-same-origin-policy/JSONP) y [_CORS_](https://github.com/juanmaguitar/javascript-notes/tree/master/markdown-en/15-same-origin-policy/CORS)


## AJAX with jQuery

<sub>[http://blogs.sitepoint.com/ajax-jquery/](http://blogs.sitepoint.com/ajax-jquery/)</sub>  
<sub>[http://jqfundamentals.com/chapter/ajax-deferreds](http://jqfundamentals.com/chapter/ajax-deferreds)</sub>

```javascript
$.ajax({
    url: 'ajax/test.html',
    success: function(data) {
        $('.result').html(data);
        alert('Load was performed.');
    }
});
```

- With jQuery we can perform our AJAX request with the method [`$.ajax()`](http://api.jquery.com/jQuery.ajax/)

- The `$.ajax()` method returns a [`jqXHR`](http://api.jquery.com/jQuery.ajax/#jqXHR) object that is an enhanced version of the native object `XMLHttpRequest`

- The method `$.ajax()` expects the parameters of our AJAX request that are, among others:
    
    - **url** : The URL where we do the request

    - **type**: The type of request, `POST` or  `GET` (by default)  
        `GET` request are normally used to receive data (because they can be cached)  
        `POST` request are normally used to send data to the server
    
    - **data** : The data sent to the server
    
    - **dataType**: The type of data we expect to receive from the server (json, html, xml, jsonp, …)

- We can also pass to `$.ajax()` a few callback functions that will be executed depending on the result of the request
    
    - **success**: The function we want to execute when we receiving the answer.  
        If the received data are in JSON format, the function receive them directly converted to Javascript objecto
        Besides the received data, this function also receives the status of the request and the `jqXHR` object that handles the request

    - **error**: This function will be executed if the request fails.  
        Besides the received data, this function also receives the `jqXHR` object that handles the request and the error

    - **complete**: This function will be executed when the request finishes.
        This function also receives the `jqXHR` object that handles the request and the error or success of the operation
    
    - **beforeSend**: This function will be executed before doing the request
        This function also receives the `jqXHR` object that handles the request and the parameters of the request
    
    - **dataFilter**: This function is executed inmediately after the succesfully reception of the data
        This function receives the received data and the value of `dataType` and whatever it returns, it goes to the `success` callback