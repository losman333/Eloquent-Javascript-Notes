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
 */