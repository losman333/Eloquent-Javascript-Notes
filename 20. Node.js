/**
 * 
 * node.js 
 * 
 * a program that allows you to apply your JavaScript
 * skills outsidei of the browser
 * 
 * you can buid anything from small command line
 * tools to HTTP servers that power dynamic websites
 * 
 * Node was conceived for the purpose of making
 * asynchronous programming easy and convenient
 * 
 * one of the few programming languages that
 * does not have a built-in way to do in and output
 */

// The node command 
/**
 * When node.js is installed it provieds a 
 * programmed called node which is used
 * to run javascript files
 * 
 * example 
 * 
 * hello.js
 * contains code
 */

let message = "Hello World";
console.log(message);

// rune node from command line to execute

$ node hello.js
Hello 

/**
 * console.log method in Node prints
 * out a piece of text. 
 * 
 * In node text will go to process's standard 
 * outputp stream rather than to a 
 * browsers Javascript console.
 * 
 * when running node from command line you 
 * see logged values in your terminal
 * 
 * if you run node without giving it a file
 * it provides you with a prompt at which you can
 * type JavaScript code and immediately see the
 * result
 */

$ node
> 1 + 1
2
> [-1, -2, -3].map(Math.abs)
[1, 2, 3]
> process.exit(0)
$

/**
 * process binding just like console binding
 * is available globally in Node it provides
 * various ways to inspect and manipulate
 * the current program
 * 
 * Exit method ends the process and can be
 * given an exit status code which tells
 * the program that started node
 * the command line shell whether the program
 * completed successfully(code zero) or encountered any other code
 * 
 * to find command line arguements givent to script
 * you can read process.argv which is an array of strings
 * 
 * also includes arguements start at index 2
 * 
 * if showargv.js contains statement console.log(process.argv)
 */

$ node showarg.js one --and two
["node", "/tmp/showargv.js", "one", "--and", "two"]

/**
 * Array, Math, and JSON also present in Node's enviornment
 * Browser-related functionlity such as document or prompt
 * is not
 */

// Modules

/**
 * to acces built-in functionality you ask
 * module system for it
 * 
 * CommonJS module system based on require
 * function was described in Chapter 10
 * system is built into Node an used to load
 * anything from built-in modules to downloaded
 * packages to files that are part of program
 * 
 * when required called Node has to resolve 
 * given string to actual file that it can load
 * 
 * Pathnames start with /, ./ or ../
 * . stands for the current directory
 * 
 * if required path refers to directory Node will 
 * try to load the file named index.js in directory
 * 
 * node_modules directory
 * when stirng that does not look like a relative or 
 * absolute path is given require its assumed
 * to refer to either built-in mdoule or module
 * installed in a node-modules directory
 * 
 * require fs will Nodes built-in files system module
 * 
 * require robot might try to load library found in
 * node_modules/robot.
 * 
 * common way to install such libraries 
 * dound in node_modules/robot/
 * 
 * common way to install libraries is by using
 * NPM
 * 
 * 
 */

const {reverse} = require("./reverse");

let argument = process.argv[2];

console.log(reverse(argument));

/**
 * file reverse.js defines a library for reversing
 * strings which be used both by the command line tool
 * and by other scripts that need direct access to 
 * string-reversing function
 */

exports.reverse = function(string) {
    return Array.from(string).reverse().join("");
};

/**
 * adding properties to exports adds
 * them to interface of module
 * 
 * Node.js treats fiels as CommonJS moduels
 * main.js can take the exported reverse function from
 * reverse.js
 */

// Installing with NPM

/**
 * use node to fetch and install packages
 */

// FIle system Module

// HTTP Module

// streams

// file server

// Summary