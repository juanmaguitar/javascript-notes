# Patrones de Diseño

<sub>[http://vimeo.com/44094122](http://vimeo.com/44094122)</sub>    
<sub>[https://github.com/shichuan/javascript-patterns/tree/master/design-patterns](https://github.com/shichuan/javascript-patterns/tree/master/design-patterns)</sub>  

## Patrón Singleton 
_[creación de objetos]_

<sub>[http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)  </sub>  
<sub>[http://www.pixelovers.com/patrones-diseno-javascript-patron-singleton-1698384](http://www.pixelovers.com/patrones-diseno-javascript-patron-singleton-1698384)  </sub>  
<sub>[https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/singleton.html](https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/singleton.html)  </sub>  

La idea general de este patrón es la de asegurar que una clase genera una única instancia, es decir, limitar la instanciación de una clase a un único objeto

```javascript
var mySingleton = (function () {
    // Instance stores a reference to the Singleton
    var instance;
    function init() {
        // Singleton
        // Private methods and variables
        function privateMethod(){
            console.log( "I am private" );
        }
        var privateVariable = "Im also private";
        return {
            // Public methods and variables
            publicMethod: function () {
                console.log( "The public can see me!" );
            },
            publicProperty: "I am also public"
        };
    };

    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {
            if ( !instance ) {
                instance = init();
            }
            return instance;
        }
    };
})();

// Usage:
>>> var singleA = {}, singleB = {};
>>> singleA === singleB
false
>>> singleA = mySingleton.getInstance()
>>> singleB = mySingleton.getInstance()
>>> singleA === singleB
true
```

## Patrón Factory 
_[creación de objetos]_

<sub>[http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)</sub>  
<sub>[https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/factory.html](https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/factory.html)</sub>  

- El objetivo de este patrón es el de crear objetos
- En vez de crear objetos directamente con new, utilizaremos un objeto Factory al que le pediremos que tipo de objeto queremos y éste objeto lo instanciará y nos lo devolverá
- Este patrón es util en las siguientes situaciones:
    - Cuando necesitamos repetir operaciones al crear objetos similares
    - Cuando necesitamos generar diferentes instancias de objetos dependiendo del entorno
    - Cuando trabajamos con pequeños objetos o componentes que comparten las mismas
    propiedades

```javascript
// Types.js - Constructors used behind the scenes
// A constructor for defining new cars
function Car( options ) {
    // some defaults
    this.doors = options.doors || 4;
    this.state = options.state || "brand new";
    this.color = options.color || "silver";
}

// A constructor for defining new trucks
function Truck( options){
    this.state = options.state || "used";
    this.wheelSize = options.wheelSize || "large";
    this.color = options.color || "blue";
}

// FactoryExample.js
// Define a skeleton vehicle factory
function VehicleFactory() {}

// Define the prototypes and utilities for this factory
// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function ( options ) {
    if( options.vehicleType === "car" ){
        this.vehicleClass = Car;
    }else{
        this.vehicleClass = Truck;
    }
    return new this.vehicleClass( options );
};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle( {
    vehicleType: "car",
    color: "yellow",
    doors: 6 } );

// Test to confirm our car was created using the vehicleClass/prototype Car
// Outputs: true
console.log( car instanceof Car );
// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log( car );
```


_Approach #1: Modify a VehicleFactory instance to use the Truck class_

```javascript
var movingTruck = carFactory.createVehicle( {
    vehicleType: "truck",
    state: "like new",
    color: "red",
    wheelSize: "small" } );

// Test to confirm our truck was created with the vehicleClass/prototype Truck
// Outputs: true
console.log( movingTruck instanceof Truck );

// Outputs: Truck object of color "red", a "like new" state
// and a "small" wheelSize
console.log( movingTruck );
```

_Approach #2: Subclass VehicleFactory to create a factory class that builds Trucks_

```javascript
function TruckFactory () {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;
var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle( {
    state: "omg..so bad.",
    color: "pink",
    wheelSize: "so big" } );

// Confirms that myBigTruck was created with the prototype Truck
// Outputs: true
console.log( myBigTruck instanceof Truck );

// Outputs: Truck object with the color "pink", wheelSize "so big"
// and state "omg. so bad"
console.log( myBigTruck );
```

## Patrón Iterator

<sub>[https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/iterator.html](https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/iterator.html)</sub>  

- El objetivo de este patrón es el de encapsular la lógica para recorrer los datos de un objeto
- En el patron Iterator nuestro objeto necesita proporcionar un metodo next() que nos
devuelva el siguiente elemento de la secuencia
- Tambien se suele proporcionar en este objeto el método hasNext() para verificar si hemos llegado al final de la secuencia de datos

```javascript
var agg = (function () {
    var index = 0,
        data = [1, 2, 3, 4, 5],
        length = data.length;

    return {
        next: function () {
            var element;
            if (!this.hasNext()) {
                return null;
            }
            element = data[index];
            index = index + 2;
            return element
        },
        hasNext: function () {
            return index < length;
        }
    };
}());

// this loop logs 1, then 3, then 5
while (agg.hasNext()) {
    console.log(agg.next());
}
```

## Patrón Mixins 
_[estructura, sub‐classing, code re‐use]_

<sub>[http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#mixinpatternjavascript](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#mixinpatternjavascript)</sub>  

- Los Mixins son una manera de recolectar funcionalidades a traves de las extensiones
- Los Mixins los podemos considerar objetos cuyos atributos y metodos pueden ser compartidos por otros objetos prototipos.

```javascript
var myMixins = {
    moveUp: function(){
        console.log( "move up" );
    },
    moveDown: function(){
        console.log( "move down" );
    },
    stop: function(){
        console.log( "stop! in the name of love!" );
    }
};

// A skeleton carAnimator constructor
function carAnimator(){
    this.moveLeft = function(){
        console.log( "move left" );
    };
}

// A skeleton personAnimator constructor
function personAnimator(){
    this.moveRandomly = function(){ /*..*/ };
}

// Extend both constructors with our Mixin
_.extend( carAnimator.prototype, myMixins );
_.extend( personAnimator.prototype, myMixins );

// Create a new instance of carAnimator
var myAnimator = new carAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();
// Outputs:
// move left
// move down
// stop! in the name of love!
```

## Patrón Decorator 
_[estructura, sub-classing, code re-use]_

<sub>[http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript)</sub>  
- El patron Decorator se centra en cómo extender las funcionalidades de los objetos
- Con el patrón Decorator podemos añadir/sobreescribir dinamicamente comportamiento a los métodos existentes de un objeto

_Ejemplo: Decorating Constructors With New Functionality_
```javascript
// A vehicle constructor
function vehicle( vehicleType ){
// some sane defaults
this.vehicleType = vehicleType || "car";
this.model = "default";
this.license = "00000-000";
}

// Test instance for a basic vehicle
var testInstance = new vehicle( "car" );
console.log( testInstance );
// Outputs:
// vehicle: car, model:default, license: 00000-000
// Lets create a new instance of vehicle, to be decorated
var truck = new vehicle( "truck" );
// New functionality we're decorating vehicle with
truck.setModel = function( modelName ){
this.model = modelName;
};
truck.setColor = function( color ){
this.color = color;
};
// Test the value setters and value assignment works correctly
truck.setModel( "CAT" );
truck.setColor( "blue" );
console.log( truck );
// Outputs:
// vehicle:truck, model:CAT, color: blue
// Demonstrate "vehicle" is still unaltered
var secondInstance = new vehicle( "car" );
console.log( secondInstance );
// Outputs:
// vehicle: car, model:default, license: 00000-000
```

_Example 2: Decorating Objects With Multiple Decorators_
```javascript
// The constructor to decorate
function MacBook() {
    this.cost = function () { return 997; };
    this.screenSize = function () { return 11.6; };
}

// Decorator 1
function Memory( macbook ) {
    var v = macbook.cost();
    macbook.cost = function() {
        return v + 75;
    };
}

// Decorator 2
function Engraving( macbook ){
    var v = macbook.cost();
    macbook.cost = function(){
        return v + 200;
    };
}

// Decorator 3
function Insurance( macbook ){
    var v = macbook.cost();
    macbook.cost = function(){
        return v + 250;
    };
}

var mb = new MacBook();
Memory( mb );
Engraving( mb );
Insurance( mb );

// Outputs: 1522
console.log( mb.cost() );
// Outputs: 11.6
console.log( mb.screenSize() );
```


## Patrón Façade

- El objetivo del patron _Façade_ es simplificar la interfaz (los metodos/propiedades "públicos") ocultando el código complejo. Tambien se utiliza para desacoplar nuestro código de las API's de librerias externas

```javascript
var addMyEvent = function( el,ev,fn ){
    if( el.addEventListener ){
        el.addEventListener( ev,fn, false );
    }else if(el.attachEvent){
        el.attachEvent( "on" + ev, fn );
    } else{
        el["on" + ev] = fn;
    }
};
```


```javascript
var module = (function() {
    var _private = {
        i:5,
        get : function() {
            console.log( "current value:" + this.i);
        },
        set : function( val ) {
            this.i = val;
        },
        run : function() {
            console.log( "running" );
        },
        jump: function(){
            console.log( "jumping" );
        }
    };
    return {
        facade : function( args ) {
            _private.set(args.val);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    };
}());

// Outputs: "running", 10
module.facade( {run: true, val:10} );
```

## Patrón Observer – Subscriber/Publisher
<sub>[http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)</sub>  
<sub>[http://www.jspatterns.com/book/7/observer.html](http://www.jspatterns.com/book/7/observer.html)</sub>  


- El principal objetivo de este patrón es el de desacoplar las partes de un código.
- En vez de tener un objeto llamando al método de otro objeto, con este patron un objeto se subscribe a la actividad de otro objeto y recibe una notificación cuando esta actividad se produce.

                                    Subscriber = Observer
                                    Publisher = Subject

```javascript
var publisher = {
        subscribers: {
        any: [] // event type: subscribers
    },
    subscribe: function (fn, type) {
        type = type || 'any';
        if (typeof this.subscribers[type] === "undefined") {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(fn);
    },
    unsubscribe: function (fn, type) {
        this.visitSubscribers('unsubscribe', fn, type);
    },
    publish: function (publication, type) {
        this.visitSubscribers('publish', publication, type);
    },
    visitSubscribers: function (action, arg, type) {
        var pubtype = type || 'any',
        subscribers = this.subscribers[pubtype],
        i,
        max = subscribers.length;
        for (i = 0; i < max; i += 1) {
            if (action === 'publish') {
                subscribers[i](arg);
            } else {
                if (subscribers[i] === arg) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
};
```

```javascript
var s1 = {log: console.log},
    s2 = {err: console.error},
    s3 = {warn: console.warn};

publisher.subscribe(s1.log);
publisher.subscribe(s2.err);
publisher.subscribe(s3.warn);
publisher.publish({hello: "World"});
publisher.unsubscribe(s2.err);
publisher.publish("hello");
publisher.subscribe(s1.log, "log");
publisher.publish({obj: "log this object"}, "log");
```

```javascript
function makePublisher(o) {
    var i;
    for (i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
            o[i] = publisher[i];
        }
    }
    o.subscribers = {any: []};
}

var paper = {
    daily: function () {
        this.publish("big news today");
    },
    monthly: function () {
        this.publish("interesting analysis", "monthly");
    }
};

makePublisher(paper);
var joe = {
    drinkCoffee: function (paper) {
        console.log('Just read ' + paper);
    },
    sundayPreNap: function (monthly) {
        console.log('About to fall asleep reading this ' + monthly);
    }
};

paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');
paper.daily();
paper.daily();
paper.daily();
paper.monthly();
makePublisher(joe);

joe.tweet = function (msg) {
    this.publish(msg);
};
paper.readTweets = function (tweet) {
    alert('Call big meeting! Someone ' + tweet);
};

joe.subscribe(paper.readTweets);
joe.tweet("hated the paper today");
```

## Patrón Mediator
<sub>[http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#mediatorpatternjavascript](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#mediatorpatternjavascript)  </sub>  
<sub>[https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/mediator.html](https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/mediator.html)  </sub>  

- El patrón _Mediator_ es un patrón de comportamiento que nos permite utilizar una unica interfaz a traves de la cual se pueden comunciar las diferentes partes de un sistema (ej. torre control aeropuerto)
- En Javascript este patron se suele implementar como un objeto compartido a traves del cual los otros objetos (modulos) de nuestro sistema se pueden comunicar (patron _Observer_ centralizado)

```javascript
var mediator = (function(){

    // Storage for topics that can be broadcast or listened to
    var topics = {};

    // Subscribe to a topic, supply a callback to be executed
    // when that topic is broadcast to
    var subscribe = function( topic, fn ){
        if ( !topics[topic] ){
            topics[topic] = [];
        }
        topics[topic].push( { context: this, callback: fn } );
        return this;
    };

    // Publish/broadcast an event to the rest of the application
    var publish = function( topic ){
        var args;
        if ( !topics[topic] ){
            return false;
        }
        args = Array.prototype.slice.call( arguments, 1 );
        for ( var i = 0, l = topics[topic].length; i < l; i++ ) {
            var subscription = topics[topic][i];
            subscription.callback.apply( subscription.context, args );
        }
        return this;
    };

    return {
        Publish: publish,
        Subscribe: subscribe,
        installTo: function( obj ){
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };

}());
```