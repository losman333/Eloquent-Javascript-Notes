// language

// Strict mode

/**
 * doesn't work when binding already exists
 * this binding holds the value undefined
 * that are not called as methods
 * 
 * when making call outside of strict this refers to 
 * global scope object, object with properties of 
 * global bindings
 * 
 * following code calls constructor function without
 * new keyword this will not refer to a newly constructed object
 */

function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); //oops
console.log(name);

//Ferdinand//
"use strict";
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // forgot new
// → TypeError: Cannot set property 'name' of undefined

/**
 * 1. disallows giving function same name removrs 
 * 2. removes problamatic features like with statements
 * 
 * //strict used to trouble shoot bugs 
 */

// types

// what is the purpose of types

/**
 * provide useful framework for talking about programs.
 * reduces the confusion around which vales
 * go in and out of function. 
 */

// why is it used

// how is it used

/**
 * you can give randomPick a type like ([T]) 
 * to stand in for any type
 * using a type variable
 * 
 * TypeScript add types to JS in order to check
 * 
 * more objects code interacts with harder it is
 * to set up context which to test it. 
 * self-contained persistent values tend to be
 * easy to test
 */

// example

// testing

// what is it//
/**
 * process of writing tests another program
 * use "test suites" language in the form 
 * of functions and methods
 * outputs info when test fails
 * called test runners
 * 
 */

// whats the purpose of using test//

//example//
/**
 * test take form of labled programs to verify
 * aspect of code
 * 
 * test for the toUpperCase method
 */

function test(label, body) {
    if (!body()) console.log(`Failed: ${label}`);
}
test("convert Lating text to uppercase", () => {
    return "hello".toUpperCase() == "HELLO";
});

test("convert Greek text to uppercase", () => { return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
;)}

test("don't convert case-less characters", () => {
;"مرحبا" == )(toUpperCase."مرحبا" return ;)}

// debugging

function numberToString(n, base = 10) {
    let result = "", sign = ""; 
    if (n < 0) {
        sign = "-";
        n = -n;
    }
    do {
        result = String(n % base) + result;;
        n /= base;

    }   while (n < 0);
    return sign + result;
}
console.log(numberToString(12, 10));
// → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e...-3181.3

/** what is the problem
 * divding 13 by 10 doesnt produce a whole number
 * use Math.floor(n / base) to round to the right
 * 
 * user browser debugging capabilities of browser
 * when program reaches a line with a breakpoint
 * use breakpoints to pause an inspect bindings at
 * specific point
 * 
 * debugger statement debugger keyword
 * 
 * think analyze what is happening
 * ome up with theory why it may be happening
 * make observations to test theory
 * or come up with a theory
 */
// error propagation

/**
 * what is error propagation
 * when errors are comon and caller should 
 * be taking them into account 
 * returning a value to indicate it failed
 * to do what it was asked
 * 
 * what is the purpose
 * 
 * to distinguish success from failure
 * 
 * how do you use it
 * using promptNumber asks for numbera and
 * returns it
 * 
 * give an example
 */

function promptNumber(questions) {
    let result = Number(prompt(questions));
    if(Number.isNaN(result)) return null;
    else return result;
}

console.log(promptNumber("How many trees do you see"))

/**
 * promptNumber checks whether an actual number was read 
 * 
 * what are the downsides?
 * 
 * if function can already return every possible kind of 
 * value you'll have to wrap the result in an object
 * to distinguish success from failure
 */

function lastElement(array) {
    if (array.length == 0) {
      return {failed: true};
    } else {
      return {element: array[array.length - 1]};
 } }

 /**
  * second issue returning special values is that it
  * can lead to awkward code
  * if code calls promptNumber 10 times code has to check
  * 10 times if null was returned code 
  * 
  */

// exceptions

/**
 * what are exceptions? 
 * 
 * mechanism to make it possible for
 * code to raise or throw excenption
 * 
 * exception can be any value
 * 
 * raising exception resembles super charged
 * return from a function
 * 
 * how does it work?
 * 
 * jumps out of not just current functon but also
 * callers all the way to the first call that 
 * started current execution called (unwinding the stack)
 * 
 * what is the purpose?
 * you can set obstacles along the stack to catch exception
 * as it's zooming down
 * 
 * once caught do something to address problem and
 * continue running program
 * 
 * why is it helpful 
 * error-handling code is necessary only at point where the 
 * error occurs and at the point where it is handeled
 * 
 * give an example
 */

function promptDirection(question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L"; 
    if (result.toLowerCase() == "right") return "R"; 

    // throw used used to raise exception
    throw new Error("Invalid direction: " + result);
    }

    // look functio ignores promptDirection might go wrong
    function look() {
    if (promptDirection("Which way?") == "L") {
    return "a house"; } else {
    return "two angry bears"; }
    }
    // wrap piece of code in a try block
    try {
    // code in try block causes an exception to be raised
    console.log("You see", look());
    // followd by catch
    // catch is evaluated name si bound to exception value
    } catch (error) {
    // use error constructor to create exception value
    console.log("Something went wrong: " + error);
    }

// what is a stack trace
/**
 * gather info about call stack that existed
 * when exception was created
 * 
 * stored in stack property
 */

// whay it's helpful
/**
 * tells a function where problem occurred which function made 
 * the failing call
 */

// cleaning up after exceptions 
/**
 * every action might cause an exception might cause control 
 * to leave code
 * 
 * if code has several side effects exception might prevent
 * some from taking place
 * 
 */

const accounts = {
    
       a: 100,
       b: 0,
       c: 20
    };
    function getAccount() {
    let accountName = prompt("Enter an account name"); 
    if (!accounts.hasOwnProperty(accountName)) {
        throw new Error(`No such account: ${accountName}`); 
    }
       return accountName;
     }
     function transfer(from, amount) {
       if (accounts[from] < amount) return;
       accounts[from] -= amount;
       accounts[getAccount()] += amount;
    }


    function transfer(from, amount) {
        if (accounts[from] < amount) return;
        let progress = 0;
        try {
          accounts[from] -= amount;
          progress = 1;
          accounts[getAccount()] += amount;
          progress = 2;
          // finally code runs code after tryin to run in try block
          // doesn't interfere with exception
        } finally {
          if (progress == 1) {
            accounts[from] += amount;
          }
     } 
    
    }

    /**
     * finally finally blcoc runs stack continues unwinding
     */
// selective catching

/**
 * 
 * what is the context
 * 
 * javascript doesn't provide direct support for selectively 
 * exceptions
 * 
 * what is selective catching
 * the ability to catch a specific type of exception
 * 
 * how does it work
 * 
 * define a new type of error and use instanceof to 
 * indentify it
 * 
 * what does it do
 * 
 * what is the benefit
 * 
 * give an example
 * 
 * what are the drawbacks
 */
for (;;) {
    try {
 let dir = promtDirection("Where?"); // ← typo! console.log("You chose ", dir);
 break;
 } catch (e) {
 console.log("Not a valid direction. Try again.");

    } 
}

class InputError extends Error {}
    function promptDirection(question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R"; 
    throw new InputError("Invalid direction: " + result);
}

for (;;) {
    try {
    let dir = promptDirection("Where?"); 
    console.log("You chose ", dir); break;
    } catch (e) {
      if (e instanceof InputError) {
        console.log("Not a valid direction. Try again."); 
    } else {
        throw e; 
        }
    } 

}
// assertions

// context

//what are assertions
/**
 * checks inside a program to verify something is the way 
 * its suppose to be
 * 
 * not used to handle situations that can come up
 * in a normal operation  u
 * 
 * used to find programmer mistakes
 * 
 *
 */


// how do they work

// what are the benifits 

// what are the cons

/**
 * can be noisy 
 */

// example

function firstElement(array) {
    // checks to see if array property exists
    if (array.length == 0) {
 throw new Error("firstElement called with []"); }
    return array[0];
  }

// summary

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (!(e instanceof MultiplicatorUnitFailure))
        throw e;
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64


const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true;  },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    }
  };
  
  function withBoxUnlocked(body) {
    let locked = box.locked;
    if (!locked) {
      return body();
    }
  
    box.unlock();
    try {
      return body();
    } finally {
      box.lock();
    }
  }
  
  withBoxUnlocked(function() {
    box.content.push("gold piece");
  });