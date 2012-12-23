#Prototype

Todas las funciones tienen una propiedad `prototype` que contiene inicialmente un objeto  

Podemos añadir propiedades y métodos a este objeto `prototype`. También podemos reemplazarlo completamente por otro objeto

Al crear objetos usando una función como constructor (con `new), estos objetos adquieren un enlace secreto (`__proto__` en Firebug) que apunta al prototipo de esta función constructora (_"clase"_) lo que les permite acceder a sus propiedades (y métodos)
como si fueran propias.

Las propiedades propias del objetos tienen prioridad sobre las propiedades del prototipo con el mismo nombre

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

###Cadena de Prototipos

Los objetos disponen de lo que se llama la **cadena de prototipos**

  - Si un objeto `foo` no dispone de la propiedad `bar` al hacer `foo.bar`, Javascript buscará está propiedad en su prototipo (el de la función constructora que lo creó)
  - Si no lo encuentra ahí, lo buscará en el prototipo de su prototipo
  - Y asi hasta llegar al objeto de más alto nivel, el objeto `Object`
  
  ![cadena de prototipos](https://raw.github.com/juanmaguitar/training-frontend-docs/master/prototype/img/prototype.png)
    
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
  
###El metodo _hasOwnProperty()_

Cuando recorremos un objeto con un for-in pasamos por:

  - Las propiedades propias del objeto
  - Todas las propiedades accesibles a través de la cadena de prototipos
    
Con el método `hasOwnProperty()` podemos diferenciar las propiedades propias del objeto de las del prototipo

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

_… por tanto, para recorrer solamente las propiedades propias del objeto podemos hacer:_

```javascript
  >>> for (var prop in newtoy) {
  if (newtoy.hasOwnProperty(prop))
  console.log(prop + ' = ' + newtoy[prop]);
  }
  
  name = webcam
  color = black
  someMethod = function () { return 1; }
```
###El metodo _isPrototypeOf()_

Cada objeto dispone del método `isPrototypeOf()` que nos dice si un objeto en cuestión se está utilizando como prototipo de otro objeto

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

###La propiedad _constructor_

El `constructor` del objeto `prototype` de una función constructora (clase), apunta a la función constructora

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


###Sustituyendo completamente el _prototype_

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
  >>> typeof(benji.say) === "function" //but still can access old
  prototype
  true
  
  >>> var lucy = new Dog()
  
  >>> lucy.say !== undefined //new instance can locate new prototype
  false
  >>> lucy.paws !== undefined //but cannot access old prototype
  true
  
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

Por tanto, siempre que sustituyamos completamente el `prototype` por otro objeto, conviene restituir el `constructor` de ese `prototype