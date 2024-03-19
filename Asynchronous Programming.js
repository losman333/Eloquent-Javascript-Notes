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

