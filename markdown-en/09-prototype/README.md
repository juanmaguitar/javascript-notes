#Prototype

All functions have a property `prototype` that initially contains an object

We can add properties and methods to this `prototype` object. We can also replace completely this object by another

When we create objects using a _constructor_ function (with `new`), these objects get a hidden link (`__proto__` in Firebug) that points to the _prototype_ of the constructor function ( _"clase"_ ) that allow them to access these properties and methods (_prototype_'s ones) as if they are theirs (_objects_)

The properties/methods owned by the object have more priority over the properties/methods with the same name in the prototype

```javascript

  function Person(gender) {
    this.gender = gender;
    console.log (this.gender + ' instantiated');
  }
  
  var person1 = new Person('Male');
  var person2 = new Person('Female');

  >>> person1.gender === 'Male'
  true
  >>> person2.gender === 'Female'
  true

  >>> Person.prototype.type = 'Human being';

  >>> person1.type === 'Human being'
  true
  >>> person2.type === 'Human being'
  true

  person1.type = 'Super Hero';

  >>> person1.type === 'Super Hero'
  true
  >>> person2.type === 'Human being'
  true

```

### Prototype chain

The objects have a thing called **the prototype chain**

  - If an object `foo` doesn't have a property `bar` when we do `foo.bar`, Javascript will look for that property in its `prototype` (the property `prototype` of the constructor function that created it)
  - If is not found there, it will be searched in the prototype of that prototype (the property `prototype` of the constructor function that created that `prototype` object)
  - And so on, until reaching the object at the highest level, the `Object` object
  

  ![prototype chain](https://raw.githubusercontent.com/juanmaguitar/javascript-notes/master/markdown-en/09-prototype/img/prototype.png)
  
```javascript

  function Person(gender) {
    this.gender = gender;
    this.shoutGender = function () {
      return this.gender.toUpperCase();
    }
  }
  
  Person.prototype.sayGender = function() {
    return this.gender;
  };
  
  var person1 = new Person('Male');
  
  >>> person1.sayGender() === "Male"
  true
  >>> person1.shoutGender() === "MALE"
  true
  
  >>> var genderTeller = person1.sayGender;
  
  >>> genderTeller() === "Male"
  false
  >>> genderTeller === person1.sayGender
  true
  >>> genderTeller === Person.prototype.sayGender
  true
  
  >>> var Obj = {gender : 'Male'}
  
  >>> genderTeller.call(Obj) === "Male"
  true
    
  >>> var person2 = new Person('Female');
  >>> Person.prototype.shoutGender = function () {
    return "From the Class, you’re " + this.gender.toUpperCase();
  }
  
  >>> person1.shoutGender() === "MALE"
  true
  >>> person2.shoutGender() === "FEMALE"
  true
  
  >>> delete person1.shoutGender
  true
  
  >>> person1.shoutGender() === "MALE"
  false
  >>> person2.shoutGender() === "FEMALE"
  true
  >>> person1.shoutGender() === "From the Class, you’re MALE"
  true
  
  >>> person1.shoutGender = function () {
  return "I'm person1 and I’m " + this.gender.toUpperCase();
  }
  
  >>> person1.shoutGender() === "From the Class, you’re MALE"
  false
  >>> person1.shoutGender() === "I'm person1 and I’m MALE"
  true
  >>> person2.shoutGender() === "FEMALE"
  true
```
  
### The _hasOwnProperty()_ method

When we loop through the properties of an object with `for-in` we loop through :

  - The object own's properties
  - All the properties accesible through the prototype chain
    
With the `hasOwnProperty()` method we can determine if the current property in the iteration is really a property of the object we're checking on.

```javascript
  function Gadget(name, color) {
    this.name = name;
    this.color = color;
    this.someMethod = function(){return 1;}
  }
  
  Gadget.prototype.price = 100;
  Gadget.prototype.rating = 3;
  
  var newtoy = new Gadget('webcam', 'black');
  
  >>> for (var prop in newtoy) { console.log(prop + ' = ' +
  newtoy[prop]); }
  
  name = webcam
  color = black
  someMethod = function () { return 1; }
  price = 100
  rating = 3
  
  >>> newtoy.hasOwnProperty('name');
  true
  
  >>> newtoy.hasOwnProperty('price');
  false
```

_… so, to loop through the object own's properties we can do :_

```javascript
  >>> for (var prop in newtoy) {
  if (newtoy.hasOwnProperty(prop))
  console.log(prop + ' = ' + newtoy[prop]);
  }
  
  name = webcam
  color = black
  someMethod = function () { return 1; }
```

### The _isPrototypeOf()_ method

Every object has the method `isPrototypeOf()` that tell us if an object is being used as _prototype_ of another

```javascript
  var monkey = {
    hair: true,
    feeds: 'bananas',
    breathes: 'air'
  };

  function Human(name) {
    this.name = name;
  }

  Human.prototype = monkey;

  >>> var george = new Human('George');
  >>> monkey.isPrototypeOf(george)
  true
```

### The [_constructor_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) property

The `constructor` of the `prototype` object of some constructor function (_"class"_), points to the constructor function

```javascript
  >>> function Dog(){this.tail = true;}
  
  >>>> Dog.prototype.constructor === Dog
  true
  
  >>>> Dog.prototype
  Dog {}
  
  >>> var myDog = new Dog()
  >>> myDog.__proto__
  Dog {}
  >>> myDog.__proto__.constructor === Dog
  true
```

<sub>[http://lab.la-grange.ca/en/javascript-prototypes-as-abstract-objects](http://lab.la-grange.ca/en/javascript-prototypes-as-abstract-objects)</sub>  
<sub>[https://howtonode.org/prototypical-inheritance](https://howtonode.org/prototypical-inheritance)</sub>  
<sub>[http://jpsierens.com/what-are-javascript-prototypes/](http://jpsierens.com/what-are-javascript-prototypes/)</sub>  
<sub>[https://www.webreflection.co.uk/blog/2015/11/07/the-history-of-simulated-classes-in-javascript](https://www.webreflection.co.uk/blog/2015/11/07/the-history-of-simulated-classes-in-javascript)</sub>  

### Sustituyendo completamente el _prototype_

La cadena de prototipos es dinámica excepto cuando sustituimos completamente el objeto `prototype`

```javascript
  >>> function Dog(){this.tail = true;}
  >>> var benji = new Dog();
  >>> var rusty = new Dog();
  
  >>> typeof(benji.say) === "function"
  false
  
  >>> Dog.prototype.say = function(){return 'Woof!';}
  
  >>> typeof(benji.say) === "function"
  true
  
  >>> benji.constructor === Dog
  true
  >>> typeof(benji.constructor.prototype.say) === "function"
  true
  >>> benji.constructor.prototype.tail === undefined
  true
```

_Si reescribimos el `prototype`
 con otro objeto perdemos la “dinamicidad” del prototipo…_

```javascript
  >>> Dog.prototype = {paws:4, hair:true};
  
  >>> benji.paws === undefined //old instance cannot locate new prototype
  True
  >>> typeof(benji.say) === "function" //but still can access old prototype
  true
  
  >>> var lucy = new Dog()
  
  >>> lucy.paws !== undefined //new instance can locate new prototype
  true
  >>> lucy.say !== undefined  //but cannot access old prototype
  false

  >>> lucy.constructor === Object
  true
  >>> benji.constructor === Dog
  true
```

_…pero hay un comportamiento extraño_

```javascript
>>> lucy.constructor.prototype.paws === undefined // doesn’t exist?
true
>>> benji.constructor.prototype.paws === undefined // and here it does?
false
```

_Si hubiéramos hecho_

```javascript
>>> Dog.prototype = {paws:4, hair:true};
>>> Dog.prototype.constructor = Dog;
```

_…tendríamos lo que se espera_

```javascript
>>> lucy.constructor.prototype.paws === undefined // does exist!
false
>>> benji.constructor.prototype.paws === undefined // and here not!
true
```

Por tanto, siempre que sustituyamos completamente el `prototype` por otro objeto, conviene restituir el `constructor` de ese `prototype`