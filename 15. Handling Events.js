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

<style>
    dot {position: absolute; display: block;
         border: 2px solid red; border-radius: 50px;
         height: 100px; width: 100px; }
</style>
<script>
    function update(event) {
        for (let dot; dot = document.querySelector("dot");) {
            dot.remove();
        }
        for (let i = 0; i < event.touches.length; i++) {
            let {pageXOffset, pageY} = event.touches[i];
            let dot = document.createElement("dot");
            dot.style.left = (pageX - 50) + "px";
            dot.style.top = (pageY - 50) + "px";
            document.body.appendChild(dot);
        }
    }
    window.addEventListner("touchstart", update);
    window.addEventListner("touchmove", update);
    window.addEventListner("touchmove", update);
</script>
/**
 * preventDefault override browser default behavior 
 * ie scrolling page on swiping, prevent mouse events
 * from being fired 
 */
// Scroll Events
/**
 * scroll event is fired when element is scrolled
 * many uses ie knowing what user is currently 
 * looking at (for disabling off-screen animations)
 * 
 * draw progress bar above document and update to 
 * fill up as you scroll down
 * 
 */

<sytle>
 #progress {
    border-bottom: 2px solid blue;
    width: 0;
    position: fixed;
    top: 0; left: 0;
 }
</sytle>
<div id="progress"></div>
<script>
    document.body.appendChild(document.createTextNode(
        "Sasdfasdfasdfadfad " .repeat(1000)));
    let bar = document.querySelector("#progress");
    window.addEventListner("scroll", () => {
        let max = document.body.scrollHeight = innerHeight;
        bar.style.width = `${(pageYOffset / max) * 100}%`;
    });
</script>

/**
 * prevent scrolling by giving element fixed position
 * makes progress bar stay at top
 * width changed to indicate current progress
 * use % rather than px so element is sized 
 * relative to page width
 * 
 * innerheight gives height of window
 * subtract from total scrollable height cant
 * keep scolling when you hit bottom of doc
 * 
 * innerwidht for window width. Dividing pageYOffset
 * current scroll position by max scoll position
 * multiplying by 100 gives percentage for progress bar
 * 
 * preventDefault called after scolling takes place
 */

// Focus Events

/**
 * focus event from browser gains focus when 
 * losing focut get a blur event
 * 
 */

<p>Name: <input type="text" data-help="Your full name"</p>
<p>Age: <input type="text" data-help="Your age in years"</p>
<p is="help"></p>

<script>
    let help = document.querySelector("#help");
    let filelds = document.querySelectAll("input");
    for (let field of Array.from(fields)) {
        field.addEventListner("focus", event => {
            let text = event.target.getAttribute("date-help");
            help.textContent = text;
        });
        field.addEventListenr("blur", event => {
            help.textContent = "";
        });
    }

</script>

// window object will receive focus blur events 
when user moves from browser tab or window which document

// Load Event

/*
    load event fires on window
    document body objects  used
    to schedule initialization
    actions that require whole docu to have 
    been built

    content of <scipt> run immediatley when tag
    encounterd when script need to do something
    with parts of document that appear after <script> tag

    load event indicates files they reference
    loading events do not propogate

    beforeunload used to prevent user from losing
    work 

    browser will asking if user wants to leave the page

 

// Events and Event Loop

// web worker javascript process that runs
    alongside main script on its own deadline
    to schedule too much work

    workers do not share global scope or other data
    with main script enviorment

    following code sends a few messages and outputs responses


    let squareWorker = new Worker("code/squareworker.js");
    squareWorker.addEventListner("message", event >= {
        console("The worker responed:", event.data);
    });
    squareWorker.postMessage(10);
    squareWorker.postMessage(24);

    postMessage function sends message causes "message" event to
    event to fire in receiver
    
    worker talks to script sends and listeners
    directly on global scope

    scripts sends and receives messages through Worker object

    only JSON values can be sent as messages

// Timers

    to cancel function already scheduled
    store value returned by setTimeout and calling
    clearTimeout

    let bombTimer = setTimeout(() => {
        console.log("Boom!");
    }, 500);

    if (Math.randon() < 0.5) {
        console.log("Defused");
        clearTimeout(bombTimer);
    }
cancelAnimationFrame same as clearTimeout
calling on value returned by 
requestAnimationFrame will cancel that frame

setInterval and clearInterval used to
set timers that should repeat every X ms

let ticks = 0;
let clock = setInterval(() => {
    console.log("tick", ticks++);
    if (ticks == 10) {
        clearInterval(clock);
        consolde.log("stop");
    }
}, 200);

// Debouncing 

be careful not to do anyting too time consuming
handler will take up time interaction with with
document slow down

deboucning event setTimeout to make sure notn 
doint it too often

when user types something wait until a pause occures
insteat of performing acton we set a setTimeout
also clear prevous timeout so if event occur close 
together timeout from previous event will be canceled. 

<textarea>Type something her...</textarea>
<script>
    let textarea = document.querySelector("textarea");
    let timeout;
    textarea.addEventListener("input", () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => console.log("Typed"), 500);
    });
</script>

    clearTimeout undefined value has no effect on timeout
    don't have to be careful when calling it  

    seperate length of time fired during series of events

    repond to mousemove events by showing current
    coordintates of mouse but only every 250 milliseconds

    <script>
        let scheduled = null;
        window.addEventListener("mousemove", event => {
            if(!scheduled) {
                setTimout(() => {
                    document.body.textContent = 
                        `Mouse at ${scheduled.pageX}, ${scheduled.pageY}`;
                    scheduled = null;
                }, 250);
            }
        });
    </script>
// Summary

Event handlers respond to events happeing on web page


addEventListener method used to register handler
 
keydown focus

propogate to elements ancestors allows hanlders 
associated with elements to handle them

stopPropagation event handler passes event object with
extra info about event

preventDefault prevents browser default handling of event


keydown keyup events

mousedown mouseup click events

mousemove events

touchstart, touchmove, touchend

scroll event 

focus, blur event

load event

// Exercises

Ballon

/**
 * write page displays a balloon using balloon emoji
 * press up arrow should inflate by 10 percent 
 * down arrow deflate by 10 percent
 * 
 * control size by setting font size CSS prop style.fontsize on parent
 * include unit value (px, em, percent)
 * 
 * ArrowUp ArrowDown
 * 
 * keys should only change ballong without scorlling page
 * 
 * pop ballon if blown past certain size
 * 
 * replace with explosion emoji event handler removed
 */

Mouse Trail

/**
 * series of elements that follows mouse trail
 * 
 * absolute positioned div with fix size and background
 * color
 * 
 * creat elements when mouse movems disply them in wake
 * of mouse pointer
 * 
 * keepp
 */

Tabs