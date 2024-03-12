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
 */
 // ecmaSctipt modules

// Building and bundling

// module design

// summary

// excercises