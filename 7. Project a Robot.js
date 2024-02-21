// MeadowField

const roads = [
    "", "",
];
// The Task

/**
 * robots current location, collection of undelivered parcels
 * 
 * compute a new state for the situation after move */

// class VillageState contructor//

class VillageState {
    constructor (place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
}

// move method //
// create destination as robots new place

    move(desitination) {
        if(!roadGraph[this.place].includes(destination)) {
            return this;
// call to map takes care of the moving

        } else
            let parcels = this.parcel.map(p => {
                if (p.place != this.place) return p;
                return {place: desitination, address: p.address};
            // call to filter does the delivering //
            }).filter(p => p.place != p.address);
            
    }




// move method gives new village state leaves old one intact //

let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
    );
    let next = first.move("Alice's House");
    console.log(next.place); // → Alice's House console.log(next.parcels); // → [] console.log(first.place); // → Post Office

// move causes parcel to be delivered reflected in next state

// intial state describes the situation where the robot is at //



// Persistent Data

// data structres that don't change are called immutable or persistent//

// Object.freeze changes an object so that writing and properties are ignored //

// freezing requires more computer work can confuse someone //

// a given object shouldn't be messed with 

let object = Object.freeze({value: 5});
object.value = 10;
console.log(object.value);
// 5

// Simulation

/**
 * Robot is a function that takes a VillageState object
 * returns the name of the place
 * robot returns direction it wants to move in
 * a memory value that will be given back next time
 * it is called
 */

function runRobot (state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0)
    }   console.log(`Done in ${turn} turns`);
        break;
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
    }
}

/**
 * Math.randon() returns a number between zero and one--but
 *  always below one //
 * Multiply by length of arrray then applying Math.floor 
 * gives random index for array
 * 
 * javacript funtion can be called with extra arguments without 
 * ill effects omits memory propert in it return object
 * 
 * Create new state with some parcels
 * write static method by adding a property to the constructor
 */ 

VillageState.random = function() {
    let
    for () {
        let address
        place
        do {
            place
            while
        }
        parcels
    }
    return
}
// do loop keeps picking new places when equal to the address//
// The Mail Trucks Route

// Pathfinding

// Exercises

// Measuring a Robot

// Robot Efficiency

// Persistent Group

