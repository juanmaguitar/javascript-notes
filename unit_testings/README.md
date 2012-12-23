#Unit Testings en Javascript


- [Test driven development with JavaScript](http://diigo.com/0toed)
- [Desarrollo guiado por pruebas](http://es.wikipedia.org/wiki/Desarrollo_guiado_por_pruebas)
- [Introduction To JavaScript Unit Testing](http://coding.smashingmagazine.com/2012/06/27/introduction-to-javascript-unit-testing/)

##1.- Unit Testings (pruebas unitarias)

- Un **[Unit testing](http://es.wikipedia.org/wiki/Unit_testing)** es un trozo de código que sirve para comprobar que otro trozo de código funciona correctamente.  Es código que sirve para testear otro código.

- Estas pruebas unitarias (unit testings) deben:

    -  ser poder lanzadas de forma automática (esto es especialmente importante para una [integración continua](http://es.wikipedia.org/wiki/Integraci%C3%B3n_continua))
    - testear la mayor cantidad de código posible ([cobertura de código](http://en.wikipedia.org/wiki/Code_coverage) más alta posible)
    - ser poder ejecutadas infinidad de veces
    - ser independientes, la ejecución de una prueba no debe afectar a la ejecución de otra.
    - mantener la calidad de código (convención de código, buenas practicas, documentación,...)

- Conforme va creciendo el código fuente de un proyecto se va haciendo más importante el poder comprobar de una manera sencilla que los cambios y el nuevo código no rompen nada del código existente

- En el caso de Javascript esto es más importante, porque teniendo los tests podremos comprobar automaticamente que nuestro código funciona bien en diferentes entornos (IE, Firefox, Chrome,...)

###El _unit_ (La unidad a testear)

- En TDD, la unidad (el **unit**) es el trozo más pequeño de código que puede ser testeado. En la mayoria de los casos se corresponde con una función/método.

- El **test** suele ser tambien un método/función asi que un test unitario sencillo suele ser un metódo (test) que testea otro metodo (unit)

- A veces se escriben varios _unit tests_ para el mismo método/objeto de manera que cada uno testea un comportamiento específico. Estos tests que testean un conjunto de código relacionado (como un objeto con diferentes métodos) se suelen agrupar en un **test case**

- Los test cases se suelen agrupar a su vez en **test suites**

###Code coverage (Cobertura de código)

- El **code coverage** es una forma de medir que proporción del código fuente está siendo realmente testeanda por una _test suite_

- La cobertura del código se suele medir utilizando software que analiza el código y los tests. Para PHP se suele utilizar [PHPUnit](http://www.phpunit.de/manual/current/en/index.html) con [XDebug](http://www.xdebug.org/). Para JS, podemos utilizar [Sonar](http://blog.synyx.de/2012/08/visualize-javascript-code-quality-and-code-coverage-with-sonar/) con [jsTestDriver](http://code.google.com/p/js-test-driver/)

###Mi primer Unit Testing


Este es el código a testear (el _'unit'_)

```javascript
  function add(a, b) {
      return a + b;
  }
```


Y este el código con el que lo testeamos (el _'testing'_)

```javascript
  // Test function
  if (add(1, 2) !== 3) {
      document.write('<p style="color: red;">add(1, 2) does not add up to 3</p>');
  } else {
      document.write('<p style="color: green;">add(1, 2) OK</p>');
  }

  if (add("2", 2) !== 4) {
      var msg = "Numbers as strings don't add";
      document.write('<p style="color: red;">' + msg + '</p>');
  } else {
      document.write('<p style="color: green;">add("2", 2) OK</p>');
  }
```

Este test lo podemos ejecutar desde [aqui](http://www.cjohansen.no/en/tdd/test_driven_development_with_javascript_part_1/test1.html)

Este ejemplo es muy sencillo pero ilustra varias cosas sobre los unit testings:

- La función se testea desde varios angulos (se comprueba que devuelve la función al pasarle diferentes tipos de datos)
- Comparamos el valor devuelto con un valor esperado
- Si estos valores coinciden mostramos un OK verde
- Si estos valores no coinciden mostramos un mensaje de error que nos ayude a localizar el problema

El ejemplo anterior no pasaba todos los tests, pero si mejoramos el código

```javascript
  function add(a, b) {
      return parseInt(a) + parseInt(b);
  }
```

Este [nuevo código si que pasa los tests](http://www.cjohansen.no/en/tdd/test_driven_development_with_javascript_part_1/test2.html), es decir, que cumple con los criterios especificados en el test

##2.- TDD y BDD

###[Test Driven Development](http://en.wikipedia.org/wiki/Test-driven_development) (TDD)

- **TDD** (Test Driven Development) es una metodología, forma de programar, un workflow, que basicamente consiste en hacer primero los tests (especificando lo que debe hacer nuestro código) y despues hacer el código que pase estos tests.

- El workflow recomendado de TDD es el siguiente:

    1. Escribimos los tests para una nueva funcionalidad (asumiendo nombres de metodos, parametros de entrada, valores devueltos...)
    1. Ejecutamos los tests y comprobamos que fallan (aun no hemos escrito el codigo a testear)
    1. Escribimos la solución más simple que cumpla con los tests
    1. Refactorizamos el código (código más limpio y eficiente y que siga pasando los tests)
    1. Repetimos estos pasos con otra funcionalidad

- Aplicando TDD a la hora de programar nos permite centrarnos en la interfaz (API, methods, inputs & outputs) más que en los detalles de la implementación

###[Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) (BDD)

- **BDD** (Behavior Driven Development) es una versión especializada de TDD que se focaliza en testear (especificaciones de) comportamientos de un software

- Utiliza un lenguaje más humano para escribir los tests y no se centra tanto en describir como debe funcionar la API sino en describir que una funcionalidad concreta haga lo que se espera de ella

##3.- Testing Frameworks

[Looking for a better JavaScript unit test tool](http://stackoverflow.com/questions/300855/looking-for-a-better-javascript-unit-test-tool)


- Existen unos [cuantos Frameworks](http://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript) que nos facilitan la tarea de realizar los tests a nuestro código.

- Estos frameworks ofrecen un numero determinado de [**assertions**](http://es.wikipedia.org/wiki/Aserci%C3%B3n_(inform%C3%A1tica)) (afirmaciones) con los que podremos escribir los tests

###[jsTestDriver](http://code.google.com/p/js-test-driver/)

jsTestDriver es un framework y servidor de tests escrito en Java y que nos permite ejecutar los tests en diferentes maquinas, diferentes sistemas operativos y diferentes browsers a la vez

Algunos _assertions_:

- `assert([msg], actual)`  
  `assertTrue([msg], actual)`  
  _Fails if the result isn't truthy. To use a message when fails, add it as the first parameter._

- `assertFalse([msg], actual)`  
  _Fails if the result isn't falsy._

- `assertEquals([msg], expected, actual)`  
  _Fails if the expected and actual values can not be compared to be equal._

- `assertNotEquals([msg], expected, actual)`  
  _Fails if the expected and actual values can be compared to be equal._

- `assertNull([msg], actual)`  
  _Fails if the given value is not exactly null.

- `assertUndefined([msg], actual)`  
  _Fails if the given value is not undefined._

- `assertNotUndefined([msg], actual)`  
  _Fails if the given value is undefined._

- `assertArray([msg], actual)`  
  _Fails if the given value is not an Array._

- `assertFunction([msg], actual)`  
  _Fails if the given value is not a Function. Convenience function to assertTypeOf._

- `assertObject([msg], actual)`  
  _Fails if the given value is not an Object. Convenience function to assertTypeOf._

- `assertNumber([msg], actual)`  
  _Fails if the given value is not a Number. Convenience function to assertTypeOf._  

- `assertString([msg], actual)`  
  _Fails if the given value is not a String. Convenience function to assertTypeOf._

- `assertElementId([msg], id, element)`  
  _Fails if the given DOM element does not have given ID._

Para este trozo de código:

```javascript
  myapp = {};

  myapp.Greeter = function() { };

  myapp.Greeter.prototype.greet = function(name) {
    return "Hello " + name + "!";
  };
```

Un _Unit Testing_ en _jsTestDriver_ podria ser:

```javascript
  GreeterTest = TestCase("GreeterTest");

  GreeterTest.prototype.testGreet = function() {
      var greeter = new myapp.Greeter();
      assertEquals("Hello World!", greeter.greet("World"));
  };
```

Mas info:

- [JavaScript Testing with JSTestDriver](http://meri-stuff.blogspot.com.es/2012/01/javascript-testing-with-jstestdriver.html)
- [Javascript Unittesting with js-test-driver](http://westhoffswelt.de/data/portfolio/pbcat_2010_javascript_unit_testing_with_js_test_driver.pdf)
- [GettingStarted](http://code.google.com/p/js-test-driver/wiki/GettingStarted)
- [TestCase](http://code.google.com/p/js-test-driver/wiki/TestCase)
- [Assertions](http://code.google.com/p/js-test-driver/wiki/Assertions)

###[QUnit](http://qunitjs.com/)

QUnit es un framework de unit testing (para cliente) que nos permite testear nuestro codigo Javascript de una manera sencilla.

Es el que se utiliza para los proyectos jQuery, [jQuery UI](https://github.com/jquery/jquery-ui/tree/master/tests/unit), jQuery Mobile... y el propio [QUnit](https://github.com/jquery/qunit/tree/master/test)

Algunos _assertions_:

- [`ok( state, message )`](http://api.qunitjs.com/ok/)  
  _A boolean assertion, equivalent to CommonJS's assert.ok() and JUnit's assertTrue(). Passes if the first argument is truthy._

```javascript
  // Let's test this function
  function isEven(val) {
    return val % 2 === 0;
  }
  test('isEven()', function() {
    ok(isEven(0), 'Zero is an even number');
    ok(isEven(2), 'So is two');
    ok(isEven(-4), 'So is negative four');
    ok(!isEven(1), 'One is not an even number');
    ok(!isEven(-7), 'Neither is negative seven');
  })
```

- [`equal( actual, expected, message )`](http://api.qunitjs.com/equal/)  
  _A non-strict comparison assertion, roughly equivalent to JUnit assertEquals._

```javascript
  test( "equal test", function() {
    equal( 0, 0, "Zero; equal succeeds" );
    equal( "", 0, "Empty, Zero; equal succeeds" );
    equal( "", "", "Empty, Empty; equal succeeds" );
    equal( 0, 0, "Zero, Zero; equal succeeds" );

    equal( "three", 3, "Three, 3; equal fails" );
    equal( null, false, "null, false; equal fails" );
  });
```

- [`strictEqual( actual, expected, message )`](http://api.qunitjs.com/strictEqual/)  
  _A strict type and value comparison assertion._

```javascript
  test( "strictEqual test", function() {
      strictEqual( 1, 1, "1 and 1 are the same value and type" );
  });
```

Para este trozo de código:

```javascript
  // your applications custom code
  function addValues( a, b ) {
      return a + b;
  };
```

Un _Unit Testing_ en _QUnit_ podria ser:

```javascript
  // the QUnit test code
  test("test addValues(a, b) function", function() {
      equal(addValues( 1, 2), 3, "1 + 2 = 3" );
      equal(addValues( 1.75, 2), 3.75, "1.75 + 2 = 3.75" );
      notEqual(addValues( 1, 2), "3", "1 + 2 != '3' as a String");
  });
```

Mas info:

- [How to Test your JavaScript Code with QUnit](http://net.tutsplus.com/tutorials/javascript-ajax/how-to-test-your-javascript-code-with-qunit/)
- [Asserts](http://api.qunitjs.com/category/assert/)
- [Cookbook](http://qunitjs.com/cookbook/)
- [QUnit, testeando nuestras aplicaciones Javascript](http://www.etnassoft.com/2011/02/01/qunit-testeando-nuestras-aplicaciones-javascript/)
- [Getting Started With jQuery QUnit for Client-Side Javascript Testing](http://lostechies.com/chadmyers/2008/08/29/getting-started-with-jquery-qunit-for-client-side-javascript-testing/)

###[Jasmine](http://pivotal.github.com/jasmine/)

Jasmine es un framework para testear código Javascript orientado a BDD (testar funcionalidades), pero se puede utilizar también para TDD (testear API).

Un **test suite** en Jasmine se declara con la función global `describe` que recibe:

- el nombre de la suite
- una función con el código que implementa los tests

Las **specs** se declaran con la función global `it` que recibe:

- una descripción de la especificación
- una función con una o más _expectations_


Los [**expectations**](https://github.com/pivotal/jasmine/wiki/Suites-and-specs) (comportamientos esperados) se deescriben con las función `expect` y un _matcher_ (`toBe`, `toEqual, ...):

```javascript
  describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
      });
  });
```

Algunos [**matchers**](https://github.com/pivotal/jasmine/wiki/Matchers) que ofrece Jasmine por defecto (podemos construirnos los nuestros propios)

- `expect(x).toEqual(y);`  
_compares objects or primitives `x` and `y` and passes if they are equivalent_

- `expect(x).toBe(y);`  
_compares objects or primitives `x` and `y` and passes if they are the same object_

- `expect(x).toMatch(pattern);`  
_compares `x` to string or regular expression `pattern` and passes if they match_

- `expect(x).toBeDefined();`  
_passes if `x` is not `undefined`_

- `expect(x).toBeUndefined();`  
_passes if `x` is `undefined`_

- `expect(x).toBeNull();`  
_passes if `x` is `null`_

- `expect(x).toBeTruthy();`  
_passes if `x` evaluates to `true`_

- `expect(x).toBeFalsy();`  
_passes if `x` evaluates to `false`_

- `expect(x).toContain(y);`  
_passes if array or string `x` contains `y`_

- `expect(x).toBeLessThan(y);`  
_passes if `x` is less than `y`_

- `expect(x).toBeGreaterThan(y);`  
_passes if `x` is greater than `y`_

- `expect(function(){fn();}).toThrow(e);`  
_passes if function `fn` throws exception `e` when executed_

Para este trozo de código:

```javascript
  // your applications custom code
  function addValues( a, b ) {
      return a + b;
  };
```

Un _Unit Testing_ en _Jasmine_ podria ser:

```javascript
  // the Jasmine test code
  describe("addValues(a, b) function", function() {
      it("should equal 3", function(){
          expect( addValues(1, 2) ).toBe( 3 );
      });
      it("should equal 3.75", function(){
          expect( addValues(1.75, 2) ).toBe( 3.75 );
       });
      it("should NOT equal '3' as a String", function(){
          expect( addValues(1, 2) ).not.toBe( "3" );
      });
  });
```

Mas info:

- [Magnum CI: The Jenkins Chronicles #1 – Intro to JsTestDriver](http://transitioning.to/2012/07/magnum-ci-the-jenkins-chronicles-1-intro-to-jstestdriver/)
- [Testing Your JavaScript with Jasmine](http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/)
- [Unit test JavaScript applications with Jasmine](http://www.adobe.com/devnet/html5/articles/unit-test-javascript-applications-with-jasmine.html)

##4.- Sinon


- [Sinon JS](http://sinonjs.org/)
- **[Talk: JavaScript QA utilizing UnitTests](http://westhoffswelt.de/data/portfolio/phpsummit_2011_11_javascript_qa_using_js_test_driver_and_sinon_js.pdf)**
- **[Johansen Talk about Sinon](http://cjohansen.no/talks/2011/xp-meetup/#1)**

Para testear ciertas partes del código necesitaremos "customizar" temporalmente algunos metodos y objetos.
Sinon es una libreria que nos permite hacer "fake" de objetos (_spies_, _stubs_ y _mocks_)

### Test Spies

Un **test spy**  es una función que registra los argumentos, el valor `return`, el valor de `this` y las excepciones lanzadas (si las hay) para cada una de sus llamadas.

Un test spy puede ser una función anónima o puede "envolver" una función existente.

Un test spy anónimo es útil, por ejemplo, para testar el uso que se hace de las funciones callback en nuestro código.

```javascript
  "test should call subscribers on publish": function () {
      var callback = sinon.spy();
      PubSub.subscribe("message", callback);

      PubSub.publishSync("message");

      assertTrue(callback.called);
  }
```

Si aplicamos `sinon.spy` a un metodo existente, podremos ejecutarlo normalmente y además tener disponibles los datos registrados en cada una de sus llamadas.

```javascript
  {
      setUp: function () {
          sinon.spy(jQuery, "ajax");
      },

      tearDown: function () {
          jQuery.ajax.restore(); // Unwraps the spy
      },

      "test should inspect jQuery.getJSON's usage of jQuery.ajax": function () {
          jQuery.getJSON("/some/resource");

          assert(jQuery.ajax.calledOnce);
          assertEquals("/some/resource", jQuery.ajax.getCall(0).args[0].url);
          assertEquals("json", jQuery.ajax.getCall(0).args[0].dataType);
      }
  }
```

Mas info:

- [Test Spy](http://xunitpatterns.com/Test%20Spy.html)

### Test Stubs

Un **test stub**  es una función "spy" con un comportamiento pre-programado. Disponen de los mismos metodos/propiedades que los spy junto con otros utilizados para alterar el comportamiento del stub.

Un test stub puede ser una función anónima o puede "envolver" una función existente. Cuando envuelve a una functión existente, la función original no se ejecuta.

Utilizaremos stubs cuando queramos:

- Controlar el comportamiento de un metodo para testear una casuística concreta del código (por ejemplo, forzar que un metodo devuelva un error para testear la gestión del error)
- Evitar que un metodo específico sea llamado directamente (porque provocaria un comportamiento no deseado para nuestro test: llamadas AJAX, envio de formularios, etc..)

```javascript
  "test should call all subscribers, even if there are exceptions" : function(){

        var message = 'an example message';
        var error = 'an example error message';

        var stub = sinon.stub().throws();
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        PubSub.subscribe(message, stub);
        PubSub.subscribe(message, spy1);
        PubSub.subscribe(message, spy2);

        PubSub.publishSync(message, undefined);

        assert(spy1.called);
        assert(spy2.called);
        assert(stub.calledBefore(spy1));
    }
```

### Mocks

Un **test mockup**  es una combinación entre un "stub" y un "spy" con un comportamiento pre-programado.
Un test mockup es una función/metodo fake (spy) con un comportamiento pre-programado (stub) pero que ademas se define con unas expectativas pre-programadas. Un mockup fallará si no se utliza como se espera.

Los mockups:

- Disponen de todos los metodos de stubs y spies
- Pueden ser anónimos
- Sólo pueden aumentar objetos .

```javascript
  "test should call all subscribers when exceptions": function () {
      var myAPI = { method: function () {} };

      var spy = sinon.spy();
      var mock = sinon.mock(myAPI);
      mock.expects("method").once().throws();

      PubSub.subscribe("message", myAPI.method);
      PubSub.subscribe("message", spy);
      PubSub.publishSync("message", undefined);

      mock.verify();
      assert(spy.calledOnce);
  }
```
