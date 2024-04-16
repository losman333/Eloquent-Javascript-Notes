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
 * display game in 
 */

//Drawing

// Motion and collision

// Actor updates

// Tracking keys

// Running the game

// Excercises