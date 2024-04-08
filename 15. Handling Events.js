// Event Handlers

/**
 * 
 * What is Polling why do programmers prefer to avoid it?
 * 
 * A mechanism for to notify code when an event occurs
 * 
 * How to represent browser window containing the document
 * 
 * Event listeners called only when event happens in context of
 * object are registerd on
 * 
 * How to add any number of handlers even if there is already 
 * another handler on the element
 * 
 * How to remove a handler
 * 
 * removeEvent Listener has to be the same function value that
 * was given to addEventListner
 * 
 * to unregister a handler
 * 
 * To pass same function value to both methods
 * 
 * 
 */



// Events and DOM nodes

// Event object

/**
 * event object
 * 
 * which mouse button
 * 
 * event objects button property
 * 
 * objects type property holds string
 * indentifying event
 * 
 */

// Propagation

/**
 * 
 * propogate outward from node where it happened 
 * to that node on to the root of the documnet
 * 
 * handlers registered whole window get chance to respond to event
 * 
 * stopPropagation prevent handlers further up from receiving 
 * the event. 
 * 
 * mousedown handlers 
 * 
 * target property referes to node where they orginated
 * use to ensure not handling something that propagated
 * from node you don't want to handle
 */

// Default Actions      

/**
 * preventDefault method 
 * used to implement your own keyboard shortcuts or 
 * context menu. 
 */

// Key events

// Pointer Events

// Scroll Events

// Focus Events

// Load Event

// Events and Event Loop

// Timers

// Debouncing 

// Summary

// Exercises