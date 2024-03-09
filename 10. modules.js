/**
 * what kind of problems do modules help solve
 * 
 * eleminate having to figure out how code
 * integrates with other pieces of code.
 * 
 * helps with understanding  a system
 * 
 * allows you to split code in self-contained units.
 * makes it more modular and reusable
 * 
 * relationship between modules are called dependencies
 * 
 * a
 * 
 */

// packages
/**
 * a chunk of code that can be distributated
 * 
 * NPM stores and installs packages
 * 
 * online store where you can download and upload
 * packages and a prgraa
 */

// Improvised modules

/**
 * no built in module system in modules system
 * 
 */

/**
 * modules for going between day and names and numbers
 * returned by Dates getDay method
 */
const weekDay = function() {
    const names = ["Sunday", "monday", "tuesday"];
    return {
        name(number) { return names[number];},
        number(name) {return names.indexOf(name); }
    };
}();

/**
 * to make dependency relations part of the code, control loading 
 * dependencies
 */
// evalutating data as code

/**
 * how to take data and run it as part
 * of the current program
 * 
 * use function constructor with two 
 * arguements: a string containing a
 * comma-seperated list of argument names
 * and a string containing the function
 * body.
 * 
 * wraps the code in a function value so
 * that it gets its own scope
 * won't do odd things with other scopes
 * 
 */

let plusOne = Funtion("n", "return n + 1;");
console.log(plusOne(4));

// common js


// ecmaSctipt modules

// Building and bundling

// module design

// summary

// excercises