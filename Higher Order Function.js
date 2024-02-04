/** large program is costly
 * size involves complexity
 * introduces bugs(mistakes)
*/
// Abstraction //
/**
 * what do abstractions do?
 * 
 * hide details and give us the ability to talk about problems at a higher level(abstract
 * 
 * useful to notice when you are working a low level on abstraction
 */


//Abstraction Repetition//
/**
 * common for program to use a loop
 */

for (let i = 0; i < 10; i++) {
    console.log(i)
}

/**
 * abtract "Doing something N times as a function"
 * a function that calls console.log N times
 */

function repeatLog(n){
    for (let i = 0; i < n; i++) {
        console.log(i);
    }
}

/**
 * to do something other than logging numbers
 * doing something represented as a function
 * functions are just values
 * pass action as a function value
 */
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(3, console.log);
//Higher Order Functions //

//Script dataset//

//Filtering Arrays//

//transforming with map//

// summarizing with reduce //

// Composability //

// Strings and character codes //

// Recognizing test //

// Summary //

// Being able to pass function values to other function values is a very usefull features//
/* 
Being able to pass functions values to other function is a usefull aspect of Javascript

Arrays provide useful higher-order methods

    forEach to loop over the elements in an array

    filter return a new array containgin only the elements
    in an array

    map

    reduce

    some

    findIndex



*/

// Excercises //




/* flatten
use reduce method in combination with concact method to flatten an
array of arrays into a single array that has all the elements
of the orginal arrays
*/


/*Your own loop
write a high-order function loop that provides a for loop statement. 
Takes a 
value a 
test function 
update function
a body function

Each iteration first runs the test function on current loop stops 
if returns false
calls the body function giving it the current value
finally calls the update function to create a new value and starts from the begining
Use a regular loop to do the actual looping when defining the function

*/


/** Everything 
 * every mehod is opposite some method
 * returns truewhen the given function returens 
 * true for every element in the array. 
 * some method a version of the || operator that acts on arrays
 * every is like the && operator on arrays 
 *
 * Implement every as a function that takes an array and a predicate
 * function as parameters
 * 
 * write two version one using a loop and one using the some method
*/

/* dominant writing direction 
write a function that computes the dominant writing direction in a string of text
use characterScript
and countBy functions
*/
