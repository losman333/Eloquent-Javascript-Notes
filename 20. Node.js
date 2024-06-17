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
 * 
 * after running npm install
 * NPM will have created a directory
 * that contains the library
 * 
 * when require ini is loaded we call
 * is parse property to parse a 
 * configuration
 */

// Pacakge Files
/**
 * create package.json file for each node project
 * manually or running npm init
 * 
 * contains information about project
 * name and version and list
 * of dependencies
 * 
 * robbot simulation in chapter 7
 * might have package.json file like this
 */

{
    "author": "Margin Haverbke",
    "name": "eloquent-javascript-robot",
    "description" : "Simulation of package-delivery robot",
    "version": "1.0.0",
    "main": "run.js",
    "dependencies": {
        "dijkstrajs": "^1.0.1",
        "randon-item": "^1.0.0"
    },
    "license":"USC"
}

/**
 * run npm install will install all dependencies
 * unless installing a specific package 
 */

// Versions 

/**
 * package.json  program's version
 * and dependencies
 * 
 * follows schema called semantic
 * versioning.-- encodes information about which
 * version are compatible
 * 
 * semantic vesion consists of three 
 * numbers, seperated by periods
 * 
 * everytime new functionality is added
 * middle number to be incremented e
 * 
 * everytime compatibility broken first 
 * number has to be incremented
 * 
 * ^ character indicates that any version
 * compatible with given number may be
 * installed ^2.3.0 would mean any 
 * version greater than or equal to 2.3.0 and less than
 * 3.0.0
 * 
 * NPM command used to publish new packages or new
 * version of packages
 * 
 * npm publish will publish package with 
 * name and version
 * 
 * listed in JSON file to registry
 * 
 * 
 */

// FIle system Module

/**
 * character encoding - used to
 * decode file into a string
 * 
 * UTF-8 when reading text file
 * 
 * if no encoding 
 * node assumes you want
 * binary data - will give you
 * a buffer object instead of a string
    - an array-like object that contains numbers 
    representing representing bytes (8-bit chunks of data) in files
 * 
 */

    const {readFile} = require("fs");
    readFile("file.txt", (error, buffer) => {
        if(error) throw error;
        console.log("The file contained", buffer.length, "bytes",
                    "the first byte:", buffer[0]);
    });

/**
 * writeFile used to write files to disk
 */

const {writeFile} = require("fs");
writeFile("graffiti.txt", "node was here", err => {
    if (err) console.log(`Failed to write file: ${err}`);
    else console.log("File written.");
});

/**
 * write file assumes when given a string it should
 * write it out as text using default character encoding
 * which is UTF-8
 * 
 * fs module contains other useful functions: readir
 * will return files in a directory as array of strings
 * stat will retrieve information about file
 * 
 * unlink will remove a file
 * 
 * take callback function as last parameter
 * which they call with an error first argument
 * 
 * or successful result
 * 
 * error handling becomes verbose and error-prone
 * 
 * promises are being integrated into Node.js
 * 
 * object promises exported from fs package
 * since version 10.1 contains most of the same
 * functions as fs but uses promises
 * rather than. callback functions
 */

const {readFile} = require("fs").promises;
readFile("file.txt", "utf-8")
    .then(text => console.log("the file contains:", text));

const {readFileSync} = require("fs");

/**
 * many functions in fs have synchronous
 * variant which has same name with Sync
 * added to the end
 * 
 * synchronous versoin of readFile called readFileSync
 */
console.log("The File contains:", 
            readFilesSync("file.txt", "utf8"));

const {readFileSync} = require("fs");
console.log("The File contains:", 
    readFileSync("file.txt", "utf8")
);

/**
 * while synchronous operation being performed
 * program is stopped entirely
 * 
 * not good if it should be responding
 * to the user or to other machines
 * on network being stuck on
 * a synchronous action might produce annoying delays
 */

// HTTP Module

/**
 * http 
 * 
 * central module
 * 
 * provides functionality for running HTTP servers
 * making HTTP requests
 * 
 * to start HTTP Server 
 */

const{createServer} = require("http");
let server = createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.writei(`
        <h1>Hello</h1>
        <p> You asked for <code>${request.url}</code></p>`);
    response.end();;
});
server.listen(8000);
console.log("Listening! (port 8000)");

/**
 * everytime client connects to server function
 * passed as arguement to createServer
 * 
 * request and respondse binding 
 * are objects representing incoming
 * and outgoing data
 * 
 * first contains information about request
 * such as url property tells to what url
 * request was made
 *  pages sends request to computer
 *  casuse server function to run
 *  and send back response which you can
 *  see in the browser
 * 
 * writeHead will write response headers
 * 
 * give it status code(200 for OK) and object
 * that contains header values
 * 
 * example sets Conten-Type header
 * to inform client will send back html doc
 * 
 * actual response body(sent with response.write)
 * 
 * call method multiple timesto send response
 * piece by piece -- to stream data to client
 * as it becomes available
 * 
 * Finally response.end signals end of response
 * 
 * server.isten
 * causes server 
 * start waiting for connections to port 800
 * 
 * localhost 8000 to speak to server
 * rather than localhost uses port 80 default
 * reason why you have to connect to localhost:8000
 * 
 * network connections 
 * node will not exi when reaches end of script
 * control-C to close
 * 
 * method property
 * see's which action client is trying
 * to perform looks at requests URL
 * find out which resource action is permormed on
 * 
 * request function to act as an HTTP client
 * 
 * 
 * second
 */

const {request} = require("http");

let requestStream = request({
    hostname: "eloquentjavascript.net",
    path: "/20_node.html",
    method: "GET",
    header: {Accept: "text/html"}
}, response => {
    console.log("Server responded with status code",
                response.statusCode);
});
requestStream.end()
/**
 * first arguement to request configures the request
 * what server to talk to
 * 
 * what path request from that server
 * 
 * method to use 
 * 
 * second argument 
 * 
 * function to be called when response comes in
 * given an object allows to inspect response 
 * 
 *      ex: to inspect response
 *          to find out status code
 * 
 * stream data into request
 * 
 * write method
 * 
 * end method
 * 
 * does not use write 
 * get request should not contain data in request body
 * 
 * similar request function https module
 * can be used to make requests to http: URLS
 * 
 * more convenient wrapper packages available
 * on NPM
 * 
 * node-fectch provides promise-based fetch interface
 * that we know from the browser
 */

// streams



// file server

// Summary