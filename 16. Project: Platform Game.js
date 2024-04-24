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
 * 
 */
// Actor updates

// Tracking keys

// Running the game

// Excercises