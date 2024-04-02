// Networks and the Internet

/**
 * network protocol describes style of communication
 * over a network
 * 
 * protocols for sending email fetching email
 * sharing files controlling computers
 * 
 * Http protocol for retrieving named resoures 
 * chunks of information such as web pages or pictures
 * specifies side making request 
 * should start with line naming resource and
 * version of protocol trying to use
 * 
 * GE. index.html HTTP/1.1
 * 
 * http treats network as a streamlike device
 * bits arrive at correct destintation in correct
 * order
 * 
 * TCP protocol 
 * computer waits (listens/listener) has a port 
 * number
 * ex SMTP Protocol uses port 25
 * 
 * other computer connects target machine using
 * correct port number
 * 
 * if target machine can be reached is listening on that port
 * listening computer called server connecting 
 * computer called client acts as two-way pipe
 * through which bits can flow 
 * bits are transmitted can be read out by machine on other side
 * 
 * tcp provides abstraction of network
 * 
 */

// The Web

/**
 * to connect to web connect machine
 * and listen on port 80 with http protocol
 * so other computers can ask for docs
 * 
 * each doc on web name by uniform resource locator
 * url
 */

http://eloquentjavascript.net/13_browser.html
|   |                        |              |
protocol    Server                  Path

/**
 * machines connected to internet get an IP address
 * number used to send messages to machine
 * 149.210.142.219
 * 
 * instead of number register a domain name for 
 * specific address
 */

// HtML

// HTML and Javascript
/**
 * script tag will run as script tag encountered
 * while browser reads HTML
 * script tag can be give src attribute
 * to fetch script file (text file containing JS program)
 * <button onclick="alert('Boom!');">Do not press</button>
 * single quotes are used because double quotes
 * already used to quote whole attribute
 */

// In the sandbox
/**
 * Isolating programming enviornment
 * is called sandboxing
 */

// Compatibility and browser wars

/**
 * compatibility wars with different browsers
 * 
 */

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

// Changing the document

// Creating nodes

// Attributes

// Layout

// Styling

// Cascading styles

// Query Selectors

// Positioning and animating

// Summary