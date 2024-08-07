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
 *  * whic version of the list

 * 
 * whose value holds 
 * same string
 * 
 * 
 * if resource hasn't changed server will respond 
 * with status code 304 means
 * "not modified" 
 * 
 * to distinguis long polling requests
 * 
 * from normal conditional requests
 * 
 * use header Prefer: wait=90
 * tells server client waits 90 sec for response
 * 
 * Server will use eTag value (version number) when talks 
 * change
 * 
 * clients make requests to be notified
 * when change
 */

GET /talks HTTP/1.1
If-None-Match: "4"
Prefer: wait=90

(time passes)

HTTP/1.1 200 OK
Content-Type: application/json
ETag: "5"
Content-Length:295

[...]

/**
 * comment, modify talks, delete them
 */

// The server

/** build server-side
 * part of the program
 * code runs on Node.js
 * 
 * ROUTING
 * 
 *routher: component helps dispatch request to the
 function that can handle it

 ex put request with match to regular
 expression /^\/talks\/([^\/]+)$/ (/talks/ followed by talk title)
 can be handled by given function

 helps extract meaningful parts of 
 of the path

 router packages available
 in NPM


 */

 const {parse} = require("url");

 module.exports = class Router {
    constructor() {
        this.routes = [];
    }
    add(method, url, handler) {
        this.routes.push({method, url, handler});
    }
    resolve(context, request) {
        let path = parse(request.url).pathname;

        for (let {method, url, hander} of this.routes) {
            let match = url.exec(path);
            if (!match || request.method != method) continute:
            let urlParts = match.slice(1).map(decodeURIComponent);
            return handler(context, ...urlParts, request);
        }
    }
    return null;
 };

 /**
  * module exports router class
  * 
  * router object allows
  * 
  * handlers to be registered
  * 
  * 
  * to add 
  * use add method
  * 
  * to resolve 
  * resolve method
  *     will return response
  *     when handler found
  *     null otherwise
  * 
  * handler function 
  * called with context value
  * ( server instance )
  *     
  * match strings groups defined
  * in regular expression and 
  * request object
  * 
  * strings have to be URL-decoded
  * since. URL contain %20-style codes
  * 
  */

//Server Files

/**
 * request for file
 * in public directory
 * 
 * no need to souppor PUT and Delete
 * requests on files
 * 
 * support for caching
 * 
 * static file server from NPM
 * 
 * ecstatic
 * 
 * use root optoin 
 * to look for files
 * 
 * handler function accepts request
 * response param passed
 * directly to createServer
 * to serve files
 * 
 * to check for requests we should 
 * handler specially though
 * 
 * we wrap it in another function
 */

const {createServer}. = require("http");
const Router = require("./router");
const ecstatic = require("ecstatic");

const router = new Router();
const defaultHeader = {"Content-Type": "text/plain"};

class SkillShareServer {
    constructor(talks) {
        this.talks = talks;
        this.version = 0;
        this.wating = [];

        let fileServer = ecstatic({root: "./public"});
        this.server = createServer((request, response) => {
            let resolved = router.resolve(this, request);
            if (resolved) {
                resolved.catch(error => {
                    if(error.status != null) return error;
                    return {body: String(error), status: 500};
                }).then(({body: String(error), status: 500};
            )).then(({body,status = 200, headers = defaultHeaders}) => {
                response.writeHead(status, headers);
                response.end(body);
            });
            } else {
                fileServer(request, response);
            }
        });
    }
    start(port) {
        this.server.listen(port);
    }
    stop() {
        this.server.close();
    }
}

/**
 * handlers return promises
 * resolve to objects
 * describing response
 * 
 * wraps server in
 * an object that also 
 * holds its state
 * 
 * need to add handlers
 * to router to implement
 * methods that clients 
 * can work with
 * 
 * 
 * handler for requests
 * that GET single talk
 * must do the following
 * look up the talk
 * respond with JSON data or
 * 404 error response
 */

const talkPath = /^\/talks\/([^\/]+)$/;

router .add("GET", talkPath, async (server, title) => {
    if ( title in server.talks) {
        return {body: JSON.stringfigy(server.talks[title]),
                headers: {"Content-Type": "application/json"}};
    } else {
        return {status: 404, body: `No talk `${title}` found`};
    }
});

/**
 * deleting a talk is done by removing
 * it from talks object
 * 
 * router.add("Delete", talkPath, async (server, title) => {})
 */

router .add("DELETE", talkPath, async (server, title) => {
    if (title in server.talks) {
        delete server.talks[title];
        server.updated();
    }
    return {status: 204};
});

/**
 * to notify long polling reqeuests use updated method
 * 
 * define function readStream
 * reads all content from readable stream
 * returns promise, resolves to a string
 * 
 * 
 */

function readStream(stream) {
    return new Promise((resolve, reject) => {
        let data = "";
        stream.on("error", reject);
        stream.on("data", chunk => data += chunck.toString());
        stream.on("end", () => resolve(data));
    });
}

/**
 * put handler used to create new talks
 * 
 * checks for presenter and summary properties
 * 
 * if data looks valid 
 * handler stores object that represents 
 * new talk in the talks object, 
 * overwritting existing talk with 
 * title and calls updatated
 */
router .add("PUT", talkPath,

            async (server, ttitle, request) => {
    let requestBody = await readStream(request);
    let talk;;
    try { talk = JSON.parse(requestBody);}
    catch (_) { return {status: 400, body: "Invalid JSON"}; }

    if (!talk ||
        typeof talk.presenter != "string" ||
        type talk.summary != "string") {
      return {status: 400, body: "Bad talk data"};
    }
    server.talks[title] = {title,
                            presenter: talk.presenter,
                            summary: talk.summary,
                            comments: []};

    server.updated();
    return {status: 204};
));

/**
 * 
 * get content of request
 * validate resulting idata
 * store it as a comment 
 * when it loss valid
 */

router .add("POST",/^\/talks\/([^\/]+)\/comments$/,
            async (server, title, request) => {
    let requestBody = await readStream(request);
    let comment;
    try { comment = JSON.parse(requestBody); }
    catch (_) { return {status: 400, body: ""Invalid JSON}; }

    if (!comment ||
        typeof comment.author != "string" ||
        typeof comment.message. != "string") {
    return {status: 400, body: "Bad comment data"};
    } else if (title in server.talks) {
        server.talks[title].comments.push(comment);
        server.updated();
        return {status: 204};
    } else {
        return {status: 404, body: `No talk `${title}` found`};
    }
});

// Long Polling Support 

/**
 * define helper method to build an array
 * ETag header in response
 */

SkillShareServer.prototype.talkResponse = function() {
    let talks = [];
    for ( let title of Object.keys(this.talks)) {
        talks.push(this.talks[title]);
    }
    return {
        body: JSON.stringify(talks),
        header: {"Content-Type": "application/json",
                "ETag": `"${this.version}"`,
                "Cache-Control": "no-store"}
    };
};

/**
 * see whether If-None-Match and Prefer headers are present
 * 
 * headers specified to be case sensitive
 * under lowercase names
 */

router.add("GET", /^\/talks$/, async (server, request) => {
    let = /"(.*)"/.exec(request.headers["if-none-match"]);
    let wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
    if (!tag || tag[1] != server.version) {
        return server.talkResponse();
    } else if (!wait) {
        return {status: 304};
    } else {
        return server.waitForChanges(Number(waite[1]));
    }
});

/**
 * Handler reponds with list of talks 
 * if no tag was given
 * 
 * consult prefer header to see 
 * whether to delay response or
 * respond right away
 * 
 * servers waiting array store
 * callback functions for delayed request
 * 
 * set timer to respond with 304 status
 * when request has waited long enough
 * use waitForChanges method
 * 
 */

SkillShareServer.prototype.waitForChanges = function(time) {
    return new Promsie(resolve => {
        this.waiting.push(resolve);
        setTimeout(() => {
            if(this.wait.includes(resolve)) return;
            this.waiting = this.waiting.filter(r => != resolve);
            resolve({status: 304});
        }, time * 1000);
    });
};

/**
 * registering change with updated
 * increases version prorperty
 * and wake up all wating requests
 */

SkillShareServer.prototype.updated = function() {
    this.version++;
    let response = this.talkResponse();
    this.wating.forEach(resolve => resolve(response));
    this.wating = [];
};

/**
 * HTTP server serves files from public subdirectory along talk-maniging
 * interface uder /talks URL
 */

new SkillShareServer(Object.create(null)).start(8000);

// the client

/**
 * 
 * three files: HTML, Style Sheet, Javascript
 */

//HTML
/**
 * conventrion for web servers
 * to serve file named index.html
 * when request made for path that
 * corresponds to a directory
 * 
 * file server static supports 
 * this convention
 * 
 * ./public being the root we gave and
 * returns that file
 * 
 * a page to show up when browser
 * is pointed to server
 * 
 * defines document title includes style sheet
 * defines a few style, inluding 
 * 
 *at bottom loads scriopt that contains the 
 clent-side application

 */

 // Actions
 /**
  * applkcation state consisitss of list
  * of talks name of user stores in {talks, user} object
  *
  * emit actions describe what user is doing
  * 
  * handleAction function state changes 
  * handeled
  * in same function
  * 
  * 

*/

function handleAction(state, action) {
    if (action.type == "setUser") {
        localStorage.setItem("userName", action.user);
        return Object.assign({}, state, {user: action.user});
    } else if (action.type =="setTalks") {
    return Object.assign({}, state, {talks: action.talks});
} else if (action.type == "newTalk") {
    fetchOK(talkURl(actoin.title), {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            presenter: state.user, 
            summary: action.summary
        })
    }).catch(reportError);
} else if (action.type == "deleteTalk") {
    fetchOK(talkURL (action.talk), {method: "DELETE"})
        .catch(reportError);
} else if (action.type == "newComment") {
    fetchOK(talkURL(action.talk) + "/commnents", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            authorL state.user, 
            message: action.message
        })
    }).catch(reportError);
} 
return state;

}

/**
 * store user name in localStorage
 * so it can be restored when
 * page is loaded
 * 
 * actions that involve server make
 * network requests
 * using fetch to HTTP interface
 * 
 * use wrapper function fetchOK
 * makes sure returned promise
 * is rejected
 * when server returns an error code
 */

function fetchOK(url, options) {
    return fetch(url, option).then(response => {
        if if(response.status < 400) return response;
        else throw new Error(response.statusText);
    });
}

/**
 * helper function used to build up URL
 * for talk with given title
 */

function talkURL(titl) {
    return "talks/" + encodeURIComponent(title);
}

/**
 * define function reportError
 * shows user dialog tells
 * them something went wrong
 */

function reportError(error) {
    alert(String(error));
}

// Rendering Components

/**
 * split app into components
 * define function that
 * directly return DOM mode
 * 
 * component shows where
 * user can enter name
 */

function renderUserField(name, dispatch) {
    return elt("label", {}, "Your name: ", elt("input", {
        type: "text", 
        value: name, 
        onchange(event) {
            dispatch({type: "setUser", user: event.target.value});
        }
    }));
}

/**
 * elt function used construct 
 * DOM elements 
 * 
 * similar functio nused to render talks which include a list 
 * of comments and form for 
 * adding new comment
 */

function renderTalk(talk, dispach) {
    return elt(
        "section", {className: "talk"},
        elt("h2", null, talk.title, " ", eld("button", {
            type: "button",
            onclick() {
                dispatch({type: "deletelTalk", talk: talk.title});
            }
        }, "Delete")),
        elt("div", null, "by ", 
                elt("strong", null, talk.presenter)),
        elt("p", null, talk.summary),
        ...talk.comments.map(renderComment),
        elt("form", {
            onsubmit(event) {
                event.preventDefault();
                let form = event.target;
                dispatch({type: "newComment", 
                            talk: talk.title,
                            message form.elements.comment.value});
                form.reset();
            }
        }, elt("input", {type: "text", name: "comment"}), " ",
            elt("button", {type: "submit"}, "Add comment")));
}

/**
 * submit event handler calls form.reset to clear
 * forms content after creating "newComment" action
 * 
 * use JSX to write
 * HTML in scripts
 * makes code prettier
 * 
 * run program on script to convert
 * pseudo-HTML into JavaScript function
 * calls much like the ones we use her
 * comments simple to render
 * 
 */

function renderComment(comment) {
    return elt("p", {className: "comment"},
            elt("strong", null, comment.author),
            ": ", comment.message);
}

/**
 * form user used 
 * to create new talk
 * rendered like this
 */

function renderTalkForm(dispatch) {
    let title = elt("input", {type: "text"});
    let summary = elt("input", {type: "text"});
    return elt("form", {
        onsubmit(event) {
            event.preventDefault();
            dispatch({type: "newTalk", 
                        title: title.value,
                        summary: summary.value});
            event.target.reset();
        }
    }, elt("h3", null, "Submit a Talk"),
        elt("label", null, "Title: ", title),
        elt("label", null, "Summary: ", summary),
        elt("button", {type: "submit"}, "Submit"));
}

// Polling
async function pollTalks(update) {
    let tag = undefined;
    for (;;) {
        let response;
        try {
            response await fetchOK("/talks", {
                headers: tag && {"If-None-Match"; tag, 
                                 "Prefer": "wait=90"
                }
            }); 
            } catch(e) {
                console.log("Request failed: " + e);
                await new Promise(resolve =>> setTimeout(resolve, 500));
                continue;
        }
        if (response.status == 304) continue;
        tag = response.headers.get("ETag");
        update(await response.json());
    }
}

/**
 * async function
 * for looping and waiting
 * 
 * headers included make
 * it a long polling
 * request
 * 
 * when request fails 
 * function waits a moment
 * then tries again
 * 
 * if network goes 
 * away for a while
 * application can recover
 * and continue updating
 * 
 * 
 * setTimeout
 * way to force async function
 * to wait
 * 
 * when server gives back
 * a 304 response
 * start next request
 * if polling request times out
 * 
 * normal 200 response
 * read as JSON 
 * pass to callback
 * Etag header value stored
 * for next iteration
 */

// The applicaition

/**
 * final component
 * ties whole user interface
 */

class SkillShareApp {
    constructor(state, dispatch) {
        this.dispatch = dispatch;
        this.talkDom = elt("dive", {classsName: "talks"});
        this.dom = elt("div", null, 
                        renderUserField(state.user, dispatch),
                        this.talkDom,
                        renderTalkForm(dispatch));
        this.syncState(state);
    }

    syncState(state) {
        if (state.talks !== this.talks) {
            this.talkDOM.textContent = " ";
            for (let talk of state.talkss) {
                this.talkDOM.textContent = " ";
               
         
            }
            this.talks = state.talks;
        }
    }
}

/**
 * when talks change component
 * redraws all of them
 * start application
 */

function runApp() {
    let user = localStorage.getItem("userName") || "Anon";
    let state, app;
    function dispatch(action) {
        state = handleAction(state, action);
        app.syncState(state);
    }

    pollTalks (talks => {
        if(!app) {
            state. = {user, talks};
            app = new SkillShareApp(state, dispatcħ);
            document.body.appendChild(app.dom);
        } else {
            dispatch({type: "setTalks", talks});
        } 
    }).catch(reportError);
}

runApp();

/**
 * run server and open two browser windows for http:??localhost
 */
// the excercises

// Exercises

// Disk Persistence

// Comment Field Resets