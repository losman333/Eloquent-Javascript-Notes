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

            }).filter(p => p.place != p.address);
            
    }



// call to filter does the delivering //

// move method gives new village state leaves old one intact //

// move causes parcel to be delivered reflected in next state

// intial state describes the situation where the robot is at //



// Persistent Data

// data structres that don't change are called immutable or persistent//

// Object.freeze changes an object so that writing and properties are ignored //

// freezing requires more computer work can confuse someone //

// Simulation

// The Mail Trucks Route

// Pathfinding

// Exercises

// Measuring a Robot

// Robot Efficiency

// Persistent Group

