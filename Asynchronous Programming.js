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
 * promise async action that may complete a some pintna
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
 */