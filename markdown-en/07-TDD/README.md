# Javascript Unit Testings


- [Test driven development with JavaScript](http://diigo.com/0toed)
- [Introduction To JavaScript Unit Testing](http://coding.smashingmagazine.com/2012/06/27/introduction-to-javascript-unit-testing/)

##1.- Unit Testings

- A **[Unit testing](https://en.wikipedia.org/wiki/Unit_testing)** is a piece of cide that serves to check if another piece of code works properly.  It is code thar serves to test another code.

- These unit testings should:

    -  be able of launching them automatically (this is specially important for a [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration))
    - test the maximum code possible ([code coverage](http://en.wikipedia.org/wiki/Code_coverage) as high as possible)
    - be able of be executed as many times as needed
    - be independent. The execution os one test, shouldn't affect the execution of the other.
    - maintain the quality of the code (code convention, good practices, documentation,...)

- As long as the source code in a project grows, it gets more and more important being able to check in a simple way that the changes and the new code doesn't break anything of the existing code

- In Javascript this is even more important, because having the tests we can check automatically that our code works well in different environments (IE, Firefox, Chrome,...)

### The _unit_ (... to be tested)

- IN TDD, the **unit** is the smallest piece of code that can be tested. Most of the times this unit has a correspondence with a function/method.

- The **test** is usually also a method/function so a unit testing use to be a method (test) that test another method (unit)

- Sometimes several _unit testings_ are written for the same method/object having, for example, every one of them testing a specific behaviuour. These tests that test a group of related code (like an object w/ different methods) are usually grouped in a **test case**

- Test Cases are usually also grouped in **test suites**

###Code coverage

- The **code coverage** is a way of measure the proportion of aource code that is really being tested by a  _test suite_

- The code coverage is usually measured by a software that analizes the code and the tests. For PHP [PHPUnit](http://www.phpunit.de/manual/current/en/index.html) with [XDebug](http://www.xdebug.org/) is usually used. For JS, we can [Sonar](http://blog.akquinet.de/2014/11/25/js-test-coverage/) or [Istambul](http://ariya.ofilabs.com/2013/10/code-coverage-of-jasmine-tests-using-istanbul-and-karma.html) with [Karma](https://github.com/karma-runner/karma-coverage)

### My first Unit Testing


This is the code to test (the _'unit'_)

```javascript
  function add(a, b) {
      return a + b;
  }
```

And this is the code we're using to test it ( the _'testing'_)

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

We can execute this test from [here](https://jsfiddle.net/juanma/ahL6bogg/)

This example is very simple but illustrate several things about unit testings:

- The function is tested from several angles (we check what the function returns when passing different types of data to it)
- We compare the returned value with an expected value
- If these values match we show a green OK
- If these values doesn't match we show an error message to help us locate the problem

The previous example didn't pass all the tests, but if we improve the code

```javascript
  function add(a, b) {
      return parseInt(a) + parseInt(b);
  }
```

This [new code pass the tests](https://jsfiddle.net/juanma/8s10645o/), so it follows the criteria especified in the test

##2.- TDD y BDD

###[Test Driven Development](http://en.wikipedia.org/wiki/Test-driven_development) (TDD)

- **TDD** (Test Driven Development) is a methodology, way of programming, a workflow, that basically consist in doing the tests first (specifying what our code should do) and after that, do the code that pass these tests

- The recommended workflow in TDD is:  

  1. We write the tests for a new feature (assuming method names, input parameters, returned values...)
  1. We execute the tests and check they fail (we still haven't written the code to be tested)
  1. We write the most simple solution that pass the tests
  1. We refactor the code (cleaner and more efficient code that still pass the tests)
  1. We repeat these steps for another feature

- By applying TDD we can focus in the interface (API, methods, inputs & outputs) more than in the details of the implementation

###[Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) (BDD)

- **BDD** (Behavior Driven Development) is a specialized version of TDD that is more focused on testing (specifications of) behaviours of software

- It uses a more human language to write the tests and is not focused as much in how the API should work and more in testing the specific feature does what is expected to

##3.- Testing Frameworks

[Looking for a better JavaScript unit test tool](http://stackoverflow.com/questions/300855/looking-for-a-better-javascript-unit-test-tool)  
[Heroes of JavaScript and Testing](http://dm.gl/2015/05/29/heroes-of-javascript-and-testing/)

- There are a [few Frameworks](http://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript) that will ease to us the task of doing the tests of our code

- These frameworks offer some [**assertions**](https://en.wikipedia.org/wiki/Assertion_(software_development)) that we can use to write the tests

###[Jasmine](http://pivotal.github.com/jasmine/)

Jasmine is a framework used to test Javascript code oriented to BDD (to test behaviours), but it can also be used for TDD (testing API).

A **test suite** in Jasmine is declared as a global function `describe` that recevies:

- the name of the suite
- a function with code that implements the test

The **specs** are declared with the global function `it` that receives:

- a description of the specification
- a function with one or more  _expectations_


The [**expectations**](https://github.com/pivotal/jasmine/wiki/Suites-and-specs) (expected behaviours) are described with the function `expect` and a _matcher_ (`toBe`, `toEqual`, ...):

```javascript
  describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
      });
  });
```

Some [**matchers**](https://github.com/pivotal/jasmine/wiki/Matchers) that Jasmine offer by default (we can build our own) are:

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

For this piece of code:

```javascript
  // your applications custom code
  function addValues( a, b ) {
      return a + b;
  };
```

A _Unit Testing_ in _Jasmine_ could be:

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

More info:

- [Magnum CI: The Jenkins Chronicles #1 – Intro to JsTestDriver](http://transitioning.to/2012/07/magnum-ci-the-jenkins-chronicles-1-intro-to-jstestdriver/)
- [Testing Your JavaScript with Jasmine](http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/)
- [Unit test JavaScript applications with Jasmine](http://www.adobe.com/devnet/html5/articles/unit-test-javascript-applications-with-jasmine.html)


###[QUnit](http://qunitjs.com/)

QUnit is a unit testing framework (for client side) that allow us to test our javascript code in a simple way.

It is the framework used to test the projects jQuery, [jQuery UI](https://github.com/jquery/jquery-ui/tree/master/tests/unit), jQuery Mobile... and even itself ([QUnit](https://github.com/jquery/qunit/tree/master/test))

Some _assertions_:

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

For this piece of code:

```javascript
  // your applications custom code
  function addValues( a, b ) {
      return a + b;
  };
```

A _Unit Testing_ in _QUnit_ could be:

```javascript
  // the QUnit test code
  test("test addValues(a, b) function", function() {
      equal(addValues( 1, 2), 3, "1 + 2 = 3" );
      equal(addValues( 1.75, 2), 3.75, "1.75 + 2 = 3.75" );
      notEqual(addValues( 1, 2), "3", "1 + 2 != '3' as a String");
  });
```

More info:

- [How to Test your JavaScript Code with QUnit](http://net.tutsplus.com/tutorials/javascript-ajax/how-to-test-your-javascript-code-with-qunit/)
- [Asserts](http://api.qunitjs.com/category/assert/)
- [Cookbook](http://qunitjs.com/cookbook/)
- [QUnit, testeando nuestras aplicaciones Javascript](http://www.etnassoft.com/2011/02/01/qunit-testeando-nuestras-aplicaciones-javascript/)
- [Getting Started With jQuery QUnit for Client-Side Javascript Testing](http://lostechies.com/chadmyers/2008/08/29/getting-started-with-jquery-qunit-for-client-side-javascript-testing/)

###[Mocha](http://mochajs.org/)

Mocha y Jasmine are probably the most popular frameworks. In many cases Jasmine is used to test JS in the client side, and Mocha is used to test JS in the server side (node.js)

##4.- Testing Runners 

### Grunt/Gulp/NPM

We can launch the tests from the console with any of the task runners. Thse tests can be launched in a "headless browser" (PhantomJS) or in real browsers (Karma)

### HTML (Jasmine)

We can launch the tests directly from the browser (Jasmine provides its own stand-alone runner to launch the tests)

### Karma

Karma is a "test runner" we can use to automatize the launch of our tests (written in Jasmine, Mocha o QUnit). 

It allow us to execute automatically all our tests in different browsers. [Check it in action](https://youtu.be/5mHjJ4xf_K0?t=8m9s)

It also allow us to integrate our tests with continous integration tools like [Jenkins](http://jenkins-ci.org/)


##5.- E2E testing frameworks

We can raise the test of our project to a higher level and do the so-called **functional tests** 

These test emulte the behaviour of the final user and also test the expected behaviour of our product (no matter the internal code)

```javascript
  describe('angularjs homepage todo list', function() {
    it('should add a todo', function() {
      browser.get('https://angularjs.org');

      element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      element(by.css('[value="add"]')).click();

      var todoList = element.all(by.repeater('todo in todoList.todos'));
      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write first protractor test');

      // You wrote your first test, cross it off the list
      todoList.get(2).element(by.css('input')).click();
      var completedAmount = element.all(by.css('.done-true'));
      expect(completedAmount.count()).toEqual(2);
    });
  });
```

We can write and launch these tests with [Protractor](https://angular.github.io/protractor/#/)

Some other tools we can use to launch these tests are [Selenium](http://www.seleniumhq.org/) and [WebDriver](http://www.seleniumhq.org/projects/webdriver/)



