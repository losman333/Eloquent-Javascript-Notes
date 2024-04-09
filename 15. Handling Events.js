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

/**
 * Key up 
 * 
 * 
 * Key down
 */

window.addEventListener("keydown", even => {
    if (event.key == "v") {
        document.body.style.background = "violet";
    }
});
window.addEventListener("keyup", event => {
    if (event.key == "v") {
        document.body.style.background = "";
    }
});

/**
 * keydown fires when physically pushed down
 * 
 * when key pressed and held event fires again
 * every time key repeats
 * 
 * what happens if you add button to DOM when
 * key is pressed and reomve when key released?
 * 
    * might accidentally add hundreds of buttons
    * when key is held down longer
 */

/**
 * 
 * key property
 * 
 * property holds string corresponds to thing
 * pressing key would type
 * 
 * enter
 * 
 * Modifier keys SHIF, CONTROL, ALT AND (COMMAND)
 * change can Identify whether keys are held down
 * by looking at shifkey, ctrlKey, altKey
 */

window.addEventListener("keydown", event => {
    if (event.key == " " && event.ctrlKey) {
        console.log("Continuing!");
    }
});

/**
 * Dom node elment has focus when key pressed
 * 
 * tabindex valule give focus to node
 * 
 * what happens when nothing has focus, document?
    * body acts as target node of key events
 * 
 * <input textarea fire input events when user
 * changes content
 * 
 * focus field gets actually content 
 */
// Pointer Events

/**
 * way to point at things
 * 
 * mouse clicks
 * 
 * mouse motions 
 * 
 * usefull for mouse dragging functionality
 * 
 * display a bar and setup event handlers 
 * dragging to left or right makes it narrower
 * or wider
 */

let lastX; // Tracks last observerd mouse X position
let bar = document.querySelector("div");
bar .addEventListener("mousedown", event => {
    if (event.button == 0) {
        lastX = event.clientX;
        window.addEventListener("mousemove", moved);
        event.preventDefault(); // Prevent selection
    }
});

function moved(event) {
    if(event.buttons == 0) {
        window.removeEventListener("mousemove", moved);
    } else {
        let dist = event.clinetX - lastX;
        let newWidth = Math.max(10, bar.offsetWidth + dist);
        bar.style.width = newWidth + "px";
        lastX = event.clientX;
    }
}

/**
 * mouseover handler registered on whole window
 * as long as button is held update size
 * 
 * stop resizing when mouse button is released
 * 
 * buttons property when zero no buttons are down
 * 
 * when buttons held value sum of codes
 * for those buttons left button has code 1
 * right button 2 middle one 4
 * 
 * order of these codes different from one used 
 * by button where middle button came before right one
 */

// touch events
/**
 * 
 * style of graphical browser designed with 
 * mouse interfaces in mind
 * 
 * touchstart, touchmove, touchend
 * 
 * no coordinates associted with touch events
 * 
 * event objects have touches property
 * 
 * holds an array-like object of points with clientX, clientY
 * pageX and pageY
 */

// Scroll Events

// Focus Events

// Load Event

// Events and Event Loop

// Timers

// Debouncing 

// Summary

// Exercises