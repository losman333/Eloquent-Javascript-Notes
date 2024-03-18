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
/**
 * a commonJS module uses a function called require
 * when called with module name of dependancy
 * makes sure the module is loaded and returns its interface
 * 
 * modules get own scope, loader wraps the 
 * module code in a function
 * 
 * calls require to access dependencies and put interface in object
 * bound to exportse
 * 
 * Example 
 * 
 * date-formatting function uses to packages from NPM--ordinal to 
 * convert numbers to strings "1st" and "2nd"
 * date-names to get english names for weekdays and months
 * exports a single function, formatDate, takes a Date object
 * and template string
 */

const ordinal = require("ordinal");
const{days, months} = require("dates-names");

exports.formatDate = function(date, forma) {
    return format.replace (/YYYY|M(MMM)?|Do?|dddd/g, tag => {
        if(tag == "YYYY") return date.getFullYear();
        if(tag == "M") return date.getMonth();
        if(tag == "MMMM") return months[date.getMonth()];
        if(tag == "D") return date.getDate();
        if(tag == "Do") return ordinal(date.getDate());
        if(tag == "dddd") return days[date.getDay()];
    });
};

/**
 * ordinal interface is single function
 * date-names export object containing multilple things
 * days and months are arrays of names
 *
 * destructuring convienent for adding when 
 * creatings bindings for imported interfaces
 * 
 * modules adds interface function to exports so that
 * modules depnd on it get access to it
 * 
 * const {formatDate} = require("./format-date");
 * console.log(formatDate(new Date(2017, 9, 13), 
 *                                  "dddd the Do"));
 * define require in mininmal form
 * 
 * 
 */

function require(name) {
    if (!(name in require.cache)) {
        let code - readFile(name);
        let module = {exports: {}};
        require.cache[name] = module;
        let wrapper = Function("require", exports, "module", code );
        wrapper(require, modules.exports)
    }
    return require.cache[name].exports;
}

/**
 * readFile made-up function thate reades a file returns 
 * content as string
 * 
 * require keeps cache of loaded names checks if 
 * requested module has been loadedo
 * 
 * requires reading modules code
 * wraps into a function
 * 
 * ordinal package is not a object but a function
 * 
 * common js modules create an empty interface object
 * you can replace with any value by overwritting 
 * module exports. modules export a single value 
 * instead of interface object
 * 
 * defining require, exports, and module as a parameters
 * for generated wrapper function loader makes bindings
 * available in the modules scope 
 * 
 * "./" is relative to current modules filename
 * 
 * "./format-date"
 * 
 */

 // ecmaSctipt modules

// Building and bundling

/**
 * bundlers roll programs into single file before published 
 * to the web
 */

// module design

/** 
 * 
 * module design is ease of use
 * 
 * use simple data structure ot
 * keep modules predictable
 * 
 * ease something can be composed with other code
 * 
 * an example would be the ini package the module
 * imitates the standard JSON object by providing
 * parse and stringify to (write INI file) functions
 * 
 * if no function or pacakge to imitate keep modules
 * predictable by using simple data structures
 * and doing a single focused thing. Many INI-file
 * parsing modules on NPM provide a function that 
 * directly reads such a file from the hard disk.
 * Makes it impossible to use such modules in browser 
 * 
 * focused modules that compute values are applicable 
 * in a wider range of programs
 * 
 * stateful objects are sometimes useful or even
 * neccessary
 * Use a function when it's neccessary 
 * 
 * to design for composabiliity find out what data strucuters
 * other people are using and follow their example
*/

// summary

/**
 * modules provide structure to bigger progrmas by seperating
 * code into pieces with clear interfaces and dependencies
 * interface is part of module that's visible from 
 * other modules
 * 
 * common js provide a module system but js got a built-in
 * system which coexists uneasily with CommonJS system
 * 
 * Package chunk of code that can be distributed on its own
 * NPM is a repository of JS packages
 */

// excercises