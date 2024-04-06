// The Document object model
/**
 * opening a web page browser builds a model of 
 * documents strcuture uses its model to draw page
 * on screen
 * 
 * representation document one of the toys
 * JS has in sandbox. Acts as a live data structure
 * when modified
 */
// Document structure

/**
 * data structure browser uses to represent document
 * representation called Document Object Model DOM
 * global binding doc give access to objects
 * documentElement prop refers to objec representing
 * html. Every HTML doc has head and body has 
 * head and body props pointing those elements
 */

//Trees

/**
 * data struct called tree when it has branching structure
 * node refers to nodes, children
 * s node may not contain itself directly or indirectly
 * has a single well-defined root
 * DOM serves as root
 * 
 * trees maitintain sorted sets of data
 * elements usually found or inserted more efficiently in tree
 * than in flat array
 * 
 * typical tree has different kinds of nodes. syntax tree
 * for egg had identifiers values and application nodes
 * application nodes 
 * 
 * Application nodes may have children.
 * Identifiers and values are lieaves or nodes without children
 * 
 * Nodes for elements represent html determin structur of document
 * can have child nodes. example of node is document.body. 
 * Some of chilredn can be laef nodes pieces of text or comment nodes
 * 
 * each dom objects has a nodetType Property which contains a code (number)
 * that identifies type of node.
 * 
 * Each dom node object has nodeType property contains
 * a code number indentifies type of node 
 * Elementrs have code 1 which is also defined as constant propety
 * Node.ELEMENT_NODE
 * 
 * text nodes represent a section of text in doc, get code 3
 * Node.TEXT_NODE. Comments have code 8 (Node.COMMENT_NODE) 
 * 
 */

// The standard

/**
 * JS tries to be a language-neutral interface that 
 * can be used in other systems not just HTML but also for XML
 * a generic data format 
 * 
 * having interface that is properly intgrated with
 * langauge will save time having familirar interface
 * across languages
 * 
 * childNodes property holds array to access child nodes
 * an instance of NodeList type not real array does 
 * not have methods of slice and map
 * 
 * not way to create. a new node and immediately add children
 * attributes to it. 
 * 
 * YOu have to first creat then add children and attributes
 * using side effects code that interacts heavily with DOM 
 * tends to get long, repetitive and ubgly
 * 
 * JS allows abstractions possible to design improved
 * ways to express operations your are performing
 * many libraries intended for browser programming come with such tools
 * 
 * 
 */

// Moving through the tree

/**
 * every node has parentNode prop that points to array like object 
 * holding children
 * 
 * FirstChild and lastChild properties point to first and las child
 * elements or have value null for nodes without children
 * previousSibling and nextSibling point to adjacent nodes, nodes with same
 * parent that appear immediately before or after node itself. 
 * 
 * for a first fhild previousSibling will be bull for last 
 * child nextSibling will be null
 * 
 * children property which is like childNOdes but contains 
 * only element type 1 children can be useful when you aren't 
 * interested in text nodes
 * 
 * when dealing with nestned data structure recursive function 
 * are often useful
 * following function scans doc for text nodes containing
 * given s tring and returns true
 * 
 */

function talksAbout(node, string) {
    if (node.nodeType == Node.ELEMENT_NODE) {
        for( let shild of node.childNodes) {
            if (talksAbout(child, string)) {
                return true;
            }
        }
        return false;
    } else if (node.nodeType == Node.TEXT_NODE) {
        return node.nodeValue.indexOf(string) > -1;
    }
}

console.log(talksABout(document.body, "book"));

// Finding elements

/**
 * finding a specific node in document by starting at document.body
 * and following fixed path of properties is a bad idea
 * makes bad assumptions about percise structure of document
 * 
 * text nodes are created even for whitespace
 * 
 * document body tage does not have three children
 * has seven three plus spaces before, after and between
 * 
 * to get href attribute "Get first link in doc"
 */

let link = document.body.getElementsByTagName("a")[0];
console.log(link.href);

/**
 * all element nodes have getElementsByTagName method
 * collects all elements with given tag name that
 * are descendants(direct or indirect children)
 * returns as array-like object
 * 
 * to find single node give it an id attribute use
 * document.getElementById
 */
/** 
<p>Nt adafd gertrude</p>
<p><img id="gertrude" src="img/ostrich.png"></p>
<script>
    let ostrich = document.getElementById("gertrude");
</script>
*/

/**
 * getElementByClassName searches through content of an 
 * element node retrieves all elements that
 * have given string in their class attribute
 */
// Changing the document

/**
 * Dom data structure can be changed shape of doc tree 
 * can be modified by changing parent-child
 * relationships
 * remove method removes node from their parent node
 * 
 * appendchild adds a child node to an element node
 * puts it at end of list of children or insertBefore
 * inserts node given as first argument before
 * node given as second argument
 * 
 * <p>One</p>
 * <p>Two</p>
 * <p>Three</p>
 * 
 * <script>
 *  let paragraph = document.body.getElementsByName("p");
 *  document.body.insertBefore(paragraphs[2], paragraphs[0])
 * </script>
 * 
 * node exist in doc only in one place
 * insertig paragraph three in front of paragraph One. will first remove from 
 * end of document insert at front result
 * in three/one/two
 * 
 * all operations that insert a node somewhere will
 * cause it be removed from the current position
 * 
 * replaceChild method used to replcae child node with other one
 * use two nodes as arguments: new node, and other to be
 * replaced. 
 * 
 * Replaced node must be child of node of element method is called
 * on
 * 
 * replaceShild and insertBefore expect new node as first argument
 * 
 * 
 */

// Creating nodes
/**
 * to write script that replaces all images <img><tag>
 * in document with text held in alt attributes
 * 
 * involves removing images
 * adding new text node to replace them
 * text nodes use createTextNode
 * 
 */
</script>
function replaceImages() {
    let images = document.body.ElementsByTagName("img");    
    for (let i = images.length - 1; i >= 0; i--) {
        let image = images[i];
        if (image.alt) {
            let text = document.createTextNode(image.alt);
            image.partentNode.replcaceChild(text, image);
        }
    }
    
}
</script>

/**
 * createTextNode gives text node we can insert
 * into document to show on the screen
 * 
 * loop that goes over images starts at end of list
 * 
 * node is returned by method getElementsByTagName
 * 
 * Updated as document changes
 * 
 * starting from front would list to lose
 * first element so second time loop repeats
 * where i is 1 would stop because 
 * length of collection is 1
 * 
 * convert collection to real array by calling Array.from
 * 
 */

let arrayish = {0: "one", 1: "two", length: 2};
let array = Array.from(arrayish);
console.log(array.map(s => s.toUpperCase()));
// ["ONE", "TWO"]

/**
 * create element nodes use document.createElement
 * method
 * 
 * utility elt creates element node rest of args
 * as children to that node function 
 * used to add attribution to quote
 * 
 * 
 */

<blockquote id="quote">
    No Book can ever be finished. While working on it 
    we learn just enough to find it immature the moment
    we turn away from it
</blockquote>

    function elt(type, ...children) {
        let node = document.createElement(type);
        for (let child of children) {
            if (typeof child != "string") node.appendChild(child);
            else node.appendChild(document.createTextNode(child));
        }
        return node;
    }

    document.getElementById("quote").appendChild(
        elt("footer", "-", 
            elt("strong", "Karl Popper"), 
            ", preface to the second edition of ", 
            elt("em", "The Open Society and Its Enemies"), 
            ", 1950"));
// Attributes

/**
 * to store extra information in a document use
 * html to set attribute you want on nodes
 * 
 * make up your own attribute names use 
 * getAttribute and setAttribute methods
 * attributes will not be properties on 
 * elements node
 * 
 */

<p> data-classified="secret"> the launch code is 00000.</p>
<p> data-classified="unclassified"> I have two feet.</p>

<script>
    let paras = document.body.getElementsByTagName("p");
    for (let para of Array.from(paras)) {
        if (para.getAttribute("data-classified") == "secret") {
            para.remove();
        }
    }

</script>

/**
 * prefix name of made-up attributes with data-
 * ensure they dont conflict with any other
 * attributes. 
 * 
 * class attribute is keyword in JS 
 * old javascript implementations 
 * could not handle property names that
 * matched keywords
 * propert use to access attributes called className
 * access it under "class" using getAttribute and setAttribute
 * 
 */

// Layout
/**
 * block elements
 * 
 * inline elements
 * 
 * compute layout
 * 
 * size , position of element can be accessed 
 * from JavaScript offsetWidth offsetHeight properties
 * 
 * pixel basic unit of measurment
 * 
 * clieintWidth and clientHeight size of space inside
 * element ignoring width
 * 
 */

<p style="border: 3px solid red">
    "im boxed in"
</p>

<script>
    let para = document.body.getElementsByTagName("p")[0];
    console.log("clientHeight:", para.clientHeight);
    console.log("offsetHeight:", para.offsetHeight);
</script>

/**
 * getBoundingClientRect method find 
 * percise position of element on screen
 * returns object with top, bottom, left, right
 * indicating positions of the sides relative 
 * to top left of the screen
 * 
 * laying out document
 * 
 * browser will compute to draw changed
 * document to the screen
 * when a program asks for position or size 
 * hy reading properties such as offsetHeight or
 * calling getBoundingClientRect providing correc
 * informatin requires computing layout
 * 
 * Reading DOM layout info chan and Changin DOM
 * foreces a lot of layout computations
 * wlll run slowly
 * 
 * code that builds line of X
 * characters 2,000 pixels wide measures
 * measure time each one takes
 * 
 */

function time(name, action) {
    let start = Date.now(); // Current time in milliseconds
    action();
    console.log(name, "took", Date.now() - start, "ms");
}

time("naive", () => {
    let target = document.getElementById("one");
    while (target.offsetWidth < 2000) {
        target.appendChild(document.createTextNode("X"));
    }
});

// naive took 32 ms

time("clever", function() {
    let target = document.getElementById("two");
    target.appendChild(document.createTextNode("XXXXX"));
    let total = Math.ceil(2000 / (target.offsetWidth / 5));
    target.firstChild.nodeValue = "X" .repeat(total);

});
// clever took 1 ms

// Styling 

/**
 * Elements are drawn differently some
 * displayed as blocks others inline
 * 
 * change styling associated with element
 * ex text color underline
 * 
 * style attribute may contain one or more declrations
 * 
 * more than one declaration must be seperated
 * by semicolons as in color: red; border: none"
 * 
 * display property controls whether element 
 * displayed as block or inline element
 * 
 * this text is displayed <strong>inline</strong>
 * <strong style="display: block">as a block</strong>, and
 * <strong style="display: none">not at all</strong>
 * 
 * block ends up on own line
 * block elemnets not displayed inline
 * with text around them
 * 
 * last tag not displayed at all
 * 
 * display: none = prevents element from showing up
 * way to hide elements entirely because makes it easy
 * to reveal them again later
 * 
 * style property
 * maniputlates style of element
 * 
 * property holds object has properties
 * for all possible style properties
 * values of properties are string
 * used to change aspect of elements style
 */

let para = document.getElementById("para");
console.log(para.style.color):
para.style.colr = "magenta";

/**
 * hyphens removed
 * letters after them capitalized (style.fontFamily)
 */
// Cascading styles

/**
 * specificity measure of precise matching elements
 * determined by number and kind of element aspects
 * it requires
 */
// Query Selectors

/**
 * 
 */

function count(selector) {
    return document.querySelectorAll(selector).length;
}
console.log(count("p")); // all <p> elements
//4
console.log(count(" .animal")); // class animal
// 2
console.log(count("p .animal")); // animal inside of <p
//2
console.log(count("p > .animal")); // direct child of </p>
// 1
//

/**
 * querySelector useful if you want specific element
 * return first maching element or null when no 
 * element matches
 */

// Positioning and animating

/**
 * position style default value 
 * has value of static
 * element sits in normal place
 * in document. 
 * 
 * relative element takes up space in document
 * top and left style properies used to 
 * move relative to normal place 
 * 
 * position set to absolute element removed 
 * from normal doc flow - no longer takes space
 * may overlap with other elements 
 * 
 * top left props can be absolutely position
 * relative to top-left corner of 
 * nearest enclosing element
 * 
 * display picture of cat that moves around ellipse
 */

// style of text
// cat img element with position relative

//script of cat movement
// select cat img

querySelector("img");
// define angle using PI divided by 2;
Math.PI / 2;
// define animate function with time and lastime as param 

// conditionl comparing lastTime != null 
// angle will increase based on time minus lastTime time * 0.001;
//change style of top increasing size using sin angle times 20 * px
//change style of top increasing size using cos angle times 200 * px
// request Animation time newTime a function that animatesm newTime time
// requestAnimationFrame to schedule animate function to run when browser
// ready to repaint screen. 
// animate function calls requestAnimation to schedule next update
// causes updates to happen at a rate of 60 per second

/**
 * why do need requestAnimationFrame  
    * browser do not update display while a JavaScript program
    * is running nor do they allow interaction with page 
    * page would freeze if DOM iss just updated
 * We need requestAnimationFrame it 
 * lets browser know we are done
 * so browser can continue updating screen
 * and respond to user actions 
 * 
 * why is animation function passed current time as argument?
    * ensure motion of cat per millisecon is stable

    * bases speed at which angles changes on
      difference between current time and last time
      function ran 

    * motion would stutter if other task 
      if angle moved by fixed amount
      per step
      
 *   
 * Math.cos Math.sin
    * useful for finding points that 
    * around point (0,0) with radius
    * of one 
    * 
    * Both Functions interpret their
      argument as position on this circle
      going clockwise until 2π gone around
      whole circle 

    * Math.cos == x-coordinates corresponding 
      to given position

      Math.sin == y-coordinates

    * Positions (angles) greater than 2π 
      less than 0 are valid rotation
      repeats so a+2π refers to same 
      angle as a

    * Unit for measuring angles called 
      radians
             
      * full circle is 2π radians 
      
        * constant π availabe as Math.PI in Javascript
    
    * code keeps a counter, angle, for current angle
      of animation and increments every time
      animate function is called

    * uses angle to compute current postiton 
      of image element
    
    * Top style is computed with Math.sin multiplied
      by 20 which vertical radius of ellipse

        * left style based on Math.cos multiplied by 200
          so ellipse much wider than it is high

    * Append "px" to tell browser counting in pixels
     
 *  
 * 
 * 
 */

//
// Summary