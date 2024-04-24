/**
 * 
 */

// the game

// the tehcnology

/**
 * user browser DOM to display game
 * useer input by handling events
 * 
 * create DOM elements and styling to give background
 * color, size, position
 * 
 * <canvas> tag used to draw graphics working
 * in terms of shagpes and pixels rather than DOM elements
 */

// Levels

/**
 * use big strings which each character represents
 * an element either a part of background grid
 * or a moving element
 * 
 * periods are empty space, has are walls plus signs
 * are lava. Player start position is at sign
 * every character is a coin equal sign at top 
 * is blocko of lava that moves back and forth horizontlaiy 
 * 
 * pipe characher creates vertically moving blobs v indicates
 * dripping lava
 * 
 * level is completed when all coins have been collected 
 * if player touches lava current level is restored
 * to starting postioin player may try again
 */

// Reading a Level

/**
 * following stores a level object argument should 
 * be string that defines level
 */

class level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map(1 => [...]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];

        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if (typeof type == "string") return type;
                this.startActors.push(
                    type.create(new Vec(x, y), ch));
                return "empty";
            });
        });
    }
}

/**
 * trim method is used to remove whitespace at start
 * and end of plan string
 * allows plan to start with anewline 
 * so all lines are directly below each other
 * remaining string split on new line characters each line 
 * is spread into array rpoducing arrays of characteres
 * 
 * rows holds any aray of characters rows of plan
 * derive the levels width and height from these
 * must still seperate moving elements from t
 * background grid
 * 
 * actors are moving elements stored in array of objects
 * background will be array of strings, holding
 * field types such as empty wall or lava
 * 
 * map over rows then over content to create. 
 * ararys
 * 
 * Remember map passes
 * array index as second argument to mapping function
 * tells x and y coordinates of given character
 * position in game will be stored as pairs
 * of coordinates top left is 0,0 each background
 * squre being 1 unit high and wide
 * 
 * level constructors uses levelChars Object
 * maps background elements to strings
 * and actor characters to clasess 
 * 
 * WHen type is an actor class its static create
 * method is iused to create object which is add to start
 * actors and the mapping function returns empty
 * background square
 * 
 * Positon of the actor is stored as a Vec object
 * this is a two dimensional vector an object with x
 * and y properties
 * 
 * As games runs actors will end up in different
 * plapces or even disappear entirely 
 * 
 * use a State class to track state of running game
 * 
 * 
 */

class State {
    constructor(level, actors, status) {
        this.level = level;
        this.actors = actors;
        this.status = status;
    }

    static start(level) {
        return new State(level, level.startActors, "playing");
    }

    get player() {
        return this.actors.find(a => a.type == "player");
    }
}


//status property swtiches to lost or won when game ended
// persistent data structure updating game state
// creates new state and leaves old one intact

/**
 * 
 */

//Actors 

/**
 * objects represent current position, state of given
 * moving element in game
 * 
 * actor objects conform to same interface
 * 
 * their pos property holds coordintates of element top-left
 * corner and size property holds size
 * udpate method used to compute new state position after
 * 
 * given time step. simulates thing actor does
 * moving in response to arrow keys for 
 * player and bouncing back and forth for lava returns
 * new updated actor object
 * 
 * type property contains string that identifies
 * type of actor player coin or lava useful when
 * drawing the game look of the rectangle
 * drawn for an actor based on its type
 * 
 * actor classes have static create mthod usd by
 * Level Constructor to create actor from a character
 * in the level plan
 * 
 * given coordinates of character and character itsself
 * which is needed because lava class handles several differnt 
 * characters 
 * 
 * Vec class used for two-dimensional values such as
 * postioin and size of actors
 */

class Vec {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }
}

/** times method sclaes a vector by give number will 
 * will be useful when need to multipy a speed vector
 * by time interval
 * to get distance traveled during that time
 * 
 * different types of actors get their own classes
 * since their behavior is different
 * 
 * player clases stores current speed to simulate
 * momentum and gravity
 */

class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;

    }
    get type() { return "player"; }

    static create(pos) {
        return new Player(pos.plus(new Vec(0, -0.5)),
                          new Vec(0,0));
    }
}

Player.prototype.size = new Vec(0.8, 1.5);

/**
 * 
 * size property same for all instances 
 * of player you can store on the prototype
 * rather than instances themselves
 * 
 * you can use a getter like type that creates and
 * return a new Vec object every time property
 * is read 
 * Strings being immutable don't have to be 
 * re-created every time they are evaluated
 * 
 * Lava Actor
    * intitalize object differently depending on character
    * its based on
    * 
    * dynamic lava moves along at current speed until it hits
    * obstacle if has reset property will jump
    * back to start position. If not will invert speed
    * continue in other direction(bouncing)
 * 
 * create method looks at character that Level
 * constructor passes and creates appropriate lava
 * actor
 */

class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = rest;
    }

    get type() { return "lava"; }

    static create(pos, ch) {
        if (ch == "=") {
            return new Lava(pos, new Vec(2, 0));
        } else if ( ch == "|") {
            return new Lava(pos, new Vec(0, 2));
        } else if (ch == "v") {
            return new Lava(pos, new Vec(0, 3), pos);
        }
    }
}

Lava.prototype.size = new Vec(1, 1);

/**
 * Coin Actors
    * mostly sit in their place
    * given a wobble slight back-and-forth motion
    * coin object stores a base position and 
    * wobble property tracks phase of the 
    * bouncing motion 
 */

class Coint {
    constructor(pos, basePos, wobble) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }


get type() { return "coin"; }

    static create(pos) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coint(basePos, basePos,
                        Math.random() * Math.PI * 2);
    }
}

Coin.prototype.size = new Vec(0.6, 0.6);

/**
 * Math sign give y-coordinate of point on circle
 * goes back and forth in smooth waveform
 * as we move along circle, useful to make
 * sine function useful for modeling a wave function
 * 
 * width of wave produced by Math.sin wave is 2π
 * multiply value returned by Math.random by number
 * to give coin random starting position on wave
 * 
 * define levelChars object that maps 
 * plan characters to either background grid types
 * or actor classes
 */

const levelChars = {
    ".": "empty", "#": "wall", "+": "lava",
    "@": Player, "o": Coin, 
    "=": Lava "|": Lava, "v": Lava
    // creates level instance

}; 

let simpleLevel = new level(simpleLevelPlan);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`);

//Encapsulation as a burden

/**
 * makes programs bigger 
 * requires additional concepts and interfaces
 * 
 * elements are close together if behavior
 * of one changes unlikely any others stay same
 * interfaces between elements end up encoding
 * assumptions abaout the way ghe game works
 * 
 * makes them less effective when having changed
 * one part of the system. have to worry about
 * way it impacts other parts 
 * 
 * encapsulate something that isnt suitable boundry
 * sure way to wast energy
 * 
 * interfaces get large and detailed they
 * need be changed often as program evolves
 * 
 * drawing subsystem can be encapsulated reason
 * for this is to display same game in a 
 * different way in the next chapter
 * we can load same game program and plug 
 * in a new display module.
 */

//Drawing

/**
 *  Encapsulation of drawing code done
 * using a display object display type
 * calle d DOMDisplay because uses DOM elements
 * to show level
 * 
 * style sheet used  to set actual colors
 * and fixed properties fo elements that 
 * make up the game 
 * 
 * possible to assign elements style properties
 * when creating them  but creates more verbose
 * programs
 * 
 * helper function provdies succint way to create
 * element and give some attributes and child
 * nodes
 */

function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttributes(attr, attrs[attr]);
    }
    for (let child of children) {
        dom.appendChild(child);
    }
    return dom;
}

// display created by giving parent element to appedn itself and a level object

class DOMDisplay {
    constructor(parent, level) {
        this.dom = elt("div", {class: "game"}, drawGrid(level));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }

    clear() { this.dom.remove(); }
}

/**
 * levels background grid never changes drawn once
 * actors redrawn display is updated with given
 * state. 
 * 
 * actorLayer property used to track element
 * that holds actors so they can be removed
 * and replaced
 * 
 * coordinates and sizes tracked in grid units
 * size or distance of 1 means one grid block
 * settings pixels sizes will have to scale 
 * coordinates up everything in game
 * would be ridiculously small at single pixel
 * per square
 * scale constant gives number of pixels that single
 * unit takes up on screen
 */

const scale = 20;

function drawGrid(level) {
    return elt("table", {
        class: "background",
        style: `wisth: ${level.width * scale}px`
    }, ...level.rows.map(row =>
        elt("tr", {style: `height: ${scal}px`},
        ...row.map(type => elt("td", {class: type})))
        ));
}

/**
 * background drawn as <table> elemnet
 * corresponds to structure of rows property 
 * of level- each row of grid is turned into a table row (<tr> element)
 * strings in grid are used as class names for table cell(<td>)
 * 
 * triple dot operator used to pass arrays of child nodes
 * to elt as separate arguments
 * 
 * following css makes table look like background we want
 * 
 */

.background     { background: rgb(52, 166, 251);
                  table-layout: fixed;
                  border-spacing: 0; }
.background td  { padding: 0;}}

.lava   { background: rgb(255, 100, 100); }
.wall   { background: white;    } 

/**
 * 
 * table-layout, border-spacing, padding used
 * to override default behavior
 * 
 * background rule sets background color
 * 
 * draw each actor by creating DOM element
 * setting elements position and size 
 * based on actors properties
 * 
 * values have to multiplied by scale
 * to go from game units to pixels
 */

function drawActors(actors) {
    return elt("div", {}, ...actors.map(actor => {
        let rect = elt("div", {class: `actor ${actor.type}`});
        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.pos.x * scale}px`;
        return rect;

    }));
}

/** to give element more than one class
 * separate class names by spaces
 * actor class give actors absolute position
 * type name is used as an extra class to
 * give them color
 * 
 * don't have to define lava class again 
 * because reusing class for lava grid squares
 * defined earlier
 */

.actor { position: absolute;}
.coin { background: rgb(213, 229, 89);}
.player {background: rgb(64, 64, 64);}

/**
 * syncState method used to make display show given
 * state first removes old actor graphics 
 * then redraws actors in new positions
 * 
 * since only handful of actors in game
 * redrawing is not that expensive
 * 
 * first removes old actor graphics
 * then redraws actors in new positions
 */

DOMDisplay.prototype.syncState = function(state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className =`game ${state.status}`;
    this.scrollPlayerIntoView(state);
};

/**
 * adding current level status as class name
 * to wrapper you can stule player actor slightly
 * differently when game is won or lost
 * by adding CSS rule that takes effect 
 * when player ancestor element with given class
 */

.lost .player {
    background: rgb(160, 64, 64);
}
.won .player {
    box-shadow: -4px -7px 8px white, 4px -7px 8px white;
}

/**
 * after touching lave player color turns dark
 * red
 * 
 * when last coin collected add two blurred
 * white shadows on top left on top right
 * create halo effect
 * 
 * scrollPlayerIntoView call ensures if level is
 * protruding outside viewport scroll that 
 * viewport to make sure player is
 * near its center.
 * 
 * follwing CSS give game wrapping DOM element max size
 * ensures anything that sticks out of elements
 * box not visible
 * 
 * give a relative position so actor
 * insdie are positioned relative to levels top-left corner
 */

.game {
    overflow: hidden;
    max-width: 600px;
    max-height: 450px;
    position: relative;
}

/**
 * scrollPlayerIntoView method we find the
 * player position and update wrapping 
 * elements scroll position
 * 
 * change scroll position by manipulating 
 * elements scrollLeft and scrollTop
 * properties when player is too close
 * to edge
 */

DOMDisplay.prototype.scrollPlayerIntoview = function(state) {
    let width = this.dom.clientWidth;
    let heigh = this.dom.clientHeight;
    let margin = widtih /3;

    // viewport
    let left = this.dom.scrollLeft, right = left + width;
    let top = this.dom.scrollTop, bottom = top + height;
    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5))
                            .times(scale);
    if (center.x < left + margin) {
        this.dom.scrollLeft = center.x - margin;
    } else if (venter.x > right - margin) {
      this.dom.scrollLet = center.x + margin - width; 
    }
    if (center.y < top + margin) {
        this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
};

/**
 * methods on Vec type allow computations with objects
 * to be written in readable way
 * 
 * to find actors center add position (top-left corner)
 * and half its size
 * 
 * multiply resulting vector by display scale to get 
 * pixel coordinates
 * 
 * series of checks verifies player position
 * isnt ouside of allowd range
 * 
 * sometime sets nonsense scroll coordinates
 * below zero or beyond elements
 * scollable area. DOM will constarin them
 * to acceptable values scollinLeft to -10
 * will cause to become 0
 * 
 * <link rel="stylesheet" href="css/game.css">
 * 
 * <script>
 *  let simpleLevel = new Level(simpleLevelPlan);
 *  let display = new DOMDisplay(document.body, simpleLevel);
 *  display.syncState(State.start(simpleLevel));
 */
// Motion and collision

/**
 * handling collisions between rectangular
 * 
 * test whether motion would take inside wall
 * cancel if it does
 * 
 * collision response depends on type of actor
 * player will stop lava block will bounce back
 * 
 * time steps nee to be small
 * will cause motion to stop before
 * objects actually touch
 * 
 * if time steps(motion steps) are to big
 * player ends up hovering noticeable distance
 * above ground
 * 
 * method tells us whether rectangle ( specified
 * by position and size) touches grid element
 * of given type
*/

level.prototype.touches = function(pos, size, type) {
    let xStart = Math.floor(pos.x);
    let xEnd = Math.ceil(pos.x + size.x);
    let yStart = Math.floor(pos.y);
    let yEnd = Math.ceil(pos.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
            let isOutside = x < 0 || x >= this.width ||
                            y < 0 || y >= this.height;
            let here = isOutside ? "wall" : this.rows[y][x];

            if (here == type) return true;
        }
    }
    return false;
};

/**
 * 
 * method computes set of grid squares
 * that body overlaps with using Math.floor
 * and Math.ceil on its coordinates
 * 
 * grid squares are 1 x 1 units in size
 * rounding sides of box up and down gets
 * range of background squares that box
 * touches 
 * 
 * loop over block of grid squares found
 * rounding coordinates return true
 * when matching square found
 * 
 * Squares outside of level treated as "wall"
 * to ensure player can't leave world won't
 * accidentallly try to read outside
 * bounds of rows array
 * 
 * update method touches figures out whether 
 * player touching lava
 * 
 */

State.prototype.update = function(time, keys) {
    let actors = this.actors
    .map(actor => actor.update(time, this, keys));

    let newState = new State(this.level, actors, this.status); 

    if (newState.status != "playing") return newState;

    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
        return new State(this.level, actors, "lost");
    }

    for (let actor of actors) {
        if(actor !== player && overlap(actor, player)) {
            newState = actor.coolide(newState);
        }
    }
    return newState;
    
};

/**
 * method passed timestep and data structure
 * tells which keys are being held down
 * 
 * calls update method on all actors, producing
 * array of updated actors
 * 
 * actors get time step, keys and the state
 * they can base their update on those
 * 
 * player will actually read keys, only
 * actor controlled by keyboard
 * 
 * methods tests whether player is touching 
 * background lava, game is lost
 * 
 * overlap function detects overlap between 
 * actor objects returns true when they touch
 * overlap both along the x-axis along y-axis
 * 
 * 
 */

function overlap(actor1, actor2) {
    return  actor1.pos.x + actor1.size.x > actor2.pos.x &&
            actor1.pos.x < actor2.pos.x + actor2.size.x &&
            actor1.pos.y < actor1.pos.y + actor2.pos.y.x &&
            actor1.pos.y < actor2.pos.x + actor2.size.y;           
        
}

/**
 * collide method updates stae
 * 
 * touching lava actor sets game status
 * to lost
 * 
 * coins vanish when you tuch them
 * set to status of won when last coin 
 * of the level
 * 
 */

Lava.prototype.collid = function(state) {
    return new State(state.level, state.actors, "lost");
};

Coin.prototype.collide = function(state) {
    let filtered = state.actors.filter(a => a != this);
    let status = state.status;
    if (!filtered.some(a => a.type == "coin")) status = "won";
    return new State(state.level, filtered, status);
};

// Actor updates

/**
 * actors update methods take as arguements
 * the time step, state, object and keys object
 * lava actor type ignores keys object
 * 
 * Lava actor ignores keys object
 */


Lava.prototype.update = function(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "walļ")) {
        return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
        return new Lava(this.reset, this.speed, this.reset);
    } else {
        return new Lava(this.pos, this.speed.times(-1));
    }
};

consst woebbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.update = function(time) {
    let wobble = this.wobble + time * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePoss.plus(new Vec(0, wobblePos)),
                    this.basePos, wobble);
};

/**
 *  * current position computed from base postiion
 * and offset based on wave
 * 
 * wobble property incremented to track time
 * used as argument to Math.sin to find
 * new position of the wave
 * 
 * player motion handled separately
 * per axis because hitting floor should not prevent
 * horizontal motion 
 * hitting wall should not stop falling or jumping motion
 * 
 */

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function(time, state, keys) {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
        pos = movedX;
    }

    let uSpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
        pos = movedY;
    }   else if (keys.ArrowUp && ySpeed > 0) {
        ySpeed = -jumpSpeed;
    } else {
        ySpeed = 0;
    }

    return new Player(pos, new Vec(xSpeed, ySpeed));
};

/**
 * horizontal motion computed based on state of 
 * left/right arrow keys
 * 
 * new position created when no wall blocking
 * old position kept otherwise
 * 
 * // Tracking keys

 * 
 * new key handler that sets the state of left,
 * right,  and up arrow keys
 * 
 * call prevenDefault for keys that don't end up
 * scrolling the page
 * 
 * following function will return an object that
 * tracks current position of those key names
 * will return an object that trakcs current 
 * position of keys
 * 
 * registers event handlers for "keydown" "keyup"
 * updates object
 * 
 * when key code in event is present in set
 * of codes that it is tracking
 */

function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key )) {
            down[event.key]  = event.type == "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
}

const arrowKeys =
    trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

/**
 * samde handler function used for both event types
 * looks at event objects type property to determine
 * whether key state should be updated 
 * to true("keydown") trun or ("keyup")
 */

/**
 * 
 * update method computes  new position by adding
 * product of time step and current speed to old position
 * if no obsticle it moves there
 * if obsticle behavior depends on type of lave ablock
 */


// Running the game

/**
 * requestAnimationFrame function 
 * provids a good way to animate game
 * 
 * define helper function that wraps boring
 * parts in a convenient interface allows us
 * to call runAnimation giving it a function
 * that expects a time difference as an argument
 * and draws a single frame
 * 
 * when frame function returns value false
 * animation stops
 * 
 */

function  runAnimation(frameFunc) {
    let lastTime = null;
    function framte(time) {
        if(lastTime != null) {
            let timeStep = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(timeStep) === False) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

/**
 * maximum frame step of 100 milliseconds (one-tenth of sec)
 * 
 * when browser tab or window with page is hidden
 * requestANmiatonFrame calls susupended until tab or window
 * is shown again
 * 
 * difference between lastTime and timewill be entire
 * time in which page was hidden
 * 
 * Advancing game by that much in single step might
 * cause side effects like player falling through the floor
 * 
 * function also converts time steps to seconds
 * which are an easeir quantity to thing about than
 * milliseconds
 * 
 * runLevel function takes level object
 * and display constructor and returns promise
 * 
    * displays level in document.body
    * and lets user play through it
    * runlevel waits one more second
    *   (lets user see what happens)
    * clears dpsplay stops and animation
    * resolves promise to games end status
 */

function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = Start.start(level);
    let ending = 1;

    return new Promise(resolve => {
        runAnimation(time => {
            state = state.update(time, arrowKeys);
            display.syncState(state);
            if (state.status == "playing") {
                return true;
            } else if (ending > 0 ) {
                ending -= time;
                return true;
            } elt;se {
                display.clear();
                resolve(state.status);
                return false;
            }
        });
    });
}

/**
 * games sequence of levels whenver player dies current 
 * level is restarted. When level is completed
 * move on to nex level
 * 
 * expressed by following function
 * takes array of level plans(strings) and display constructor
 */

async function runGame(plans, Display) {
    for (let level = 0; level < plans.length;) {
        let status = await runLevel(new level(plans[level]),
                                    Display);
        if (status == "won") level++;
    }

    console.log("You've won!");
}

/**
 * because runLevel return a promise run game
 * be written using async function
 * returns another promsie resolves when player
 * finishes a game
 */

// Excercises

// Game Over

/**
 * adjust runGame to implement lives Have player start
 * with three
 * 
 * Output current number of lives (using console.log)
 * every time a level starts
 */

// Pauing Game

/**
 * make it possible to puase suspend
 * and unpause game by pressing ESC key
 * 
 * this can be done changing runLevel
 * function to user another keyboard event handler 
 * and interrupting or resuming
 * animation whenever Esc key hit
 * 
 * rearrange the way runLevel calls runAnimation
 * 
 * arrowKeys object currently a global binding
 * and event handler are kept around even
 * when no game is running
 * 
 * Extend trakcKeys to register handlers then change
 * runLevel to register handlers when it starts
 * and unregister again when its finished
 */

// A MONSTER
/**
 * create a monster that moves horrizontally
 * can make them ove in the direction of the player
 * bounce back and forth
 * 
 * class doesn't have to handle falling but should
 * make sure mosnter doesn't walk through walls
 * 
 * when monsuter touches player effect depends
 * on whehter player is jumping on top them or not
 * 
 * you can approzimate this by checking whether players bottom is near
 * monsters top if so monster disappears if not game is lost
 */
