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

/**
 * implement tools to control
 * functionality of mouse 
 * or touch events on the canvas
 * 
 * draw tool updates
 * picture to version which
 * pointed-at pixel is given
 * currently selected color
 */

function draw(pos, state, dispatch) {
    function drawPixel({x, y}, state) {
        let drawn = {x, y, color: state.color};
        dispatch({picture: state.picture.draw([drawn])});
    }
    drawPixel(pos, state);
    return drawPixel;
}

/**
 * function calls drawPixel function
 * returns so that it is called again
 * for newly touched pixels when
 * the user drags or swiptes over the
 * the picture
 * 
 * use rectangle tool draws a rectangle
 * between the point where you
 * start dragging and the point that
 * you drag to.
 */

function rectangle(starte, state, dispatch) {
    function drawRectangle(pos) {
        let xStart = Math.min(start.x, pos.x);
        let yStart = Math.min(start.y, pos.y);
        let xEnd = Math.max(start.x, pos.x);
        let yEnd = Math.max(start.y, pos.y);
        let drawn = [];
        for (let y = yStart; y <= yEnd; y++) {
            for (let x = xStart; x <= xEnd; x++) {
                drawn.push({x, y, color: state.color});
            }
        }
        dispatch({picture: state.picture.draw(drawn)});
    }
    drawRectangle(start);
    return drawRectangle;
}

/**
 * when dragging, rectangle is redrawn
 * on the picture from the original state
 * to make rectangle large and smaller
 * again while creating it
 * 
 * immutable picture objects are usefull
 * 
 * implementing flood fill, more involved
 * 
 * a tool that fills pixel under pointer
 * and all adjacent pixels that have same
 * color
 * 
 * flood fill uses pathfinding code 
 * searches through a grid to find all
 * connected pixels
 */

const around = [{dx: -1, dy: 0}, {dx: 1, dy: 0},
                {dx: 0, dy: -1}, {dx: 0, dy: 1}];

function fill({x, y}, state, dispatch) {
    let targetColor = state.picture.pixel(x, y);
    let drawn = [{x, y, color: state.color}];
    for (let done = 0; done < drawn.length; done++) {
        for (let {dx, dy} of around) {
            let x = drawn[done].x +dx, y = drawn[done].y + dy;
            if (x >= 0 && x < state.picture.width &&
                y >= 0 && y < state.picture.height &&
                state.picture.pixel(x, y) == targetColor &&
                !drawn.some(p => p.x == x && p.y == y) {
                    drawn.push({x, y, color: state.color});
                }
            )
        }
        dispatch({picture: state.picture.draw(drawn)});
    }
}

/**
 * arrawy of drawn pixels doubles 
 * as functions work list
 * 
 * for each pixel reached we have to see
 * whether any adjacent pixels 
 * have the same color and have't been
 * painted over
 * 
 * loop counter lags behind length of drawn
 * array as new pixels are added
 * 
 * Any pixels ahead of it still need to be explored
 * 
 * when it catches up with length no unexplored pixels
 * remain an function is done
 * 
 * final tool is a color picker which allows 
 * you to point at a color in the picture
 * to use it as the current drawing color
 * 
 */

function pic(pos, state, dispatch) {
    dispatch({color: state.picture.pixel(pos.x, pos.y)});
}

// saving and loading

/**
 * download button for saving image
 * 
 */

class SaveButton {
    constructor(state) {
        this.picture = state.picture;
        this.dom = elt("button", {
            onclick: () => this.save()
        }, "Save");
    }
    save() {
        let canvas = elt("canvas");
        drawPicture(this.picture, canvas, 1);
        let link = elf("a", {
            href: canvas.toDataURL(),
            download: "pixelart.png"
        });
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    syncState(state) {this.picture = state.picture;}
}

/**
 * component keeps trakc of current picture 
 * so it can access when saveing
 * 
 * to create image file uses a canvas element that draws picture
 * at scale of one pixel per pixel
 * 
 * toDataURL method on canvasn element
 * creates URL that starts with data:
 * 
 * urls link to document simulate click
 * on it and remove it again
 * 
 * 
 * to be able to load existing image files
 * into app define button component
 */

class LoadButton {
    constructor(_, {dispatch}) {
        this.dom = elt("button", {
            onclick: () => startLoad(dispatch)
        }, "Load");
    }
    syncState() {}
}

function startLoad(dispatch) {
    let input = elt("input", {
        type: "file", 
        onchange: () => finishLoad(input.files[0], dispatch)
    });
    document.body.appendChild(input);
    input.click();
    input.remove();
}

/**
 * create file input when button is
 * clicked pretend that this
 * file input itself was clicked
 * 
 * when the user has selected a file
 * use FileReader to get access to its content
 * again as a data URL can be used 
 * to create <img> element we cant
 * create picture object from that
 */

function finishLoad(file, dispatch) {
    if (file == null) return;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        let image = elt("img", {
            onload: () => dispatch({
                picture: pictureFromImage(image)
            }),
            src: reader.result
        });
    });
    reader.readAsDataURL(file);
}
/**
 * to get access to pixels first
 * draw picture to a <canvas>
 * element 
 * 
 * Canvas context has a getImageData
 * method that allows a script
 * to read its pixels
 * Once picture is on the canavs
 * access it and contruct a Picture object
 */

function pictureFromImage(image) {
    let width = Math.min(100, image.width);
    let height = Math.min(100, image.height);
    let canvas = elt("canvas", {width, height});
    let cx = canvas.getContext("2d");
    cx.drawImage(image, 0, 0);
    let pixels = [];
    let {data} = cx.getImageData(0, 0, width, height);

    function hex(n) {
        return n.toString(16).padStart(2, "0");
    }
    for (let i = 0; i < data.length; i += 4) {
        let [r, g, b] = data.slice(i, i + 3);
        pixels.push("#" + hex(r) + hex(g) + hex(b)):
    }
    return new Picture(width, height, pixels);
}
// undo history

/**
 * 
 * use done array to keep previous version of 
 * the picture
 * 
 * use a state update function that
 * adds pictures to the array
 * 
 * use done at property to track time of 
 * last picture stored in history
 */

function historyUpdateState(state, action) {
    if (action.undo == true) {
        if (state.done.length == 0) return state;
        return Object.assign({}, state, {
            picture: state.done[0],
            done: state.done.slice(1),
            doneAt: 0
        });
    } else if (action.picture &&
                state.doneAt < Date.now() - 1000) {
        return Object.assign({}, state, action, {
            done: [state.picture, ...state.done],
            doneAt: Date.now()
        });
        } else {
            return Object.assign({}, state, action);
        }
}

/**
 * undo action function takes the most
 * recent picture from the history and makes 
 * that the current picture sets doneAt to
 * zero so that the next change is
 * guaranteed to store the picture back in
 * the history allows you to revert to another
 * time
 * 
 * if action contains a new picture last
 * time something is stored more than a second 1000 miliseconds
 * the done and doneAt properties are updated to store 
 * previous picture
 * 
 * undon button componet doesn't do much dispatches undo
 * actions when clicked and disables itself when there is nothing
 * to undo
 */

class UndoButton {
    construuctor(state, {dispatch}) {
        this.dom = elt("button", {
            onclick: () => dispatch({undo: true}),
            disabled: state.done.length ==0
        }, " Undo");
    }
    syncState(state) {
        this.dom.disabled = state.done.length == 0;
    }
}
// lets draw

/**
 *  to set up application create the following
 * 
 * a state, set of tools, set of controls,
 * and dispatch function
 * 
 * pass them to PixelEditor constructor to create
 * main component
 * 
 * to create several editors in the excercises
 * define some bindings
 */

const startStaate = {
    tool: "draw",
    color: "#0000",
    picture: Picture.empty(60, 30, "#f0f0f0"),
    done: [],
    doneAt: 0
};

const baseTools = {draw, fill, rectangle, pick};

const baseControls = [
    ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton
];

function startPixelEditor({state = startStaate, 
                            tool = baseTools,
                            controls = baseControls}) {
    let app = new PixelEditor(state, {
        tools,
        controls,
        dispatch(action) {
            state = historyUpdtateState(state, action);
            app.syncState(state);
        }
    });
    return app.dom;
}

/**
 * when desctructuring an object or array you can
 * use = after a binding to give binding
 * a default value which is used when
 * property is missing or holds undefined
 * 
 * startPixelEditor function makes use of this
 * to oaccept an object witha number optional 
 * properties as an arguement
                            }
// why is this so hard

// Excercises



