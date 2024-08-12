/**
 * an expression in js
 * 
 * a fragment of code that produces
 * value is called an expression
 * 
 * use expression to communicate complex
 * computations 
 * 
 * values have to be framed in a 
 * larger stucture to be useful
 * 
 * expressions can contain other expressions
 * 
 * javascript statement corresponds to ful setencee
 * 
 * a programm is a list of statements n
 * 
 * expressions have semi-colon 
 */

1;

!false

/**
 * a statement changes something or 
 * affects statements that come af
 * 
 * every statement needs a semi-colon
 * 
 * 
 * how does javascript hold values
 * to catch and hold values
 * JS provides binding or variable
 * 
 * let caught = 5 * 5
 * 
 * let defines a binding
 * followed by name of binding (caught) 
 * 
 * after binding is defined
 * its name can be used as an expression
 * the value of an expression is that
 * value the binding currently holds
 * 
 * let ten = 10;
 * console.log(ten * ten);
 * 
 * = operator can be used to at any time
 * to disconnect them from their
 * current value and have them point to a 
 * new one 
 */

let mood = "light";
console.log(mood);
//dark

mood = "dark";
console.log(mood);;
//dark


/**
 * bindings are like tentacles
 * the do not contain values they grasp them
 * program can only access values that it still
 * has a reference to
 * 
 */

let luigisDebt = 140;
lugisDebt = luigisDebt - 35;
console.log(luigisDebt);
// 105

/** how to define multiple bindings?
 * defenitions must seperated by commas
 * 
 * let one = 1, two = 2;
 * console.log(one + two);
 * // 3
 */

var name = "Ayuda";
const greeting = "Hello";
console.log(greeting + name);
// Hello Ayda

/**
 * const points to same value 
 * as long as it lives
 * for bindings that give name to
 * a value so you can easily refer to it
 */

// Binding Names

/** can be any word
 *    name must not start with digit
 *    may include dollar signs or underscores
 *    but no other punctuation or special characters
 */

// The Enviornment

/**
 * collection of bindings
 * is called the enviornment
 * 
 * always contains bindings 
 * that are part of the language
 * when starting a prgram
 * 
 * bindings that are part of the language
 * bindings that provides ways to interact
 * with surrounding system (functions to 
 * interact mouse and keyboard input) 
 */

// Functions
/**
 * program wrapped in a value
 * 
 * values can be applied in order
 * to run the wrapped program
 * 
 * prompt is a binding
 * holds a function that
 * shows a little dialog box
 * for user input
 */

prompt("Enter passcode");

/**
 * invoking
 * 
 * calling
 * 
 * applying
 */


//