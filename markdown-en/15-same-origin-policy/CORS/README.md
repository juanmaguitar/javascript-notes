# CORS

<sub>[http://enable-cors.org/](http://enable-cors.org/)</sub>  
<sub>[http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/](http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/)</sub>  
<sub>[http://www.w3.org/TR/cors/](http://www.w3.org/TR/cors/)</sub>

**Cross-Origin Resource Sharing** (CORS) allow us to do requests to other domains when the target domain (server) agrees to receive requests from the source domain

It's a technology ([W3C specification](http://www.w3.org/TR/cors/)) [implemented in modern browsers](http://caniuse.com/#feat=cors), that exchange certain HTTP headers with the target server to check if it should allow the data interchange

Every time more and more [public API's](http://enable-cors.org/resources.html#apis) [allow CORS](http://www.w3.org/wiki/CORS_Enabled#Who_is_doing_it_already.3F) but most of them only offer [JSONP](http://www.programmableweb.com/category/all/apis?data_format=21174).

## Simple CORS requests

- with **jQuery**

    <sub>[Ejemplo CORS request (HTML)](http://jsfiddle.net/juanma/rL7o58rr/)</sub>  
    <sub>[Ejemplo CORS request (JSON)](http://jsfiddle.net/juanma/w1bbehqz/)</sub>

    A CORS request using jQuery is, in most of the cases, transparent to the client, because if [it's supported on our browsers](https://test-cors.appspot.com/#technical) and the server ([GitHub](https://developer.github.com/v3/#cross-origin-resource-sharing) for example) is ready for it, it could as simple as this

    ```javascript
    $.ajax({
        url: "https://api.github.com/users/juanmaguitar/repos",
        success: function( response_json ) {
            console.info (response_json);
        }
    });
    ```



    https://remysharp.com/2011/04/21/getting-cors-working
    http://pixelsvsbytes.com/blog/2011/12/ajax-cross-domain-requests-with-cors/

    http://www.html5rocks.com/en/tutorials/file/xhr2/#toc-cors

    https://remysharp.com/2011/04/21/getting-cors-working
    https://remysharp.com/2013/01/14/cors-isnt-just-for-xhr

    http://www.eriwen.com/javascript/how-to-cors/   
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS  

    http://client.cors-api.appspot.com/client  
    http://www.html5rocks.com/en/tutorials/cors/?redirect_from_locale=es  
    http://www.eriwen.com/javascript/how-to-cors/  
    http://enable-cors.org/  
    https://developers.google.com/api-client-library/javascript/features/cors  