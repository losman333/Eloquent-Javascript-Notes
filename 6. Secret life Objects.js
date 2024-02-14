
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
 // → function toString()...{} 
 console.log(empty.toString()); 
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
 * Object.prototype is the entity behind all objects
 */

console.log(Object.getPrototypeOf({}) ==
Object.prototype);
// → true 
console.log(Object.getPrototypeOf(Object.prototype));
// → null

/**
 * Many objects don't directly have Object.prototype
 * as a prototype
 * instead has another object that provides 
 * a different set of default props 
 * 
 * functions derive from Function.prototype, 
 * arrays derrive from Array.prototype
 */

console.log(Object.getPrototypeOf(Math.max) ==
Function.prototype);
// → true 
console.log(Object.getPrototypeOf([]) ==
Array.prototype);
// → true

/**
 * 
 * Object.getPrototypeOf returns the prototype of an object.
 * provides methods like toString
 * 
 * use Object.create to create an object with specific
 * prototype
 */

let protoRabbit = {
    //speak(line) is a shorthand way of defning a method
    // creates a property speak and gives it a function as its value
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};
//proto rabbit is a container for properties shared by rabbilts
let killRabbit = Object.create(protoRabbit);
//killer rabbit uses shared properties from prototype 
killerRabbit.type = "killer";
killerRabbit.speak("SKREE!");
// the killer rabbit says 'Skree!'

/**
 * 
 * contains properties theat apply to itself
 */

// Classes

/**
 * class defines shape of an object 
 * what methods and properties it has
 * such an object is called in instance of a class
 */

// Class Notation

/**
 * prototypes are a take on oo concept called classes
 * class keyword starts a class declaration
 * which can define a constructor and a set of methods
 * in a single place
 * 
 * Instance of a class has to make an object that derives from the 
 * proper prototype has to have properties
 * 
 * constructer creates an instance of a class with proper prototype
 * with properties of a class
 */

function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
} 

/**
 * if you put the keyword new in front of function call the 
 * function is treated as a constructer
 * oject with the right prototype is created bound to this 
 * in the function and returend at the end of the function 
 */

function Rabbit(type) {
    this.type = type;
}
Rabbit.prototype.speak = function(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");

/**
 * constructors and all functions get a property
 * named prototype which holds a plain empty
 * object that derives Object.prototype
 * 
 * you can overwrite with new object or add
 * properties to it
 * 
 * Names of Constructers are capitalized 
 * 
 * the way prototype is associate with constructer 
 * ( through prototype property )
 * vs objects have a prototype
 * (with Object.getPrototypeOf)
 * 
 * prototype of constructor is Function constructors are functions
 * prototype property holds the prototype property used 
 * for instances created through it
 */
/**
 * class declarations only allow methods-properties that hold
 * functions to be added to the prototype
 */

console.log(Object.getPrototypeOf(weirdRabbit) ==
            Rabbit.prototype);
/**
 * like function class can be used both in statements and expressions
 */


// Overriding derived properties

/**
 * when you add a property to an object
 * property is added to the object itself
 * property is hidden behind objects own property
 * if already a property with the same name in the prototype
 */

// Maps

/**
 * a map (noun) is a data structure that associates values keys
 * with other values
 */

// Polymorphism

/**
 * when a piece of code written to work with objects
 * have a certain interface-ex toString method-
 * any kind of object that happens to support this interface
 * can be plugged into the code - called polymorphism
 */

// Symbols

/**
 * symbols are values created with the Symbol function
 */


// Iterator Interface

/**
 * an object that provides a second interface, iterator 
 * when object named with Symbol.iterator symbol is called
 */

// Getters, Settings, Statics

/**
 * properties that are accessed directly that hide method calls
 * and are defined by writing get in front of the method name
 */

/**
 * a property written for an object used to set the values 
 * called a setter
 */


// Inheritance

/**
 * a prototype the derives from the old prototype 
 * ( prorpeties and behaviors from old classes )
 * 
 * but adss a new definition for the set method
 */

// Instanceof Operator

/**
 * instanceOF a binary operator used to know whether an object was derived 
 * from specific class
 */

// Summary

// Exercies

// A Vector Type

// Groups

// Iterable Groups

// Borrowing a method