
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
// Drawing a pie chart

// Text

// Images

// Transformation

// Storing and clearning transformations

// Back to the game

// Choosing a graphics interface

// Summary

// Exercies