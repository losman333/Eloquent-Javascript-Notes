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
 */

//Encapsulation as a burden

//Drawing

// Motion and collision

// Actor updates

// Tracking keys

// Running the game

// Excercises