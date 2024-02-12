
// Encapsulation

/** Core idea in JS is to divide programs
 * into smaller pieces
 * make each responsible for managing its own
 * state
 * 
 * knowledge about the piece of program
 * works can be kept local to that piece
 * 
 * when local details change only code
 * directly around needs to be updated
 * 
 * different pieces of program interact with 
 * each other through interfaces ( sets of functions
 * or bindings that provide useful functionality 
 * at more abstract level)
 * 
 * program pieces are modeled using objects
 * interface consists of a specific set of methods
 * and properties
 * 
 * Properties of that are part of interface are called public
 * code that should not be touched are called private
 * 
 * JS does not distinguish public and private props
 * and prevent outside code from accessing private ones
 * 
 * underscore used at start of property names indicate
 * those are private
 * 
 * Encapsulation seperates interface from implementation
 */

// Methods 

/**
 * methods are properties hold function values
 */

let rabbit = {};
rabbit.speak = function(line) {
    console.log(`The rabbit says'${}'`);
};

rabbit.speak("I'm alive.");

/**
 * method needs to do something with object it was called
 * 
 * when func is called as a method--looked up and called
 * as in object.method()--binding called "this" in its body
 * points at the object that was called on
 */

function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
    }
    let whiteRabbit = {type: "white", speak}; let hungryRabbit = {type: "hungry", speak};
    whiteRabbit.speak("Oh my ears and whiskers, " + "how late it's getting!");
    // → The white rabbit says 'Oh my ears and whiskers, how
    // late it's getting!'
    hungryRabbit.speak("I could use a carrot right now.");
    // → The hungry rabbit says 'I could use a carrot right now.'

/**
 * this is an extra parameter passed in a different way
 * to pass explicitly use a function call method, 
 * which takes this value as its first arguement
 * and treats further arguments as normal parameters
 */

 //to pass explicitly use a function call method, 
    speak.call(hungryRabbit, "Burp!");
    // the humgry rabbit says 'Burp!'

/**
 * each function has its own binding
 * whose value depends on the way it is called
 * cant refer to the this of the wrapping scope
 * in a regular function defined with func keyword
 * 
 * Arrow functions are different
 * don't bind their own this
 * can see the binding of the scope around them
 */

function normalize() {
    // references this from inside a local function
    console.log(this.coords.map(n => n / this.length));
 }
 normalize.call({coords: [0, 2, 3], length: 5}); // → [0, 0.4, 0.6]


// Prototypes

let empty = {}; console.log(empty.toString);
 // → function toString()...{} console.log(empty.toString()); 
 // → [object Object]
 
/**
 * objects have their own set of properties objects also have prototypes
 * 
 * a prototype is another object that is used as
 * a fallback source of properties
 * 
 * when object gets a request for a property
 * that it does not have
 * 
 * its prototype will be
 * searched for the property, then prototype
 * 
 */

// Classes

// Class Notation

// Overriding derived properties

// Maps

// Polymorphism

// Symbols

// Iterator Interface

// Getters, Settings, Statics

// Inheritance

// Instanceof Operator

// Summary

// Exercies

// A Vector Type

// Groups

// Iterable Groups

// Borrowing a method