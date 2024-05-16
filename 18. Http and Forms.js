/**
 * Http = mechanism through which data
 * is requested and provided
 * on the world wide web
 */

// Protocol

/**
 * TCP connection opens on port 80 the'
 * default port for HTTP traffic
 * 
 * GET /18_http.html HTTP/1.1 
 * Host: eloquentjavascript.net 
 * User-Agent: Your browser's name
 * 
 * server responds through same 
 * connection
 * 
    HTTP/1.1 200 OK
    Content-Length: 65585
    Content-Type: text/html
    Last-Modified: Mon, 08 Jan 2018 10:29:45 GMT

    browser takes part of response
    after blank line

    information sent by client is called
    the request starts with this line

    GET /18_http.html HTTP/1.1


    first word is method of the request

    other methods are delete

    Delete Put and Post

    server not obliged to carry out
    every request it gets

    part after method name is path of 
    resource the request applies to

    resource = file on server resource
    can be anything that can be transferred
    as if it is a file

    servers generate responses they produce
    on the fly if you open 
    https://github.com/marijnh

    server looks in its database for user
    name marijnh

    if it finds one it will generate a profile
    page for that user

    after resource path first line of request
    mentions HTTP/1.1 to indicate version of 
    HTTP protocol is using

    many sites HTTP 2 which supports that it 
    can be faster

    Browser automaticlaly switch to appropriate
    protocol version when talking to a server
    outcome of the a request is same regardless 
    of which version is used

    version 1.1 is more straighforward and easier
    to play around with 

    servers response will start with a version asl well 
    followd by status of response

    first as three digit status code and then as 
    human-readable string

    HTTP/1.1 200 OK

    Status codes starting with 2 indicate request
    succeeded

    Codes starting with 4 mean something wrong with
    request

    404 means request could not be found

    codes that start with 5 mean error happened on 
    server and request is not to blame

    first line of request or response may be
    followed by any number of headers

    line in form name value that specify extra
    information about request or response
    headers were part of example response

    Content-Length: 65585
    Content-Type: text/html
    Last-Modified: Thu, 04 Jan 2018 14:05:30 GM


    tells the size of the doc, last modified, 

    most headers, client and server are free to
    decide whether to include them in a request
    response

    Host header specifies hostname should be
    included in request because server might serve
    multiple hostnames on single IP address 
    without that header server won't know
    which hostname client is trying to talk to

    after headers both request and responses
    may include blank line followed by body
    which contains data being sent
    
    get and delete don't send any data 
    put and post request do.

    some response types such as error responses
    do not require a body
 */

// Browser and http

/**
 * 
 * browser will make several get request
 * rather than wait for responses one 
 * at a time
 * 
 * <form method="GET" action="example/message.html"> 
 * <p>Name: <input type="text" name="name"></p> 
 * <p>Message:<br><textarea name="message"></textarea></p> 
 * <p><button type="submit">Send</button></p>
</form>

when <form> elements method attribute is get 
information in form is added to end of the action
URL as a query string. B
browser might make a request to this URL

GET /example/message.html?name=Jean&message=Yes%3F HTTP/1.1

question mark indicates end of the path as part of
of the URL and start of the query

followed by pairs of names and values

corresponding to name attribute on form field elements
and content of those elements ampersand & used to seperate
the pairs

actuall mesage encoded in the URL is Yes

URL encoding uses a percent sign followed by two 
hexadecimlas %3f = 63 in decimal notation code 
of a question mark character 

JS provides encodeURIComponent and decodeURIComponent
functions to encode and decode this format


 */

console.log(encodeURIComponent("Yes?"));
// Yes%3F
console.log(decodeURIComponent("Yes%F"));
// Yes?


/**
 * changing method attribute of HTML request made
 * to submit form will use POST method put 
 * query string in body of the request instead
 * of adding to the URL
 * 
 POST /example/message.html HTTP/1.1
 Content-length: 24
 Content-type: application/x-www-form-urlencoded

 name=Jean&message=Yes%3F

 Get request ask for information

 POST used to create 

 Browsers make GET request to prefetch a resource
 it believes will soon need

 */

 //Fetch

 /**
  * interface through which browser Javascript can 
  * make HTTP request called fetch
        - uses promises

  */

fetch("example/data.txt").then(response => {
    console.log(response.status);
    // 200
    console.log(response.headers.get("Content-Type"));
    // text/plain
});

/**
 * calling fetch returns a promise resolves
 * to a response object holding information
 * about the servers response such as status
 * code and headers. 
 * 
 * Headers are wrapped in Map-like object
 * that treat its keys (headers name) as
 * case insensitive 
 *      - headers are suppose to be case
 *        case sensitive
 *        header.get
 *        ("Content-Type") and headers.get("content-TYPE")
 *        return the same value
 * promise returned by fetch resolves successfully
 * even if server responded with an error code. M
 * might be rejected if network error or if server
 * the request is addressed to can't be found
 * 
 * first argument to fetch is URL that should be requested
 * when URL doesn't start with protocol name such as http:)
 * it is treated as relative means it is interpreted relative
 * to current document.
 * 
 * When it starts with a slash / replaces current path
 * which is part after server name
 * 
 * When it does not part of the current path up to 
 * last slash character is put in front of relative URL
 * 
 * use text method to actual content of response
 * intial promise is resolved as soon as the responses 
 * headers have been received and because reading
 * the response body might take a while longer
 * this again returns a promise
 */

fetch("example/data.txt")
    .then(resp = resp.text())
    .then(text => console.log(text));
    // this is the content of data.txt

/**
 * JSON returns promise that resolves to 
 * the value you get when parsing the body
 * JSON rejects if not valid JSON
 * 
 * fetch uses GET method does not include a request
 * body. 
 * 
 * You can configure it differently by passing an
 * object with extra options as a second argument
 *
 * this request tries to delete example/data/txt:
 */

    fetch("example/data.txt", {method: "DELETE"}).then(resp => {
        console.log(resp.status);
        // 405
    })

    /**
     * 405 = "method not allowed"
     * 
     * To add request body you can include
     * a body option to set headers theres
     * the headers option
     * 
     * Following example request includes a
     * Range header which instructs server to return
     * only part of a response
     */

    fetch("example/data.txt", {headers: {Range: "bytes=8-19"}})
        .then(resp => resp.())
        .then(console.log);
    // the content

    /**
     * browser will automatically add some request headers
     * such as "Host" and those needed for the server to figure
     * out the size of the body
     * 
     * adding headers is useful to include things such as
     * authentication information or to tell the server
     * which file you'd like to receive
     */

    // HTTP SANDBOXING

    /**
     * browsers protect users by disallowing scripts
     * to make HTTP requests to other domains
     */