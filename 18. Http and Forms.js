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
     * 
     * a header used to indicate to browser that
     * a request came from another domain
     * 
     * Access-Control-Allow-Origin
     */

    // Appreciating HTTP

    /**
     * building a system that requires 
     * communication between JavaScript program 
     * running in the browser several
     * ways to model this commumication
     * 
     * remote procedural calls
        - communication follows patterns
          of normal function calls.
          - function running on other machine
            - calling it involvrs making 
              request to server that includes
              function name and arguements

    * Build communication around concept of
      - of resources and HTTP methods 
        - instead of remote procedure
          called addUser use PUT request
        
        - instead of encoding user properities]
        - Define a JSON document that represents
          users properties instead of encoding
          into a function arguement

          body of the PUT request to create
          a new resource

          resource is fetched by making a GET 
          request to the resources returns
          document representing resource

          HTTP features 

          - support for cacheing resources
            keep a coppy on the client for fast access





     */

// Security and HTTPS

/**
 * HTTPS wraps HTTP traffic in a way that makes it harder
 * to read and tamper with. Client verifies 
 * server is who it claims to be by asking
 * to prove that it has a cryptographic
 * certificate issued by certificate authority
 *  - all data going over the connection is encrypted 
 *    that prevents eavesdropping and tapmering
 *  - HTTPS prevents people from impersonating
 *    from snooping on your communication
 * 
 */

// Form Fields

/**
 * form elements are part of DOM like 
 * the rest of the page
 * 
 * input fields gropued in a <form> tag
 * 
 * multiline text fields have their own tag
 * <textarea>
 * 
 * <select> tag used to create field that
 * allows user to select from predefined
 * options
 * 
 * when value of form field changes will fire
 * a change event
 */

//Focus

/**
 * to control focus from JavaScript with
 * focus and blur method
 * 
 * value in document.activeElement
 * corresponds to currently focused element
 */

document.querySelector("input").focus();
console.log(document.activeElement.tagName);
// INPUT
document.querySelector("input").blur();
console.log(document.activeElement.tagName);

/**
 * HTML also provides autofocus
 * attribute. Gives browser the option
 * to disable the behavior when user
 * has put focus on something else
 * 
 * tabindex lets you influence the order
 * in which elements receive focus 
 * 
 * example lets focus jump from text
 * input to OK button rather than
 * going to help link first
 */

<input type="text" tabindex=1>
<a href=".">(help)</a>
<button onclick="console.log('ok')" tabindex=2>OK</button>

/**
 * you can add tabindex attribute to any element
 * that will make it focusable.
 * tabindex of -1 makes tabbing skip over
 * an element even if it is normally focusable
 */

// Disable fields

/**
 * disable attribute a way to disable
 * form fields an attribute that can be 
 * 
 * Disabled fields cannot be focused or changed
 * browsers make them look gray and faded
 * 
 * name attribute of a form field determines
 * can be used as a property
 * name when accessing forms element
 * property called elements that
 * contains an array-like collection
 */

<form action="example/submit.html">
  Name: <input type="text" name="name"><br>
  Password:<input type="password" name="password"><br>
  <button type="submit">Log in</button>
</form>
<script>
  let form = document.querySelector("form");
  console.log(form.elements[1].type);
  // password
  console.log(form.elements.password.type);
  // true
</script>

<form action="example/submit.html"> Value: <input type="text" name="value"> <button type="submit">Save</button>
 </form>
 <script>
let form = document.querySelector("form"); 
form.addEventListener("submit", event => {
  console.log("Saving value", form.elements.value.value);
  event.preventDefault();
   });
</script

</input>

/</br>
/</input>

/</form>


//Text Fields

/**
fields created by <textarea>tags or <input>tags with
a type of text or password share a common interface
DOM elements have a value property
that holds their current content as a string value
Setting this property to another string
changes the fields content


selectionStart and selectionEnd properties of
text fields give us information about the cursor
and selection in the text

   when nothing is selected these two properties
   hold the same number indicating the position
   of the cursor

   0 indicates start of text
   10 indicates cursor after the 10th character

   When part of the field is selected two properties will
   differ giving us the start and end of selected text

   like value these properties may also be written to

   <textarea></textarea>
   <script>
    let textarea = document.querySelector("textarea");

    textarea.addEventListener("keydown", event => {
      // the key code for f2 happens to be 113
      if (event.keyCode == 113) {
        replaceSelection(textarea, "Khasekhemwy");
        event.preventDefault();
      }
    });
    function replaceSelection(field, word) {
      let from = field.selectionStart, to = field.selectionEnd;
      field.value = field.value.slice(0, from) + word +
                    field.value.slice(to);
      // Put the cursor after the word
      field.selectionStart = from + word.length;
      field.selectionEnd = from + word.length;
    }

replaceSelection replaces currently selected
part of text fields content with the given word
and moves the cursor after text fields content
with given word

change event for a text field does not fire every time
something is typed

it fires when field loses focus after its content
was changed

to respond to changens in a text field register
a handler for the input event instead

which fires for every time the user types a character
deletes text or manipulates fields content

text and counter displaying current length of text in field:

<input type="text">length:<span id="length">0</span>
<script>
  let text = document.querySelector("input");
  let output = document.querySelector("#length");
  text.addEventListener("input", () => {
    output.textContent = text.value.length;
  });
</script>
 */


 // Checkboxes and radio Buttons
/**
checkbox field is a binary toggle
  value can be extracted or changed
  through its checked property which
  hold a Boolean value

  <label>
    <input type="checkbox" id="purlpe"> Make ths page
    purple
  </label>
  <script>
    let checkbox = document.querySelector("#purple");
    checkbox.addEventListener("change", () => {
      document.body.style.background =
        checkbox.checked ? "mediumpurple" : "";
    });
  </script>
 */

/**
<label> tag associates a piece of document with 
  an input field

  radion button similar to checkbox linked 
  to other radio buttons with same name attribute
  son only one of them can be active at any time

  Color:
  <label>
    <input type="radion" name="color" value="orange">orange
  </labe>
  <label>
    <input type="radio" name="color" value="lightgreen"> Green
  </label>
  <label>
    <input type="radio" name="color" value="lightblue"> Blue
  </label>
  <script>
    let buttons = document.querySelectorAll("[name=color]");
    for (let button of Array.from(buttons)) {
      button.addEventListner("change", () => {
        document.body.style.background = button.value;
      });
    }
  </script>

  square brackets in CSS query given to querySelectorAll
  are used to match attributes. It selects elements
  whose name attribute is color
 */

// Select Fields
/**
similar to radio buttons also allow user to choose
from a set of options

radion button puts layout under user control

appearance of <select> tag is determined by the browser

when givn multiple attribute select tag will allow
user to select any number of options rather than just a 
single option

Each <option> tag has a value
  can be defined with a value attribute
  text inside option will count as its value

  value property of <select> reflects currently
    selected option

  <option> tags for select field can be accesdedd
    as am array-lie kk e `1l`

                                                        
    Example extracts selected value from a multiple
    field an uses them to compose a binary number
    from indidual tools   

    <select multiple>
      <option value="1">0001</option>
      <option value="2">0001</option>
      <option value="4">0001</option>
      <option value="8">0001</option>
    </select> = <span id="output">0</span>
    <script>
      let select = document.querySelector("select");
      let output = document.querySelector("#output");
      select.addEventListener("change", () => {
        let number = 0;
        for (let option of Array.from(select.options)) {
          if(option.selected) {
            number += Number(option.value);
          }
        }
        output.textContent = number;
      });
    </script>

 */ 

 // File Fields

 /**
 file fields were originally designed  to upload file
 from user machine through a form

 uses script and interprets action so script
 may read the file

 file field looks like button labeled with 
 something like choose file and browse

 <input type="file">
  <script>
    let input = document.querySelector("input");
    input.addEventListener("change", () => {
      if (input.files.length > 0) {
        let file = input.files[0];
        console.log("You chose", file.name);
        if (file.type) console.log("It has type", file.type);
      }
    });
    </script>

    files property of a file field element is 
    an array-like object (again not a real array)
    containing the files chosen in the field 
    intially empty

    reason there isn't simply a file property is that file
    fields also support a multiple attribute makes it 
    possible to seelct multiple files at the same time

    objects in files object have properties such as name
      - name
      - size (size in bytes chunks of 8 bits)
      - type (text/plain or image/jpeg)

        Does not have properties that containing
        content of the file 

        interface must be asynchronus to avoid
        freezing the document 

        <input type="file" multiple>
          <script>
            let input = document.querySelector("input");
            input.addEventListener("change", () => {
              for (let file of Array.from(input.files)) {
                let reader = new FileReader();
                reader.addEventListener("load", () => {
                  console.log("File", file.name, "starts with", 
                              reader.result.slice(0, 20));
                });
                reader.readAsText(file);
              }
            });
    </script>
  */

  /**
  reading a file is done by creating FileReader object
  register a load event handler for it. callingits readAsText
  method when loading finishes readers result contains
  files content

  File readers also fire an error event whe 
  reading the file fails for any reason
  interface was designed before promises became part 
  of the language wrap in a promise
  
  function readFileText(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener(
        "load", () => resolve(reader.result));
      reader.addEventListener(
        "error" () => reject(reader.error));
      reader.readAsText(file);
    });
  }

   */

   //Storing Data Client-Side

   /**
  simple html pages with JS can be great for 
  mini applications

  connecting form filelds with event handlers allows
  you to create small applies

  You cannot use Javascript bindings to remember between sessions
  JS binding thrown away every time the page is closed

  set up a server connect to the internet have  application
  store something there

  local storage object used to store data to survive
  page reloads allows you to file string valus under names


  localStorage.setItem("user", "marign");
  console.log(localStorage.getItem("username"));
  // marign
  localStorage.removeItem("username");

  value in localStorage sticks around until is
  overwritten removed with removeItem or user
  clears local data

  browsers eforce a limit on size of data a site 
  can localStorage. prevents feature from eating too
  much space

  a crude note-taking application keeps
  a set of named notes and allows user to edit notes
  and create new ones.

    */

