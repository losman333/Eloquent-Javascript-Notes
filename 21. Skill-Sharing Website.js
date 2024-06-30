// Design

/**
 * 
 * Server Part
 * 
 * CLient Part
 * 
 * server stores systems data
 * provides it to clent
 * 
 * serves files to implement
 * client-side sytem
 * 
 * provides it to the client
 * 
 * serves files that implement
 * CLIENT side system
 * 
 * servers stores list
 * 
 * client shows the list
 * 
 * list adds, deletes, and updates
 * 
 * updates happen immediateley
 * 
 * 
 * Application will be set up
 * to show a live view of current
 * proposed talks and their comments
 * 
 * no way for web server
 * to open a connection
 * to client
 * 
 *  no way to know which 
 * clients currently looking
 * at a website
 * 
 *  
 * no good way to know which clients
 * currently looking at a given website
 * 
 * long polling
 * 
 * notifies client something has changednn
 * 
 * arranges for client to open connection
 * server uses  LONG POLLING to send information
 * when needed
 * 
 * HTTP request allows simple flow of information
 * 
 * client sends request
 * server comes back with single response
 * 
 * websockets open connections
 * for data exchange
 * 
 * long polling
 * client asks server
 * for new info
 * uses HTTP requests
 * 
 * server stalls answer when 
 * nothing new to report
 * 
 * client receives information quickly 
 * after it becomes available 
 * as long client has polling request open
 * 
 * long polling usually set max time
 * for each request
 * 
 * servers responds 
 * 
 * client starts new request
 * 
 * restarting rquest
 * makes technique
 * more robust
 * allows client to recover 
    * from temp connection failures
 * 
 * 
 * Node makes it easy to manage many 
 * connection without creating
 * seperate thread of control
 * 
 */

// Long Polling

// HTTP interface
/**
 * HTTP interface 
 * used to communicate
 * use JSON as format of request
 * and response body
 * 
 * uses talk path
 * 
 * static files served
 * if paths do not starts with /tasks
 * 
 * Get request to /talks
 * returns JSON doc
 */

[{"title": "Unituning",
    "presenter": "Jamał",
    "summary": "Modifying your cycle for extra style",
    "comments" : []}] 

/**
 * new talk done by making
 * put request to url like
 * /talks/Unituning
 * 
 * part after second slash 
 * title of the talk
 * 
 * PUT request body should contain JSON object
 * that has presenter and summary properites
 * 
 * title strings mus be encoded
 * 
 * encodeURICOmponent function
 * 
 * because talk titles contain
 * spaces and other chracters 
 * that may not appear in URL
 */

console.log("/talks/" + encodeURComponent("How to Idle"));
// /talks/HowtoIdle

/**
 * request to create talk about idling
 */

PUT /talks/How%20to%20Idle HTTP/1.1
Content-Type: application/json
Content-Length: 92

{"presenter": "Maureen", 
    "sumaary": "Standing still on a unicycle"
}

/**
 * also support get requests to retrieve JSON 
 * representation of a talk and DELETE request
 * to delete talk
 * 
 * adding comment to a talk 
 * done with post request to URL
 * like / talks/Unituning/comments
 * 
 * with JSON body that has author
 * and message properties
 */

/**
 * {"author": "Iman", 
 *  "message": "Will you talk about rasing a cycle"}
 * 
 * to support long polling
 * 
 * Extra headers that inform server
 * to delay response if no information
 * 
 * ETag and If-None-Match
 * 
 * ETag enitity tag
 * value  is a string 
 * identifies current version of resourece
 * 
 * CLients make conditional request 
 * by including If-None-Match
 * 
 * whose value holds 
 * same string
 * 
 * if resource hasn't changed server will respond 
 * with status code 304 means
 * "not modified" 
 */

// The server

// the client

// the excercises

// Exercises