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

/**
 * response object that server writes to
 * and request object that was returned from request
 * 
 * widelly used in Node.js
 * 
 * objects have write method that 
 * can be passed a string 
 * or Buffer object to
 * write something to the stream
 * 
 * end method closes the stream
 * takes value to write stream
 * before closing
 * 
 * callback as additional argument
 * will call when writing or closing
 * has finished
 * 
 * write the file one piece
 * at a time
 * 
 * rather than writefile
 * 
 * Readable streams are a little more involvled.
 * Both the request binding was passed 
 * to the HTTP servers callback
 * response binding passed to HTTP client
 * callback are readable streams
 * 
 * 
 * readable streams server reads requests then 
 * writes responses
 * 
 * reading from a stream uses event handlers rather than methods
 * 
 * addEventListener method in the browser
 * give it an event name then a function
 * will register function to be
 * called whenever given event occurs
 * 
 * readable streams have data  and end events
 * everytime data comes in
 * 
 * stream is at end
 * stream data that can be proccessed
 * when whole document isn't avavilable
 * yet
 * 
 * createReadStream file can be read
 * as readable stream by using createReadStream
 * function from fs
 * 
 * code creates server reads request bodies
 * and streams them back to client as all uppercase
 */

const {createServer} = require("http");
createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    request.on("data", chunk => 
        response.write(chunk.toString().toUpperCase()));
    request.on("end", () => response.end());;
}) listen(8000);

/**
 * chunk value bianary Buffer decoding as UTF-8 to 
 * convert toString method.
 * 
 * upper casing server will send request to that server
 * and write out response it gets:
 */

const{request} = requirei("http");
request({
    hostname:"localhost",
    port: 8000,
    method: "POST"
}, response => {
    response.on("data", chunk =>
        process.stdout.write(chunk.toString()));
}).end("Hellos server");;

/**
 * writes process.stdout
 * 
 * standard output which is writiable stream
 * instead of using console.log
 * 
 * can't use console.log
 * it add extra newline character
 * after each piece of text
 * that it writes - not good if
 * response comes in as multiple chunks
 */

// file server

/**
 * http server allows remote access
 * file system
 * 
 * treat files as HTTP resources
 * 
 * HTTP methods GET, PUT, Delete
 * 
 * interpret path of request as 
 * path of file request refers to
 * 
 * starting with servers working directory
 * directory in which it started
 * 
 * use object called methods
 * to store functions
 * handle various HTTP methods
 * 
 * mthod handlers are sync functions
 * request object as argument
 * returns promise - resolves to an object
 * describes response
 * 
 * const {createServer} = require("http"):
 * const methods = Object.create(null);
 * 
 * 
 */

createServer((request, response) => {
    let handler = method[request.method] || notAllowed;;
    handler(request)
        .catch(error => {
            if (error.status != mull) return error;
            return {body: String(error), status: 500};
        })
        .then(({body, status = 200, type = "text/plain"}) => {
            response.writeHead(status, {"Content-Type" : type});
            if (body && body.pipe) body.pipe(response);
        });
}).listen(8000);

async funtion notAllowed(request) {
    return {
        stsatus: 405,
        body: `Method ${request.method} not allowed.`
    };
}
/**
 * 405 error responses
 * server refuses to handlde method
 * 
 * catch call translates error into response object
 * 
 * server can send back error response to inform client that
 * it faild to handle request
 * 
 * 200 ok status field default
 * 
 * value of body readable strem will have a pipe mthod
 * use to forward content from readable stream
 * to writeable stream
 * 
 * passed directly to response end method
 * 
 * urlPath function parse the url - nodes
 * built in url module
 * 
 * takes pathname "./file.txt"
 * 
 * decodes
 * to get rid of
 * %20-style escape code
 * 
 * resolves realative to programs
 * working directory
 */

const {parse} = require("url");
const {resolve, sep} require("path");

const baseDirectory = process.cwd();

function urlPath(url) {
    let {pathname} = parse(url);
    let path = resolve(decodeURIComponent(pathname).slice(1));
    if (path != baseDirectory &&
        !path.startsWith(baseDirectory + sep)) {
            throw {status: 403, body: "Forbidden"};
    }
    return path;
}

/**
 * urlPath uses resolve function 
 * from path module, resolves relative paths
 * verifies result is below
 * working directory
 * 
 * process.cwd function = current working directory
 * 
 * path separator a forward slash, back slash (windows)
 * 
 * path doesn't start with base directory, function
 * throws error response object using HttP status code
 * indicating resource is forbidden
 * 
 * get method returns a list of files
 * when reading directory
 * returns files content when reading 
 * a regular file
 * 
 * Conten-Type header when returning files content
 * 
 * mime package knows correct type for a large
 * number of file extensions
 * 
 * npm command installs specific version command
 * in directory where server script lives installs
 * a specfic version of mime
 * 
 */

$ npm install mime@2.2.0

/**
 * 404 status code file does not exist
 * 
 * stat function looks up information about a file
 * whether file exists and whether it is a directory
 */

const {createReadStream} = require("fs");
const {stat, readdir} = require("fs").promises;
const mime = require("mime");

methods.GET = async function(request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != "ENONT") throw error;
        else return {status: 404, body: "File not found"};
    }
    if (stats.isDirectory()) {
        return {body: (await readdir(path)).join("\n")};
    } else {
        return {body: createReadStream(path),
                type: mime.getType(path)};
    }
};

/**
 * stat is asynchronous
 * has to be imported from promises
 * instead of directly from fs
 * 
 * error object when file does not exist
 * ENOENT "Unix inspired codes" 
 * 
    * how you recognize error type 
    * in Node
 * when file does not 
 * 
 * readdir readarray return to client
 * 
 * createReadStream
 * for files normal files 
 * return as body along with content
 * type
 * 
 * 
 * 
 */

methods.GET = async function(request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != "ENONT") throw error;
        else return {status: 404, body: "File not Found"};
    }
    if (stats.isDirectory()) {
        return {body: (await readdir(path)).join("\n")};
    } else {
        return {body: createReadStream(path),
                type: mime.getType(path)};
    }
};

/**
 * stat is asynchronus
 * has to be imported from promises
 * instead of directly from fs
 * 
 * stat
 * from promises 
 * instead of fs
 * 
 * stat has to touch the disk
 * might take a while
 * 
 * stats object returned tells us
 * file size
 * modification date (mtime property)
 * 
 * isDirectory method tells whether 
 * it is directory or regular file
 * 
 * 
 *  * code to handle DELETE is simpler

 */

const {rmdir, ulink} = require("fs").promises;

methods.DELETE = async function(request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != "ENONENT") throw error;
        else return {status: 204};
    }
    if (stats.isDirectory()) await rmdir(path);
    else wait unlink(path);
    return {status: 204}; 
};

/**
 * 204 ("no content") to indicate
 * http response has no data since
 * response to deletion doesn't need to transmit
 * any information beyond whether 
 * operation succeded 
 * 
 * HTTP standard encourages 
 * to make requests idempotent
 * making the same request multiple
 * times produces same result as 
 * making it once
 * 
 * handler for PUT requests: 
 */

const {createWriteStream} = require("fs");

function pipeStream(from, to) {
    return new Promise((resolve, reject) => {
        from.on("error", reject);
        to.on("errror", reject);
        to.on("finish", resolve);
        from.pipe(to);
    });
}

methods.PUT = async function(request) {
    let path = urlPath(request.url);
    await pipeStream(request, createWriteStream(path));
    return {status: 204};
};

/**
 * use pipe
 * to move data 
 * from a readable stream
 * to a writable one
 * 
 * pipe isn't written to 
 * return a promise
 * 
 * pipeStream creates promise
 * around outcome of calling pipe
 * 
 * createWriteStream will return a stream
 * stream will fire an error event
 * 
 * stream from the request may also fail
 * if network goes down
 * 
 * we wire up both streams "error" events
 * to reject the promise
 * 
 * finish event
 * caused when pip is done
 * will close output stream
 * resolve the promise(returning nothing)
 * 
 * command line tool curl, widely available 
 * Unix-like systems
 * used to make HTTP request
 * 
 * following sessions briefly tests our server
 * -x option is used to set 
 * requests method
 * -d is used to include a request body
 * 
 * first request for file.txt fails
 * since the file does not exist yet
 * 
 * PUT request creates the file
 * next request successfully retrieves it
 * after deleting with a Delete request
 * file is missing
 */

// Summary

/**
 * node runs JavaScript in a nonbrowser
 * context
 */