
/**
 * Several ways to display graphics in browser
 * 
 * use styles to position and color regular Dom Elements
 * 
 * using transform style
 * 
 * Scalable Vector Graphics SVG (Dom-based)
 * document-markup dialect focuses on shapes 
 * rather than text
 * 
 * you can embed an SVG doc directly in an HTML doc
 * or include with an <img>
 * 
 * Canvas single DOM element encapsluates a picture
 * provides programming interface for drawing
 * shapes onto space taken by node
 * 
 * svg shapes preserved to moved or resize any time
 * canvas converts shapes to pixels when drawn
 * does not remember what pixels represent
 * 
 * only way to move shape on canvas is to clear
 * canvas or part of canvas around shape
 * redraw it wih shape in new position
 */
//SVG
/**
 <p>Normal HTML here.</p>
<svg xmlns="http://www.w3.org/2000/svg">
<circle r="50" cx="50" cy="50" fill="red"/> <rect x="120" y="5" width="90" height="90"
stroke="blue" fill="none"/> </svg>
 */

/**
 * xmlns attribute changes element and children
 * to different xml namespace
 * 
 * Namespace identified by url
 * specifies dialect currently spken
 * <circle> <rect> svg means draw shapes
 * using style and position specified
 * by attributes
 * 
 * tags create DOM elements just like HTML 
 * tags that scripts can interact with
 * 
 * this changes circle element to be colored
 * cyan instead
 */

let circle = document.querySelector("cirlce");
circle.setAttribute("fill", "cyan");

// The canvas element 
/**
 * Canvas graphics can be drawn onto a canvas element.
 * width height to determine size in pixels
 * 
 * new canvas is transparent shows up
 * as empty scpace in document
 * 
 * canvas tag allows different styles of drawing
 * 
 * to access actual drawing interface
 * need context, object whose methods provide drawing
 * interface
 * 
 * two drawing styles 2d and webgl for three-dimensional
 * graphics through OpenGl interface
 * 
 * getContext method on <canvas> DOM element
 * 
 */

<p>Before canvas</p>
<canvas width="120" height="60"></canvas>
<p>After Canvas</p>
<script>
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");
    context.fillStyle = "red";
    context.fillRect(10, 10, 100, 50);
</script>

/**
 * after creating context object 
 * example draws red rectangle
 * 100 pixels wide 50 pixels hight 
 * top-left corner at coordinates
 * (10, 10)
 * 
 * canvas puts (0,0) at top-left corner 
 * positive y-axis goes down
 * 
 * 10, 10 is 10 pixels below and to the
 * right of top left cornier
 */

// Lines and Surfaces

/**
 * shape can be filled, area is given a 
 * certain color or pattern
 * storke means line is drawin along its edge
 * same as SVG
 * 
 * fillRect method fills rectangle
 * takes first x- and y-
 * coordinates of rectangle top-left corner, width and height
 * 
 * strokeRect draws outline of a rectangle
 * 
 * properties of context object determine
 * color of fill and thickness of stroke
 * 
 * fillStyle property controls way shapes
 * are filled can be set to a string
 * that specifies a color using 
 * color notation used by CSS
 * 
 * strokeStyle property determines color
 * used for a stroked line
 * lineWidth property contains positive
 * number determines width of line
 * 
 * 
 * 
 **/

let cx = document.querySelector("canvas").getContext("2d");
cx.strokeStyle = "blue";
cx.strokeRect(5, 5, 50, 50);
cx.lineWidth = 5;
cx.strokeReact(135, 5, 50, 50);

/**
 * when no width or height canvas element gets default 
 * width of 300 pixels and height of 150px
 */

// Paths

/**
 * sequence of lines
 * paths are not values that 
 * can be stored
 * and passed around
 * 
 * to something with pat make a sequence 
 * of method calls to describe shape
 * 
 */

<canvas>
    <scriptL>
        let cx = document.querySelector("canvas").getContext("2d");
        cx.beginPath();
        for (let y = 10; y < 100; y += 10) {
            cx.moveTo(10, y);
            cx.lineTo(90, y);
        }
        cx.stroke();
    </script>
</canvas>

/**
 * lineTo starts at paths current position
 * position usually at end of argument
 * unless moveTo called
 * 
 */

/**
 * fill path fills each shape seperately
 * path can contain multiple shapes each
 * moveTo motion starts a new one
 * path needs to be closed 
 * start and end are in same position
 * before shape can be filled
 */

/**
 * if path not already closed line is
 * added from its end to its start
 * shape enclosed by completed path
 * is filled
 */

<script>
    let cx = document.querySelector("canvas").getContext("2d");
    cx.beginPath();
    cs.moveTo(50, 10);
    cx.lineTo(10, 70);
    cx.fill();
</script>

// Curves

/**
 * QuadraticCurveTo method draws curve to given point
 * method given a control point and destination point
 * control point attracts line giving curve
 * line won't go through control point
 * direction at the start and end straight
 * line in that directoin
 * 
 * straight line in that direction would point
 * toward control 
 * 
 * straight line would point toward control point
 * 
 */

<canvas>
    <script>
        let cx = document.querySelector("canvas").getContext("2d");
        cx.beginPath();
        cx.moveTo(10, 90);
        // control=(60, 10) goal=(90,90)
        cx.qudrativCurveTo(60, 10, 90, 90);
        cxlineTo(60, 10);
        cx.closePath();
        cx.stroke();
    </script>
</canvas>

/**
 * draw quadratic curve from left to right with (60, 10)
 * as control point, then draw two line segments
 * goint through control point
 * 
 * bezierCurveTo has two control points
 * one for each of the lines endpoints
 */

<canvas></canvas>
<script>
    let cx = document.querySelector("canvas").getContext("2d");
    cx.beginPath();
    cx.moveTo(10, 90);
    // conrtrol1=(10,10) control12=(90, 10) goal=(50,90)
    cx.bezierCurveTo(10, 10, 90, 10, 50, 90);
    cx.lineTo(90, 10);
    cx.lineTo(10, 10);
    cx.closePath();
    cx.stroke();
</script>

/**
 * two control points specify direction
 * at both ends of curve
 * farther they are away from corresponding
 * point the more curve will bulge
 * 
 * arch method way to draw line that curves
 * along circle
 * 
 * takes a pair of coordinates for arcs cener
 * a radius then start angle and end angle
 * 
 * the last two parameters make it possible to 
 * draw only part of the circle
 * angles measured in radians not degress
 * full circle has angel of 2π or 2 * Math.PI
 * which is about 6.28
 * angle starts counting at point to right
 * of circles center and goes clockwise from there
 * use a start of 0 and end bigger than 2π 
 * to draw full circle
 */

<canvas></canvas>
<script>
    let cx = document.querySelector("canvas").getContext("2d");
    cx.beginPath();
    // center=(50.50) redius=40 angle=0 to 7
    cx.arc(50, 50, 40, 0, 7);
    // center=(150,50) radius=40 angle=0 to π1/2
    cx.arc(150, 50, 40, 0, 0.5 * Math.PI);
    cx.stroke();
</script>

/**
 * picture contains line from right of full circle
 * first call to arc
 * 
 * to right of quarter-circle
 * second call
 * 
 * 
 * arc is connected to previous path segment
 * 
 * like other path-drawing methods line
 * drawn with arc is connected to previous
 * segement
 * 
 * call moveTo to avoid this
 * to avoid this
 */
// Drawing a pie chart
/**
 * draw pie chart of customer satisfaction
 * survey results
 * 
 * results binding contain array of objects
 * that represent survey responses
 * 
 */

const results = [
    {name: "Statisfied", count: 1043, color: "lightblue"},
    {name: "Neutral", count: 563, color: "lightgreen"},
    {name: "Unsatisfied", count: 510, color: "pink"},
    {name: "No comment", cound: 175, color: "silver"}
];

/**
 * compute angle taken up by each
 * arc by dividin full circle
 * by total number of responses
 * multiplyin number (angle per response)
 * by number of people who picked 
 * given choice
 */

<canvas width="200" height="200">
    <script>
        let cx = document.querySelector("canvas").getContext('2');
        let total = results
            .reduce((sum, {count}) => sum + count, 0);
        // Start at top
        let currentAngle = -0.5 * Math.PI:
        for (let result of results) {

            let sliceAngle = (result.count / total) * 2 * Math.PI;
            cx.beginPath();
            // center=100, 100, radius=100
            // from curent angle, clockwise by slice's angle
            cx.arc(100, 100, 100, 
                    currentAngle, currentAngle + sliceAngle);
            currentAngle += sliceAngle;
            cx.lineTo(100, 100);
            cx.fillStyle = result.color;
            cx.fill();
        }
    </script>
</canvas>

// Text

/**
 * fillText method
 * 
 * strokeText
 * 
 * fillStyle
 */
<canvas></canvas>
<script>
    let cx = document.querySelector("canvas").getContext("2d");
    cx.font = "28px Georgia";
    cx.fillStyle = "fuchsia";
    cx.fillText("I can draw text, too!", 10, 50);
</script>

/**
 * font property for size, style, font
 * 
 * fillText, strokeText provide position 
 * at which font is drawn. They indicate
 * position of start of text alphabetic baseline
 * 
 * textAlign property to end or center
 * and the vertical position by seting
 * textBaseline to top, middle or bottom
 */

// Images

/**
 * bitmap graphics vs vevtor
 * 
 *  bitmap doesn. specify actual shape
 * works with pixel data (rasters of colored dots)
 * 
 * drawImage method allows pixel data drawing
 * on canvas
 * 
 * pixel data cn originate form <img> element
 * or other canvas
 * 
 * create detached <img> element and load
 * image file into it
 * regitster load event handler to draw after
 * image has loaded
 * 
 */

<canvas></canvas>
<script>
    let cx = document.querySelector("canvas").getContext("2d");
    let img = document.createElement("img");
    img.src = "img/hat.png";
    img.addEventListener("load", () => {
        for (let x = 10; x < 200; x += 30) {
            cx.drawImage(img, x, 10);
        }
    });
</script>

/**
 * drawImage will draw image at original size
 * add two additional arguments to set 
 * different width and height
 * 
 * when drawImage is given nine arguments
 * it can be used to draw only a 
 * fragement of an image second through
 * fifth arguments indicate rectangle (x, y,
 * width, and height)
 * this can be used to pack multiple sprites(image, elements)
 * into a single image file  and draw only the 
 * part you need
 * 
 * clearRect method to animate picture on canvas
 * resembles fillRect instead of coloring rectangle
 * makes it transparent, removing previously
 * drawn pixels
 * 
 * load image and set up interval(repeated timer)
 * to draw the next frame
 */

<canvas></canvas>
<script>
    let cx = document.querySelector("canvas").getContext("2d");
    let img = document.createElement("img");
    img.src = "img/player.png";
    let spriteW = 24, spriteH =30;
    img.addEventListener("load", () => {
        let cycle = 0;
        setInterval(() => {
            cx.clearRect(0, 0, spriteW, spriteH);
            cx.drawImage(img, 
                        // source rectangle
                            cycle * spriteW, 0, spriteW, spriteH, 
                            // destination rectangle
                            0,          0, spriteW, spriteH);
            cycle = (cycle + 1) % 8;
        }, 120);
    });
</script>

/**
 * cycle binding tracks position in animation 
 * for each frame is incremented and then
 * clipped back to 0 to 7 range
 * by using the remainder operator
 * binding used to compute x-coordinate 
 * that sprite for current pose
 * has in the picture
 */


// Transformation
/**
 * scale method will cause anything drawn
 * after it to be scaled. This method takes
 * two parameters, 
    * one to set a horizontal scale
    * one set to vertical scale 
 */

let cx = document.querySelector("canvas").getContext("2d");
cx.scale(3, .5);
cx.beginPath();
cx.arc(50, 50, 40, 0, 7);
cx.lineWidth = 3;
cx.stroke();

/**
 * scaling will cause everything about image
 * to be squeezed
 * 
 * You could adjust the coordinates given to
 * drawImage to compensate by drawing the image
 * at x position -50 instead of 0
 * 
 * or
 * 
 * adjust axis around which scaling happens
 * 
 * rotate method to change coordinate system
 * for a canvas as well as translate
 * 
 * transformations stack each method happens
 * relative to previous transformations
 * 
 * if translating by 10 horizontal pixels
 * twice, everything will be drawn 20 pixels
 * to the right
 * 
 * moving center of coordinate system to 50, 50
 * then rotate by 20 degrees( about 0.1π radians)
 * that rotation will happen around point(50, 50
 * 
 * or first rotoate by 20 degrees then translate by 50, 50)
 * order in which transforms are applied matters
 * 
 * to flip picture around vertical line at given x pos
 * use
 */

function flipHorizontally(context, around) {
    context.translate(around, 0);
    context.scale(-1, 1);
    context.translate(-around, 0);
}

/**
 * move y-axis to where mirror should be
 * apply mirroring, finally move y-axis
 * back to proper place in mirrored universe
 * 
 * draw mirrored character at position
 * (100, 0) by flipping world around
 * characters vertical center
 */

let cs = document.queryselelctor("canvas").getContext("2d");
let img = document.createElement("img");
img.src "img/player.png";
let sprieW = 24, spriteH = 30;
img.addEventListener("load", () => {
    flipHorizontally(cx, 100 + spriteW / 2);
    cx.drawImage(img, 0, 0, spriteW, spriteH, 
                100, 0, sptireW, spriteH);
});
// Storing and clearning transformations
/**
 * save and restore methods on 2d canvas context 
 * do this transformation management
 * 
 * save current state is pushed onto stack
 * restore state on top of stack is taken
 * off used as context's current tranformation
 * 
 * resetTransform fully resets transformation
 */

let cx = document.querySelector("canvas").getContext("2d");
function bruanch(length, angle, scale) {
    cx.fillRect(0, 0, 1, length);
    if (length < 8) return;
    cx.save();
    cx.translage(0, length);
    cx.rotate(-angle);
    bruanch(lenght * scale, angle, scale);
    cx.rotate(2 * angle);
    bruanch(length ( sclae, angle, scale);
    cx.restore();
    cx.translate(300, 0);
    branch(60. 0.5, 0.8);
}
// Back to the game

/**
 * drawImage used to draw pictures that represent
 * games elements
 * 
 * define another display object type called 
 * CanvasDisplay supporting same interface as DOMDisplay
 * namely methods syncState and clear
 * 
 * Display object CanvasDisplay keeps more info
 * than DOMDisplay. 
 * 
 * Rather than using scroll position of DOM element
 * tracks own viewport tells what part of level currently
 * looking at. 
 * 
 * Finally keeps a flipPlayer property so when 
 * the player is standing still. Keeps facing
 * direction last moved in
 * 
 */

class CanvasDisplay {
    constructor (parent, level) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = Math.min(600, level.width * scale);
        this.canvas.width = Math.min(450, level.height * scale);
        parent.appendChild(this.canvas);
        this.cx = this.canvas.getContext("2d");

        this.flipPlayer = flase;
        this.viewport = {
            let: 0,
            top: 0,
            width: this.canvas.width / scale,
            height: this.canvas.height / scale
        };
    }

    clear() {
        this.canvas.remove();
    }
}

CanvasDisplay.prototype.syncState = function(state) {
    this.updateViewport(state);
    this.clearDisplay(state.status);
    this.drawBackground(state.level);
    this.drawActors(state.actors);
    
};

/**
 * updateViewport method similar to DOMDisplay's scrollPLayerIntoView
 * method. Checks whether player is close to edge
 * of screen and moves viewport accordingly
 */

CanvasDisplay.prototype.updateViewport = function(state) {
    let view = this.viewport, margin = view.width / 3;
    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5));

    if (center.x < view.left + margin) {
        view.left = Math.max(center.x - margin, 0);
    } else if (center.x > view.left + view.width - margin) {
        view.left = Math.min(center.x + margin - view.width,
                            state.level.width - view.width);
    }
    if (center.y < view.top + margin) {
        view.top = Math.max(center.y + margin - view.height, 
                            statle.level.height - view.height);
    }
};

/**
 * calls to Math.max adn Math.min ensure viewport
 * does not end up showing space outside
 * of level. Math.max(x, 0) makes sure resulting number
 * not less than zero. 
 * 
 * Math.min gurantees value stays below given bound
 * when clearing display use a brighter color 
 * when game is won. darker if (lost)
 */

CanvasDisplay.prototype.clearDisplay = function(status) {
    if (status == "won") {
        this.cx.fillStyle = "rgb(68, 191, 255)";
    } else if (status == "lost") {
        this.cx.fillStyle = "rgb(44, 136, 214)";
    } else {
        this.cx.fillStyle = "rgb(52, 166, 251)";
    }
    this.cx.fillRect(0, 0, 
                    this.canvas.width, this.canvas.height);
};

/**
 * to draw background run through tiles visible in current 
 * viewport
 */

let otherSprites = document.createElement("img");
otherSprites.src = "imge/sprites.png";

CanvasDisplay.prototype.drawBackground = function(level) {
    let {left, top, width, height} = this.viewport;
    let xStart = Math.floor(left);
    let xEnd = Math.ceil(left + width);
    let yStart = Math.floor(top);
    let yEnd = Math.ceil(top + height);

    for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
            let tile = level.rows[y][x];
            if (tile == "empty") continue;
            let screenX = (x - left) * scale;;;
            let screenY = (y - top) * scale;
            let tileX = tile == "lava" ? scale : 0;
            this.cx.drawImage(otherSprites,
                            tileX,          0, scale, scale,
                            screenX, screenY, scale, scale);
        }
    }
};

/**
 * tiles that are not empty drawn with drawImage. 
 * otherSprites image contains pictures used for elements
 * other than the player
 * contains from left to right, wall tile
 * lava tile and sprite for a coin
 * 
 * Background tiles are 20 x 20 pixels since 
 * same scale used with DOMDisplay
 * offset for lava tiles is 20 value
 * of the scale binding offset for walls
 * is 0
 * 
 * don't bother waiting for sprite image to load
 * Callin drawImage with an image that hasn't 
 * been loaded yet will simply do nothing
 * 
 * Thus we might fail to draw game properly for 
 * first few frames while image is still loading
 * since screen keeps updating correct scene will
 * appear as soon as loading finishes
 * 
 * walking character will be used to represent
 * player. Code that draws it needs to pick
 * the right sprite and direction based on
 * players current motion. first eight
 * sprites contain walking animation.
 * 
 * When player is moving along a floor
 * we cycle based on the current time
 * 
 * time is divided by 60 to switch frames 
 * every 60 milliseconds
 * 
 * when player is standing still we draw ninth
 * sprite. During jumps tenth, which are 
 * recognized by fact vertical speed is not 
 * zero rightmost sprite is used
 * 
 * because sprites slightly wider than player
 * object 24 instead of 16 pixels to allow some space
 * for feet and arms. Method has to adjust x-coordinate 
 * and width by amount (playerXOverlap)
 */

let playerSprites = document.createElement("img");
playerSprites.src = "img/player.png";
const playerXOverlap = 4;

CanvasDisplay.prototype.drawPlayer = function(player, x, y,
                                                    width, height){

    width += playerXOverlap * 2;
    x -= playerXOverlap;
    if (player.speed.x !=0) {
        this.flipPlayer = player.speed.x < 0;
    }

    let tile = 8;
    if (player.speed.y != 0) {
        tile = 9;
    } else if (player.speed.x != 0) {
        tile = Math.floor(Date.now() / 60) % 8;
    }

    this.cx.save();
    if (this.flipPlayer) {
        flipHorizontally(this.cx, x + width / 2);
    }
    let tileX = tile * width;
    this.cx.drawImage(playerSprites, tileX, 0, width, height, 
                                    x,    y, width, height);    
    this.cx.restore();

};

/**
 * drawPlayer method called by drawActors
 * which is responsible for drawing all
 * actors in game
 */

CanvasDisplay.prototype.drawActors = function(actors) {
    for (let actor of actors) {
        let width = actor.size.x * scale;
        let height = actor.size.y * scale;
        let x = (actor.pos.x - this.viewport.left) * scale;
        let y = (actor.pos.y - this.viewport.top) * scale;
        if (actor.type == "player") {
            this.drawPlayer(actor, x, y, width, height);
        } else {
            let tileX = (actor.type == "coin" ? 2 : 1) * scale;
            this.cx.drawImage(otherSprites, 
                                tilex, 0, width, height, 
                                x,        y, width, height);
        }
    }
};

/**
 * when drawing something that is not player
 * look at its type to find correct offset
 * of the correct sprite.
 * 
 * lava tile found at offset 20 coin sprite
 * found at 40 two times scale
 * 
 * subtract viewports position when computing 
 * actors position since (0, 0) corresponds
 * to top left of viewport not top left
 * of level. You could hvae used translate
 */

// Choosing a graphics interface

/**
 * svg desgined for drawing used to produce
 * crisp graphcs that look good at any
 * zoom level
 * 
 * controlls are interface elements that appear
 * below picture
 * will provided  asn an array 
 * 

 * 
 * both svg and html build a data structure (dom
 * ) represents picture. Makes it possible to modify
 * elements aftert after they are drawn 
 * 
 * IF changes  are needed in response to what
 * user is doing as part of an animation 
 * using canvas needlessly expensive
 * 
 * DOM allows to register mouse event handlers 
 * on every element
 * in picture
 * even shapes drawn with svg cant do that with canvas
 * 
 * 
 * canvas pixel-oriented approach can be advantage
 * when drawing huge number of tine elements
 * does not build data structre. but repeadtedly
 * draws onto same pixel surfave gives canvas low
 * cost per shape
 * 
 * also with effects such as rendering 
 * scene one pixel at a time ( using ray tracer
 * postproccessing an image with JS (blurring or distorting it)
 * can be realistically handled by pixel-basd approach
 * 
 * 
 */
// Summary

/**
 * canvas node represents area in document that program may 
 * draw on drawing done through drawing context object
 * created with getContext method
 * 2d drawing interface allows to fill and stroke various
 * shapes
 * context fillStyle prorperty determines how shapes are filled
 * the strokeStyle and lineWidth properties control way lines
 * are drawn
 * 
 * Rectangles and pieces of text can be drawn with single
 * method call. fillRect and strokeRect methods draw 
 * rectangles and fillText and strokeText methods draw text. 
 */

// Exercies