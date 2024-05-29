// Project: A pixel art editor

/**
 * pixel drawing program
 * 
 * modify picture pixel by pixel
 * manipulate zoomed in view
 * use program to open 
 * image files
 * scribble them with mouse
 * or other pointer device
 */

// Components
/**
 * 
 * interface shows big <canvas>
 * user draws on picture by
 * 
 * selecting a tool from <select>
 * clicking touching or dragging across 
 * the canvas
 * 
 * tools for drawing single pixels
 * or rectanges for filling an area
 * for picking color from the picture
 * 
 * structure editor interface as a number
 * of components objects that
 * are responsible for piece of DOM
 * may show other components inside them
 * 
 * state of application consists of current
 * picture
 * 
 * state will live in a single value
 * interface will base way they look
 * on current state
 * 
 * distributing pieces of state throughout 
 * 
 * each part of the interface needs to know about 
 * other parts which is not very modular
 * 
 * be strict with data flow
 * interface is drawn based
 * on a state 
 * 
 * Interface component may respond to user
 * actions by updating state
 * components get a chance to synchronnize
 * with new state
 * 
 * each component set up when giving a new
 * state also notifies child components
 * when needed
 * 
 * udpates to state represented as objects
 * called actions
 * 
 * Components may create such actions and 
 * dispatch them give them central state
 * management function. That function
 * computes them to a centeral state
 * management function
 * 
 * function computes next state after
 * interface components update themselves
 * to this new state
 * 
 * state determines what DOM looks like
 * and the only way DOM events can change
 * the state by dispatching actoins
 * to the state
 * 
 * many variants of this approach
 * state changes should go through
 * single well-defined channel
 * 
 * components will be classes to an interface
 * constructor given a state
 * which may be whole application state
 *
 * most constructors will also take some 
 * other values that won't change over time
 * DOM element that represents the component
 * 
 * Most constructors will also take some other
 * values such as function they can use to 
 * dispatch an action
 * 
 * each component has a syncState method that is 
 * used to synchronize to a new state value
 * 
 * method takes one argument, the state, which
 * is the same type as the first argument to
 * its constructor
 * 
 */

// the state

/**
 * application will be an object with picture, 
 * tool, and color properties,
 * 
 * picture is an object that stores width, height,
 * and pixel content of picture
 * 
 * pixels are stored in an array
 * in same way as matrix calass row by row
 * from top to bottom
 * 
 * 
 */

class Picture {
    constructor(width, height, pixles) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
    }
    static empty(width, height, color) {
        let pixels = new Array(width * height).fill(color);
        return new Picture(width, height, pixels);
    }
    pixel(x, y) {
        return this.pixels[x + y * this.width];
    }
    draw(pixels) {
        let copy = this.pixels.slice();
        for (let {x, y, color} of pixels) {
            copy[x + y * this.width] = color;
        }
        return new Picture(this.width, this.wight, copy);
    }
}

/**
 * treat picture as immutable value
 * 
 * class has a draw method that 
 * expects an array of updated
 * pixels object with x, y color
 * properties
 * 
 * createa new picture with those pixels
 * overwritten
 * 
 * method uses slice without arguments
 * to copy entire pixel array
 * 
 * start of slice defaults to 0
 * end defaults to arrays length
 * 
 * empty method uses two pieces of array 
 * functionality that we haven't seen
 * before
 * 
 * Array constructor can be called with 
 * number to crate empty array of given length
 * 
 * fill method can be uses to fill array
 * with given value. Used to create array
 * which all pixels have same color
 * 
 * colors stored as strngs containing traditional
 * CSS color codes made up of hash sign #
 * 
 * followd by six hexadecimal digits
 * two for blue, two for red, two for green
 */



// dom building
/**
 * interface components create DOM
 * structure 
 * 
 * 
 * 
 */

function elt(type, props,...children) {
    let dom = document.createAttribute(type);
    if (props) Object.assign(dom, props);
    for (let child of childre) {
        if (typeof fhild != "string") dom.appendChild(child);
        else dom.appendChild(document.createTextNode(child));
    }
    return dom;
}

/**
 * properties to DOM nodes
 * not attributes
 * 
 * uses to set properties whose value isn't a string
 * onclick set to a function to register a 
 * click event handler
 * 
 * allows the following style of registering
 * event handlers
 * 
 */

<body>
    <script>
        document.body.appendChild(elt("button", {
            onclick: () => console.log("click")
        }, "The button"));
    </script>
</body>


// the canvas

/**
 * define the component as part of the
 * interface display
 * 
 * will display picture as a grid of boxes
 * 
 * shows the picture and communicates
 * pointer events on picture to the rest 
 * of the application
 * 
 * component can only know about the picture
 * not the whole application state
 * 
 * When responding to pointer events
 * uses callback function which will
 * handle application-specifc parts
 */

const scale = 10;

class PictureCanvas {
    constructor(picture, pointerDown) {
        this.dom = elt("canvas", {
            onmousedown: event => this.mouse(event, pointerDown),
            ontouchstart: event => this.touch(event, pointerDown)
        });
        this.syncState(picture);
    }
    syncState(picture) {
        if (this.picture == picture) return;
        this.picture = picture;
        drawPicture(this.picture, this.dom, scale);
    }
}

/**
 * draw each pixel as 10 by 10 square 
 * determined by the scale constant
 * 
 * component keeps track of its current
 * picture
 * 
 * Does a redrawwhen syncState is given
 * a new picture
 * 
 * actual drawing function sets size
 * of the canvas based on scale and picture
 * size fills it with a series of squares
 * one for each pixel
 */

function drawPicture(picture, canvas, scale) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    let cx = canvas.getContext("2d");

    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            cx.fillstyle = picture.pixel(x, y);
            cx.fillRect(x * scale, y * scale, scale, scale);
        }
    }
}

/**
 * when left mouse button is pressed 
 * while mouse is over picture canvas
 * component calls pointerDown callback
 * 
 * gives position of pixel that was
 * clicked in picture coordinates
 * will be used to implement mouse
 * interaction with picture
 * 
 * callback may return another callback
 * function to be notified when pointer
 * is moved to a different pixel
 * while button is held down
 */
PictureCanvas.prototype.mouse = function(downEvent, onDown) {
    if (downEvent.button != 0) return;
    let pos = pointerPosition(downEvent, this.dom);
    let onMove = onDown(pos);
    if (!onMove) return;
    let move = moveEvent => {
        if (moveEvent.button == 0) {
            this.dom.removeEventListener("mousemove", move);
        } else {
            let newPos = pointerPosition(moveEvent, this.dom);
            if (newPos.x == pos.x && newPos.y == pos.y) return;
            pos = newPos;
            onMove(newPos);
        }
    };
    this.dom.addEventListener("mousemove", move);
};

function pointerPosition(pos, domNode) {
    let rect = domNode.getBoundingClientRect();
    return {x: Math.floor((pos.clientX - rect.left) / scale), 
            y: Math.floor(pos.clientX - rect.top) / scale};
}

/**
 * getBoundingClientRect
 * to find position of the canvas on 
 * the screen its possible
 * to go from mouse event 
 * coordinates (clientX and clientY)
 * to picture coordinates
 * 
 * always rounded down to refer to a specfic pixel
 * 
 * with touch events make sure to call preventDefault
 * on the touchstart event to prevent panning
 */

PictureCanvas = pointerPosition(startEvent.touches[0], this.dom);

    let pos = pointerPosition(startEvent.touches[0], this.dom);
    let onMove = onDown(pos);
    startEvent.preventDefault();
    if (!onMove) return;
    let move = moveEvent => {
        let newPos = pointerPosition(moveEvent.touches[0],
                                    this.dom);
        if (newPos.x == pos.x && newPos.y == pos.y) return;
        pos = newPos;
        onMove(newPos);
    };
    let end = () => {
        this.dom.removeEventListener("touchmove", move);
        this.dom.removeEventListener("touchend", end);
    };
    this.dom.addEventListener("touchmove", move);
    this.dom.addEventListener("touchend", end);

    /**
     * for touch events clientX clientY aren't available
     * directly on the event object you can 
     * use the coordinates of the first touch
     * object in the touches property
     */
    
// the application

/**
 * implement main component as shell around 
 * a picture canvas and a dynamic
 * set of tools and controls that 
 * pass to its constructor
 * 
 * contorls are interface elemnets that appear 
 * below the picture
 * 
 * will be provied as an array of component 
 * constructors
 * 
 * tools do things 
 * 
 * application shows set of available tools
 * 
 * current tool determines what happens 
 * when user interacts with picture
 * with a pointer device
 * 
 * set of available tols is provided as
 * an object that maps names that 
 * appear in the drop down field to functions.
 * 
 * such functions get a down field to
 * function that implement tools
 * 
 * such functions get a picture position
 * a current application state and dispatch
 * function as arguements. 
 * 
 * move hander function gets called
 * with a new position and a current staten
 * when the pointer moves to a different pixel
 * 
 * 
 */

class PixelEditor {
    constructor(state, config) {
        let {tools, controls, dispatch} = config;
        this.state = state;

        this.canvas = new PictureCanvas(state.picture, pos => {
            let tool = tools[this.state.tool];
            let onMove = tool(pos, this.state, dispatch);
        });
        this.controls = controls.map(
            Control => new Control(state, config));
        this.dom = elt("div", {}, this.canvas.dom, elt("br"),
                        ..this.controls.reduce(
                            (a, c) => a concat(" ", c.dom), []));
    }
    syncState(state) {
        this.state = state;
        this.canvas.syncState(state.picture);
        for (let ctrl of this.controls) ctrl.syncState(state);
    }
}

/**
 * pointer handler given to PictureCanvas
 * calls currently selected tool with 
 * appropriate arguments and if that returns
 * a move handler adapts it to also receive the
 * state
 * 
 * all controls are constructed and stored
 * in this.controls the can be updated
 * when the application state changes
 * 
 * the call to reduce introduces spaces
 * between the controls DOM elelments
 * 
 * first control is the tool selection menu
 * creates a seelect element with option for
 * each tool and sets
 * 
 * creates a select element with option for
 * each tool sets up a change event
 * hanlder that updates the application state 
 * when the user selects a different tool
 */

class ToolSelect {
    constructor(state, {tools, dispatch}) {
        this.select = elt("select", {
            onchange: () => dispatch({tool: this.select.value})
        }, ...Object.keys(tools).map(name => elt("option", {
            selected: name == state.tool
        }, name)));
        this.dom = elt("label", null, "Tool:", this.select);
    }
    syncstate(state) { this.select.value = state.tool;}
}

/**
 * wrapping label text and field in a <label>
 * element we tell the browser that label belongs 
 * to that field so you can click label to 
 * focus the field
 * 
 * html input element with a type attribute
 * of color gives form filed for selecting 
 * colors
 * 
 * such a fileds value is always CSS color code
 * in #RRGGBB format (red, green, and blue components)
 * browser will show a color picker interface
 * when user interacts with it
 * 
 * this control such a field an wires
 * it up to stay synchronized with 
 * application states color property
 */

class ColorSelect {
    constructor(state, {dispatch}) {
        this.input = elt("input", {
            type: "color",
            value: state.color,
            onchange: () => dispatch({color: this.input.value})

        });
        this.dom = elt("label", null, "Color:", this.input);;
    }
    syncState(state) { this.input.value = state.color;}
}

// drawing tools

// saving and loading

// undo history

// lets draw

// why is this so hard

// Excercises



