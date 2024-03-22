//Asynchronicity

/**
 * allows multiple things to happen at the same time
 * program continues to run when action started
 * 
 * when action finishes program is informed
 * gets access to result
 * eg: data read from disk
 * 
 * synchronous returns only after it has done work
 * draw back is second request will be started only 
 * when first is finished
 * A solution is to start threads of control
 * Thread is running program where execution is interleaved
 * with other programs by os 
 * muli-processors contain multi-threads at same time
 * 
 * in synchronous modle time taken by network is part of 
 * timeline for a given thread of control
 * 
 * async causes split in timeline program that started action
 * continues running action happens alongside it
 * 
 * synchronous thread of control
 * ------*--------
 * 
 * synchronous two threads of control
 * --*-----------   ------
 * --*--------------
 * 
 * asynchronous
 * 
 * waiting for actions to finish is implicit in sychronous
 * 
 * while it is explicit under our control in asynchronous one
 * 
 * Both JS platforms browsers and Node.js use async for operations
 * that take a while instead of threads which is good 
 */


//Crow Tech

//Callbacks

/**
 * 
 * make function that perform slow action take
 * an extra argument a callback function
 * action is started when finishes callback 
 * function is called
 * 
 * setTimeout function waits a number of milliseconds
 * then calls a function
 * 
 */

setTimeout(() => console.log("Tick"), 500);

/**
 * multiple actions in a row using callbacks means 
 * you have to keep passing new functions to handle
 * continutatoion of computation after the actions
 * 
 * storage bulbs store pieces of JSON-encodable data
 * to look up cache in storage bulb run code like this
 */

import {bigOak} from "./crow-tech";

bigOak.readStorage("food caches", caches => {
    let firstCache = caches[0];
    bigOak.readStorage(firstCache, info => {
        console.log(info);
    });
});

/**
 * request response pairs use types
 * determines how response is handled
 * 
 * interface exported by "./crow-tech" module
 * provides callback-based functions for communication
 * nests have a send method that sends of request
 * expects the name of the target nest, type of request, 
 * and content of request as first three arguements
 * expects a function to call when a response comes in 
 * as its fourth last argument 
 */

bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7pm", 
            () => console.log("Note delivered."));

/**
 * to be able to receive message define a request type
 * to handle requests 
 */

import {defineRequestType} from "./crow-tech";

defineRequestType("note", (nest, content, source, done) => {
    console.log('${nest.name} received note: ${content}');
    done();
});

/**
 * 
 * note request sends note to given nest. 
 * console.log will verify if note has arrived
 * fourth argument done is callback function 
 * must call when done with request
 * cant perform async action if handlers return
 * value is response value
 * 
 * function doing async work returns before work 
 * is done
 * 
 * callback function to signal a response is
 * available
 * 
 * any function that calls an async function must
 * be asynchronus, using a callback or similar
 * mechanism to deliver result. 
 */

// Promises

/**
 * abstract concepts can be represented by values
 * return object that represents future event
 * 
 * promise async action that may complete a some point
 * and produce a value. 
 * 
 * call promise using Promise.resolve
 * func ensures value given is wrapped in a promise                            
 */

let fifteen = Promise.resolve(15);

let fifteen = Promise.resolve(15);
use then metod.      
fifteen.then(value => console.log(`Got ${value}`));

/** to results of promise use then method
 * registers a callback function to be called when promise
 * resolves and produces value
 * add multiple clallbacks to single promise will be 
 * called even if you add them after promise has resolved
 * 
 * then method returns another promise resolves value
 * that handler function returns
 * if promised is returned then resolves to its result
 * 
 * promies is a device to move values into async reality
 * promised value might appear some point in the future
 * 
 * promise constructor is used to create a promise
 * constructor expects a function as an arg.
 * passes it a function that can be resolve the promise
 * only code that created promise can resolve it
 * 
 * promised-based interface for readStorage
 */

function storage(nest, name) {
    return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result));
    });
}

storage(bigOak, "enemies")
    .then(value => console.log("Got", value));

/**
 * promises simlify use asynchro functions
 * 
 * take input as arguments and return output
 * output may not be available yet
 */

// Failure

/**
 * problem with callback of async programming
 * difficult to make sure failures are calledback properly
 * 
 * 1 solution first argument ot callback indicate action
 * failed second contains value produced by action
 * when successful 
 * callback function must check the received exception
 * and make sure any problems including exception 
 * thrown by functions are caught and given to right function
 * 
 * promises resolve action successfully or reject if failed
 * 
 * Resolve handlers registered with then called only when action successful
 * reject action returned by then
 * when handler throws exception automaticlaly causes promise 
 * produced by then call to be rejected
 * 
 * no success handlers are called beyond where failed
 * 
 * resason of rejection value provided by promise
 * when exception in handler causes rejection
 * 
 * promise rejected by handler flows into next promise
 * promise.reject function creates new rejected promise
 * 
 * catch method registers handler to be called when
 * promise is rejected similar to then handlers
 * like then that returns a new promise
 * 
 * new promise rejected if catch handler throws error
 * 
 * then accepts rejection handler as second argument
 * you can install both types of handlers in single
 * method call
 * 
 * function passed to Promise constructor receives 
 * second arguement alongside resolve function used
 * to reject new promise
 * 
 * chains of promise values created by calls to then
 * and catch can be seen as pipline through asynch
 * values or failures
 * 
 * chains are created by registering hanlders
 * each link has a success handler or reject hanlder or both
 * hanlders that don't match success or failure are ignored
 * 
 * those that don't match are called outcome determines 
 * what kind of value comes next -- success when it returns
 * a non value promies rejection when it throws an exception
 * outcome of a promise when it returns one of those
 * /
 

 * new Promise((_, reject) => reject(new Error("Fail")))
 *  .then(value => console.log("Hanlder 1"))
 *  .catch(reason => {
 *      console.log("Caught failure " + reason);
 *      return "nothing";
 * })
 *  .then(value => console.log("Hanlder 2", value));
 * // Caught Failure error: Fail
 * 
 * 
 * javscript enviornments can detect when promise rejection 
 * isn't handled and will report as an error
 


// Networks are hard

/**
 * possible for signal to be sent but never receieved
 * will cause callback given to send to never be called
 * causes program to stop without even noticing there is a problem
 * if no response request would time out and report failure
 * request function can automaticlly retry before it gives up
 * 
 * call back and promises are equivalent
 * call back based function can be wrapped to expose a promise-based
 * interface
 * 
 * 
 */

class Timeout extends Error {}

function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
        let done = false;
        function attempt(n) {
            nest.send(target, type, content, (failed, value) => {
                done = true;
                if (failed) reject(failed);
                else resolve(value);
            });
            setTimeout(() => {
                if(done) return;
                else if(n < 3) attempt(n + 1);
                else reject(new Timeout("Timed out"));
            }, 250);
        }
        attempt(1);
    });
}

/**
 * promises can be resolved or rejected only once
 * first time resolve or reject is called determines t
 * outcome of promise
 * further calls caused by a request coming back after another
 * request are ignored
 * 
 * user recursive function to build async loop for retires
 * regular loop doesn't allow stop and wait
 * 
 * attempt makes single attempt
 * sets timeout if no response after 250 ms starts next attempt
 * rejects promise with instance of Timeout]
 * 
 * write handler for request to be delivered multiple times
 * 
 * define a wrapper for defineRequestType allows function to 
 * return promise or plain value wires up to callback
 * 
 */

function requestType(name, handler) {
    defineRequestType(name, (nest, content, source,
                             callback) => {
    try {
        Promise.resolve(hanlder(nest, content, source ))
        .then(response => callback(null, response ),
        failure => callback(failure));
    } catch (exception) {
        callback(exception);
    }

    });
}

/**
 * Promise.resolve user to convert value returned by 
 * handler 
 * 
 * handler written in try block ensures exception
 * raises directly given to callback
 * handleing errors with raw callbacks must
 * properly route exception like that or failures
 * wont get reported to right callback. 
 * 
 */

// Collections of Promises

/**
 * promise.all usefull if running collection or promises
 * at same time
 * 
 * waits for promises in array to resolve  
 * array of values produced by promises
 */

requestType("ping", () => "pong");
function availableNeighbors(nest) {
    let request = nest.neighbors.map(neihbor => {
        return request(nest, neighbor, "ping")
            .then(() => true, () => false);
    });
    return Promise.all(requests).then(results => {
        return nest.neighbors.filter((_, i) => result[i]);
    });
}

/**
 * if no neighbor available function mapped over neihbors 
 * promises attach handlers that make successful request produce true
 * and reject false
 * 
 * handler for combined promise used to remove elements
 * from neighbors array 
 */
// Network Flooding

/**
 * spread connection to all nests in a way change 
 * overtime when nests are abandoned new
 * nests are built
 * 
 * check new set of neighbors for given nest matches 
 * current set we have for it
 */

requestType("connections", (nest, {name, neighbors}, 
                            source) => {
    let connection = nest.state.connections;
    if (JSON.stringify(connection.get(name)) ==
        JSON.stringify(neighbors)) return;
    connections.set(name, neighbors);
    broadcastConnections(nest, name, source);                               
});

function brodcast