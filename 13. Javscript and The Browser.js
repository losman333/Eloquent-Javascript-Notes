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

