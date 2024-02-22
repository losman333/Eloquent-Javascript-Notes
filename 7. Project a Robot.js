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

VillageState.random = function(parcelCount = 5) {
    let = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place
        // do loop keeps picking new places when equal to the address//

        do {
            place = randomPick(Object.keys(roadGraph));
        }   while (place == address);
        
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

runRobot(VillageState.random(), randomRobot); // → Moved to Marketplace
// → Moved to Town Hall
// →...
// → Done in 63 turns

// The Mail Trucks Route
const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House", "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm", "Marketplace", "Post Office"
    ]

// robot keeps route in its memory and drops element every turn

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

// Pathfinding

// finding a rout through a graph is a typical search problem

// interesetd in shorter routes 

// grow routes before looking at long ones

// function keeps a work list
// array of places that should be explored next
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    // search operates by taking the next item in list
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
           if (place == to) return route.concat(place);
           // code can't handle when no work 
           // every location can be reached from all other locations its connectedd
           if (!work.some(w => w.at == place)) {
            work.push({at: place, route: route.concat(place)});
           } 
        }
    }
}
function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    // robot uses memory value as list of diection to movin
    // whenver list is empty in has to figure out what to do next.

    return {direction: route[0], memory: route.slice(1)};
}

// Exercises

// Measuring a Robot

/**
 * write function compareRobots that takes two robots and start memory
 * generate 100 tasks each robot should solve each task
 * should output average number of steps each robot took per task
 * give each task to both robots instead of different tasks per robot
 */

function countSteps(state, robot, memory) {
    for (let steps = 0;; steps++) {
      if (state.parcels.length == 0) return steps;
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }
  
  function compareRobots(robot1, memory1, robot2, memory2) {
    let total1 = 0, total2 = 0;
    for (let i = 0; i < 100; i++) {
      let state = VillageState.random();
      total1 += countSteps(state, robot1, memory1);
      total2 += countSteps(state, robot2, memory2);
    }
    console.log(`Robot 1 needed ${total1 / 100} steps per task`)
    console.log(`Robot 2 needed ${total2 / 100}`)
  }
  
  compareRobots(routeRobot, [], goalOrientedRobot, []);

// Robot Efficiency
// write robot that finishes delivery task faster than goalOrinted ?
//use compareRobots function to verify whether robot improved//

function lazyRobot({place, parcels}, route) {
    if (route.length == 0) {
      // Describe a route for every parcel
      let routes = parcels.map(parcel => {
        if (parcel.place != place) {
          return {route: findRoute(roadGraph, place, parcel.place),
                  pickUp: true};
        } else {
          return {route: findRoute(roadGraph, place, parcel.address),
                  pickUp: false};
        }
      });
  
      // This determines the precedence a route gets when choosing.
      // Route length counts negatively, routes that pick up a package
      // get a small bonus.
      function score({route, pickUp}) {
        return (pickUp ? 0.5 : 0) - route.length;
      }
      route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
    }
  
    return {direction: route[0], memory: route.slice(1)};
  }
  
  runRobotAnimation(VillageState.random(), lazyRobot, []);

// Persistent Group

/**
 * write a new class PGroup similar to Group
 * add method should return new PGroup instance
 * with given memeber added leave old one changed
 * delete creates a new instance without a given member
 * class should work for values of any type not just strings
 * does not have to be efficient when using large values
 * constructor shouldn't be part of class interface
 * PGroup.empty can be used as a starting value
 */

class PGroup {
    constructor(members) {
      this.members = members;
    }
  
    add(value) {
      if (this.has(value)) return this;
      return new PGroup(this.members.concat([value]));
    }
  
    delete(value) {
      if (!this.has(value)) return this;
      return new PGroup(this.members.filter(m => m !== value));
    }
  
    has(value) {
      return this.members.includes(value);
    }
  }
  
  PGroup.empty = new PGroup([]);
  
  let a = PGroup.empty.add("a");
  let ab = a.add("b");
  let b = ab.delete("a");
  
  console.log(b.has("b"));
  // → true
  console.log(a.has("b"));
  // → false
  console.log(b.has("a"));
  // → false
