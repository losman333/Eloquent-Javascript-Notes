
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
class Rabbit {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`${this.type} rabbit says '${line}'`);
    }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black")

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
// true
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

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// long, sharp, and bloody
console.log(blackRabbit.teeth);
//small
console.log(Rabbit.prototype.teeth);

/**
 * Overriding properties can be used to express
 * exceptional properties in the instances
 * of a more generic class of objects
 * 
 * also used to give the standard function and 
 * array prototypes a different toString method
 * than basic object prototype
 */

console.log(Array.prototype.toString ==
            Object.prototype.toString);
// false
console.log([1, 2].toString());
// 1, 2   

/** call ing toSTring on an array gives a result
 * similar to calling .join (", ")
 * puts commas between the values in the array
 * Directly calling Object.prototype.toString
 * with a string produces a different string.
 * function simply puts the word object and the 
 * name of type betwee square brackets
 * 
 */

console.log(Object.prototype.toString.call([1, 2]));
// [object Array]


// Maps

/**
 * a map (noun) is a data structure that associates values keys
 * with other values
 * 
 * used to map names to ages
 */

let ages = {
    Boris: 39,
    Lian: 22,
    Julian: 62
};

console.log(`Júlia is ${ages["Júlia"]}`);
// → Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages); 
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages); 
// → Is toString's age known? true

/**
 * pass null to Object.create
 */

console.log("toString" in Object.create(null));
// false

/**
 * objects keys can't be converted to strings
 * can't use object as a map
 * 
 * class Map stores a mapping and allows any type of keys
 */

let ages = new Map();
ages.set("Borris", 39);
ages.set("Ling", 22);
ages.set("Julia", 62);

console.log('Julia is ${ages.get("Julia")}');
// Julia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// Is Jack's age known? false
console.log(ages.has("toString"));

/**Object.keys returns only an objects own keys not 
 * those in the prototype
 * 
 * use hasOwnProperty method as alternative to the in operator 
 * which ignores the objects prototype
 * 
*/

console.log({x:1}.hasOwnProperty("x"));
//true
console.log({x:1}.hasOwnProperty("toString"));
//false

// Polymorphism
/**
 * String function converts value to a string of object
 * will call toString method on that object to try to 
 * create a meaningful string from it
 * 
 * Some standard prototypes define their own version of
 * toString to create string with more useful information
 * instead of just [objecObject]
 */

Rabbit.prototype.toString = function() {
    return 'a ${this.type} rabbit';
};

console.log(String(blackRabbit));
// a black rabbit

/**
 * when a piece of code written to work with objects
 * have a certain interface-ex toString method-
 * any kind of object that happens to support this interface
 * can be plugged into the code - called polymorphism
 * can work with values of different shapes as long as they
 * support the interface it expects
 * 
 * for/of loop can loop over serveral kids of data structures
 * arrays and strings expose a specific interface
 * which can be added to objects
 */

// Symbols

/**
 * multiple interfaces can use the same property name
 * not possible for an object to conform to both
 * interface and standard use of toString
 * 
 * property names are strings but can also be symbols
 */

/**
 * symbols are values created with the Symbol function
 * you cant create symbols twice
 */

let sym = Symbol("name");
console.log(sym == Symbol("name"));
// false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);

/**
 * string you pass to symbol is included when you 
 * convert to string makes it easier to recognize 
 * symbol when showing it in the console
 * symbols suitable for defining interfaces that can
 * live alongside other properties regardless of names
 */

const toStringSymbol = Symbol("toString");

Array.prototype[toStringSymbol] = function() {
    return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());
// 1, 2
console.log([1, 2][toStringSymbol]());
// 2 cm of blue yarn

/**
 * use square brackets around property names to include symbol
 * properties in object expressions and classes 
 * causes property name to be evaluated like square property access 
 * notation, you can refer to a binding that holds the symbol
 */

let stringObject = {
    [toStringSymbol]() { return "a jute rope"}
};
console.log(stringObject[toStringSymbol]());
// a jute rope

// Iterator Interface

/**
 * when object of for/loop is iterable. Has a method named 
 * with the Symbol.iterator symbol (a symbol
 * value defined by language stored as a property of Symbol
 * function)
 * 
 * an object that provides a second interface, iterator 
 * when object named with Symbol.iterator symbol is called
 * 
 * next, value, done property names are plain strings not
 * symbols. Only Symbol.iterator likely to be added to
 * a lof different objects is an actual symbol
 * 
 */

let okIterator = "OK" [Symbol.iterator]();
console.log(okIterator.next());
// {value: "0", done: false}
console.log(okIterator.next());
// {value: "K", done: false}
console.log(okIterator.next());

// two dimensional array

// class stores content in a single array of w x h
class Matrix {
    // constructor func takes w, h, and element func to fill values
    constructor( width, height, element = (x, y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x, y);

            }
        }

    }
    // get and set method retrieve and update elements in matrix
    get(x, y){
        return this.content[y * this.width + x];
    }
    set(x, y, value) {
        this.content[y * this.width + x] = value;
    }
}

/**
 *  looping over a matrix usually interested in position
 * of elements as well as elements themselves use iterator
 * to produce objects with x, y and value properties
 * 
 */

// class tracks progress of iterating over a matrix in its x
// and y properties
    class MatrixIterator {
        contructor() {
            this.x = 0;
            this.y = 0;
            this.matrix = matrix;
        }
/**
 * next method starts by checking bottom of matrix has
 * been reached
 */
        next() {
            if (this.y == this.matrix.height) return {done: true};
            // creates the object holding current value then
            // updates its position
            let value = {x: this.x, 
                         y: this.y, 
                         value: this.matrix.get(this.x, this.y)};
            // moves to next row if necessary
            this.x++;
            if (this.x == this.matrix.width) {
                this.x = 0;
                this.y++;
            }
            return {value, done: false};
        }
    }

/**
 * occaionally use after-the-face prototype manipulation
 * to add methods
 * Declare methods directly in the class instead of spliting 
 * into small pieces
 */

Matrix.prototype[Symbol.iterator] = function () {
    return new MatrixIterator(this)
};

// loop over matrix with for/of

let matrix = new Matrix(2, 2, (x,y) => `value ${x}, ${y}`);
for (let {x, y, value} of matrix) {
    console.log(x, y, valule);
}
// → 0 0 value 0,0 
// → 1 0 value 1,0 
// → 0 1 value 0,1 
// → 1 1 value 1,1


// Getters, Settings, Statics

/**
 * properties that are accessed directly that hide method calls
 * such methodsh are called getters
 * and are defined by writing get in front of the method name
 */

let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100);
    }
};

console.log(varyingSize.size);
// 73
console.log(varyingSize.size);
// 49

class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }
    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }
    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }
    static fromFahrenheit(value) {
        return new Temperature((value -32) / 1.8);
    }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// 30

/**
 * temperature class stores only Celsius in the fahrenheit getter and setter
 * converts to and from Celsius in fahrenheit getter and setter
 * 
 * 
 */

/**
 * a property written for an object used to set the values 
 * called a setter
 */


/**
 * a prototype the derives from the old prototype 
 * ( prorpeties and behaviors from old classes )
 * 
 * but adss a new definition for the set method
 * 
 * properties in constructor functions can be used 
 * to provide additional ways to create instances
 * 
 * inside class declaration methods that have static written before their names
 * are stored on the constructor
 * 
 * Tempeture class allows you to write Temperature.fromFahrenheit(100)
 * to create a tempertaure using dgress Fahrenheit
 */

// Inheritance
/**
 * some matrices are symmetric value stored at x,y
 * is always the same as that at y, x
 * inhertiace is properties inheriting behavior from the old class
 * 
 * prototype for new class derives from old prototype but 
 * adds a new defintion for set method
 */

class SymetricMatrix extends Matrix {
    constructor (size, element = (x, y) => undefined) {
        // class superclass constructor throught super keyword
       
        super(size, size, (x, y) => {
            if (x < y) return element(y,x);
            else return element(x, y);

        });
    };
    // set method uses supper to call specifc method
    // from super class
    set(x, y, value) {
        super.set(x, y, value);
        if (x != y) {
            super.set(y, x, value);
        }
    }
}

let matrix = new SymmetricMatrix(5, (x, y) => `${x}, ${y}`);
console.log(matrix.get(2, 3));
 /**
 *  to ensure the matrix is symetrical
 *  the constructor wraps the element function
 * to swap the coordintaes for values below diagnoal
 * 
 * inside class methods super provides a way to call 
 * methods defined in the superclass
 * 
 * polymorphism, encapsulation used to seperate pieces
 * of code from eatch
 * inhertence ties classes together creating more tangle
 */
/**
 * use of the word extends indicates that this shouldn't
 * be directly based on the default Object prototype
 * but on some other class
 * 
 * superclass
 * 
 * 
 */
// Instanceof Operator

/**
 * instanceOF a binary operator used to know whether an object was derived 
 * from specific class
 */

console.log( new SymmetricMatrix(2) instanceof SymmetricMatrix);
// true
console.log(new SymmetricMatrix(2) instanceof Matrix);
// true
console.log(new matrix(2, 2) instanceof SymmetricMatrix);
// false
console.log([1] instanceof Array);
// true

/**
 * operator will see through inherited types
 * SymmetricMatrix is an instance of a Matrix
 * operator can be applied to standard constructors like Array. 
 * Almost every object is an instance of Object. 
 */
// Summary

/**
 * prototypes
 * Object.prototype
 * constructors start with Capital letter
 * values in prototypes
 * class notoation to provide a clear way to define a
 * constructor and its prototypee
 * difine getters an setters to secretly call methods
 * static methods a are stored in class constructor rather than prototype
 * instanceof operator is an instance of that constructor
 * specify an interface for an object and tell everybody 
 * they are suppose to talk to your object only through that interface
 * rest of the detail are nown encapsulated
 * 
 * polymorphism code written to use an interface with any number of
 * objects that provide the interface
 * 
 * implementing multiple classes that differ in details
 * write new classes as subclasses of existing class
 * inheriting part of its behavior
 */
// Exercies

// A Vector Type 
/**
 * write class that represents vector in two-dimensional space
 * takes x and y parameters(numbers)
 * 
 * give vec prototype two methods, plus and minus that take
 * another vector as a parameter and return a new vector
 * that has the sum or difference of two vectors (this and the parameter)
 * x and y values
 * 
 * add getter property length to the prototype that computes the length
 * of the vector distance of the point (x, y) from origin 0,0
 */
class Vec {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    plus(other) {
      return new Vec(this.x + other.x, this.y + other.y);
    }
  
    minus(other) {
      return new Vec(this.x - other.x, this.y - other.y);
    }
  
    get length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }
  
  console.log(new Vec(1, 2).plus(new Vec(2, 3)));
  // → Vec{x: 3, y: 5}
  console.log(new Vec(1, 2).minus(new Vec(2, 3)));
  // → Vec{x: -1, y: -1}
  console.log(new Vec(3, 4).length);
  // → 5

// Groups
/**
 * write a class called group
 * like set has add, delete, and has methods
 * constructor creates empty group
 * add adds value to the group only if not a memeber
 * delete romves arguments from group if a memeber
 * has returns a Boolean value indicates argument is member of group
 * 
 * use === or equivalent such as indexOf to determine whether values 
 * are the same
 * give class a static from method that takes iterable object
 * as arguement and creates a group that contains all values by 
 * iterating over it
 */

class Group {
    constructor() {
      this.members = [];
    }
  
    add(value) {
      if (!this.has(value)) {
        this.members.push(value);
      }
    }
  
    delete(value) {
      this.members = this.members.filter(v => v !== value);
    }
  
    has(value) {
      return this.members.includes(value);
    }
  
    static from(collection) {
      let group = new Group;
      for (let value of collection) {
        group.add(value);
      }
      return group;
    }
  }
  
  let group = Group.from([10, 20]);
  console.log(group.has(10));
  // → true
  console.log(group.has(30));
  // → false
  group.add(10);
  group.delete(10);
  console.log(group.has(10));
// Iterable Groups

/**
 * Make group class from previous exercise iterable
 * refer to iterator interface
 * array was used from groups members don't just
 * return the iterator created by calling Symbol.iterator
 */
class Group {
    constructor() {
      this.members = [];
    }
  
    add(value) {
      if (!this.has(value)) {
        this.members.push(value);
      }
    }
  
    delete(value) {
      this.members = this.members.filter(v => v !== value);
    }
  
    has(value) {
      return this.members.includes(value);
    }
  
    static from(collection) {
      let group = new Group;
      for (let value of collection) {
        group.add(value);
      }
      return group;
    }
  
    [Symbol.iterator]() {
      return new GroupIterator(this);
    }
  }
  
  class GroupIterator {
    constructor(group) {
      this.group = group;
      this.position = 0;
    }
  
    next() {
      if (this.position >= this.group.members.length) {
        return {done: true};
      } else {
        let result = {value: this.group.members[this.position],
                      done: false};
        this.position++;
        return result;
      }
    }
  }
  
  for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  // → a
  // → b
  // → c
// Borrowing a method

let map = {one: true, two: true, hasOwnProperty: true};

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true